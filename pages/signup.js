// pages/register.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import '../app/assets/css/bootstrap.min.css';
import '../app/assets/css/all.min.css';
import '../app/assets/css/uf-style.css';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
      setIsFormValid(
        updatedData.name &&
        updatedData.email &&
        updatedData.phone &&
        updatedData.password &&
        updatedData.confirmPassword &&
        updatedData.password === updatedData.confirmPassword
      );
      return updatedData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
      alert('Signup Successful! Redirecting to login...');
      router.push('/login');
    } else {
      alert('Passwords do not match!');
    }
  };

  return (
    <>
      <Head>
        <title>Register Form</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/asset/favicon.png" />
      </Head>

      {/* Full-height container with Flexbox to center the form */}
      <div className="d-flex align-items-center justify-content-center min-vh-100">
        <div className="uf-form-signin p-4 shadow-lg rounded" style={{ maxWidth: '450px', width: '100%' }}>
          <div className="text-center mb-3">
            <a href="https://uifresh.net/">
              <img src="/asset/logo-fb.png" alt="Logo" width="100" height="100" />
            </a>
            <h1 className="h3">Create an Account</h1>
          </div>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="input-group uf-input-group input-group-lg mb-3">
              <span className="input-group-text fa fa-user"></span>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                placeholder="Your name"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group uf-input-group input-group-lg mb-3">
              <span className="input-group-text fa fa-envelope"></span>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                placeholder="Email address"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group uf-input-group input-group-lg mb-3">
              <span className="input-group-text fa fa-phone"></span>
              <input
                type="text"
                className="form-control"
                name="phone"
                value={formData.phone}
                placeholder="Your phone"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group uf-input-group input-group-lg mb-3">
              <span className="input-group-text fa fa-lock"></span>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                placeholder="Password"
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group uf-input-group input-group-lg mb-3">
              <span className="input-group-text fa fa-lock"></span>
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                value={formData.confirmPassword}
                placeholder="Confirm Password"
                onChange={handleInputChange}
              />
            </div>
            <div className="d-grid mb-4">
              <button
                type="submit"
                className="btn uf-btn-primary btn-lg"
                disabled={!isFormValid}
              >
                Sign Up
              </button>
            </div>
            <div className="text-center">
              <span>Already have an account?</span>
              <Link href="/login" className="ms-2">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
