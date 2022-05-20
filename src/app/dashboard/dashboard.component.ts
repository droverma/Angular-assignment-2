import { Component } from '@angular/core';
import { Note } from '../note';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  errMessage: string;
  note: Note = new Note();
  noteList: Array<Note>;

  constructor(private notesService: NotesService) { }

  ngOnInit() {
    this.noteList=[]
    this.notesList();
  }

  notesList() {
    this.notesService.getNotes().subscribe(response => {
      if (response) {
        this.noteList = response;
      } else {
        this.errMessage = "Didn't get notes list!";
      }
    }, (error) => {
      console.log(error);
      this.errMessage = error.message;
    });
  }

  addNote() {
    if (!this.note.text || !this.note.title) {
      this.errMessage = 'Title and Text both are required fields';
      return;
    }
    this.errMessage = '';
    this.notesService.addNote(this.note).subscribe(response => {
      if (response) {
        this.notesList()
        this.note = new Note();
      } else {
        this.errMessage = "Can't add the note.";
      }
    }, (error) => {
      console.log(error)
      this.errMessage = error.message;
    });
  }
}
