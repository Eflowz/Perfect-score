# Perfect Score Backend Endpoints Reference

All API routes are prefixed with `/api/v1` and are hosted on the live server.

* **Production URL:** `https://perfectb.onrender.com`
* **Local Development URL:** `http://localhost:4000`

---

## 🔐 Authentication (`/api/v1/auth`)

### 1. Register a New User
* **Method:** `POST`
* **Endpoint:** `/api/v1/auth/register`
* **Headers:** `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "Password123!"
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "user": {
      "id": "cuid-example-user-id",
      "email": "johndoe@example.com",
      "name": "John Doe",
      "role": "USER",
      "xp": 0,
      "level": 1,
      "streakDays": 0
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "4892c90c-79ca-48fa-b34d-26009e0a118a"
  }
  ```

### 2. Login
* **Method:** `POST`
* **Endpoint:** `/api/v1/auth/login`
* **Headers:** `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "email": "johndoe@example.com",
    "password": "Password123!"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "user": {
      "id": "cuid-example-user-id",
      "email": "johndoe@example.com",
      "name": "John Doe",
      "role": "USER",
      "xp": 0,
      "level": 1,
      "streakDays": 0
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "4892c90c-79ca-48fa-b34d-26009e0a118a"
  }
  ```

### 3. Refresh Token
* **Method:** `POST`
* **Endpoint:** `/api/v1/auth/refresh`
* **Headers:** `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "refreshToken": "4892c90c-79ca-48fa-b34d-26009e0a118a"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "new-4892c90c-79ca-48fa-b34d-26009e0a118a"
  }
  ```

### 4. Logout
* **Method:** `POST`
* **Endpoint:** `/api/v1/auth/logout`
* **Headers:** 
  * `Authorization: Bearer <accessToken>`
  * `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "refreshToken": "4892c90c-79ca-48fa-b34d-26009e0a118a"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Logged out successfully"
  }
  ```

---

## 📚 Courses (`/api/v1/courses`)

### 1. List All Courses
* **Method:** `GET`
* **Endpoint:** `/api/v1/courses`
* **Headers:** `Authorization: Bearer <accessToken>`
* **Success Response (200 OK):**
  ```json
  [
    {
      "id": "cuid-course-1",
      "title": "Introduction to Python",
      "description": "Learn the basics of Python programming language.",
      "level": "BEGINNER",
      "order": 1,
      "createdAt": "2026-06-13T12:00:00.000Z",
      "updatedAt": "2026-06-13T12:00:00.000Z"
    }
  ]
  ```

### 2. Create a Course (Admin Only)
* **Method:** `POST`
* **Endpoint:** `/api/v1/courses`
* **Headers:** 
  * `Authorization: Bearer <adminAccessToken>`
  * `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "title": "Advanced Python",
    "description": "Master advanced python concepts.",
    "level": "ADVANCED",
    "order": 2
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "id": "cuid-course-2",
    "title": "Advanced Python",
    "description": "Master advanced python concepts.",
    "level": "ADVANCED",
    "order": 2,
    "createdAt": "2026-06-13T14:00:00.000Z",
    "updatedAt": "2026-06-13T14:00:00.000Z"
  }
  ```

### 3. Get Course Details by ID
* **Method:** `GET`
* **Endpoint:** `/api/v1/courses/:id`
* **Headers:** `Authorization: Bearer <accessToken>`
* **Success Response (200 OK):**
  ```json
  {
    "id": "cuid-course-1",
    "title": "Introduction to Python",
    "description": "Learn the basics of Python programming.",
    "level": "BEGINNER",
    "order": 1,
    "modules": [
      {
        "id": "cuid-module-1",
        "courseId": "cuid-course-1",
        "title": "Variables and Types",
        "content": "# Markdown content for module...",
        "order": 1,
        "createdAt": "2026-06-13T12:00:00.000Z"
      }
    ]
  }
  ```

### 4. Update a Course (Admin Only)
* **Method:** `PUT`
* **Endpoint:** `/api/v1/courses/:id`
* **Headers:** 
  * `Authorization: Bearer <adminAccessToken>`
  * `Content-Type: application/json`
* **Request Body (Partial update supported):**
  ```json
  {
    "title": "Intro to Python Programming"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "id": "cuid-course-1",
    "title": "Intro to Python Programming",
    "description": "Learn the basics of Python programming.",
    "level": "BEGINNER",
    "order": 1
  }
  ```

### 5. Delete a Course (Admin Only)
* **Method:** `DELETE`
* **Endpoint:** `/api/v1/courses/:id`
* **Headers:** `Authorization: Bearer <adminAccessToken>`
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Course deleted successfully"
  }
  ```

### 6. Add a Module to a Course (Admin Only)
* **Method:** `POST`
* **Endpoint:** `/api/v1/courses/:courseId/modules`
* **Headers:** 
  * `Authorization: Bearer <adminAccessToken>`
  * `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "title": "Control Flow and Loops",
    "content": "Learn about if statements and loops in Python.",
    "order": 2
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "id": "cuid-module-2",
    "courseId": "cuid-course-1",
    "title": "Control Flow and Loops",
    "content": "Learn about if statements and loops in Python.",
    "order": 2,
    "createdAt": "2026-06-13T14:35:00.000Z"
  }
  ```

---

## 💻 IDE (`/api/v1/ide`)

### 1. Execute Code Payload
* **Method:** `POST`
* **Endpoint:** `/api/v1/ide/execute`
* **Headers:** `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "code": "print('Hello, World!')",
    "language": "python"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "stdout": "Hello, World!\n",
    "stderr": "",
    "exitCode": 0
  }
  ```

### 2. Join IDE Collaboration Session (WebSocket)
* **Protocol:** `WS` (WebSocket)
* **Endpoint:** `wss://perfectb.onrender.com/api/v1/ide/session/:sessionId?token=<token>`

---

## 🗺️ Roadmap (`/api/v1/roadmap`)

### 1. Get Current User's Roadmap
* **Method:** `GET`
* **Endpoint:** `/api/v1/roadmap`
* **Headers:** `Authorization: Bearer <accessToken>`
* **Success Response (200 OK):**
  ```json
  {
    "id": "cuid-roadmap-1",
    "userId": "cuid-user-1",
    "generatedAt": "2026-06-13T12:00:00.000Z",
    "courses": [
      {
        "id": "cuid-roadmap-course-1",
        "courseId": "cuid-course-1",
        "order": 1,
        "status": "PENDING"
      }
    ]
  }
  ```

### 2. Generate a New AI Roadmap
* **Method:** `POST`
* **Endpoint:** `/api/v1/roadmap/generate`
* **Headers:** `Authorization: Bearer <accessToken>`
* **Success Response (201 Created):**
  ```json
  {
    "id": "cuid-roadmap-2",
    "userId": "cuid-user-1",
    "generatedAt": "2026-06-13T14:35:00.000Z",
    "courses": [...]
  }
  ```

---

## 📝 Submissions (`/api/v1/submissions`)

### 1. Submit Code Solution for a Module
* **Method:** `POST`
* **Endpoint:** `/api/v1/submissions`
* **Headers:** 
  * `Authorization: Bearer <accessToken>`
  * `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "courseId": "cuid-course-1",
    "code": "def solve(): return True",
    "language": "python"
  }
  ```
* **Success Response (201 Created):**
  ```json
  {
    "id": "cuid-submission-1",
    "userId": "cuid-user-1",
    "courseId": "cuid-course-1",
    "code": "def solve(): return True",
    "language": "python",
    "status": "SUBMITTED",
    "submittedAt": "2026-06-13T14:35:00.000Z"
  }
  ```

### 2. Get AI Review for a Submission
* **Method:** `GET`
* **Endpoint:** `/api/v1/submissions/:id/review`
* **Headers:** `Authorization: Bearer <accessToken>`
* **Success Response (200 OK):**
  ```json
  {
    "id": "cuid-submission-1",
    "status": "COMPLETED",
    "score": 95,
    "aiReview": {
      "feedback": "Excellent structure and code hygiene. Consider adding docstrings.",
      "suggestions": ["Add type hints", "Include docstrings"]
    },
    "reviewedAt": "2026-06-13T14:36:00.000Z"
  }
  ```

---

## 🎓 Certifications (`/api/v1/certifications`)

### 1. Get My Certificates
* **Method:** `GET`
* **Endpoint:** `/api/v1/certifications/my`
* **Headers:** `Authorization: Bearer <accessToken>`
* **Success Response (200 OK):**
  ```json
  [
    {
      "id": "cuid-cert-1",
      "userId": "cuid-user-1",
      "courseId": "cuid-course-1",
      "title": "Python Programming Certification",
      "issuedAt": "2026-06-13T14:00:00.000Z",
      "credentialId": "CERT-123456789-XYZ",
      "pdfUrl": "https://perfectb.onrender.com/certs/cuid-cert-1.pdf"
    }
  ]
  ```

### 2. Verify a Certificate
* **Method:** `POST`
* **Endpoint:** `/api/v1/certifications/verify`
* **Headers:** `Content-Type: application/json`
* **Request Body:**
  ```json
  {
    "credentialId": "CERT-123456789-XYZ"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "valid": true,
    "certificate": {
      "title": "Python Programming Certification",
      "userName": "John Doe",
      "issuedAt": "2026-06-13T14:00:00.000Z",
      "credentialId": "CERT-123456789-XYZ"
    }
  }
  ```

---

## 👤 Users (`/api/v1/users`)

### 1. Get Current User Profile
* **Method:** `GET`
* **Endpoint:** `/api/v1/users/me`
* **Headers:** `Authorization: Bearer <accessToken>`
* **Success Response (200 OK):**
  ```json
  {
    "id": "cuid-user-1",
    "email": "johndoe@example.com",
    "name": "John Doe",
    "role": "USER",
    "xp": 120,
    "level": 2,
    "streakDays": 3,
    "lastActiveAt": "2026-06-13T14:35:00.000Z",
    "createdAt": "2026-06-13T12:00:00.000Z"
  }
  ```

### 2. Update Current User Profile
* **Method:** `PUT`
* **Endpoint:** `/api/v1/users/me`
* **Headers:** 
  * `Authorization: Bearer <accessToken>`
  * `Content-Type: application/json`
* **Request Body (Partial update supported):**
  ```json
  {
    "name": "Johnathan Doe"
  }
  ```
* **Success Response (200 OK):**
  ```json
  {
    "id": "cuid-user-1",
    "email": "johndoe@example.com",
    "name": "Johnathan Doe",
    "role": "USER",
    "xp": 120,
    "level": 2,
    "streakDays": 3
  }
  ```
