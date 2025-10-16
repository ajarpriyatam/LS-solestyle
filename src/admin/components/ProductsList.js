import React, { useState, useMemo , useEffect} from 'react';
import { FiEdit, FiTrash2, FiSearch } from 'react-icons/fi';
// import { allProducts } from '../../constants';
import ProductModal from './ProductModal';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { getAllProductsAdmin, deleteProduct, clearDeleteSuccess } from '../../actions/productAction';

const ProductsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let allProducts = useSelector((state) => state.productsAdmin.productsAll)
  // const productCount = useSelector((state) => state.productsAdmin.productsCount)
  const loading = useSelector((state) => state.productsAdmin.loading)
  const { isDeleted, loading: deleteLoading } = useSelector((state) => state.deleteProduct)


  useEffect(() => {
    dispatch(getAllProductsAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (isDeleted) {
      dispatch(getAllProductsAdmin()); // Refresh the products list
      dispatch(clearDeleteSuccess()); // Clear the delete success state
    }
  }, [isDeleted, dispatch]);

  // Get unique brands for filter
  const brands = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];
    const uniqueBrands = [...new Set(allProducts.map(product => product.name))];
    return uniqueBrands.map(brand => ({ label: brand, value: brand }));
  }, [allProducts]);


  // Filter and sort products
  const filteredProducts = useMemo(() => {
    if (!allProducts || allProducts.length === 0) return [];
    
    let filtered = allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = !filterBrand || product.name === filterBrand;
      return matchesSearch && matchesBrand;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'price':
          aValue = parseInt(a.price);
          bValue = parseInt(b.price);
          break;
        case 'category':
          aValue = a.productBrand;
          bValue = b.productBrand;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [allProducts, searchTerm, filterBrand, sortBy, sortOrder]);

  const handleEdit = (product) => {
    // Navigate to AddProduct page with product data for editing
    navigate('/admin/add/product', { 
      state: { 
        editMode: true, 
        productData: product 
      } 
    });
  };

  const handleDelete = (product) => {
    if (window.confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
      dispatch(deleteProduct(product._id));
    }
  };

  // const handleView = (product) => {
  //   setSelectedProduct(product);
  //   setModalMode('view');
  //   setIsModalOpen(true);
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
    setModalMode('view');
  };

  const ProductCard = ({ product, index }) => (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={product.productImageGallery[0].url}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
            }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {product.name}
          </h3>
          <p className="text-sm text-gray-600 truncate">
            {product.tokenId}
          </p>
          <p className="text-lg font-bold text-primary mt-1">
            ₹{product.price}
          </p>
          <div className="flex items-center space-x-2 mt-2">
            <div className="flex flex-wrap gap-1">
              {product.colors?.slice(0, 3).map((color, idx) => {
                return (
                  <span
                    key={idx}
                    className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 border border-gray-200"
                  >
                    {color}
                  </span>
                );
              })}
              {product.colors?.length > 3 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 3}</span>
              )}
            </div>
            <div className="text-xs text-gray-500">
              Sizes: {product.sizes?.join(', ')}
            </div>
          </div>
        </div>
        <div className="flex space-x-2">
          {/* <button
            onClick={() => handleView(product)}
            className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded-lg transition-colors"
            title="View"
          >
            <FiEye size={16} />
          </button> */}
          <button
            onClick={() => handleEdit(product)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit"
          >
            <FiEdit size={16} />
          </button>
          <button
            onClick={() => handleDelete(product)}
            disabled={deleteLoading}
            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  const ProductTableRow = ({ product, index }) => (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={product.productImageGallery[0].url}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/48x48?text=No+Image';
              }}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">
              {product.name}
            </div>
            <div className="text-sm text-gray-500">
              {product.productBrand}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-bold text-primary">
          ₹{product.price}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex flex-wrap gap-1">
          {product.colors?.slice(0, 3).map((color, idx) => {
            return (
              <span
                key={idx}
                className="px-2 py-1 rounded text-xs bg-gray-100 text-gray-700 border border-gray-200"
              >
                {color}
              </span>
            );
          })}
          {product.colors?.length > 3 && (
            <span className="text-xs text-gray-500 ml-1">+{product.colors.length - 3}</span>
          )}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.sizes?.join(', ')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {product.tokenId}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex space-x-2 justify-end">
          {/* <button
            onClick={() => handleView(product)}
            className="text-gray-600 hover:text-primary"
            title="View"
          >
            <FiEye size={16} />
          </button> */}
          <button
            onClick={() => handleEdit(product)}
            className="text-gray-600 hover:text-blue-600"
            title="Edit"
          >
            <FiEdit size={16} />
          </button>
          <button
            onClick={() => handleDelete(product)}
            disabled={deleteLoading}
            className="text-gray-600 hover:text-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Delete"
          >
            <FiTrash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-600 mt-1">
            Manage your footwear products ({filteredProducts && filteredProducts.length} total)
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
        <Link to="/admin/add/product">
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
            Add New Product
          </button>
          </Link>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={filterBrand}
              onChange={(e) => setFilterBrand(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="">All Brands</option>
              {brands.map(brand => (
                <option key={brand.value} value={brand.value}>
                  {brand.label}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="category">Sort by Category</option>
            </select>

            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>

            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('table')}
                className={`px-3 py-2 ${viewMode === 'table' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Table
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
              >
                Grid
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-sm">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <div className="text-gray-500 text-lg mt-4">Loading products...</div>
          </div>
        ) : viewMode === 'table' ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Colors
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sizes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    tokenId
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts && filteredProducts.map((product, index) => (
                  <ProductTableRow key={index} product={product} index={index} />
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts && filteredProducts.map((product, index) => (
                <ProductCard key={index} product={product} index={index} />
              ))}
            </div>
          </div>
        )}

        {!loading && filteredProducts && filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No products found</div>
            <div className="text-gray-400 text-sm mt-2">
              Try adjusting your search or filter criteria
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        mode={modalMode}
      />
    </div>
  );
};

export default ProductsList;
