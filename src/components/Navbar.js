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
    <div className="navbar container mx-auto h-20 flex items-center justify-between border-b border-sky-900">
      <Link to="/" className="logo text-3xl mx-5 font-bold text-red-500">
        PROXIMA
      </Link>

      <nav className="flex gap-5">
        {!user && (
          <div className="flex gap-5">
            <Link to="/login" className="hover:text-sky-400 duration-300">
              Login
            </Link>
            <Link to="/signup" className="hover:text-sky-400 duration-300">
              Signup
            </Link>
          </div>
        )}

        {user && (
          <div className="flex content-center gap-5 mr-5">
            <span className="content-center">{user.email}</span>

            <button
              onClick={handleLogout}
              type="submit"
              className="bg-red-500 text-white py-2 px-2 rounded-lg hover:bg-sky-50 hover:text-slate-900 duration-300 capitalize"
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
