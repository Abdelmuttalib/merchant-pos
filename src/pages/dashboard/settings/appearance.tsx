import DashboardLayout from "@/components/layout/dashboard-layout";

import { useRouter } from "next/router";
import Link from "next/link";
import {
  ThemeColorSelect,
  ThemeModeSelect,
} from "@/components/theme-color-select";

const settingsPaths = [
  {
    name: "General",
    href: "/dashboard/settings/general",
  },
  //   { name: "Account", href: "/dashboard/settings/account" },
  {
    name: "Appearance",
    href: "/dashboard/settings/appearance",
  },
  //   { name: "Notifications", href: "#", current: false },
  //   { name: "Billing", href: "#", current: false },
  //   { name: "Integrations", href: "#", current: false },
];

export default function AppearanceSettings() {
  const { pathname } = useRouter();
  return (
    <DashboardLayout pageTitle="Appearance">
      <div>
        <div className="flex flex-col">
          <div className="w-full">
            <ul className="relative flex w-full border-b text-sm">
              {settingsPaths.map((path) => {
                const isActive = path.href === pathname;
                return (
                  <li
                    key={path.name}
                    className={`${isActive ? "border-b-2 border-primary" : ""}`}
                  >
                    <Link
                      href={path.href}
                      className={`${
                        isActive ? "text-foreground" : "text-foreground-lighter"
                      } mb-2 block rounded-md px-3.5 py-2.5 hover:bg-accent-hover/70`}
                    >
                      {path.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex w-full items-end justify-between py-8">
            <div className="space-y-0.5">
              <h3 className="text-xl font-medium">Appearance settings</h3>
              <p className="text-sm text-foreground-lighter">
                View and update your preferences
              </p>
            </div>
          </div>
        </div>
        {/* settings */}
        <div>
          <div className="border-wedges-gray-100 border-b py-6 text-sm lg:flex lg:items-start">
            <div className="mb-1 space-y-1 lg:mb-0 lg:mr-5 lg:w-2/5 lg:flex-shrink-0">
              <h3 className="text-foreground">Theme mode</h3>
              <p className="max-w-[420px] text-foreground-lighter">
                Choose a theme mode for your store
              </p>
            </div>
            <div className="lg:flex-grow">
              <ThemeModeSelect className="w-full" />
            </div>
          </div>
          <div className="border-wedges-gray-100 border-b py-6 text-sm lg:flex lg:items-start">
            <div className="mb-1 space-y-1 lg:mb-0 lg:mr-5 lg:w-2/5 lg:flex-shrink-0">
              <h3 className="text-foreground">Theme color</h3>
              <p className="max-w-[420px] text-foreground-lighter">
                Choose a color theme for your store
              </p>
            </div>
            <div className="lg:flex-grow">
              <ThemeColorSelect className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
