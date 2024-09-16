import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiClientService } from '../../services/api-client/api-client.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent {
  createPostForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiClient: ApiClientService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createPostForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      body: ['', [Validators.required, Validators.minLength(10)]],
      userId: [1]
    });
  }

  onSubmit() {
    if (this.createPostForm && this.createPostForm.valid) {
      this.apiClient.createPost(this.createPostForm.value).subscribe(
        (response) => {
          console.log('Post created successfully', response);
          this.router.navigate(['/posts']);
        },
        (error) => {
          console.error('Error creating post', error);
        }
      );
    }
  }

}
