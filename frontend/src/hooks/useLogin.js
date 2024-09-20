import React from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = React.useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async ({ username, password }) => {
    const success = handleInputError({
      username,
      password,
    });
    if (!success) return;

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;

function handleInputError({ username, password }) {
  //   console.log(username);
  if (!username || !password) {
    toast.error("Please fill all the fields");
    return false;
  }

  return true;
}
