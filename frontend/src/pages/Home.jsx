import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';

function Home() {
  const [featuredCourses, setFeaturedCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // This would be replaced with an actual API call
    // For now, we'll use mock data
    const mockCourses = [
      {
        id: 1,
        title: 'Introduction to Computer Science',
        code: 'CS101',
        description: 'Learn the fundamentals of computer science including algorithms, data structures, and programming concepts.',
        instructor: { first_name: 'John', last_name: 'Doe' },
        cover_image: '/course-cs101.jpg'
      },
      {
        id: 2,
        title: 'Advanced Mathematics',
        code: 'MATH301',
        description: 'Explore advanced mathematical concepts including calculus, linear algebra, and differential equations.',
        instructor: { first_name: 'Jane', last_name: 'Smith' },
        cover_image: '/course-math301.jpg'
      },
      {
        id: 3,
        title: 'Business Administration',
        code: 'BUS201',
        description: 'Study the principles of business management, marketing, finance, and organizational behavior.',
        instructor: { first_name: 'Robert', last_name: 'Johnson' },
        cover_image: '/course-bus201.jpg'
      }
    ];
    
    setFeaturedCourses(mockCourses);
    setIsLoading(false);
  }, []);
  
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Don Predrick College LMS</h1>
          <p>Your gateway to quality education and professional development</p>
          <div className="hero-buttons">
            <Link to="/courses" className="btn btn-primary">Browse Courses</Link>
            <Link to="/register" className="btn btn-secondary">Sign Up</Link>
          </div>
        </div>
      </section>
      
      <section className="featured-courses">
        <div className="section-header">
          <h2>Featured Courses</h2>
          <Link to="/courses" className="view-all-link">View All Courses</Link>
        </div>
        
        {isLoading ? (
          <div className="loading">Loading courses...</div>
        ) : (
          <div className="course-grid">
            {featuredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </section>
      
      <section className="about-section">
        <div className="about-content">
          <h2>About Don Predrick College</h2>
          <p>
            Don Predrick College is committed to providing high-quality education
            through our innovative Learning Management System. Our platform offers
            a wide range of courses designed to help students achieve their academic
            and professional goals.
          </p>
          <Link to="/about" className="btn btn-outline">Learn More</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
