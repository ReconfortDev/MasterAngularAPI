import { Routes } from '@angular/router';
import { AuthComponent } from './pages/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthComponent
    },
    {
        path: 'posts',
        loadComponent: () => import('./pages/post-list/post-list.component').then(m => m.PostListComponent),
      },
      {
        path: 'create-post',
        loadComponent: () => import('./pages/create-post/create-post.component').then(m => m.CreatePostComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'edit-post/:id',
        loadComponent: () => import('./pages/edit-post/edit-post.component').then(m => m.EditPostComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'post/:id',
        loadComponent: () => import('./pages/post-detail/post-detail.component').then(m => m.PostDetailComponent),
      },
      {
        path: '',
        redirectTo: '/posts',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: '/posts',
      }
];
