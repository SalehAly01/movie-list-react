import { createContext } from "react";

export const AddMovieModalContext = createContext<{
  isModalOpen?: boolean;
  setModalOpen?: (state: boolean) => void;
}>({});
