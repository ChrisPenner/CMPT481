from google.appengine.ext import ndb
from app.models.group import Group


class User(ndb.Model):
    group_uid = ndb.StringProperty()
    data = ndb.JsonProperty(default={})
    registration_date = ndb.DateTimeProperty(auto_now_add=True)

    def restart(self):
        self.data = {}

    @property
    def group(self):
        return Group.get_by_id(self.group_uid)

    @property
    def phone(self):
        return self.key.id()
