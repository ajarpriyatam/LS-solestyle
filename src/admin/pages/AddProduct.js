import React, { useState, useEffect } from "react";
import InputField from "../components/common/InputField";
import SelectField from "../components/common/SelectField";
import TextArea from "../components/common/TextArea";
import { FaPlus, FaTrash, FaImage, FaUpload, FaCheckCircle, FaTimes, FaEdit } from "react-icons/fa";
import {createProduct, clearErrors} from '../../actions/productAction'
import { useSelector, useDispatch } from "react-redux";
import { NEW_PRODUCT_RESET } from "../../constant/productConstant";
import { useLocation } from "react-router-dom";



const AddProduct = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { success, error, loading } = useSelector((state) => state.newProduct);
    
    // Check if we're in edit mode
    const isEditMode = location.state?.editMode || false;
    const productData = location.state?.productData || null;
    
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        price: "",
        sizes: "",
        colors: "",
        tokenId: "",
        description: "",
        display: true,
        productImageGallery: [],
    });

    // Remove the hardcoded isLoading state since we're using Redux loading state
    const [selectedGalleryImages, setSelectedGalleryImages] = useState([]);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [validationErrors, setValidationErrors] = useState({});
    const [showValidationError, setShowValidationError] = useState(false);

    const categoryOptions = [
        { label: "Mens", value: "Mens" },
        { label: "Women", value: "Women" },
        { label: "Kids", value: "Kids" }
    ];

    // Populate form data when in edit mode
    useEffect(() => {
        if (isEditMode && productData) {
            setFormData({
                name: productData.name || "",
                category: productData.category || "",
                price: productData.price || "",
                sizes: productData.sizes ? productData.sizes.join(", ") : "",
                colors: productData.colors ? productData.colors.join(", ") : "",
                tokenId: productData.tokenId || "",
                description: productData.description || "",
                display: productData.display !== undefined ? productData.display : true,
                productImageGallery: productData.productImageGallery || [],
            });
        }
    }, [isEditMode, productData]);

    // Handle success state and show popup
    useEffect(() => {
        if (success) {
            setShowSuccessPopup(true);
            // Reset form only if not in edit mode
            if (!isEditMode) {
                setFormData({
                    name: "",
                    category: "",
                    price: "",
                    sizes: "",
                    colors: "",
                    tokenId: "",
                    description: "",
                    display: true,
                    productImageGallery: [],
                });
                setSelectedGalleryImages([]);
            }
            // Clear success state
            dispatch({ type: NEW_PRODUCT_RESET });
            
            // Auto hide popup after 3 seconds
            setTimeout(() => {
                setShowSuccessPopup(false);
            }, 3000);
        }
    }, [success, dispatch, isEditMode]);

    // Handle errors
    useEffect(() => {
        if (error) {
            dispatch(clearErrors());
        }
    }, [error, dispatch]);


    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Clear validation error for this field when user starts typing
        if (validationErrors[field]) {
            setValidationErrors(prev => ({
                ...prev,
                [field]: null
            }));
        }
    };

    // Validation function to check mandatory fields
    const validateForm = () => {
        const errors = {};
        
        // Check mandatory fields
        if (!formData.name.trim()) {
            errors.name = "Product name is required";
        }
        
        if (!formData.category) {
            errors.category = "Category is required";
        }
        
        if (!formData.price || formData.price <= 0) {
            errors.price = "Valid price is required";
        }
        
        if (!formData.sizes.trim()) {
            errors.sizes = "At least one size is required";
        }
        
        if (!formData.colors.trim()) {
            errors.colors = "At least one color is required";
        }
        
        if (!formData.description.trim()) {
            errors.description = "Product description is required";
        }
        
        if (formData.productImageGallery.length === 0) {
            errors.productImageGallery = "At least one product image is required";
        }
        
        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };


    const handleNameChange = (e) => {
        const name = e.target.value;
        setFormData(prev => ({
            ...prev,
            name,
        }));
    };

    const handleMultipleFileSelect = (files) => {
        if (files && files.length > 0) {
            const fileArray = Array.from(files);
            setSelectedGalleryImages(prev => [...prev, ...fileArray]);

            // Convert all files to base64
            const promises = fileArray.map(file => {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        resolve(e.target.result);
                    };
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(promises).then(base64Urls => {
                setFormData(prev => ({
                    ...prev,
                    productImageGallery: [...prev.productImageGallery, ...base64Urls]
                }));
            });
        }
    };

    const removeGalleryImage = (index) => {
        setSelectedGalleryImages(prev => prev.filter((_, i) => i !== index));
        setFormData(prev => ({
            ...prev,
            productImageGallery: prev.productImageGallery.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validate form before submission
        if (!validateForm()) {
            setShowValidationError(true);
            // Auto hide validation error after 5 seconds
            setTimeout(() => {
                setShowValidationError(false);
            }, 5000);
            return;
        }
        
        // Clear any previous validation errors
        setValidationErrors({});
        setShowValidationError(false);
        
        let colors = formData.colors.split(",");
        let sizes = formData.sizes.split(",");

        // Filter out empty array items
        const filteredData = {
            ...formData,
            sizes: sizes.filter(size => size.trim() !== ""),
            colors: colors.filter(color => color.trim() !== ""),
            productImageGallery: formData.productImageGallery.filter(image => image.trim() !== ""),
            price: parseFloat(formData.price)
        };
        dispatch(createProduct(filteredData));
    };

    return (
        <div className="w-full h-full bg-gray-100 rounded-[1rem] p-[1rem] overflow-y-auto">
            <div className="max-w-6xl mx-auto">

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information Card */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-2">
                            <div>
                                <InputField
                                    label="Product Name"
                                    placeholder="Enter product name"
                                    id="name"
                                    value={formData.name}
                                    onChange={handleNameChange}
                                    className={validationErrors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
                                />
                                {validationErrors.name && (
                                    <p className="text-red-500 text-xs mt-1">{validationErrors.name}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                            <div>
                                <SelectField
                                    label="Category"
                                    placeholder="Select category"
                                    id="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    items={categoryOptions}
                                    className={validationErrors.category ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
                                />
                                {validationErrors.category && (
                                    <p className="text-red-500 text-xs mt-1">{validationErrors.category}</p>
                                )}
                            </div>
                            <div>
                                <InputField
                                    label="Price"
                                    placeholder="Enter price"
                                    id="price"
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => handleInputChange('price', e.target.value)}
                                    className={validationErrors.price ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
                                />
                                {validationErrors.price && (
                                    <p className="text-red-500 text-xs mt-1">{validationErrors.price}</p>
                                )}
                            </div>
                            <InputField
                                label="Token ID"
                                placeholder="Enter token ID"
                                id="tokenId"
                                value={formData.tokenId}
                                onChange={(e) => handleInputChange('tokenId', e.target.value)}
                            />
                            <div className="flex flex-col space-y-2 mt-5">
                                <label className="text-sm font-semibold text-black-300">
                                    Display Status <span className="text-red-400">*</span>
                                </label>
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="display"
                                        checked={formData.display}
                                        onChange={(e) => handleInputChange('display', e.target.checked)}
                                        className="w-5 h-5 text-orange-500 bg-white border-gray-300 rounded focus:ring-orange-500 focus:ring-2"
                                    />
                                    <label htmlFor="display" className="text-sm text-black-300 cursor-pointer">
                                        Show this product on the website
                                    </label>
                                </div>
                            </div>
                        </div>
                        {/* Grid Layout: 2x2 pattern */}
                        <div className="grid grid-cols-2 gap-6" style={{ gridTemplateRows: 'auto auto' }}>
                            {/* Colors Section - Position (1,1) */}
                            <div className="col-start-1 col-end-2 row-start-1 row-end-2">
                                <label className="block text-sm font-semibold text-black-300 mt-3 mb-1 flex items-center gap-2">
                                    Colors <span className="text-red-400">*</span>
                                </label>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1">
                                            <input
                                                placeholder="Enter color (e.g., Black, White, Red)"
                                                value={formData.colors}
                                                onChange={(e) => handleInputChange('colors', e.target.value)}
                                                className={`w-full h-12 px-4 rounded-xl border focus:outline-none focus:ring-2 bg-white/90 text-gray-800 ${
                                                    validationErrors.colors 
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                                                        : "border-gray-300 focus:border-orange-500 focus:ring-orange-500/20"
                                                }`}
                                            />
                                        </div>
                                    </div>
                                    {validationErrors.colors && (
                                        <p className="text-red-500 text-xs">{validationErrors.colors}</p>
                                    )}
                                </div>
                            </div>

                            {/* Sizes Section - Position (2,1) */}
                            <div className="col-start-2 col-end-3 row-start-1 row-end-2">
                                <label className="block text-sm font-semibold text-black-300 mt-3 mb-1 flex items-center gap-2">
                                    Sizes <span className="text-red-400">*</span>
                                </label>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="flex-1">
                                            <input
                                                placeholder="Enter size (e.g., 8, 9, 10)"
                                                value={formData.sizes}
                                                onChange={(e) => handleInputChange('sizes', e.target.value)}
                                                className={`w-full h-12 px-4 rounded-xl border focus:outline-none focus:ring-2 bg-white/90 text-gray-800 ${
                                                    validationErrors.sizes 
                                                        ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                                                        : "border-gray-300 focus:border-orange-500 focus:ring-orange-500/20"
                                                }`}
                                            />
                                        </div>
                                    </div>
                                    {validationErrors.sizes && (
                                        <p className="text-red-500 text-xs">{validationErrors.sizes}</p>
                                    )}
                                </div>
                            </div>

                            {/* Description Section - Position (1,2) and (2,2) - spans both columns */}
                            <div className="col-start-1 col-end-3 row-start-2 row-end-3">
                                <div>
                                    <TextArea
                                        label="Description"
                                        placeholder="Enter detailed product description..."
                                        id="description"
                                        value={formData.description}
                                        onChange={(e) => handleInputChange('description', e.target.value)}
                                        className={validationErrors.description ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
                                    />
                                    {validationErrors.description && (
                                        <p className="text-red-500 text-xs mt-1">{validationErrors.description}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="flex flex-col space-y-2">
                                <label className="text-sm font-semibold text-black-300">
                                    Product Gallery Images <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="productImageGallery"
                                        accept="image/*"
                                        multiple
                                        onChange={(e) => handleMultipleFileSelect(e.target.files)}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="productImageGallery"
                                        className={`w-full h-12 px-4 rounded-xl border-2 border-dashed cursor-pointer flex items-center justify-center gap-2 transition-colors ${
                                            validationErrors.productImageGallery 
                                                ? "border-red-300 hover:border-red-400 text-red-400 hover:text-red-500" 
                                                : "border-orange-300 hover:border-orange-400 text-orange-400 hover:text-orange-500"
                                        } bg-white/90`}
                                    >
                                        <FaUpload size={16} />
                                        Choose Multiple Product Images
                                    </label>
                                </div>
                                {validationErrors.productImageGallery && (
                                    <p className="text-red-500 text-xs">{validationErrors.productImageGallery}</p>
                                )}

                                {/* Display selected images */}
                                {selectedGalleryImages.length > 0 && (
                                    <div className="mt-4 space-y-2">
                                        <p className="text-sm text-gray-300 font-medium">
                                            Selected Images ({selectedGalleryImages.length}):
                                        </p>
                                        <div className="space-y-2">
                                            {selectedGalleryImages.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                                                    <div className="flex items-center gap-3">
                                                        <FaImage size={16} className="text-green-600" />
                                                        <span className="text-sm text-green-700 font-medium">
                                                            {file.name}
                                                        </span>
                                                        <span className="text-xs text-green-500">
                                                            ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                                        </span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeGalleryImage(index)}
                                                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-100 rounded transition-colors"
                                                    >
                                                        <FaTrash size={14} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    {isEditMode ? "Updating Product..." : "Adding Product..."}
                                </>
                            ) : (
                                <>
                                    {isEditMode ? <FaEdit size={16} /> : <FaPlus size={16} />}
                                    {isEditMode ? "Update Product" : "Add Product"}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Custom Success Popup - Slides from right */}
            {showSuccessPopup && (
                <div 
                    className="fixed top-4 right-4 z-50"
                    style={{
                        animation: 'slideInRight 0.5s ease-out',
                        transform: 'translateX(0)',
                        opacity: 1
                    }}
                >
                    <div className="bg-white rounded-lg shadow-2xl border-l-4 border-green-500 p-4 max-w-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <FaCheckCircle className="h-6 w-6 text-green-500" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">
                                        Success!
                                    </h4>
                                    <p className="text-sm text-gray-600">
                                        {isEditMode ? "Product updated successfully" : "Product added successfully"}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowSuccessPopup(false)}
                                className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FaTimes className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Validation Error Popup - Slides from right */}
            {showValidationError && (
                <div 
                    className="fixed top-4 right-4 z-50"
                    style={{
                        animation: 'slideInRight 0.5s ease-out',
                        transform: 'translateX(0)',
                        opacity: 1
                    }}
                >
                    <div className="bg-white rounded-lg shadow-2xl border-l-4 border-red-500 p-4 max-w-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="flex-shrink-0">
                                    <FaTimes className="h-6 w-6 text-red-500" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-900">
                                        Missing Required Fields!
                                    </h4>
                                    <div className="text-sm text-gray-600 mt-1">
                                        <p className="font-medium mb-2">Please fill in the following:</p>
                                        <ul className="list-disc list-inside space-y-1">
                                            {Object.entries(validationErrors).map(([field, error]) => (
                                                <li key={field} className="text-xs">
                                                    {error}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowValidationError(false)}
                                className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <FaTimes className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add custom CSS for slide animation */}
            <style>{`
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
};

export default AddProduct;
