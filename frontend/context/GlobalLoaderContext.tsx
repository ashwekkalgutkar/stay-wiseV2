"use client";
import React, { createContext, useContext, useState } from "react";

interface LoaderContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType>({ loading: false, setLoading: () => {} });

export function useGlobalLoader() {
  return useContext(LoaderContext);
}

export function GlobalLoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
}
