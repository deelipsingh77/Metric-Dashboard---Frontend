"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import routes from "@/utils/routes";

export function Sidebar({ className }) {
  const path = usePathname();
  const router = useRouter();

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          {/* <h2 className="mb-2 px-4 text-2xl text-center font-semibold tracking-tight">
            {title}
          </h2> */}
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.route}
                onClick={() => router.push(route.route)}
                variant="ghost"
                className={cn(
                  "w-full flex justify-start",
                  path === route.route && "bg-gray-100 text-slate-800"
                )}
              >
                {route.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
