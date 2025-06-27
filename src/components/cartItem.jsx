// Reusable component for displaying a cart item
function CartItem({ item }) {
  return (
    <div className="cart-item">
      <h2>{item.courses.title}</h2>
      <p><strong>Price:</strong> ${item.courses.price}</p>
    </div>
  );
}

export default CartItem;