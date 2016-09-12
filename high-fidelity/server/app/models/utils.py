def get_story_uid(uid): 
    return uid.split(':')[0]

def get_clue_uid(uid): 
    return ':'.join(uid.split(':')[:2])
