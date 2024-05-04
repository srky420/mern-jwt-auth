import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

export const Signup = () => {

  const navigate = useNavigate();

  // Define cookies
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  // Input state
  const [state, setState] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Use effect
  useEffect(() => {
    if (cookies.token) {
      return navigate('/');
    }
  }, []);

  // Handle onChange of inputs
  const handleOnChange = (e:any) => {
    // Destructure name and value attrs
    const { name, value } = e.target;

    // Set value in input state
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  // Handle error and success toasts
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

  // Handle form submission
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    // Submit the form
    try {
      // POST request to server
      const res = await axios.post('http://localhost:3000/signup',
        {
          username: state.username,
          email: state.email,
          password: state.password
        },
        { withCredentials: true }
      );
      // Get data
      const data = res.data;

      // Check success status
      if (data.success) {
        handleSuccessToast(data.message);
        // Redirect to index after 1 sec
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

    // Reset state
    setState(prevState => ({
      ...prevState,
      username: '',
      email: '',
      password: ''
    }));
  }



  return (
    <div>
        <form onSubmit={handleSubmit}>
            <input type="text" 
              placeholder="Enter Username..." 
              name="username" 
              value={state.username} 
              onChange={handleOnChange} />
            <input type="email" 
              placeholder="Enter Email Address..." 
              name="email" 
              value={state.email} 
              onChange={handleOnChange} />
            <input type="password" 
              placeholder="Enter Password..." 
              name="password"
              value={state.password} 
              onChange={handleOnChange} />
            <input type="submit" value="Sign up" />
        </form>
        <p>Alreay have an account? <Link to={'/login'}>Login</Link></p>
    </div>
  )
}
