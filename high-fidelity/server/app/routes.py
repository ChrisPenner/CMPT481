from webapp2 import Route
from webapp2_extras.routes import PathPrefixRoute

from webapp2_extensions import ResourceRoutes

ROUTES = [
    PathPrefixRoute('/api', [
        ]),
    PathPrefixRoute('/admin', [
    ]),
]
