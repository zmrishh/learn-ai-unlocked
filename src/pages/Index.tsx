
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// This page is just a redirect to the login page
const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return null;
};

export default Index;
