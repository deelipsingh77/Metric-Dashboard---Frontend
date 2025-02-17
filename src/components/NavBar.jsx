"use client";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./DarkMode";
import routes from "@/utils/routes";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const path = usePathname();
  const [title, setTitle] = useState("");
  const { logout, user } = useAuth();

  useEffect(() => {
    // Find the route object that matches the current path
    const route = routes.find((route) => route.route === path);
    const subRoute = routes.find((route) =>
      route.subRoutes?.find((subRoute) => subRoute.route === path)
    );
    if (route) {
      setTitle(route.name);
    } else {
      routes.forEach((route) => {
        const subRoute = route.subRoutes?.find(
          (subRoute) => subRoute.route === path
        );
        if (subRoute) {
          setTitle(subRoute.name);
        }
      });
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
                {routes.map((route) =>
                  route.subRoutes ? (
                    <DropdownMenuSub key={route.route}>
                      <DropdownMenuSubTrigger>
                        {route.name}
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent>
                        {route.subRoutes.map((subRoute) => (
                          <DropdownMenuItem key={subRoute.route}>
                            <Link href={subRoute.route}>{subRoute.name}</Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  ) : (
                    <DropdownMenuItem key={route.route}>
                      <Link href={route.route}>{route.name}</Link>
                    </DropdownMenuItem>
                  )
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <h1 className="text-3xl font-bold p-1 min-w-max">{title}</h1>
        </div>

        <div className="flex justify-center items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex justify-center items-center gap-3">
                {user?.photoURL ? (
                  <Image
                    width={30}
                    height={30}
                    src={user?.photoURL}
                    alt="Profile Pic"
                    className="rounded-full"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} />
                )}
                {/* <div>{user?.displayName || user?.email}</div> */}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                {user?.displayName || user?.email}
              </DropdownMenuLabel>
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
