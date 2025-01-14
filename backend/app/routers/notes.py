from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from ..core.database import get_db
from ..models.note import Note as NoteModel
from ..schemas.note import Note, NoteCreate

router = APIRouter()

@router.get("/notes/", response_model=List[Note])
def get_notes(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    notes = db.query(NoteModel).offset(skip).limit(limit).all()
    return notes

@router.post("/notes/", response_model=Note)
def create_note(note: NoteCreate, db: Session = Depends(get_db)):
    db_note = NoteModel(**note.dict())
    db.add(db_note)
    db.commit()
    db.refresh(db_note)
    return db_note

@router.get("/notes/{note_id}", response_model=Note)
def get_note(note_id: int, db: Session = Depends(get_db)):
    note = db.query(NoteModel).filter(NoteModel.id == note_id).first()
    if note is None:
        raise HTTPException(status_code=404, detail="Note not found")
    return note