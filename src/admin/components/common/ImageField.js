import React, { useState } from "react";

const ImageField = ({ label, onChange, img, imgUrl }) => {
  return (
    <div className="flex flex-col space-y-[8px]">
      <div className="required-input"
        style={{
          fontFamily: "Noto Sans",
          fontWeight: 600,
          color: "#666666",
          fontSize: "12px",
          lineHeight: "18px",
        }}
      >
        {label}
      </div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
        <div className="flex flex-col items-center">
          {imgUrl ? (
            <div className="relative w-full">
              <img
                src={imgUrl}
                alt="Offer preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={() => onChange({ target: { files: [] } })}
                className="absolute top-2 right-2 bg-white rounded-md px-3 py-1 text-sm shadow-sm text-primary hover:bg-tertiary"
              >
                Change Image
              </button>
            </div>
          ) : (
            <label className="w-full cursor-pointer">
              <div className="flex flex-col items-center justify-center gap-2">
                <svg
                  className="h-10 w-10 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <h6 className="text-primary">Click to upload image</h6>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onChange}
              />
            </label>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageField;
