import * as React from "react";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { HomeIcon, SettingsIcon, StoreIcon } from "../icons";
import { IconButton } from "../ui/icon-button";
import { Bell, Plus, Search } from "lucide-react";
import { Button } from "../ui/button";
import { NotificationsDialog } from "../notifications/notifications-dialog";
import Seo from "../seo";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NewItemFormDialog } from "../views/item/item-form";

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const dashboardLinks = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: <HomeIcon />,
  },
  {
    href: "/dashboard/products",
    label: "Products",
    icon: <StoreIcon />,
  },
  {
    href: "/dashboard/settings/general",
    label: "Settings",
    icon: <SettingsIcon />,
    subLinks: [
      {
        href: "/dashboard/settings/general",
        label: "General",
      },
      {
        href: "/dashboard/settings/appearance",
        label: "Appearance",
      },
    ],
  },
  // {
  //   href: "/dashboard/profile",
  //   label: "Profile",
  // },
];


export default function DashboardLayout({
  children,
  pageTitle,
}: DashboardLayoutProps) {
  const { pathname } = useRouter();
  return (
    <>
    {/* rgba(10, 15, 15, 1) */}
    {/* bg-[rgba(10,15,15,255)] */}
      <Seo title={pageTitle} />
      <div className="fixed inset-0 flex h-full w-full">
        <aside className="w-72 px-6 py-7">
          <nav>
            <div className="flex items-center gap-x-6 px-5">
              <h3 className="text-2xl font-bold uppercase tracking-tight text-foreground-light">
                UTAK
                <span className="font-medium text-primary-400">
                  POS
                  {/* Securico */}
                </span>
              </h3>
              {/* <span className="text-gray-400">
              POS
            </span> */}
            </div>
            <ul className="px-2 py-10">
              {dashboardLinks.map((link) => {
                const isActive = link.href === pathname;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-x-3 rounded-md px-3 py-2 font-medium text-foreground-light hover:bg-accent-hover/60",
                        {
                          "bg-accent-hover/60 text-primary": isActive,
                        },
                      )}
                    >
                      <span className="text-foreground-muted">{link.icon}</span>
                      <span className="mt-0.5 text-sm">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
              {/* <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b-0">
                  <AccordionTrigger
                    className={cn(
                      "flex items-center gap-x-3 rounded-md px-3 py-2 font-medium text-foreground-light hover:bg-accent-hover/60 hover:no-underline",
                      {
                        "bg-accent-hover/60 text-primary": false,
                      },
                    )}
                  >
                   <span className="inline-flex items-center gap-x-3">
                   <span className="text-foreground-muted">{dashboardLinks[2].icon}</span>
                   <span className="mt-0.5 text-sm">{dashboardLinks[2].label}</span>
                   </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    {dashboardLinks[2]?.subLinks?.map((link) => {
                      const isActive = link.href === pathname;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "flex items-center gap-x-3 rounded-md px-3 py-2 font-medium text-foreground-light hover:bg-accent-hover/60",
                            {
                              "bg-accent-hover/60 text-primary": isActive,
                            },
                          )}
                        >
                          <span className="mt-0.5 text-sm pl-9">{link.label}</span>
                        </Link>
                      );
                    })}
                  </AccordionContent>
                </AccordionItem>
              </Accordion> */}
            </ul>
          </nav>
        </aside>
        <div className="flex h-full w-full flex-1 flex-col overflow-y-scroll">
          <DashboardHeader pageTitle={pageTitle} />
          <main className="flex-1 py-2">
            <Container>{children}</Container>
          </main>
          <DashboardFooter />
        </div>
      </div>
    </>
  );
}

function DashboardHeader({ pageTitle }: { pageTitle: string }) {
  return (
    <header className="mt-auto flex h-20 w-full flex-shrink-0 items-center">
      <Container className="w-full">
        <div className="flex h-full w-full items-center justify-between">
          <h1 className="text-2xl font-medium">{pageTitle}</h1>
          <div className="space-x-1">
            <IconButton
              size="xs"
              variant="ghost"
              className="text-foreground-muted"
            >
              <Search className="w-5" />
            </IconButton>
            {/* notifications */}
            <NotificationsDialog />
            <NewItemFormDialog />
          </div>
        </div>
      </Container>
    </header>
  );
}

function DashboardFooter() {
  return (
    <footer className="mt-auto h-14 flex-shrink-0 border-t">
      <Container>
        <div className="flex h-full items-center justify-between">footer</div>
      </Container>
    </footer>
  );
}
