import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/auth/Header";
import LoginComponent from "../components/auth/Login";

const Login = () => {
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const user = localStorage.getItem("branchInternational");
    if (user) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Header
          heading="Login to your account"
          paragraph="Don't have an account yet?"
          linkName="Signup"
          linkUrl="/signup"
        />
        <LoginComponent />
      </div>
    </div>
  );
};

export default Login;
