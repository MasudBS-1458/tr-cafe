// src/components/Food/Food.tsx
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetFoodsQuery } from '../../redux/reducers/food/foodApi';
import { setFilters } from '../../redux/reducers/food/foodsSlice';
import { addToCart } from '../../redux/reducers/cart/cartSlice';
import type { RootState } from '../../redux/reducers/store';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import type { Food } from '../../types/foodTypes';
import showToast from '../../utils/toast';

const FoodScreen = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state: RootState) => state.foods.filters);
  const [localPriceRange, setLocalPriceRange] = useState([filters.minPrice, filters.maxPrice]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { data: foods = [], isLoading, isError, error } = useGetFoodsQuery(filters);

  const categories = [...new Set(foods.map(food => food.category))];

  const handleCategoryChange = (category: string) => {
    dispatch(setFilters({ ...filters, category }));
  };

  const handlePriceChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setLocalPriceRange(values);
    }
  };

  const handlePriceAfterChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      dispatch(setFilters({
        ...filters,
        minPrice: values[0],
        maxPrice: values[1]
      }));
    }
  };

  const handleAddToCart = (food: Food) => {
    dispatch(addToCart(food));
    showToast('success', 'Product added to cart');
  }

  const resetFilters = () => {
    const defaultFilters = {
      category: "",
      minPrice: 0,
      maxPrice: 1000,
      sortBy: ""
    };
    dispatch(setFilters(defaultFilters));
    setLocalPriceRange([defaultFilters.minPrice, defaultFilters.maxPrice]);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="bg-white rounded-lg overflow-hidden group animate-pulse">
      <div className="h-48 bg-gray-200"></div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <div className="h-5 bg-gray-200 rounded w-3/4"></div>
          <div className="h-5 bg-gray-200 rounded w-1/6"></div>
        </div>
        <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-3 bg-gray-200 rounded w-1/4"></div>
      </div>
    </div>
  );

  return (
    <div className="w-full lg:w-3/4 mx-auto px-4 py-8 flex justify-center items-center md:mt-24">
      <div className="flex flex-col md:flex-row gap-8 w-full">
        {/* Filter Section */}
        <div className="w-full md:min-w-[16rem] md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg p-4 sticky top-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              {(filters.category || filters.minPrice !== 0 || filters.maxPrice !== 1000 || filters.sortBy) && (
                <button
                  onClick={resetFilters}
                  className="text-sm bg-gray-200 border border-gray-200 rounded-md p-1 text-red-500 hover:text-gray-700 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900">Categories</h3>
              <div className="space-y-2 mt-2">
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`w-full text-left px-2 py-1.5 text-sm rounded transition-colors ${!filters.category
                    ? 'bg-gray-100 text-gray-900 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                    }`}
                >
                  All Categories
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`w-full text-left px-2 py-1.5 text-sm rounded transition-colors ${filters.category === category
                      ? 'bg-gray-100 text-gray-900 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  range
                  min={0}
                  max={1000}
                  step={10}
                  value={localPriceRange}
                  onChange={handlePriceChange}
                  onAfterChange={handlePriceAfterChange}
                  trackStyle={[{ backgroundColor: '#000' }]}
                  handleStyle={[
                    { borderColor: '#000', boxShadow: 'none', width: 16, height: 16, marginTop: -7 },
                    { borderColor: '#000', boxShadow: 'none', width: 16, height: 16, marginTop: -7 }
                  ]}
                  railStyle={{ backgroundColor: '#e5e7eb' }}
                />
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>৳{localPriceRange[0]}</span>
                  <span>৳{localPriceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-h-screen">
          {isError && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg">
              <span>{(error as any)?.data?.message || 'Failed to fetch foods'}</span>
            </div>
          )}

          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">
                {isLoading ? 'Loading...' : `${foods.length} ${foods.length === 1 ? 'Item' : 'Items'}`}
              </h2>
              {!isLoading && foods.length === 0 && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  Reset filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                [...Array(6)].map((_, index) => (
                  <SkeletonLoader key={index} />
                ))
              ) : foods.length === 0 ? (
                <div className="col-span-3 text-center py-12 bg-gray-50 rounded-lg">
                  <p className="text-gray-500 mb-4">No items match your filters</p>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 text-sm bg-black text-white rounded hover:bg-gray-800 transition-colors"
                  >
                    Show all items
                  </button>
                </div>
              ) : (
                foods.map((food) => (
                  <div key={food._id} className="bg-white rounded-lg overflow-hidden group">
                    <div className="relative">
                      {food.image && (
                        <div className="h-48 bg-gray-100 overflow-hidden">
                          <img
                            src={food.image}
                            alt={food.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="absolute top-3 right-3 flex space-x-2">
                        <button
                          onClick={() => toggleFavorite(food._id)}
                          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                          aria-label="Add to favorites"
                        >
                          {favorites.includes(food._id) ? (
                            <FaHeart className="text-red-500" />
                          ) : (
                            <FaRegHeart className="text-gray-400 hover:text-red-500" />
                          )}
                        </button>
                        <button
                          disabled={!food.available}
                          onClick={() => handleAddToCart(food)}
                          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors"
                          aria-label="Add to cart"
                        >
                          <FaShoppingCart className={food.available ? "text-gray-700 hover:text-black" : "text-gray-300"} />
                        </button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-medium text-gray-900">{food.name}</h3>
                        <span className="font-medium text-gray-900">৳{food.price}</span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{food.category}</p>
                      {!food.available && (
                        <p className="text-xs text-red-500">Currently unavailable</p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodScreen;