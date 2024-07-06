"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/Loading";

const AuthRedirect = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.replace("/user/dashboard");
    }
  }, [user, router]);

  if (user) {
    return (
        <Loading />
    );
  }

  return children;
};

export default AuthRedirect;
