import { useState, useEffect } from 'react';
import CourseCard from '../components/CourseCard';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
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
        cover_image: '/course-cs101.jpg',
        category: 'technology'
      },
      {
        id: 2,
        title: 'Advanced Mathematics',
        code: 'MATH301',
        description: 'Explore advanced mathematical concepts including calculus, linear algebra, and differential equations.',
        instructor: { first_name: 'Jane', last_name: 'Smith' },
        cover_image: '/course-math301.jpg',
        category: 'mathematics'
      },
      {
        id: 3,
        title: 'Business Administration',
        code: 'BUS201',
        description: 'Study the principles of business management, marketing, finance, and organizational behavior.',
        instructor: { first_name: 'Robert', last_name: 'Johnson' },
        cover_image: '/course-bus201.jpg',
        category: 'business'
      },
      {
        id: 4,
        title: 'Introduction to Psychology',
        code: 'PSY101',
        description: 'Explore the human mind and behavior through the study of psychological theories and research methods.',
        instructor: { first_name: 'Sarah', last_name: 'Williams' },
        cover_image: '/course-psy101.jpg',
        category: 'humanities'
      },
      {
        id: 5,
        title: 'Web Development Fundamentals',
        code: 'WEB101',
        description: 'Learn HTML, CSS, and JavaScript to build responsive and interactive websites from scratch.',
        instructor: { first_name: 'Michael', last_name: 'Brown' },
        cover_image: '/course-web101.jpg',
        category: 'technology'
      },
      {
        id: 6,
        title: 'Data Science Essentials',
        code: 'DATA201',
        description: 'Master the fundamentals of data analysis, visualization, and machine learning algorithms.',
        instructor: { first_name: 'Emily', last_name: 'Davis' },
        cover_image: '/course-data201.jpg',
        category: 'technology'
      }
    ];
    
    setCourses(mockCourses);
    setIsLoading(false);
  }, []);
  
  // Filter and search courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || course.category === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="courses-page">
      <div className="courses-header">
        <h1>All Courses</h1>
        <p>Browse our wide selection of courses designed to help you achieve your goals</p>
      </div>
      
      <div className="courses-filters">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-filter">
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Categories</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
            <option value="mathematics">Mathematics</option>
            <option value="humanities">Humanities</option>
          </select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="loading">Loading courses...</div>
      ) : (
        <div className="course-grid">
          {filteredCourses.length > 0 ? (
            filteredCourses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="no-courses">
              No courses found matching your criteria. Try adjusting your search or filters.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Courses;
