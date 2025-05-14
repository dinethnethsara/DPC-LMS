import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function CourseDetail() {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [modules, setModules] = useState([]);
  const [activeModule, setActiveModule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState(false);
  
  useEffect(() => {
    // This would be replaced with actual API calls
    // For now, we'll use mock data
    
    // Simulate API call delay
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock course data
      const mockCourse = {
        id: parseInt(courseId),
        title: 'Introduction to Computer Science',
        code: 'CS101',
        description: 'Learn the fundamentals of computer science including algorithms, data structures, and programming concepts. This course is designed for beginners with no prior programming experience and provides a solid foundation for further studies in computer science and software development.',
        instructor: { 
          id: 5,
          first_name: 'Jane', 
          last_name: 'Smith',
          bio: 'Dr. Jane Smith has over 15 years of experience teaching computer science at the university level. She specializes in algorithms and data structures.'
        },
        cover_image: '/course-cs101.jpg',
        created_at: '2023-01-15T10:00:00',
        updated_at: '2023-04-20T14:30:00',
        is_published: true
      };
      
      // Mock modules data
      const mockModules = [
        {
          id: 1,
          title: 'Introduction to Programming Concepts',
          description: 'Learn the basic concepts of programming including variables, data types, and control structures.',
          order: 1,
          contents: [
            {
              id: 1,
              title: 'What is Programming?',
              content_type: 'text',
              text_content: 'Programming is the process of creating a set of instructions that tell a computer how to perform a task...',
              order: 1
            },
            {
              id: 2,
              title: 'Variables and Data Types',
              content_type: 'text',
              text_content: 'Variables are used to store information that can be referenced and manipulated in a program...',
              order: 2
            },
            {
              id: 3,
              title: 'Introduction to Algorithms',
              content_type: 'video',
              url: 'https://example.com/videos/intro-algorithms',
              order: 3
            }
          ]
        },
        {
          id: 2,
          title: 'Control Structures',
          description: 'Explore conditional statements and loops to control the flow of your programs.',
          order: 2,
          contents: [
            {
              id: 4,
              title: 'If-Else Statements',
              content_type: 'text',
              text_content: 'Conditional statements are used to perform different actions based on different conditions...',
              order: 1
            },
            {
              id: 5,
              title: 'Loops in Programming',
              content_type: 'text',
              text_content: 'Loops are used to execute a block of code multiple times...',
              order: 2
            }
          ]
        },
        {
          id: 3,
          title: 'Data Structures',
          description: 'Learn about arrays, lists, stacks, and queues to organize and store data efficiently.',
          order: 3,
          contents: [
            {
              id: 6,
              title: 'Introduction to Arrays',
              content_type: 'text',
              text_content: 'An array is a collection of items stored at contiguous memory locations...',
              order: 1
            },
            {
              id: 7,
              title: 'Working with Lists',
              content_type: 'file',
              file: '/files/working-with-lists.pdf',
              order: 2
            }
          ]
        }
      ];
      
      setCourse(mockCourse);
      setModules(mockModules);
      setActiveModule(mockModules[0]);
      setIsEnrolled(false); // This would be determined by checking user enrollment status
      setIsLoading(false);
    };
    
    fetchData();
  }, [courseId]);
  
  const handleEnroll = async () => {
    // This would be replaced with an actual API call to enroll the user
    // For now, we'll simulate enrollment
    
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsEnrolled(true);
    setIsLoading(false);
  };
  
  const renderContent = (content) => {
    switch (content.content_type) {
      case 'text':
        return (
          <div className="content-text">
            <p>{content.text_content}</p>
          </div>
        );
      case 'video':
        return (
          <div className="content-video">
            <div className="video-placeholder">
              <p>Video: {content.title}</p>
              <a href={content.url} target="_blank" rel="noopener noreferrer">
                Watch Video
              </a>
            </div>
          </div>
        );
      case 'file':
        return (
          <div className="content-file">
            <p>File: {content.title}</p>
            <a href={content.file} download>
              Download File
            </a>
          </div>
        );
      case 'link':
        return (
          <div className="content-link">
            <p>External Resource: {content.title}</p>
            <a href={content.url} target="_blank" rel="noopener noreferrer">
              Visit Link
            </a>
          </div>
        );
      default:
        return <p>Unknown content type</p>;
    }
  };
  
  if (isLoading) {
    return <div className="loading">Loading course...</div>;
  }
  
  return (
    <div className="course-detail-page">
      <div className="course-header" style={{ backgroundImage: `url(${course.cover_image})` }}>
        <div className="course-header-content">
          <div className="course-code">{course.code}</div>
          <h1 className="course-title">{course.title}</h1>
          <div className="course-instructor">
            Instructor: {course.instructor.first_name} {course.instructor.last_name}
          </div>
          
          {!isEnrolled ? (
            <button 
              className="btn btn-primary enroll-button"
              onClick={handleEnroll}
            >
              Enroll in Course
            </button>
          ) : (
            <div className="enrolled-badge">
              You are enrolled in this course
            </div>
          )}
        </div>
      </div>
      
      <div className="course-content">
        <div className="course-sidebar">
          <div className="course-info">
            <h3>About This Course</h3>
            <p>{course.description}</p>
            
            <div className="instructor-info">
              <h3>About the Instructor</h3>
              <div className="instructor-profile">
                <div className="instructor-name">
                  {course.instructor.first_name} {course.instructor.last_name}
                </div>
                <p>{course.instructor.bio}</p>
              </div>
            </div>
          </div>
          
          <div className="course-modules">
            <h3>Course Modules</h3>
            <div className="module-list">
              {modules.map(module => (
                <div 
                  key={module.id}
                  className={`module-item ${activeModule && activeModule.id === module.id ? 'active' : ''}`}
                  onClick={() => setActiveModule(module)}
                >
                  <div className="module-title">{module.title}</div>
                  <div className="module-content-count">
                    {module.contents.length} {module.contents.length === 1 ? 'item' : 'items'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="course-main-content">
          {activeModule ? (
            <div className="module-content">
              <div className="module-header">
                <h2>{activeModule.title}</h2>
                <p>{activeModule.description}</p>
              </div>
              
              <div className="content-list">
                {activeModule.contents.map(content => (
                  <div key={content.id} className="content-item">
                    <h3 className="content-title">{content.title}</h3>
                    {renderContent(content)}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="no-module-selected">
              <p>Select a module from the sidebar to view its content.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
