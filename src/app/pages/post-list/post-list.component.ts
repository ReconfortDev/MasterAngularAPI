import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../../services/api-client/api-client.service';
import { CommonModule } from '@angular/common';
import { Post } from '../../models';
import { NavigationComponent } from "../../components/navigation/navigation.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, NavigationComponent, RouterLink],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent {
  posts: Post[] = [];
  currentPage = 1;
  totalPages = 0;
  totalPosts = 0;
  pageSize = 12;
  isLoggedIn = false;

  constructor(private apiClient: ApiClientService) {}

  ngOnInit(): void {
    this.fetchPosts(this.currentPage);
    this.checkLoginStatus();
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
    if (this.isLoggedIn) {
      const user = localStorage.getItem('user');
    }
  }

  fetchPosts(page: number) {
    this.apiClient.getPosts(page, this.pageSize).subscribe(
      (data) => {
        this.posts = data;
        this.totalPosts = this.posts.length;
        console.log("this.total", this.totalPosts)
        this.totalPages = Math.ceil(100 / this.pageSize);
      },
      (error) => console.error('Error fetching posts:', error)
    );
  }

  deletePost(postId: number) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.apiClient.deletePost(postId).subscribe(
        () => {
          this.fetchPosts(this.currentPage);
          this.posts 
        },
        (error) => console.error('Error deleting post:', error)
      );
    }
  }

  onPageChanged(newPage: number) {
    this.currentPage = newPage;
    this.fetchPosts(newPage);
  }



}
