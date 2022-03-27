from maticar.app import models as m_mng


class UserManager(object):
    def __init__(self):
        self.db = next(m_mng.get_db())

    def get_users(self):
        pass
