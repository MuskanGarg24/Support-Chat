import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bars3Icon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("branchInternational");
    navigate("/login");
  };

  const isAdmin = JSON.parse(localStorage.getItem("branchInternational")).admin;

  return (
    <nav>
      <div className="w-full px-7">
        <div className="flex justify-between">
          {/* Primary menu and logo */}
          <div className="flex items-center gap-16 my-9">
            {/* logo */}
            <div>
              <Link
                href="/"
                className="text-lg font-bold text-gray-700 items-center "
              >
                <span>Branch International</span>
              </Link>
            </div>
            {/* primary */}
            <div className="hidden lg:flex gap-8 ">
              <Link to="/" className="font-medium hover:text-purple-500">
                {isAdmin ? "All Queries" : "My Queries"}
              </Link>
              <Link to="/resolve" className="font-medium hover:text-purple-500">
                {isAdmin ? "To Resolve" : "Resolved Queries"}
              </Link>
            </div>
          </div>
          {/* secondary */}
          <div className="flex gap-6">
            <div className="hidden lg:flex items-center gap-5">
              <Link to="/signup">
                <button className="bg-purple-600 px-3 py-2 text-white rounded-lg hover:bg-purple-500 font-medium">
                  Signup
                </button>
              </Link>
              <button
                className="bg-purple-600 px-3 py-2 text-white rounded-lg hover:bg-purple-500 font-medium"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
            {/* Mobile navigation toggle */}
            <div className="lg:hidden flex items-center">
              <button onClick={() => setToggleMenu(!toggleMenu)}>
                <Bars3Icon className="h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* mobile navigation */}
      <div
        className={`fixed z-40 w-full bg-gray-100 overflow-hidden flex flex-col lg:hidden gap-12  origin-top duration-700 ${
          !toggleMenu ? "h-0" : "h-full"
        }`}
      >
        <div className="px-8">
          <div className="flex flex-col gap-8 font-bold tracking-wider">
            <Link to="/" className="mt-5">
              {isAdmin ? "All Queries" : "My Queries"}
            </Link>
            <Link to="/resolve">
              {isAdmin ? "To Resolve" : "Resolved Queries"}
            </Link>
            <Link to="/signup">Signup</Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
