import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useLogout();

  const handleLogout = () => {
    logout();
  };

  return (
<div className="navbar container mx-auto h-20 flex flex-col md:flex-row items-center justify-between border-b border-sky-900">
  <Link to="/" className="logo text-3xl mx-5 font-bold text-sky-500">
    PRO-MANAGE
  </Link>

  <nav className="flex flex-col md:flex-row gap-5">
    {!user ? (
      <div className="flex  md:flex-row gap-5 mr-5">
        <Link to="/login" className="hover:text-sky-400 duration-300">
          Login
        </Link>
        <Link to="/signup" className="hover:text-sky-400 duration-300">
          Signup
        </Link>
      </div>
    ) : (
      <div className="flex md:flex-row items-center justify-between gap-5 mx-5 ">
        <span className="text-sm md:text-base">{user.email}</span>

        <button
          onClick={handleLogout}
          type="submit"
          className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-sky-50 hover:text-slate-900 duration-300 capitalize"
        >
          Logout
        </button>
      </div>
    )}
  </nav>
</div>


  


  
  );
};

export default Navbar;
