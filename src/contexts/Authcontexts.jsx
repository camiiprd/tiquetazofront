
import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest } from "../../src/api/auth.js";
import Cookies from "js-cookie"; // Puedes eliminar esta importación si no usas cookies

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Inicializa el estado con los datos de localStorage si existen
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signUp = async (user) => {
    setLoading(true); 
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error.response);
      setErrors(error.response.data);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (user) => {
    setLoading(true);
    try {
      const res = await loginRequest(user);
      console.log(res);
      
      // Guarda el token en localStorage
      localStorage.setItem('token', res.data.token); // Guardar el token en localStorage
      // Guarda el usuario en localStorage
      localStorage.setItem('user', JSON.stringify(res.data)); // Guardar el usuario en localStorage

      // Actualiza el estado
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        return setErrors(error.response.data);
      }
      setErrors([error.response.data.message]);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token'); // Eliminar token de localStorage
    localStorage.removeItem('user'); // Eliminar usuario de localStorage
    setIsAuthenticated(false);
    setUser(null);
  };

  useEffect(() => {
    async function checkLogin() {
      setLoading(true);
      
      // Verifica si el token está en localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        // Verifica el token en el backend
        const res = await verifyTokenRequest(token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        // Si el token es válido, recupera los datos del usuario
        const userData = JSON.parse(localStorage.getItem('user'));
        setIsAuthenticated(true);
        setUser(userData);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider value={{ signUp, signIn, logout, loading, user, isAuthenticated, errors }}>
      {children}
    </AuthContext.Provider>
  );
};
