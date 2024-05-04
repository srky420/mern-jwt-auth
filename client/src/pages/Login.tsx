import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useCookies } from 'react-cookie';

export const Login = () => {

  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  // State for input values
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  // Use effect
  useEffect(() => {
    if (cookies.token) {
      return navigate('/');
    }
  }, []);

  // Handle input change
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  // Handle success and error toasts
  const handleErrorToast = (msg:string) => {
    toast.error(msg, {
      position: 'bottom-right'
    });
  }
  const handleSuccessToast = (msg:string) => {
    toast.success(msg, {
      position: 'bottom-right'
    });
  }

  // Hanlde form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();

    // Send POST req to server
    try {
      const res = await axios.post('http://localhost:3000/login', 
        {
          email: state.email,
          password: state.password
        },
        { withCredentials: true }
      );

      // Get data from res
      const data = res.data;

      // Check success status
      if (data.success) {
        handleSuccessToast(data.message);
        // Redirect to home page
        setTimeout(() => {
          navigate('/');
        }, 1000);
      }
      else {
        handleErrorToast(data.message);
      }
    }
    catch (e) {
      console.error(e);
    }

    // Reset input state
    setState(prevState => ({
      ...prevState,
      email: '',
      password: ''
    }));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="email" 
          placeholder="Enter Email Address..."
          name="email" 
          onChange={handleChange}
          value={state.email} />
          <input type="password" 
          placeholder="Enter Password..."
          name="password" 
          onChange={handleChange} 
          value={state.password} />
          <input type="submit" value="Login" />
      </form>
      <p>Don't have an account? <Link to={'/signup'}>Sign up</Link></p>
    </div>
  )
}
