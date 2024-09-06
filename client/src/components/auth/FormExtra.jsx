import React from "react";

const FormExtra = ({ showCheckbox }) => {
  return (
    <div className="flex items-center justify-between ">
      <div>
        {showCheckbox && (
          <div className="flex items-center">
            <input
              id="agent"
              name="agent"
              type="checkbox"
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
              required
            />
            <label
              htmlFor="agent"
              className="ml-2 block text-sm font-medium text-purple-600"
            >
              Are you an agent?
            </label>
          </div>
        )}
      </div>
      {!showCheckbox && (
        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-purple-600 hover:text-purple-500"
          >
            Forgot your password?
          </a>
        </div>
      )}
    </div>
  );
};

export default FormExtra;
