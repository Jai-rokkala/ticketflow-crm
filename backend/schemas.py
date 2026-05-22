from pydantic import BaseModel, EmailStr
from typing import Optional, List


class NoteResponse(BaseModel):
    note_text: str

    class Config:
        from_attributes = True


class TicketCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    subject: str
    description: str


class TicketResponse(BaseModel):
    id: int
    ticket_id: str
    customer_name: str
    customer_email: EmailStr
    subject: str
    description: str
    status: str
    notes: List[NoteResponse] = []

    class Config:
        from_attributes = True


class TicketUpdate(BaseModel):
    subject: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None