
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, Bell, ShoppingCart, LogIn, User, Menu, X } from 'lucide-react';
import './common.css';
import type { RootState } from '../../redux/reducers/store';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/reducers/auth/authSlice';

const Navbar: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user);
  const { totalQuantity } = useSelector((state: RootState) => state.carts);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [locationDetails, setLocationDetails] = useState<{
    houseNumber?: string;
    road?: string;
    city?: string;
  } | null>(null);

  const dispatch = useDispatch();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserDropdown = () => setIsUserDropdownOpen(!isUserDropdownOpen);

  const handleLogout = () => {
    dispatch(logout());
    setIsUserDropdownOpen(false);
  };

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();

            const houseNumber = data.address.house_number || '';
            const road = data.address.road || '';
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state ||
              '';

            setLocationDetails({ houseNumber, road, city });
          } catch (error) {
            console.error('Error fetching address:', error);
          }
        },
        (error) => {
          console.error('Location access denied:', error.message);
        }
      );
    }
  }, []);

  const renderLocation = () => {
    if (!locationDetails) return null;

    const { houseNumber, road, city } = locationDetails;
    let locationString = '';

    if (houseNumber) locationString += `House ${houseNumber}`;
    if (road) locationString += `${houseNumber ? ', ' : ''}${road}`;
    if (city) locationString += `${houseNumber || road ? ', ' : ''}${city}`;

    return locationString ? (
      <span className="text-sm text-gray-500 hidden md:block">📍 {locationString}</span>
    ) : null;
  };

  return (
    <nav className="w-full relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 hover:text-orange-600 rounded-full focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex-shrink-0 ml-2 md:ml-0">
              <h1 className="text-2xl font-bold text-orange-600 cursor-pointer hover:text-orange-700 transition-colors">
                TR-Cafe
              </h1>
            </div>
          </div>

          <div className="hidden md:flex md:flex-col md:flex-row md:mx-6">
            <Link to="/" className="my-2 text-gray-700 hover:text-blue-500 md:mx-4 md:my-0">Home</Link>

            <Link to="" className="my-2 text-gray-700 hover:text-blue-500 md:mx-4 md:my-0">Contact</Link>
            <Link to="" className="my-2 text-gray-700 hover:text-blue-500 md:mx-4 md:my-0">About</Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* 📍 Location info */}
            {renderLocation()}

            <button className="md:hidden p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all">
              <Search className="h-6 w-6" />
            </button>

            <Link to='/user/notifications'>
              <button className="hidden sm:block relative p-2 text-gray-900 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
            </Link>

            <Link to="/carts">
              <button className="relative p-2 text-gray-900 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all">
                <ShoppingCart className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-orange-500 text-white text-xs rounded-full flex items-center justify-center">
                  {totalQuantity}
                </span>
              </button>
            </Link>

            {isAuthenticated === 'success' ? (
              <div className="relative">
                <button
                  onClick={toggleUserDropdown}
                  className="hidden sm:block p-2 text-gray-600 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-all"
                >
                  <User className="h-6 w-6" />
                </button>
                {isUserDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <Link to="/user/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsUserDropdownOpen(false)}>Dashboard</Link>
                    <Link to="/user/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setIsUserDropdownOpen(false)}>Profile</Link>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/auth/login">
                <button className="w-full flex items-center justify-center space-x-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-full font-medium transition-colors">
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
