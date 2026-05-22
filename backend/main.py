from fastapi import FastAPI
from database import engine, Base
from fastapi.middleware.cors import CORSMiddleware

from routes.tickets import router as tickets_router


app = FastAPI(title="Ticketflow CRM")

Base.metadata.create_all(bind=engine)

app.include_router(tickets_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"message": "Ticketflow CRM API flying high!"}
