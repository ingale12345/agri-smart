import { useMutation } from "@tanstack/react-query";
import { loginUser } from "./authAPI";

import { useNavigate } from "react-router-dom";
import { saveAuthToStorage } from "../../utils/storage";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: loginUser,
    onSuccess: ({ accessToken, user }) => {
      saveAuthToStorage(accessToken, user);
      navigate("agri-smart");
    },
  });
};
