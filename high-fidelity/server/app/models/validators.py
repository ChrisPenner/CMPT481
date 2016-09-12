import re

from webapp2_extensions import UserFacingError
def not_empty(prop, value):
    if not value:
        raise UserFacingError(u'{} must not be empty'.format(prop._name))
    return value

INVALID_PHONE_CHAR_REGEX = r'[^-+0-9\s()]'
def phone_number(prop, value):
    if not value or not value.strip():
        return None
    if re.search(INVALID_PHONE_CHAR_REGEX, value):
        raise UserFacingError('Invalid phone number character found in {}'.format(prop._name))
    return u'+{}'.format(re.sub('[^0-9]', '', value))
