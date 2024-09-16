import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiClientService } from '../../services/api-client/api-client.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Post } from '../../models';

@Component({
  selector: 'app-edit-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-post.component.html',
  styleUrl: './edit-post.component.css'
})
export class EditPostComponent implements OnInit {
  post: Post | null = null;
  isLoading = true;
  error: string | null = null;
  editPostForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiClientService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const postId = Number(params.get('id'));
      this.fetchPost(postId);
    });

    this.editPostForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
      userId: [1]
    });
  }

  fetchPost(postId: number): void {
    this.apiService.getPost(postId).subscribe(
      (data: Post) => {
        this.post = data;
        this.isLoading = false;
        this.editPostForm.patchValue(data);  
      },
      error => {
        this.error = 'Failed to load post details.';
        this.isLoading = false;
      }
    );
  }

  onSubmit(): void {
    if (this.editPostForm.valid) {
      if (this.post) {
        this.apiService.updatePost({ ...this.post, ...this.editPostForm.value }).subscribe(
          (response) => {
            console.log('Post updated successfully', response);
            this.router.navigate(['/posts']);
          },
          (error) => {
            console.error('Error updating post', error);
          }
        );
      }
    }
  }
}
