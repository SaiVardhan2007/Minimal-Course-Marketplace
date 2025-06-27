// Reusable component for displaying a coupon
function CouponCard({ coupon }) {
  return (
    <div className="coupon-card">
      <h2>{coupon.code}</h2>
      <p><strong>Discount:</strong> {coupon.discount}%</p>
      <p><strong>Expires:</strong> {coupon.expiry_date}</p>
    </div>
  );
}

export default CouponCard;