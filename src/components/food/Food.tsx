import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, fetchFoods, setFilters } from '../../redux/reducers/food/foodsSlice';
import type { RootState } from '../../redux/reducers/store';

const Food = () => {
  const dispatch = useDispatch();
  const { foods, loading, error, filters } = useSelector((state: RootState) => state.foods);

  // Categories extracted from foods
  const categories = [...new Set(foods.map(food => food.category))];

  // Fetch foods when filters change
  useEffect(() => {
    dispatch(fetchFoods(filters) as any);
  }, [dispatch, filters]);

  const handleCategoryChange = (category: string) => {
    dispatch(setFilters({ category }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, isMin: boolean) => {
    const value = parseInt(e.target.value);
    if (isMin) {
      dispatch(setFilters({ minPrice: value }));
    } else {
      dispatch(setFilters({ maxPrice: value }));
    }
  };

  const handleSortChange = (sortBy: string) => {
    dispatch(setFilters({ sortBy }));
  };

  const resetFilters = () => {
    dispatch(setFilters({
      category: "",
      minPrice: 0,
      maxPrice: 1000,
      sortBy: ""
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 w-full lg:w-3/4">
      {/* Filter Section - Classic Card Design */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8 shadow-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-700 border-b pb-2">Filter Options</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div className="space-y-1">
            <label htmlFor="category" className="block text-sm font-normal text-gray-600">
              Category
            </label>
            <select
              id="category"
              value={filters.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Range Filter */}
          <div className="space-y-1">
            <label className="block text-sm font-normal text-gray-600">
              Price Range ($)
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                min="0"
                max="1000"
                value={filters.minPrice}
                onChange={(e) => handlePriceChange(e, true)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Min"
              />
              <span className="text-gray-400">to</span>
              <input
                type="number"
                min="0"
                max="1000"
                value={filters.maxPrice}
                onChange={(e) => handlePriceChange(e, false)}
                className="w-full p-2 border border-gray-300 rounded text-sm"
                placeholder="Max"
              />
            </div>
          </div>

          {/* Sort Filter */}
          <div className="space-y-1">
            <label htmlFor="sort" className="block text-sm font-normal text-gray-600">
              Sort By
            </label>
            <select
              id="sort"
              value={filters.sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A-Z</option>
              <option value="name-desc">Name: Z-A</option>
            </select>
          </div>
        </div>

        {/* Active Filters - Subtle and compact */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap items-center gap-2">
            {filters.category && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700">
                {filters.category}
                <button
                  onClick={() => handleCategoryChange('')}
                  className="ml-1 inline-flex text-blue-400 hover:text-blue-600"
                >
                  ×
                </button>
              </span>
            )}
            {(filters.minPrice !== 0 || filters.maxPrice !== 1000) && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-green-50 text-green-700">
                ${filters.minPrice}-${filters.maxPrice}
                <button
                  onClick={() => dispatch(setFilters({ minPrice: 0, maxPrice: 1000 }))}
                  className="ml-1 inline-flex text-green-400 hover:text-green-600"
                >
                  ×
                </button>
              </span>
            )}
            {filters.sortBy && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium bg-purple-50 text-purple-700">
                {filters.sortBy.replace('-', ' ')}
                <button
                  onClick={() => handleSortChange('')}
                  className="ml-1 inline-flex text-purple-400 hover:text-purple-600"
                >
                  ×
                </button>
              </span>
            )}
            {(filters.category || filters.minPrice !== 0 || filters.maxPrice !== 1000 || filters.sortBy) && (
              <button
                onClick={resetFilters}
                className="ml-auto text-xs text-gray-500 hover:text-gray-700"
              >
                Reset all
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Error Display - More subtle */}
      {error && (
        <div className="bg-red-50 border-l-2 border-red-400 text-red-700 p-3 mb-6 rounded flex justify-between items-center text-sm">
          <span>{error}</span>
          <button onClick={() => dispatch(clearError())} className="text-red-500 hover:text-red-700">
            ×
          </button>
        </div>
      )}

      {/* Loading Indicator - More subtle */}
      {loading && (
        <div className="flex justify-center my-6">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-400"></div>
        </div>
      )}

      {/* Food Items Grid - Classic Product Layout */}
      {!loading && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-700">
              Showing {foods.length} {foods.length === 1 ? 'item' : 'items'}
            </h2>
            {foods.length === 0 && (
              <button
                onClick={resetFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Reset filters
              </button>
            )}
          </div>

          {foods.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded border border-gray-200">
              <p className="text-gray-500 mb-3">No items match your filters</p>
              <button
                onClick={resetFilters}
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Show all items
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {foods.map((food) => (
                <div key={food._id} className="bg-white rounded border border-gray-200 overflow-hidden hover:shadow-sm transition-shadow">
                  {food.image && (
                    <div className="h-48 bg-gray-100 overflow-hidden">
                      <img
                        src={food.image}
                        alt={food.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium text-gray-800">{food.name}</h3>
                      <span className="font-medium text-blue-600">${food.price}</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-3 line-clamp-2">{food.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded">{food.category}</span>
                      <span>{food.preparationTime} min</span>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <button
                      disabled={!food.available}
                      className={`w-full py-2 text-sm rounded ${food.available
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}
                    >
                      {food.available ? 'Add to order' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Food;