from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(String, unique=True, index=True)

    customer_name = Column(String, index=True)
    customer_email = Column(String, index=True)

    subject = Column(String, index=True)
    description = Column(Text)

    status = Column(String, default="open")

    created_at = Column(DateTime(timezone=True), server_default=func.now()) 
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    notes = relationship("Note", back_populates="ticket")

class Note(Base):
    __tablename__ = "notes"

    id = Column(Integer, primary_key=True, index=True)
    ticket_id = Column(Integer, ForeignKey("tickets.id"))

    note_text = Column(Text)

    created_at = Column(DateTime(timezone=True), server_default=func.now()) 

    ticket = relationship("Ticket", back_populates="notes")