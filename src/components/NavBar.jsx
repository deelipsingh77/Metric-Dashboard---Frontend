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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHamburger } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const path = usePathname();
  const [title, setTitle] = useState("");
  const { logout, user } = useAuth();

  useEffect(() => {
    // Find the route object that matches the current path
    const route = routes.find((route) => route.route === path);
    if (route) {
      setTitle(route.name); // Set the title based on matched route
    }
  }, [path]);

  return (
    <nav>
      <div className="flex justify-between gap-2 items-center mx-4">
        <div className="flex items-center gap-2">
          <div className="sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <FontAwesomeIcon icon={faBars} />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Menu</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {routes.map((route) => (
                  <DropdownMenuItem key={route.route}>
                    <Link href={route.route}>{route.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <h1 className="text-3xl font-bold p-1 min-w-max">{title}</h1>
        </div>
        {/* <ul className="flex justify-center gap-6 items-center grow">
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
        </ul> */}

        <div className="flex justify-center items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex justify-center items-center gap-3">
                {user?.photoURL && (
                  <Image
                    width={30}
                    height={30}
                    src={user?.photoURL}
                    alt="Profile Pic"
                    className="rounded-full"
                  />
                )}
                <div>{user?.displayName || user?.email}</div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <button onClick={() => logout()}>Logout</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
export default NavBar;
