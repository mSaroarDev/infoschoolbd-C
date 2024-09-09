import { useEffect, useState } from "react";
import { getBaseUrl } from "./getBaseUrl";

export const useUserInfo = () => {
  const apiUrl = getBaseUrl();

  const [info, setInfo] = useState();

  useEffect(() => {
    async function userInfo() {
      try {
        const res = await fetch(apiUrl + "/user/info", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setInfo(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    }

    userInfo();
  }, []);

  return info;
};
