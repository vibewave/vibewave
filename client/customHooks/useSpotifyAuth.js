import {useState, useEffect} from 'react'
import axios from 'axios'

export default function useAuth(authCode) {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  // Initial authentication
  useEffect(() => {
    authenticate(authCode);
  }, [authCode]);

  // Re-authentication using refresh token every hour
  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const reAuthInterval = setInterval(() => {
      reAuthenticate();
    }, ((expiresIn ?? 3600) - 60) * 1000);

    return () => clearInterval(reAuthInterval);
  }, [refreshToken, expiresIn]);


  const authenticate = async (code) => {
    try {
      const { data } = await axios.post(`http://localhost:3032/spotify/login`, {code});
      setAccessToken(data.accessToken);
      setRefreshToken(data.refreshToken);
      setExpiresIn(data.expiresIn);
      window.history.pushState({}, '', '/');
    }
    catch {
      window.location.href = '/';
    }
  }

  const reAuthenticate = async () => {
    try {
      const { data }  = await axios.post(`http://localhost:3032/spotify/refresh`, {refreshToken});
      setAccessToken(data.accessToken);
      setExpiresIn(data.expiresIn);
    }
    catch {
      window.location.href = '/';
    }
  }

  return accessToken;
}

