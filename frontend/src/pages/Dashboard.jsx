import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('courses');
  
  useEffect(() => {
    // This would be replaced with actual API calls
    // For now, we'll use mock data
    
    // Mock user data
    const mockUser = {
      id: 1,
      username: 'student1',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      user_type: 'student',
      profile_picture: '/profile-placeholder.jpg'
    };
    
    // Mock enrolled courses
    const mockCourses = [
      {
        id: 1,
        title: 'Introduction to Computer Science',
        code: 'CS101',
        description: 'Learn the fundamentals of computer science including algorithms, data structures, and programming concepts.',
        instructor: { first_name: 'Jane', last_name: 'Smith' },
        cover_image: '/course-cs101.jpg',
        progress: 65
      },
      {
        id: 3,
        title: 'Business Administration',
        code: 'BUS201',
        description: 'Study the principles of business management, marketing, finance, and organizational behavior.',
        instructor: { first_name: 'Robert', last_name: 'Johnson' },
        cover_image: '/course-bus201.jpg',
        progress: 30
      }
    ];
    
    // Mock notifications
    const mockNotifications = [
      {
        id: 1,
        title: 'New Assignment',
        message: 'A new assignment has been posted in CS101',
        date: '2023-05-10T14:30:00',
        is_read: false,
        link: '/courses/1/assignments/5'
      },
      {
        id: 2,
        title: 'Quiz Reminder',
        message: 'The CS101 midterm quiz is due tomorrow',
        date: '2023-05-09T10:15:00',
        is_read: true,
        link: '/courses/1/quizzes/3'
      },
      {
        id: 3,
        title: 'Discussion Reply',
        message: 'Jane Smith replied to your discussion post in BUS201',
        date: '2023-05-08T16:45:00',
        is_read: false,
        link: '/courses/3/discussions/7'
      }
    ];
    
    setUser(mockUser);
    setEnrolledCourses(mockCourses);
    setNotifications(mockNotifications);
    setIsLoading(false);
  }, []);
  
  // Format date for notifications
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  if (isLoading) {
    return <div className="loading">Loading dashboard...</div>;
  }
  
  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="user-welcome">
          <h1>Welcome, {user.first_name}!</h1>
          <p>Here's what's happening with your courses</p>
        </div>
        
        <div className="user-profile-preview">
          <img 
            src={user.profile_picture} 
            alt={`${user.first_name} ${user.last_name}`} 
            className="profile-picture"
          />
          <div className="profile-info">
            <p className="user-name">{user.first_name} {user.last_name}</p>
            <p className="user-type">{user.user_type}</p>
            <Link to="/profile" className="profile-link">View Profile</Link>
          </div>
        </div>
      </div>
      
      <div className="dashboard-tabs">
        <button 
          className={`tab-button ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          My Courses
        </button>
        <button 
          className={`tab-button ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          Notifications
          {notifications.filter(n => !n.is_read).length > 0 && (
            <span className="notification-badge">
              {notifications.filter(n => !n.is_read).length}
            </span>
          )}
        </button>
      </div>
      
      <div className="dashboard-content">
        {activeTab === 'courses' && (
          <div className="enrolled-courses">
            <div className="section-header">
              <h2>My Enrolled Courses</h2>
              <Link to="/courses" className="btn btn-outline">Browse More Courses</Link>
            </div>
            
            {enrolledCourses.length > 0 ? (
              <div className="course-list">
                {enrolledCourses.map(course => (
                  <div key={course.id} className="enrolled-course-card">
                    <CourseCard course={course} />
                    <div className="course-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{course.progress}% Complete</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-courses">
                <p>You are not enrolled in any courses yet.</p>
                <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'notifications' && (
          <div className="notifications-list">
            <div className="section-header">
              <h2>Notifications</h2>
              <button className="btn btn-text">Mark All as Read</button>
            </div>
            
            {notifications.length > 0 ? (
              <div className="notification-items">
                {notifications.map(notification => (
                  <Link 
                    to={notification.link} 
                    key={notification.id}
                    className={`notification-item ${!notification.is_read ? 'unread' : ''}`}
                  >
                    <div className="notification-content">
                      <h3 className="notification-title">{notification.title}</h3>
                      <p className="notification-message">{notification.message}</p>
                    </div>
                    <div className="notification-meta">
                      <span className="notification-date">{formatDate(notification.date)}</span>
                      {!notification.is_read && (
                        <span className="unread-indicator"></span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="no-notifications">
                <p>You have no notifications at this time.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
