import { createContext, useState } from "react";

import { ILoadingContext } from "./LoadingContext.types";
import { IProps } from "../../config.types";

const defaultLoadingContext: ILoadingContext = {
  loading: false,
  displayLoadingCard: false,
  loadingCardText: null,
  setLoading: (_) => {},
  setDisplayLoadingCard: (_) => {},
  setLoadingCardText: (_) => {},
};

const LoadingContext = createContext<ILoadingContext>(defaultLoadingContext);

const LoadingProvider = ({ children }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [displayLoadingCard, setDisplayLoadingCard] = useState<boolean>(false);
  const [loadingCardText, setLoadingCardText] = useState<string | null>(null);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        displayLoadingCard,
        loadingCardText,
        setLoading,
        setDisplayLoadingCard,
        setLoadingCardText,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
