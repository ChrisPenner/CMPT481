from google.appengine.ext import ndb


class Message(ndb.Model):
    text = ndb.TextProperty(required=True)
    media_url = ndb.StringProperty()
    sender = ndb.StringProperty()
    receiver = ndb.StringProperty()
    group_uid = ndb.StringProperty()
    story_uid = ndb.StringProperty()
    sent = ndb.DateTimeProperty(auto_now_add=True)

    @classmethod
    def for_story(cls, story_uid, limit=1000):
        return cls.query(Message.story_uid == story_uid).order(-Message.sent).fetch(limit=limit)

    @classmethod
    def for_group(cls, group_uid, limit=1000):
        return cls.query(Message.group_uid == group_uid).order(-Message.sent).fetch(limit=limit)
