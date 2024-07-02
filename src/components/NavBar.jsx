"use client";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./DarkMode";
import routes from "@/utils/routes";
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

const NavBar = () => {
  const path = usePathname();
  const [title, setTitle] = useState("");
  const { logout, user } = useAuth();
  console.log(user);

  useEffect(() => {
    // Find the route object that matches the current path
    const route = routes.find((route) => route.route === path);
    if (route) {
      setTitle(route.name); // Set the title based on matched route
    }
  }, [path]);

  return (
    <nav>
      <div className="flex justify-between gap-2 items-center">
        <h1 className="text-3xl font-bold p-1 min-w-max">{title}</h1>
        <ul className="flex justify-center gap-6 items-center grow">
          {routes.map((route) => (
            <li key={route.route}>
              <Link
                href={route.route}
                className={clsx("hover:text-slate-400", {
                  "bg-white text-black px-2 py-1 rounded-xl":
                    path === route.route,
                })}
              >
                {route.name}
              </Link>
            </li>
          ))}
          <li>
            <Button variant="destructive" onClick={() => logout()}>
              Logout
            </Button>
          </li>
        </ul>
        <div className="flex justify-center items-center gap-3">
          {user?.photoURL && (
            <Image width={30} height={30} src={user?.photoURL} alt="Profile Pic" className="rounded-full" />
          )}
          <div>{user?.displayName}</div>
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};
export default NavBar;
