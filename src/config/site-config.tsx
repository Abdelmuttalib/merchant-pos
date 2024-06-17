import { HomeIcon, SettingsIcon, StoreIcon } from "@/components/icons";
import { Package } from "lucide-react";

export const siteConfig = {
  name: "UTAK POS",
  title: "UTAK POS",
  description:
    "UTAK POS is a point of sale system for businesses. UTAK POS is designed to be simple and easy to use, with features that help you manage your business more efficiently.",
  type: "website",
  logo: "/favicon.ico",
  siteUrl: "",
  //   navItems: [
  //     {
  //       href: "/",
  //       label: "Home",
  //     },
  //     {
  //       href: "/about",
  //       label: "About",
  //     },
  //     {
  //       href: "/dashboard",
  //       label: "Dashboard",
  //     },
  //   ],
  navItems: ["Services", "About", "Contact"],
  dashboardLinks: [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: <HomeIcon />,
    },
    {
      href: "/dashboard/menu",
      label: "Menu",
      icon: <Package className="h-5 w-5" />,
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
  ],

  // Add or remove footer links
  footerLinks: [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
    },
  ],
};
