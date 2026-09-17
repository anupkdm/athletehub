import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.getMe()
        .then(res => {
          if (res.success) {
            setUser(res.user);
            setProfile(res.profile);
          } else {
            logout();
          }
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [token]);

  const login = async (email, password) => {
    const res = await api.login(email, password);
    if (res.success) {
      localStorage.setItem('token', res.token);
      setToken(res.token);
      setUser(res.user);
      const me = await api.getMe();
      if (me.success) setProfile(me.profile);
    }
    return res;
  };

  const register = async (data) => {
    const res = await api.register(data);
    if (res.success) {
      localStorage.setItem('token', res.token);
      setToken(res.token);
      setUser(res.user);
      const me = await api.getMe();
      if (me.success) setProfile(me.profile);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setProfile(null);
  };

  return (
    <AuthContext.Provider value={{ user, profile, token, loading, login, register, logout, setUser, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
