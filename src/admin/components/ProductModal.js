import React, { useState } from 'react';
import { FiX, FiEdit, FiTrash2, FiSave } from 'react-icons/fi';
import Modal from './common/Modal';
import InputField from './common/InputField';
import SelectField from './common/SelectField';
import ImageField from './common/ImageField';
import Button from './common/Button';

const ProductModal = ({ isOpen, onClose, product, mode = 'view' }) => {
  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const [formData, setFormData] = useState({
    brandName: product?.brandName || '',
    productBrand: product?.productBrand || '',
    price: product?.price || '',
    colors: product?.colors || [],
    sizes: product?.sizes || [],
    description: product?.description || '',
    category: product?.category || '',
    stock: product?.stock || 0,
    isActive: product?.isActive !== false
  });

  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');

  const categories = [
    { label: "Men's Running Shoes", value: "mens-running" },
    { label: "Women's Running Shoes", value: "womens-running" },
    { label: "Men's Casual Shoes", value: "mens-casual" },
    { label: "Women's Casual Shoes", value: "womens-casual" },
    { label: "Sports Shoes", value: "sports" },
    { label: "Formal Shoes", value: "formal" },
    { label: "Sandals", value: "sandals" },
    { label: "Boots", value: "boots" }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddColor = () => {
    if (newColor && !formData.colors.includes(newColor)) {
      setFormData(prev => ({
        ...prev,
        colors: [...prev.colors, newColor]
      }));
      setNewColor('');
    }
  };

  const handleRemoveColor = (colorToRemove) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.filter(color => color !== colorToRemove)
    }));
  };

  const handleAddSize = () => {
    const size = parseInt(newSize);
    if (size && !formData.sizes.includes(size)) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, size].sort((a, b) => a - b)
      }));
      setNewSize('');
    }
  };

  const handleRemoveSize = (sizeToRemove) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.filter(size => size !== sizeToRemove)
    }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    onClose();
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // TODO: Implement delete functionality
      onClose();
    }
  };

  if (!product) return null;

  return (
    <Modal isVisible={isOpen} onClose={onClose}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Product' : 'Product Details'}
          </h2>
          <div className="flex space-x-2">
            {mode === 'view' && (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Edit"
              >
                <FiEdit size={20} />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiX size={20} />
            </button>
          </div>
        </div>

        {/* Product Image */}
        <div className="flex justify-center">
          <div className="w-48 h-48 bg-gray-200 rounded-lg overflow-hidden">
            <img
              src={Array.isArray(product.productImages) ? product.productImages[0] : product.productImages}
              alt={product.brandName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/192x192?text=No+Image';
              }}
            />
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            label="Brand Name"
            value={formData.brandName}
            onChange={(e) => handleInputChange('brandName', e.target.value)}
            disabled={!isEditing}
          />
          <InputField
            label="Product Name"
            value={formData.productBrand}
            onChange={(e) => handleInputChange('productBrand', e.target.value)}
            disabled={!isEditing}
          />
          <InputField
            label="Price (₹)"
            type="number"
            value={formData.price}
            onChange={(e) => handleInputChange('price', e.target.value)}
            disabled={!isEditing}
          />
          <SelectField
            label="Category"
            items={categories}
            value={formData.category}
            onChange={handleInputChange}
            id="category"
            disabled={!isEditing}
          />
          <InputField
            label="Stock Quantity"
            type="number"
            value={formData.stock}
            onChange={(e) => handleInputChange('stock', e.target.value)}
            disabled={!isEditing}
          />
        </div>

        {/* Colors */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Colors
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.colors.map((color, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1"
              >
                <div
                  className="w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm">{color}</span>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveColor(color)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="flex space-x-2">
              <input
                type="color"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                className="w-10 h-10 border border-gray-300 rounded"
              />
              <button
                onClick={handleAddColor}
                className="px-3 py-1 bg-primary text-white rounded hover:bg-primary/90"
              >
                Add Color
              </button>
            </div>
          )}
        </div>

        {/* Sizes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sizes
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.sizes.map((size, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-gray-100 rounded-lg px-3 py-1"
              >
                <span className="text-sm">{size}</span>
                {isEditing && (
                  <button
                    onClick={() => handleRemoveSize(size)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
          {isEditing && (
            <div className="flex space-x-2">
              <input
                type="number"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
                placeholder="Enter size"
                className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                min="1"
                max="15"
              />
              <button
                onClick={handleAddSize}
                className="px-3 py-1 bg-primary text-white rounded hover:bg-primary/90"
              >
                Add Size
              </button>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            disabled={!isEditing}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent disabled:bg-gray-100"
            placeholder="Enter product description..."
          />
        </div>

        {/* Status */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isActive"
            checked={formData.isActive}
            onChange={(e) => handleInputChange('isActive', e.target.checked)}
            disabled={!isEditing}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
            Product is active
          </label>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <Button
                name="Save Changes"
                onClick={handleSave}
                isLoading={false}
              />
            </>
          ) : (
            <>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors flex items-center space-x-2"
              >
                <FiTrash2 size={16} />
                <span>Delete</span>
              </button>
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-2"
              >
                <FiEdit size={16} />
                <span>Edit</span>
              </button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProductModal;
