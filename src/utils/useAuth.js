import { useEffect, useState } from "react";
import { getBaseUrl } from "./getBaseUrl";

export default function useAuth() {
  const apiUrl = getBaseUrl();
  const [isLogged, setIsLogged] = useState(null);

  const verifyLogged = async () => {
    try {
      const res = await fetch(apiUrl + "/user/verify-user", {
        credentials: "include",
      });

      const data = await res.json();

      if (data?.msg === true) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    } catch (error) {
      setIsLogged(false);
    }
  };

  useEffect(() => {
    verifyLogged();
  }, []);

  return isLogged;
}
