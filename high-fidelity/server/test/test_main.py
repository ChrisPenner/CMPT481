from unittest import TestCase
from webapp2 import Request
from mock import Mock, patch, MagicMock
from google.appengine.ext import testbed, ndb

from app.main import app

def create_request(method='GET', **kwargs):
    request = Request.blank('/')
    request.method = method
    request.POST.update(kwargs)
    return request


class GAETestCase(TestCase):
    """ Mock out GAE architecture """
    def setUp(self):
        self.testbed = testbed.Testbed()
        self.testbed.activate()
        self.testbed.init_datastore_v3_stub()
        self.testbed.init_memcache_stub()
        ndb.get_context().set_cache_policy(False)

    def tearDown(self):
        self.testbed.deactivate()
