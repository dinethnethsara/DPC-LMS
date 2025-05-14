import { Link } from 'react-router-dom';

function CourseCard({ course }) {
  // Default image if none provided
  const defaultImage = '/course-placeholder.jpg';
  
  return (
    <div className="course-card">
      <div className="course-card-image">
        <img 
          src={course.cover_image || defaultImage} 
          alt={course.title} 
        />
      </div>
      <div className="course-card-content">
        <div className="course-card-code">{course.code}</div>
        <h3 className="course-card-title">{course.title}</h3>
        <p className="course-card-instructor">
          Instructor: {course.instructor.first_name} {course.instructor.last_name}
        </p>
        <p className="course-card-description">
          {course.description.length > 100 
            ? `${course.description.substring(0, 100)}...` 
            : course.description}
        </p>
      </div>
      <div className="course-card-footer">
        <Link to={`/courses/${course.id}`} className="course-card-button">
          View Course
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;
