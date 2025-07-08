import "bootstrap-icons/font/bootstrap-icons.css";
import { useState } from 'react';
import { Link } from 'react-router-dom';


const NAV_ITEMS = [
  { label: 'Explore', href: '/' },
  { label: 'Blogs', href: '#' },
  { label: 'Features', href: '#' },
  { label: 'Pricing', href: '#' },
];

function Navbar() {
  const [activeLink, setActiveLink] = useState('Explore'); // Default active link

  const checkloggedin: boolean = false;

  return (
    <nav
      className="navbar navbar-expand-lg sticky-top bg-dark bg-gradient shadow-sm"
      aria-label="Main navigation"
    >
      <div className="container-fluid px-4 py-2">
        {/* Brand */}
        <Link
          className="navbar-brand d-flex align-items-center text-white"
          to="#"
          aria-label="WordPress.com homepage"
        >
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
          {checkloggedin ? (
            <>
              <div className="dropdown">
                <button
                  type="button"
                  className="bg-transparent border-0 d-flex align-items-center gap-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="fw-bold text-white">Om Prakash Lenka</span>
                  <i className="bi bi-person-circle"></i>

                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                  <li><Link className="dropdown-item" to="#">Profile</Link></li>
                  <li><Link className="dropdown-item" to="#">Settings</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><Link className="dropdown-item text-danger" to="#">Logout</Link></li>
                </ul>
              </div>

            </>
          ) : (
            <>
              <div className="d-flex align-items-center gap-3">
                <Link
                  to="/login"
                  className="btn btn-link text-white text-decoration-none px-3"
                  aria-label="Log in to your WordPress.com account"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="btn btn-primary fw-bold px-4"
                  aria-label="Sign up for WordPress.com"
                >
                  Get Started
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;