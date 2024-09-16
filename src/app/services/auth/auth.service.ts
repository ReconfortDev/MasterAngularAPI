import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models';
import usersData from '../../../assets/users.json'; 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private users:User[] = usersData

  constructor(private router : Router) {}

  login(username: string, password: string): boolean {
    const user = this.users.find(u => u.username === username && u.password === password);

    if (user) {
      const token = 'mock-token-12345';
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.replace('/posts');

      return true;
    } else {
      return false;
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
