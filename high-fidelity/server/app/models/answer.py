from google.appengine.ext import ndb
from app.models.clue import Clue
from app.models.utils import get_clue_uid, get_story_uid

from .validators import not_empty, phone_number


class Answer(ndb.Model):
    DATA_FIELDS = ['pattern', 'next_clue', 'receiver', 'require_media']

    uid = ndb.StringProperty(required=True)
    clue_uid = ndb.ComputedProperty(lambda s: get_clue_uid(s.uid))
    story_uid = ndb.ComputedProperty(lambda s: get_story_uid(s.uid))

    pattern = ndb.StringProperty(required=True, validator=not_empty)
    next_clue = ndb.StringProperty(required=True)
    receiver = ndb.StringProperty(validator=phone_number)
    require_media = ndb.BooleanProperty(default=False)


    @classmethod
    def from_uid(cls, uid, **kwargs):
        key = cls.build_key(uid)
        return cls(key=key, uid=uid.upper(), **kwargs)

    @classmethod
    def get_by_id(cls, id):
        return super(Answer, cls).get_by_id(id.upper())

    @staticmethod
    def build_uid(story_id, clue_id, answer_id):
        return ':'.join([story_id, clue_id, answer_id]).upper()

    @classmethod
    def build_key(cls, uid):
        return ndb.Key(cls, uid.upper())

    def _pre_put_hook(self):
        clue = Clue.get_by_id(self.clue_uid)
        if clue is None:
            raise ValueError("A clue doesn't exist for this answer")
        clue.add_answer(self.uid)
        clue.put()

    @classmethod
    def _pre_delete_hook(cls, key):
        clue = Clue.get_by_id(get_clue_uid(key.id()))
        if clue is None:
            return

        clue.remove_answer(key.id())
        clue.put()

