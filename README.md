# Don Predrick College Learning Management System (DPC LMS)

A comprehensive Learning Management System for educational institutions, developed by Dineth Nethsara and powered by DPC Media Unit.

![DPC LMS Logo](frontend/public/dpc-logo.png)

## Overview

DPC LMS is a full-featured learning management system that allows educational institutions to host their own courses, track student progress, and facilitate communication between students and instructors. The system is built with a modern tech stack featuring React for the frontend and Django for the backend.

## Features

### For Students
- Browse and enroll in courses
- Access course materials (text, videos, files)
- Take quizzes and submit assignments
- Participate in discussion forums
- Track learning progress
- Communicate with instructors and peers
- Receive notifications for important events

### For Instructors
- Create and manage courses
- Organize content into modules
- Create quizzes and assignments
- Grade student submissions
- Moderate discussion forums
- Track student progress
- Communicate with students

### For Administrators
- Manage users and permissions
- Monitor system activity
- Generate reports
- Configure system settings

## Tech Stack

### Frontend
- **React**: JavaScript library for building user interfaces
- **React Router**: For navigation and routing
- **CSS**: Custom styling with responsive design

### Backend
- **Django**: Python web framework
- **Django REST Framework**: For building RESTful APIs
- **PostgreSQL**: Relational database

## Project Structure

```
DPC LMS/
├── backend/                # Django backend
│   ├── backend/            # Main Django project
│   ├── users/              # User management app
│   ├── courses/            # Course management app
│   ├── assessments/        # Quizzes and assignments app
│   ├── discussions/        # Discussion forums app
│   ├── messaging/          # Messaging and notifications app
│   └── manage.py           # Django management script
│
├── frontend/               # React frontend
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── context/        # React context providers
│   │   ├── App.jsx         # Main application component
│   │   └── main.jsx        # Entry point
│   ├── package.json        # Node dependencies
│   └── vite.config.js      # Vite configuration
│
└── README.md               # Project documentation
```

## Getting Started

### Prerequisites
- Python 3.8+
- Node.js 14+
- PostgreSQL

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Set up the database:
   ```
   python manage.py migrate
   ```

6. Create a superuser:
   ```
   python manage.py createsuperuser
   ```

7. Run the development server:
   ```
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

## API Documentation

The API documentation is available at `/api/docs/` when the backend server is running.

## Database Schema

The system uses the following main models:

- **User**: Custom user model with different user types (student, instructor, admin)
- **Course**: Contains information about a course
- **Module**: Organizes course content into modules
- **Content**: Different types of learning materials (text, file, video, etc.)
- **Quiz/Question/Choice**: For assessments
- **Assignment/Submission**: For assignments and submissions
- **DiscussionForum/Topic/Reply**: For discussion boards
- **Conversation/Message**: For messaging between users
- **Notification**: For system notifications

## Deployment

### Backend Deployment
1. Set `DEBUG=False` in settings.py
2. Configure your production database
3. Set up static files serving
4. Deploy to your preferred hosting service (e.g., Heroku, AWS, DigitalOcean)

### Frontend Deployment
1. Build the production version:
   ```
   npm run build
   ```
2. Deploy the contents of the `dist` directory to your web server or static hosting service

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Don Predrick College for supporting this project
- Dineth Nethsara for development
- DPC Media Unit for resources and support

## Contact

For any inquiries, please contact:
- Email: info@dpcollege.edu
- Website: https://dpcollege.edu
