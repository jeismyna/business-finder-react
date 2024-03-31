import { useState, useCallback, useMemo } from "react";
import useAxios from "../../hooks/useAxios";
import { login, signup, getUserData } from "../services/usersApiService";
import {
  getUser,
  removeToken,
  setTokenInLocalStorage,
} from "../services/localStorageService";
import { useUser } from "../providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import normalizeUser from "../helpers/normalization/normalizeUser";

const useUsers = () => {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userFull, setUserFull] = useState(null);

  const navigate = useNavigate();
  const { user, setUser, setToken } = useUser();

  useAxios();

  const requestStatus = useCallback(
    (loading, errorMessage, user = null) => {
      setLoading(loading);
      setUser(user);
      setError(errorMessage);
    },
    [setUser]
  );

  //this is in order to differentiate between token data which should only contain basic details and full user details which are relevant for this page only and we don't want to carry it to other pages.
  const requestStatusGetUserFull = useCallback(
    (loading, errorMessage, userFull = null) => {
      setLoading(loading);
      setUserFull(userFull);
      setError(errorMessage);
    },
    [setUserFull]
  );

  const handleLogin = useCallback(async (user) => {
    try {
      const token = await login(user);
      setTokenInLocalStorage(token);
      setToken(token);
      const userFromLocalStorage = getUser();
      requestStatus(false, null, userFromLocalStorage);
      navigate(ROUTES.ROOT);
    } catch (error) {
      requestStatus(false, error, null);
    }
  }, []);

  const handleCheckToken = useCallback(() => {
    if (!getUser()) {
      handleLogout();
      navigate(ROUTES.ROOT);
    }
  }, [setUser]);

  const handleLogout = useCallback(() => {
    removeToken();
    setUser(null);
    setToken(null);
  }, [setUser]);

  const handleSignup = useCallback(
    async (userFromClient) => {
      try {
        const normalizedUser = normalizeUser(userFromClient);
        await signup(normalizedUser);
        await handleLogin({
          email: userFromClient.email,
          password: userFromClient.password,
        });
      } catch (error) {
        requestStatus(false, error, null);
      }
    },
    [requestStatus, handleLogin]
  );

  //handleGetUser
  const handleGetUser = useCallback(async (userId) => {
    try {
      setLoading(true);
      handleCheckToken();
      const user = await getUserData(userId);
      requestStatusGetUserFull(false, null, user);
      return user;
    } catch (error) {
      requestStatusGetUserFull(false, error, null);
    }
  }, []);

  const value = useMemo(
    () => ({ isLoading, error, user }),
    [isLoading, error, user]
  );

  const valueResolvedUser = useMemo(
    () => ({ userFull }),
    [userFull]
  );

  return {
    value,
    valueResolvedUser,
    handleLogin,
    handleCheckToken,
    handleLogout,
    handleSignup,
    handleGetUser,
  };
};

export default useUsers;
