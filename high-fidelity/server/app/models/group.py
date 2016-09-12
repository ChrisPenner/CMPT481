from uuid import uuid4

from google.appengine.ext import ndb

from app.models.clue import Clue


class Group(ndb.Model):
    uid = ndb.StringProperty(required=True)
    data = ndb.JsonProperty(default={})
    story_uid = ndb.StringProperty(required=True)
    created_at = ndb.DateTimeProperty(auto_now_add=True)
    hints_used = ndb.IntegerProperty(default=0)
    completed_at = ndb.DateTimeProperty()
    clue_uid = ndb.StringProperty(required=True)
    user_keys = ndb.KeyProperty('User', repeated=True)

    @property
    def users(self):
        return [k.id() for k in self.user_keys]

    @property
    def clue(self):
        if not self.clue_uid:
            return None
        return Clue.get_by_id(self.clue_uid)

    def restart(self):
        self.data = {}
        self.clue_uid = "{}:{}".format(self.story_uid, 'START')

    @classmethod
    def gen_uid(cls):
        uid = uuid4().hex[:6].upper()
        while cls.get_by_id(uid):
            uid = uuid4().hex[:6].upper()
        return uid

    @classmethod
    def get_by_id(cls, id):
        if not id:
            return None
        return super(Group, cls).get_by_id(id.upper())

    @classmethod
    def from_uid(cls, uid, **kwargs):
        return Group(id=uid, uid=uid, **kwargs)
