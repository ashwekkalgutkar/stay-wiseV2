"use client";
import Header from "../components/Header";
import { useAuthModal } from "../context/AuthModalContext";
import AuthModal from "../components/AuthModal";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { modal, closeModal } = useAuthModal();
  return (
    <>
      <Header />
      {children}
      <AuthModal open={modal.open} onClose={closeModal} mode={modal.mode} />
    </>
  );
}
