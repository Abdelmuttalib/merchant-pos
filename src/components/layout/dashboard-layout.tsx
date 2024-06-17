import * as React from "react";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { HomeIcon, SettingsIcon, SquaresIcon, StoreIcon } from "../icons";
import { IconButton } from "@/components/ui/icon-button";
import { AlignJustifyIcon, Bell, MenuIcon, Plus, Search } from "lucide-react";
import { NotificationsDialog } from "../notifications/notifications-dialog";
import Seo from "../seo";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { NewItemFormDialog } from "@/components/views/item/item-form";
import Typography from "@/components/ui/typography";
import { siteConfig } from "@/config/site-config";
import { sitePaths } from "@/lib/site-paths";
import { CustomDialog } from "../ui/animated-dialog";
import { MobileSidebarNav } from "./mobile-sidebar-nav";

interface DashboardLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const dashboardLinks = [
  {
    href: sitePaths.dashboard.home,
    label: "Dashboard",
    icon: <HomeIcon />,
  },
  {
    href: sitePaths.dashboard.menu.home,
    label: "Menu",
    icon: <StoreIcon />,
  },
  {
    href: sitePaths.dashboard.categories.home,
    label: "Categories",
    icon: <SquaresIcon />,
  },
  {
    href: sitePaths.dashboard.settings.home,
    label: "Settings",
    icon: <SettingsIcon />,
    subLinks: [
      {
        href: sitePaths.dashboard.settings.general,
        label: "General",
      },
      {
        href: sitePaths.dashboard.settings.appearance,
        label: "Appearance",
      },
    ],
  },
];

{
  /* rgba(10, 15, 15, 1) */
}
{
  /* bg-[rgba(10,15,15,255)] */
}

export default function DashboardLayout({
  children,
  pageTitle,
}: DashboardLayoutProps) {
  const { pathname } = useRouter();
  return (
    <>
      <Seo title={pageTitle} />
      <div className="fixed inset-0 flex h-full w-full">
        <aside className="hidden lg:block w-72 px-6 py-7">
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
                        "flex items-center gap-x-3 rounded-lg px-3 py-2 font-medium text-foreground-light hover:bg-accent-hover/60",
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
        <div className="flex h-full w-full flex-1 flex-col overflow-y-scroll relative">
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

export function SidebarNav() {
  const { pathname } = useRouter();

  return (
    <aside className="lg:w-72 lg:px-6 lg:py-7">
      <nav>
        <div className="items-center gap-x-6 flex px-2.5 lg:px-5">
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
        <ul className="py-5 lg:px-2 lg:py-10">
          {dashboardLinks.map((link) => {
            const isActive = link.href === pathname;

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-x-3 rounded-lg px-3 py-3 font-medium text-foreground-light hover:bg-accent-hover/60 lg:px-3 lg:py-2",
                    {
                      "bg-accent-hover/60 text-primary": isActive,
                    },
                  )}
                >
                  <span className="text-foreground">{link.icon}</span>
                  <span className="mt-0.5 lg:text-sm">{link.label}</span>
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
  );
}

function DashboardHeader({ pageTitle }: { pageTitle: string }) {
  return (
    <header className="flex h-20 bg-background/[0.8] sticky top-0 backdrop-blur z-40 w-full flex-shrink-0 items-center">
      <Container className="w-full">
        <div className="flex h-full w-full items-center justify-between">
          <div className="flex items-center gap-x-2">
            <div className="block lg:hidden">
              <MobileSidebarNav />
            </div>
            <h1 className="text-2xl font-medium">{pageTitle}</h1>
          </div>
          <div className="space-x-1">
            {/* <IconButton
              size="xs"
              variant="ghost"
              className="text-foreground-muted"
            >
              <Search className="w-5" />
            </IconButton> */}
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
    <footer className="mt-auto flex h-14 flex-shrink-0 items-center border-t">
      <Container>
        <div className="flex h-full items-center justify-between">
          <Typography
            as="p"
            variant="xs/regular"
            className="text-foreground-muted"
          >
            © {new Date().getFullYear()} {siteConfig.name}. All rights
            reserved.
          </Typography>
        </div>
      </Container>
    </footer>
  );
}
