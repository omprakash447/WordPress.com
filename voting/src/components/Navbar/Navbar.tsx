import "bootstrap-icons/font/bootstrap-icons.css";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UseProvider } from "../../middlewere/authmiddlewere/checkauth";

type User = {
  id: number;
  name: string;
  email: string;
};

const NAV_ITEMS = [
  { label: 'Explore', href: '/' },
  { label: 'Blogs', href: '#' },
  { label: 'Features', href: '#' },
  { label: 'Pricing', href: '#' },
];

function Navbar() {
  const [activeLink, setActiveLink] = useState('Explore');
  const [user, setUser] = useState<User | null>(null);
  const { isloggedin, logout } = UseProvider();

  useEffect(() => {
    const userdataGet = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch("http://localhost:2000/api/auth/user-login", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        console.log("Frontend API result:", result);

        if (response.ok) {
          if (result.result && result.result.length > 0) {
            setUser(result.result[0]);
          } else {
            console.warn("No user data returned from backend.");
          }
        } else {
          console.error(result.message || "Could not fetch user");
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (isloggedin) {
      userdataGet();
    }
  }, [isloggedin]);

  const handelLogout = () => {
    logout();
  };

  console.log("User state:", user);

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-dark bg-gradient shadow-sm" aria-label="Main navigation">
      <div className="container-fluid px-4 py-2">

        {/* Brand */}
        <Link className="navbar-brand d-flex align-items-center text-white" to="#">
          <span
            className="d-inline-block rounded-circle text-center me-2 bg-white text-dark fw-bold"
            style={{
              width: '36px',
              height: '36px',
              lineHeight: '36px',
              fontSize: '22px',
            }}
          >
            W
          </span>
          <span className="fs-4 fw-bold">WordPress.com</span>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible content */}
        <div className="collapse navbar-collapse justify-content-between" id="navbarContent">

          {/* Center nav links */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-4">
            {NAV_ITEMS.map((item) => (
              <li className="nav-item" key={item.label}>
                <Link
                  className={`nav-link text-white fw-medium ${activeLink === item.label ? 'active bg-secondary bg-opacity-25' : ''}`}
                  to={item.href}
                  onClick={() => setActiveLink(item.label)}
                  aria-current={activeLink === item.label ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right buttons */}
          {isloggedin ? (
            user ? (
              <div className="dropdown">
                <button
                  type="button"
                  className="bg-transparent border-0 d-flex align-items-center gap-2 text-white"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="fw-bold">
                    {user.name}
                  </span>
                  <i className="bi bi-person-circle"></i>
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                  <li>
                    <span className="dropdown-item-text">
                      <strong>{user.name}</strong><br />
                      <small className="text-muted">{user.email}</small>
                    </span>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handelLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="text-white">Loading user...</div>
            )
          ) : (
            <div className="d-flex align-items-center gap-3">
              <Link
                to="/login"
                className="btn btn-link text-white text-decoration-none px-3"
              >
                Log In
              </Link>
              <Link
                to="/register"
                className="btn btn-primary fw-bold px-4"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
