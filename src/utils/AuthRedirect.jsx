"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

const AuthRedirect = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/user/dashboard");
    }
 }, [user, router]);

  if (user) {
    return null; // or a loading spinner
  }

  return children;
};

export default AuthRedirect;
