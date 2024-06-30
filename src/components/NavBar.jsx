"use client";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./DarkMode";
import routes from "@/utils/routes";
import { useEffect, useState } from "react";
import Link from "next/link";
import clsx from "clsx";

const NavBar = () => {
  const path = usePathname();
  const [title, setTitle] = useState("");

  useEffect(() => {
    // Find the route object that matches the current path
    const route = routes.find((route) => route.route === path);
    if (route) {
      setTitle(route.name); // Set the title based on matched route
    }
  }, [path]);

  return (
    <nav>
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold p-1 min-w-max">{title}</h1>
        <ul className="flex justify-center gap-6 items-center grow">
          {/* <li>
            <Link
              href="/user/dashboard"
              className={clsx("hover:text-slate-400", {
                "bg-white text-black px-2 py-1 rounded-xl":
                  path === "/user/dashboard",
              })}
            >
              Dashboard
            </Link>
          </li> */}
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
        </ul>
        <ModeToggle />
      </div>
    </nav>
  );
};
export default NavBar;
