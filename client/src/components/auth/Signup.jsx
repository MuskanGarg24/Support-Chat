import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import FormAction from "./FormAction";
import { signupFields } from "../../constants/formFields";
import { signupRoute } from "../../utils/routes";
import axios from "axios";
import { toast } from "react-toastify";

const fields = signupFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const Signup = () => {
  // Signup State
  const [signupState, setSignupState] = useState({
    ...fieldsState,
    isAdmin: false,
  });

  // Handle Change
  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setSignupState({
      ...signupState,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const navigate = useNavigate();

  // Signup API Integration
  const createAccount = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(signupRoute, {
        username: signupState.username,
        email: signupState.email,
        password: signupState.password,
        isAdmin: signupState.isAdmin,
      });
      localStorage.setItem(
        "branchInternational",
        JSON.stringify(response.data.user)
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={createAccount}>
      <div>
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <div className="flex items-center">
          <input
            id="isAdmin"
            name="isAdmin"
            type="checkbox"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded cursor-pointer"
            checked={signupState.isAdmin}
            onChange={handleChange}
          />
          <label
            htmlFor="isAdmin"
            className="ml-2 block text-sm font-medium text-purple-600"
          >
            Are you an Agent?
          </label>
        </div>
        <FormAction handleSubmit={createAccount} text="Signup" />
      </div>
    </form>
  );
};

export default Signup;
