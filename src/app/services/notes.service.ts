import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from '../note';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class NotesService {
  baseURL: string = 'http://localhost:3000/api/v1';

  constructor(private httpClient : HttpClient,private aauthService: AuthenticationService) {

  }

  getNotes(): Observable<Array<Note>> {
    return this.httpClient.get<Array<Note>>(`${this.baseURL}/notes`,{
        headers : new HttpHeaders().set('Authorization', `Bearer ${this.aauthService.getBearerToken()}`)
  });
}

  addNote(note: Note): Observable<Note> {
   return  this.httpClient.post<Note>(`${this.baseURL}/notes`,note,{
        headers : new HttpHeaders().set('Authorization', `Bearer ${this.aauthService.getBearerToken()}`)
    });
  }

}
