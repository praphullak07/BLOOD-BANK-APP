import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import API from '../../services/API';
import { getCurrentUser } from '../../redux/features/auth/authAction';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const { data } = await API.get('/auth/current-user');
      if (data?.success) {
        dispatch(getCurrentUser(data));
      } else {
        throw new Error('User not authenticated');
      }
    } catch (error) {
      console.error(error);
      return <Navigate to="/login" />;
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (localStorage.getItem('token')) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
