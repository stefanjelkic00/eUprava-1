from maticar.app import models as m_mng
import requests
import os
import logging

logger = logging.getLogger("__name__")


class WorkerManager(object):
    def __init__(self):
        self.db = next(m_mng.get_db())

    async def get_workers(self):
        try:
            workers = requests.get(os.getenv('AUTH_SERVER_API') + "/user/find/role/maticar_worker")
            return workers
        except Exception as e:
            logger.error("Error ocured getting workers. Error {}".format(str(e)))
        return None
