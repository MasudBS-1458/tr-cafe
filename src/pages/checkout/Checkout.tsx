import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/reducers/store';
import { FaShoppingCart, FaMoneyBillWave, FaWallet } from 'react-icons/fa';
import { useState } from 'react';

const Checkout = () => {
  const { items, totalQuantity, totalPrice } = useSelector((state: RootState) => state.carts);
  const [paymentMethod, setPaymentMethod] = useState<string>('cash');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    phone: '',
    email: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission and payment processing
    console.log({ formData, paymentMethod, order: items });
  };

  return (
    <div className="max-w-5xl mx-auto p-4 md:mt-24">
      <h1 className="text-2xl font-bold mb-8 ml-4">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Shipping Address Form */}
        <div className="bg-white rounded-md p-6">
          <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name*
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name*
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Street Address*
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="apartment" className="block text-sm font-medium text-gray-700 mb-1">
                Apartment, suite, etc. (optional)
              </label>
              <input
                type="text"
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

          </form>
        </div>

        {/* Order Summary and Payment */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white rounded-md p-6">
            <h2 className="text-xl font-semibold mb-4">Your Order ({totalQuantity})</h2>

            {items.length === 0 ? (
              <div className="text-center py-8">
                <FaShoppingCart className="mx-auto text-gray-400 text-4xl mb-2" />
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {items.map(item => (
                  <div key={item._id} className="flex justify-between py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden">
                        {item.image ? (
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <FaShoppingCart className="text-gray-400 w-full h-full p-3" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">৳{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>৳{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Tax</span>
                <span>৳0.00</span>
              </div>
              <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>৳{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>


        </div>
      </div >
    </div >
  );
};

export default Checkout;