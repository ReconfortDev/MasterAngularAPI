# My Angular Project

## Description

This Angular project includes a client service to interact with a JSONPlaceholder API. It fetches posts, comments, and user information, and demonstrates basic CRUD operations, sorting, and error handling.

## Features

- **Posts**: Fetch, create, update, and delete posts. Posts are sorted by ID in descending order.
- **Comments**: Retrieve comments associated with a specific post.
- **Users**: Fetch and display user information.
- **Error Handling**: Graceful handling of API errors.

## Installation

To get started with this project, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (>= 14.x)
- [Angular CLI](https://angular.io/cli) (>= 15.x)

### Clone the Repository

```bash
git clone https://github.com/ReconfortDev/MasterAngularAPI
cd MasterAngularAPI
```

### Install Dependencies

```bash
npm install
```

## Configuration

### API Endpoints

This project interacts with the [JSONPlaceholder API](https://jsonplaceholder.typicode.com/). The base URL for the API is set in the `ApiClientService`:

```typescript
private apiUrl = 'https://jsonplaceholder.typicode.com/posts';
private commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
private usersUrl = 
    [
    {
      "username": "user1",
      "password": "password1"
    },
    {
      "username": "user2",
      "password": "password2"
    },
    {
      "username": "user3",
      "password": "password3"
    }
  ]
  
```

## Usage

### Running the Application

To start the development server, use:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser to view the application.

### Fetching Posts

Posts are fetched from the JSONPlaceholder API and sorted by ID in descending order. To get posts, use the `getPosts` method in the `ApiClientService`.

### Fetching Comments

Comments for a specific post can be fetched using the `fetchComments` method. This method filters comments based on the `postId`.


## API Client Service

The `ApiClientService` provides methods for interacting with the API:

```typescript
getPosts(page: number, limit: number): Observable<Post[]>;
getPost(id: number): Observable<Post>;
createPost(post: Post): Observable<Post>;
updatePost(post: Post): Observable<Post>;
deletePost(id: number): Observable<void>;
getCommentsForPost(postId: number): Observable<Comment[]>;
getUser(id: number): Observable<User>;
```

## Error Handling

Errors are handled gracefully using the `handleError` method, which logs errors and provides user-friendly messages.