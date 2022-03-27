from fastapi import (
    APIRouter,
    Depends,
    Request,
)
from maticar.app import models as m_api
from maticar.app import managers as mm_mng
from sqlalchemy.orm import Session
from maticar.app.auth import (
    JWTBearer,
)
import logging

logger = logging.getLogger("__name__")

admin_router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    responses={404: {"msg": "Not Found"}}
)


@admin_router.get("/workers", status_code=200, dependencies=[Depends(JWTBearer())])
async def get_workers(
    request: Request,
    db: Session = Depends(m_api.get_db)
):
    try:
        workers = await mm_mng.WorkerManager().get_workers()
        if workers:
            return workers
    except Exception as e:
        logger.error(f"Error occured getting workers API. Error {str(e)}")
    return None
