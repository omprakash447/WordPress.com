import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({
      username,
      email,
      password,
    });

    // Here you’d send this data to your backend or handle further logic
  };

  return (
    <div className="bg-white min-vh-100">
      {/* Simple Top Navbar */}
      <nav className="d-flex align-items-center px-4 py-3">
        <Link to="/" className="d-flex align-items-center text-decoration-none">
          <span
            className="d-inline-block rounded-circle text-center bg-primary text-white fw-bold me-2"
            style={{
              width: "40px",
              height: "40px",
              lineHeight: "40px",
              fontSize: "20px",
            }}
          >
            W
          </span>
          <span className="fw-bold text-dark fs-5">WordPress.com</span>
        </Link>
      </nav>

      <div className="d-flex flex-column align-items-center min-vh-100 py-5">
        {/* Reminder Text */}
        <div className="text-center mb-4 px-4">
          <p className="text-muted fs-6">
            Just a little reminder that by continuing with any of the options
            below, you agree to our{" "}
            <a
              href="#"
              className="text-primary text-decoration-none"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="text-primary text-decoration-none"
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* Register Form */}
        <div className="col-10 col-sm-8 col-md-5">
          <div className="card bg-gradient-light shadow-lg border-0">
            <div className="card-body p-5">
              {/* Logo Placeholder */}
              <div className="text-center mb-4">
                <span
                  className="d-inline-block rounded-circle text-center bg-primary text-white fw-bold"
                  style={{
                    width: "60px",
                    height: "60px",
                    lineHeight: "60px",
                    fontSize: "28px",
                  }}
                >
                  W
                </span>
              </div>
              <h2 className="card-title text-center fs-3 fw-bold text-dark mb-4">
                Create an Account on WordPress.com
              </h2>
              <form onSubmit={handleRegister}>
                <div className="mb-4">
                  <label
                    htmlFor="username"
                    className="form-label text-dark"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Enter your username"
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="form-label text-dark"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <small
                    id="emailHelp"
                    className="form-text text-muted"
                  >
                    We'll never share your email.
                  </small>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="form-label text-dark"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <small
                    id="passwordHelp"
                    className="form-text text-muted"
                  >
                    Use 8 or more characters.
                  </small>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100 py-2 mb-3"
                  style={{
                    backgroundColor: "#005ea6",
                    borderColor: "#005ea6",
                  }}
                >
                  Sign Up
                </button>
                <div className="text-center mt-3">
                  <p className="mb-0 text-dark">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary">
                      Log in
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
