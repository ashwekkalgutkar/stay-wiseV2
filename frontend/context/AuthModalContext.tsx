"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthModalState {
  open: boolean;
  mode: "login" | "signup";
}

interface AuthModalContextType {
  modal: AuthModalState;
  openModal: (mode: "login" | "signup") => void;
  closeModal: () => void;
}

const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

export function AuthModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<AuthModalState>({ open: false, mode: "login" });

  const openModal = (mode: "login" | "signup") => setModal({ open: true, mode });
  const closeModal = () => setModal({ ...modal, open: false });

  return (
    <AuthModalContext.Provider value={{ modal, openModal, closeModal }}>
      {children}
    </AuthModalContext.Provider>
  );
}

export function useAuthModal() {
  const context = useContext(AuthModalContext);
  if (!context) throw new Error("useAuthModal must be used within AuthModalProvider");
  return context;
}
