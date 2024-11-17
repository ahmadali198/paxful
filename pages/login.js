import Link from 'next/link';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import '../app/assets/css/bootstrap.min.css';
import '../app/assets/css/all.min.css';
import '../app/assets/css/uf-style.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    if (name === 'rememberMe') setRememberMe(e.target.checked);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Placeholder for login authentication logic.
    Cookies.set('authToken', 'yourAuthTokenHere', { expires: rememberMe ? 7 : 1 });

    // Redirect to trade history page
    router.push('/tradehistory');
  };

  return (
    <>
      <Head>
        <title>Login Form</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/asset/favicon.png" />
      </Head>

      {/* Centering wrapper */}
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="uf-form-signin text-center p-4" style={{ maxWidth: '400px', width: '100%' }}>
          <a href="https://uifresh.net/">
            <img src="/asset/logo-fb.png" alt="Logo" width="100" height="100" className="mb-3" />
          </a>
          <h1 className="text-white h3 mb-4">Account Login</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-group uf-input-group input-group-lg mb-3">
              <span className="input-group-text fa fa-user"></span>
              <input
                type="text"
                className="form-control"
                placeholder="Username or Email address"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </div>
            <div className="input-group uf-input-group input-group-lg mb-3">
              <span className="input-group-text fa fa-lock"></span>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </div>
            <div className="d-flex mb-3 justify-content-between">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input uf-form-check-input"
                  id="rememberMe"
                  name="rememberMe"
                  checked={rememberMe}
                  onChange={handleInputChange}
                />
                <label className="form-check-label text-white" htmlFor="rememberMe">
                  Remember Me
                </label>
              </div>
            </div>
            <div className="d-grid mb-4">
              <button type="submit" className="btn uf-btn-primary btn-lg">Login</button>
            </div>
            <div className="text-center mt-4 text-gray-600">
              <p className="text-white mb-1">
                Forgot your password?{' '}
                <Link href="/forgot-password" className="text-indigo-600 hover:text-indigo-700">
  Reset here
</Link>

              </p>
            </div>
            <div className="d-flex mb-3">
              <div className="dropdown-divider m-auto w-25"></div>
              <small className="text-nowrap text-white">Or login with</small>
              <div className="dropdown-divider m-auto w-25"></div>
            </div>
            <div className="uf-social-login d-flex justify-content-center mb-3">
              <a href="#" className="uf-social-ic" title="Login with Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="uf-social-ic" title="Login with Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="uf-social-ic" title="Login with Google">
                <i className="fab fa-google"></i>
              </a>
            </div>
            <div className="text-center">
              <span className="text-white">Don't have an account?</span>
              <Link href="/signup">
                <span className="text-white"> Sign Up</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
