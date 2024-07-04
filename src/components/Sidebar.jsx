"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
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
              route.subRoutes ? (
                <Accordion key={route.route} type="single" className="mx-4" collapsible>
                  <AccordionItem key={route.route} value={route.route}>
                    <AccordionTrigger className="">{route.name}</AccordionTrigger>
                    <AccordionContent>
                      {route.subRoutes.map((subRoute) => (
                        <Button
                          key={subRoute.route}
                          onClick={() => router.push(subRoute.route)}
                          variant="ghost"
                          className={cn(
                            "w-full flex justify-start",
                            path === subRoute.route && "bg-gray-100 text-slate-800"
                          )}
                        >
                          {subRoute.name}
                        </Button>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
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
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
