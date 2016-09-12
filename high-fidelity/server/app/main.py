""" main  """
import logging
from webapp2 import WSGIApplication

from app.routes import ROUTES

app = WSGIApplication(ROUTES, debug=True)
