import json
import logging

from webapp2 import abort, Route, RequestHandler
from webapp2_extras.routes import PathPrefixRoute

from google.appengine.ext import ndb

class UserFacingError(Exception):
    pass

def parse_args(params, args):
    results = {}
    for name, kind, required in args:
        if (name not in params):
            if required:
                abort(400, '{name} is required'.format(name=name))
            else:
                continue
        results[name] = params[name]
    return results


def parse_form_data(params, args):
    results = {}
    for name, kind, required in args:
        if name not in params:
            abort(400, '{name} is required'.format(name=name))
        if kind is dict:
            results[name] = json.loads(params[name])
        else:
            results[name] = kind(params[name])
    return results


data_methods = ['put', 'patch', 'post']
class restful_api(object):
    def __init__(self, content_type):
        self.content_type = content_type

    def __call__(self, cls):
        def format_response(f, method):
            def wrapped(handler, *args, **kwargs):
                if method in data_methods:
                    try:
                        kwargs['data'] = json.loads(handler.request.body)
                    except ValueError:
                        logging.error("Failed to serialize in %s.%s: %s", cls.__name__, method, handler.request.body)
                        return handler.abort(400, 'Invalid JSON body')
                return_value = f(handler, *args, **kwargs)
                if return_value is None:
                    logging.info("Nothing returned from %s.%s", cls.__name__, method)
                    return
                handler.response.headers['Content-Type'] = self.content_type
                response = {
                    'data': return_value
                }
                logging.info("Handler response for %s.%s is: %s", cls.__name__, method, response)
                handler.response.body = json.dumps(response)
            return wrapped

        for method in ['index', 'get', 'post', 'put', 'patch', 'delete']:
            if hasattr(cls, method):
                wrapped = format_response(getattr(cls, method), method)
                setattr(cls, method, wrapped)
        return cls


def create_resource_handler(Model, id_key='uid'):
    @restful_api('/application/json')
    class ResourceHandler(RequestHandler):
        def handle_exception(self, exception, debug):
            logging.exception('%s: %s', Model.__name__, exception)
            if not isinstance(exception, UserFacingError):
                raise exception
            if hasattr(exception, 'status'):
                self.response.status_int = exception.status
            else:
                self.response.status_int = 400
            self.response.body = json.dumps({
                'error': exception.message
            })

        def index(self):
            items = [item.to_dict() for item in Model.query().fetch()]
            return {item['uid']: item for item in items}

        def get(self, uid):
            item = Model.get_by_id(uid)
            if item is None:
                abort(400, 'No Resource for that id')
            return item.to_dict()

        @ndb.transactional(xg=True)
        def put(self, uid, data):
            logging.info('PUT: %s, %s', uid, data)
            item = Model.get_by_id(uid) or Model.from_uid(uid)
            if hasattr(Model, 'DATA_FIELDS'):
                data = { k:v for k,v in data.iteritems() if k in Model.DATA_FIELDS }
            item.populate(**data)
            item.put()
            return item.to_dict()

        def delete(self, uid):
            logging.info('PUT: %s', uid)
            Model.build_key(uid=uid).delete()
            return {}


    return ResourceHandler


def ResourceRoutes(route_prefix, Model, id_key='uid'):
    handler = create_resource_handler(Model, id_key=id_key)
    return PathPrefixRoute('/{}'.format(route_prefix), [
            Route('/', handler=handler, handler_method='index', methods=['GET']),
            Route('/<uid:[^/]+>', handler=handler, methods=['GET', 'PUT', 'DELETE']),
        ])
