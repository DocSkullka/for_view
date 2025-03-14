import { useContext } from "react";
import { NotistackContext } from "./NotistackProvider";

export const useSnackbar = () => {
  const context = useContext(NotistackContext);

  if (!context) {
    throw Error("Not found NotistackContext context");
  }

  return context;
};
