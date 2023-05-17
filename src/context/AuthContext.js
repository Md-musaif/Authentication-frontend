import PropTypes from 'prop-types';
import React, { createContext, useLayoutEffect, useState } from 'react';
import axios from '../utils/axiosInstance';

export const AuthContext = createContext({
  user: null,
  isInitialized: false,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => {},
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInialized] = useState(false);
  const getUser = (signal) =>
    axios
      .get('/api/v1/users/user', { signal })
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setIsInialized(true));

  useLayoutEffect(() => {
    const controller = new AbortController();
    setIsInialized(); 
    getUser(controller.signal);
    return () => {
      controller.abort();
    };
  }, []);

  const register = (values) =>
    axios
      .post('/api/v1/aut/register', values)
      .then(async (res) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        await getUser();
        return res.data;
      })
      .catch((e) => {
        throw new Error(e.response?.data.message || e.message);
      });

  const login = async (values) =>
    axios
      .post('/api/v1/aut/login', values)
      .then(async (res) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        await getUser();
        return res;
      })
      .catch((e) => {
        throw new Error(e.response?.data.message || e.message);
      });
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, register, login, logout, isInitialized }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
