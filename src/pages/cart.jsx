import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';
import CartItem from '../components/cartItem.jsx';

// Displays cart with coupon application
function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    async function fetchCart() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('cart')
          .select('*, courses(title, price)')
          .eq('user_id', user.id);
        if (error) console.error('Error fetching cart:', error);
        else setCartItems(data);
      }
    }
    fetchCart();
  }, []);

  async function applyCoupon() {
    const { data, error } = await supabase
      .from('coupons')
      .select('discount')
      .eq('code', couponCode)
      .gt('expiry_date', new Date().toISOString().split('T')[0])
      .single();
    if (error || !data) {
      alert('Invalid or expired coupon.');
    } else {
      setDiscount(data.discount);
      alert(`Coupon applied! ${data.discount}% off.`);
    }
  }

  const total = cartItems.reduce((sum, item) => sum + item.courses.price, 0);
  const discountedTotal = total * (1 - discount / 100);

  return (
    <div className="page">
      <h1>My Cart</h1>
      <div className="cart-list">
        {cartItems.length > 0 ? (
          cartItems.map(item => <CartItem key={item.id} item={item} />)
        ) : (
          <p>Cart is empty.</p>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className="coupon-section">
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={couponCode}
            onChange={e => setCouponCode(e.target.value)}
          />
          <button onClick={applyCoupon}>Apply Coupon</button>
          <p><strong>Total:</strong> ${total.toFixed(2)}</p>
          {discount > 0 && <p><strong>Discounted Total:</strong> ${discountedTotal.toFixed(2)}</p>}
        </div>
      )}
    </div>
  );
}

export default Cart;