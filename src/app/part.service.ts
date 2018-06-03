import { Injectable } from '@angular/core';
import { Part } from './part';
import { PARTS } from './mock-parts';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PartService {

  constructor(private http: HttpClient,
    private messageService: MessageService) { }

  private partsUrl = environment.apiUrl;

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private log(message: string) {
    this.messageService.add('HeroService: ' + message);
  }

  getParts(): Observable<Part[]> {
    //return of(PARTS);
    return this.http.get<Part[]>(this.partsUrl).pipe(
      tap(heroes => this.log(`fetched parts`)),
      catchError(this.handleError('getHeroes', []))
    );
  }

  getPart(id: number): Observable<Part> {
    // TODO: send the message _after_ fetching the hero
    const url = `${this.partsUrl}/${id}`;
    return this.http.get<Part>(url).pipe(
      tap(_ => this.log(`fetched part id=${id}`)),
      catchError(this.handleError<Part>(`getHero id=${id}`))
    );
  }

  updatePart(part: Part): Observable<any> {
    return this.http.put(`${this.partsUrl}/${part.id}`, part, this.httpOptions).pipe(
      tap(_ => this.log(`updated part id=${part.id}`)),
      catchError(this.handleError<any>('updatePart'))
    );
  }

  addPart (part:Part): Observable<Part> {
    return this.http.post<Part>(this.partsUrl, part, this.httpOptions).pipe(
      tap((p: Part) => this.log(`added part w/ id=${p.id}`)),
      catchError(this.handleError<Part>('addPart'))
    );
  }

  deletePart (part: Part | number): Observable<Part> {
    const id = typeof part === 'number' ? part : part.id;
    const url = `${this.partsUrl}/${id}`;
  
    return this.http.delete<Part>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted part id=${id}`)),
      catchError(this.handleError<Part>('deletePart'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
   
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
   
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
   
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  searchParts(term: string): Observable<Part[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Part[]>(`${this.partsUrl}?q=${term}`).pipe(
      tap(_ => this.log(`found parts matching "${term}"`)),
      catchError(this.handleError<Part[]>('searchParts', []))
    );
  }

}
