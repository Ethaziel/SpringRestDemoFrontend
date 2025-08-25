import { createContext, useContext, useState, useEffect } from "react";
import { fetchGetDataWithAuth } from "client/client"; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token"); // or however you store it
      if (!token) {
        setLoading(false);
        return; // no user, skip profile fetch
      }

      try {
        const response = await fetchGetDataWithAuth("/auth/profile");
        setUser(response.data);
      } catch (error) {
        console.error("Failed to load profile:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
