from fastapi import (
    APIRouter,
    Depends,
    Request,
)
from maticar.app import models as m_api
from sqlalchemy.orm import Session
from maticar.app.auth import (
    JWTBearer,
)

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
    return request.credentials
