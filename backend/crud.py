from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime

import models
import schemas
import utils


def create_ticket(
    db: Session,
    ticket: schemas.TicketCreate
) -> models.Ticket:
    """Creates a new ticket."""

    # Get the latest ticket to generate next ticket ID
    last_ticket = (
        db.query(models.Ticket)
        .order_by(models.Ticket.id.desc())
        .first()
    )

    next_number = 1

    if last_ticket:
        try:
            next_number = int(last_ticket.ticket_id.split("-")[1]) + 1
        except (IndexError, ValueError):
            next_number = 1

    ticket_id = utils.generate_ticket_id(next_number)

    db_ticket = models.Ticket(
        ticket_id=ticket_id,
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        description=ticket.description,
        status="Open",
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )

    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)

    return db_ticket


def get_tickets(
    db: Session,
    search: Optional[str] = None,
    status: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
) -> List[models.Ticket]:
    """Returns tickets with optional search and filtering."""

    query = db.query(models.Ticket)

    # Filter tickets by status
    if status:
        query = query.filter(models.Ticket.status == status)

    # Search across multiple fields
    if search:
        search_term = f"%{search}%"

        query = query.filter(
            (models.Ticket.ticket_id.like(search_term)) |
            (models.Ticket.customer_name.like(search_term)) |
            (models.Ticket.customer_email.like(search_term)) |
            (models.Ticket.subject.like(search_term)) |
            (models.Ticket.description.like(search_term))
        )

    tickets = (
        query
        .order_by(models.Ticket.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return tickets


def get_ticket_by_ticket_id(
    db: Session,
    ticket_id: str
) -> Optional[models.Ticket]:
    """Fetches a single ticket using ticket ID."""

    ticket = (
        db.query(models.Ticket)
        .filter(models.Ticket.ticket_id == ticket_id)
        .first()
    )

    return ticket


def update_ticket(
    db: Session,
    ticket: models.Ticket,
    ticket_update: schemas.TicketUpdate
) -> models.Ticket:
    """Updates ticket information."""

    if ticket_update.subject is not None:
        ticket.subject = ticket_update.subject

    if ticket_update.description is not None:
        ticket.description = ticket_update.description

    if ticket_update.status is not None:
        ticket.status = ticket_update.status

    # Update timestamp after modification
    ticket.updated_at = datetime.utcnow()

    db.add(ticket)
    db.commit()
    db.refresh(ticket)

    return ticket


def add_note(
    db: Session,
    ticket: models.Ticket,
    note_text: str
):
    """Adds a note to a ticket."""

    db_note = models.Note(
        ticket_id=ticket.id,
        note_text=note_text,
        created_at=datetime.utcnow()
    )

    db.add(db_note)
    db.commit()
    db.refresh(db_note)

    return db_note