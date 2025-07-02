import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartCount,
  selectCartTotal,
  removeFromCart,
  updateQuantity,
  clearCart
} from '../../redux/reducers/cart/cartSlice';
import { FaTrash, FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import type { RootState } from '../../redux/reducers/store';

const Cart = () => {
  const dispatch = useDispatch();
  const { totalQuantity, items, totalPrice } = useSelector((state: RootState) => state.carts);


  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    } else {
      handleRemove(id);
    }
  };

  return (
    <div className="">
      <div className="">
        <button
          className="bg-black text-white p-3 rounded-full hover:bg-gray-800 transition-colors"
          aria-label="Cart"
        >
          <FaShoppingCart />

        </button>

        {items.length > 0 && (
          <div className=" mt-2 w-80 bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Your Cart ({totalQuantity})</h3>
              <button
                onClick={() => dispatch(clearCart())}
                className="text-xs text-red-500 hover:text-red-700"
              >
                Clear All
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-3">
              {items.map(item => (
                <div key={item._id} className="flex items-center justify-between border-b pb-3">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">৳{item.price.toFixed(2)}</p>
                  </div>

                  <div className="flex items-center space-x-2 mx-2">
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                      className="p-1 text-gray-500 hover:text-black"
                      aria-label="Decrease quantity"
                    >
                      <FaMinus size={12} />
                    </button>
                    <span className="text-sm w-6 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                      className="p-1 text-gray-500 hover:text-black"
                      aria-label="Increase quantity"
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>

                  <div className="w-20 text-right">
                    <p className="text-sm font-medium">৳{(item.price * item.quantity).toFixed(2)}</p>
                  </div>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="ml-2 text-red-500 hover:text-red-700"
                    aria-label="Remove item"
                  >
                    <FaTrash size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between font-medium mb-4">
                <span>Total:</span>
                <span>৳{totalPrice.toFixed(2)}</span>
              </div>
              <button
                className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors"
                onClick={() => alert('Proceeding to checkout')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
