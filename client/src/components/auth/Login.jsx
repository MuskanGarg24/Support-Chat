import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./Input";
import FormAction from "./FormAction";
import { loginFields } from "../../constants/formFields";
import { loginRoute } from "../../utils/routes";
import axios from "axios";
import { toast } from "react-toastify";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const Login = () => {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const navigate = useNavigate();

  // Login API Integration
  const authenticateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(loginRoute, {
        username: loginState.username,
        password: loginState.password,
      });
      localStorage.setItem("branchInternational", JSON.stringify(response.data.user));
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={authenticateUser}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>
      <FormAction handleSubmit={authenticateUser} text="Login" />
    </form>
  );
};

export default Login;
