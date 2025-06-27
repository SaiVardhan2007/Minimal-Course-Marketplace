import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../services/supabase';

// Navigation bar with login/logout
function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    return () => authListener.subscription?.unsubscribe();
  }, []);

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/cart">Cart</Link>
        <Link to="/coupons">Coupons</Link>
        {user ? (
          <button onClick={() => supabase.auth.signOut()}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;