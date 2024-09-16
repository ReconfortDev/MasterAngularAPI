import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Post } from '../../models';
import { Comment } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ApiClientService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  private commentsUrl = 'https://jsonplaceholder.typicode.com/comments';

  constructor(private http: HttpClient) {}

  
  getPosts(page: number, limit: number): Observable<Post[]> {
    const params = new HttpParams().set('_page', page).set('_limit', limit);
    return this.http.get<Post[]>(this.apiUrl, { params }).pipe(catchError(this.handleError));
  }

  
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post).pipe(catchError(this.handleError));
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/${post.id}`, post).pipe(catchError(this.handleError));
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(catchError(this.handleError));
  }

  getCommentsForPost(postId: number): Observable<Comment[]> {
    const params = new HttpParams().set('postId', postId.toString());
    return this.http.get<Comment[]>(this.commentsUrl, { params }).pipe(catchError(this.handleError));
  }

  // Handle errors that can b reusable
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
