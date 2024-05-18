import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Home = () => {

  // Define navigate
  const navigate = useNavigate();

  // Define cookies
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  // Define state
  const [state, setState] = useState({
    username: ''
  });

  useEffect(() => {

    // Verify cookie
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate('/login');
      }

      // Send POST req with token
      const { data } = await axios.post(
        'http://localhost:3000',
        {},
        { withCredentials: true }
      );

      const { status, username } = data;

      // Return based on status
      if (status) {
        setState(prevState => ({
          ...prevState,
          username: username
        }));
        return toast.success(`Welcome Back, ${username}`, {
          position: 'bottom-right'
        });
      }
      else {
        return (removeCookie('token'), navigate('/login'));
      }
    }
    verifyCookie();

  }, [cookies, removeCookie]);

  // Handle logout
  const handleLogout = () => {
    removeCookie('token');
    navigate('/login');
    toast.success('Yov have been logged out', {
      position: 'bottom-right'
    });
  };

  return (
    <div>
      <h1>Welcome {state.username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home;
