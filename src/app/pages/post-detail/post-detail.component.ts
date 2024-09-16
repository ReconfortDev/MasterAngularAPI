import { Component, OnInit  } from '@angular/core';
import { Post } from '../../models';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiClientService } from '../../services/api-client/api-client.service';
import { CommonModule } from '@angular/common';
import { Comment } from '../../models';

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  comments: Comment[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiClientService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = Number(params.get('id'));
      this.fetchPost(postId);
      this.fetchComments(postId)
    });
  }

  fetchPost(postId: number): void {
    this.apiService.getPost(postId).subscribe(
      (data: Post) => {
        this.post = data;
        this.isLoading = false;
      },
      error => {
        this.error = 'Failed to load post details.';
        this.isLoading = false;
      }
    );
  }
  
  fetchComments(postId: number): void {
    this.apiService.getCommentsForPost(postId).subscribe(
      (data: Comment[]) => {
        this.comments = data;
      },
      (error: any) => {
        console.error('Error fetching comments:', error);
        this.error = 'Failed to load comments.';
      }
    );
  }

}
