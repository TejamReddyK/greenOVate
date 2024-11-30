import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const useFetchData = (apiEndpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Get token from local storage

      if (!token) {
        // If token doesn't exist, navigate to main page
        navigate("/main");
        return;
      }

      try {
        const response = await axios.get(apiEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in the Authorization header
          },
        });

        if (response.status === 401) {
          // If token is invalid, navigate to main page and clear the token
          localStorage.removeItem("token");
          navigate("/main");
          return;
        }

        setData(response.data); // Set the fetched data
        setLoading(false); // Data has been fetched, stop loading
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
        localStorage.removeItem("token");
        navigate("/main");    
      }
    };

    fetchData();
  }, [apiEndpoint, navigate]);

  return { data, loading, error };
};

export default useFetchData;
