import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, fetchFoods, setFilters } from '../../redux/reducers/food/foodsSlice';
import type { RootState } from '../../redux/reducers/store';
import { FaHeart, FaRegHeart, FaShoppingCart, FaSpinner } from 'react-icons/fa';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

const Food = () => {
  const dispatch = useDispatch();
  const { foods, loading, error, filters } = useSelector((state: RootState) => state.foods);
  const [localPriceRange, setLocalPriceRange] = useState([filters.minPrice, filters.maxPrice]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Categories extracted from foods
  const categories = [...new Set(foods.map(food => food.category))];

  // Fetch foods when filters change
  useEffect(() => {
    dispatch(fetchFoods(filters) as any);
  }, [dispatch, filters]);

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

  const handleSortChange = (sortBy: string) => {
    dispatch(setFilters({ ...filters, sortBy }));
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Section - Modern Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-sm sticky top-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
              {(filters.category || filters.minPrice !== 0 || filters.maxPrice !== 1000 || filters.sortBy) && (
                <button
                  onClick={resetFilters}
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Reset all
                </button>
              )}
            </div>

            {/* Category Filter - Modern Chip Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`px-3 py-1.5 text-sm rounded-full transition-colors ${!filters.category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    className={`px-3 py-1.5 text-sm rounded-full transition-colors ${filters.category === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter - Dual Slider */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  range
                  min={0}
                  max={1000}
                  step={10}
                  value={localPriceRange}
                  onChange={handlePriceChange}
                  onAfterChange={handlePriceAfterChange}
                  trackStyle={[{ backgroundColor: '#3b82f6' }]}
                  handleStyle={[
                    { borderColor: '#3b82f6', boxShadow: 'none' },
                    { borderColor: '#3b82f6', boxShadow: 'none' }
                  ]}
                  activeDotStyle={{ borderColor: '#3b82f6' }}
                />
                <div className="flex justify-between mt-2 text-xs text-gray-500">
                  <span>{localPriceRange[0]}</span>
                  <span>{localPriceRange[1]}</span>
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1">
          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded-lg flex justify-between items-center">
              <span>{error}</span>
              <button
                onClick={() => dispatch(clearError())}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                ×
              </button>
            </div>
          )}


          {loading && (
            <div className="">
              <div className="animate-spin text-blue-600">
                <FaSpinner size={32} />
              </div>
            </div>
          )}

          {/* Food Items Grid */}
          {!loading && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-medium text-gray-700">
                  Showing {foods.length} {foods.length === 1 ? 'item' : 'items'}
                </h2>
                {foods.length === 0 && (
                  <button
                    onClick={resetFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    Reset filters
                  </button>
                )}
              </div>

              {foods.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-gray-500 mb-4">No items match your filters</p>
                  <button
                    onClick={resetFilters}
                    className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Show all items
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {foods.map((food) => (
                    <div key={food._id} className="bg-white rounded-lg border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
                      <div className="relative">
                        {food.image && (
                          <div className="h-48 bg-gray-100 overflow-hidden">
                            <img
                              src={food.image}
                              alt={food.name}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                        )}
                        <button
                          onClick={() => toggleFavorite(food._id)}
                          className="absolute top-3 right-3 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
                          aria-label="Add to favorites"
                        >
                          {favorites.includes(food._id) ? (
                            <FaHeart className="text-red-500" />
                          ) : (
                            <FaRegHeart className="text-gray-400 hover:text-red-500" />
                          )}
                        </button>
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-gray-800">{food.name}</h3>
                          <span className="font-medium text-blue-600">৳ {food.price}</span>
                        </div>

                        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
                          <span className="bg-gray-100 px-2 py-1 rounded">{food.category}</span>
                          <span>{food.preparationTime} min</span>
                        </div>
                        <button
                          disabled={!food.available}
                          className={`w-full flex items-center justify-center gap-2 py-2 text-sm rounded-lg transition-colors ${food.available
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                          {food.available ? (
                            <>
                              <FaShoppingCart />
                              Add to cart
                            </>
                          ) : (
                            'Unavailable'
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Food;