import { useState } from 'react';
import { supabase } from '../services/supabase';

// Reusable component for displaying a course
function CourseCard({ course }) {
  const [added, setAdded] = useState(false);

  async function addToCart() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert('Please log in to add to cart.');
      return;
    }
    const { error } = await supabase.from('cart').insert({
      user_id: user.id,
      course_id: course.id,
    });
    if (error) console.error('Error adding to cart:', error);
    else {
      alert('Course added to cart!');
      setAdded(true);
    }
  }

  return (
    <div className="course-card">
      <h2>{course.title}</h2>
      <p><strong>Price:</strong> ${course.price}</p>
      <button onClick={addToCart} disabled={added}>
        {added ? 'Added' : 'Add to Cart'}
      </button>
    </div>
  );
}

export default CourseCard;