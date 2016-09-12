from google.appengine.ext import ndb

from app.models.message import Message
from app.models.story import Story
from app.models.utils import get_story_uid
from .validators import phone_number


class Clue(Message):
    DATA_FIELDS = ['text', 'hint', 'media_url', 'answer_uids', 'sender']

    uid = ndb.StringProperty(required=True)
    story_uid = ndb.ComputedProperty(lambda s: get_story_uid(s.uid))
    answer_uids = ndb.StringProperty(repeated=True)
    text = ndb.TextProperty(required=True)
    hint = ndb.StringProperty(None)
    media_url = ndb.StringProperty()
    sender = ndb.StringProperty(validator=phone_number)

    @property
    def answers(self):
        return ndb.get_multi(ndb.Key('Answer', uid) for uid in self.answer_uids)

    @property
    def story(self):
        return Story.get_by_id(self.story_uid)

    @property
    def is_endpoint(self):
        return not self.answer_uids

    @classmethod
    def from_uid(cls, uid, *args, **kwargs):
        key = cls.build_key(uid=uid)
        return cls(key=key, uid=uid.upper(), *args, **kwargs)

    @classmethod
    def get_by_id(cls, id):
        return super(Clue, cls).get_by_id(id.upper())

    @staticmethod
    def build_uid(story_id, clue_id):
        return ':'.join([story_id.upper(), clue_id.upper()])

    @classmethod
    def build_key(cls, story_id=None, clue_id=None, uid=None):
        if uid:
            return ndb.Key(cls, uid)
        elif story_id and clue_id:
            return ndb.Key(cls, cls.build_uid(story_id, clue_id))
        raise TypeError('build_key requires either story_id and clue_id or a uid')

    def _pre_put_hook(self):
        story = Story.get_by_id(self.story_uid)
        if story is None:
            raise ValueError("A story doesn't exist for this clue")
        story.add_clue(self.uid)
        story.put()

    @classmethod
    def _pre_delete_hook(cls, key):
        clue = cls.get_by_id(key.id())
        ndb.delete_multi([ndb.Key('Answer', uid) for uid in clue.answer_uids])

        story = Story.get_by_id(clue.story_uid)
        if story is None:
            return
        story.remove_clue(key.id())
        story.put()

    def add_answer(self, answer_uid):
        if answer_uid not in self.answer_uids:
            self.answer_uids.append(answer_uid)

    def remove_answer(self, answer_uid):
        if answer_uid in self.answer_uids:
            self.answer_uids.remove(answer_uid)
