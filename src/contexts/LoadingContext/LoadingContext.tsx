import { createContext, useEffect, useState } from "react";

import { ILoadingContext } from "./LoadingContext.types";
import { IProps } from "../../config.types";

const defaultLoadingContext: ILoadingContext = {
  loading: false,
  setLoading: (_) => {},
};

const LoadingContext = createContext<ILoadingContext>(defaultLoadingContext);

const LoadingProvider = ({ children }: IProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
