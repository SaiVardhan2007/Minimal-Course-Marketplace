import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import CouponCard from './components/CouponCard.jsx';

// Displays active coupons for discounts
function Coupons() {
  const [coupons, setCoupons] = useState([]);

  useEffect(() => {
    async function fetchCoupons() {
      const { data, error } = await supabase
        .from('coupons')
        .select('*')
        .gt('expiry_date', new Date().toISOString().split('T')[0]);
      if (error) console.error('Error fetching coupons:', error);
      else setCoupons(data);
    }
    fetchCoupons();
  }, []);

  return (
    <div className="page">
      <h1>Available Coupons</h1>
      <div className="coupon-list">
        {coupons.length > 0 ? (
          coupons.map(coupon => <CouponCard key={coupon.id} coupon={coupon} />)
        ) : (
          <p>No active coupons available.</p>
        )}
      </div>
    </div>
  );
}

export default Coupons;