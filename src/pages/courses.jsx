import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import CourseCard from '../components/courseCard.jsx';

// Displays all available courses
function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchCourses() {
      const { data, error } = await supabase.from('courses').select('*');
      if (error) console.error('Error fetching courses:', error);
      else setCourses(data);
    }
    fetchCourses();
  }, []);

  return (
    <div className="page">
      <h1>Courses</h1>
      <div className="course-list">
        {courses.length > 0 ? (
          courses.map(course => <CourseCard key={course.id} course={course} />)
        ) : (
          <p>No courses available yet.</p>
        )}
      </div>
    </div>
  );
}

export default Courses;