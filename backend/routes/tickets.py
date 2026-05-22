from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

import crud
import schemas
from database import get_db


router = APIRouter(prefix="/tickets", tags=["tickets"])


@router.post("/", response_model=schemas.TicketResponse, status_code=status.HTTP_201_CREATED)
def create_ticket_endpoint(ticket: schemas.TicketCreate, db: Session = Depends(get_db)):
    db_ticket = crud.create_ticket(db, ticket)
    return db_ticket


@router.get("/", response_model=List[schemas.TicketResponse])
def list_tickets(db: Session = Depends(get_db), skip: int = 0, limit: int = 100, search: str = None, status: str = None):
    tickets = crud.get_tickets(db, search=search, status=status, skip=skip, limit=limit)
    return tickets


@router.get("/{ticket_id}", response_model=schemas.TicketResponse)
def get_ticket_by_id(ticket_id: str, db: Session = Depends(get_db)):
    ticket = crud.get_ticket_by_ticket_id(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ticket not found")
    return ticket


@router.put("/{ticket_id}", response_model=schemas.TicketResponse)
def update_ticket(ticket_id: str, ticket_update: schemas.TicketUpdate, db: Session = Depends(get_db)):
    ticket = crud.get_ticket_by_ticket_id(db, ticket_id)
    if not ticket:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Ticket not found")

    updated = crud.update_ticket(db, ticket, ticket_update)
    return updated
