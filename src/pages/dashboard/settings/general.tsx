import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/router";

const settingsPaths = [
  {
    name: "General",
    href: "/dashboard/settings/general",
  },
  {
    name: "Appearance",
    href: "/dashboard/settings/appearance",
  },
];

export default function GeneralSettings() {
  const { pathname } = useRouter();

  return (
    <DashboardLayout pageTitle="General">
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
              <h3 className="text-xl font-medium">Store settings</h3>
              <p className="text-sm text-foreground-lighter">
                View and update your store details
              </p>
            </div>
            <div>
              <Button variant="primary">Save Changes</Button>
            </div>
          </div>
        </div>
        {/* settings */}
        <div>
          {/* record */}
          <div className="border-wedges-gray-100 border-b py-6 text-sm lg:flex lg:items-start">
            <div className="mb-1 space-y-1 lg:mb-0 lg:mr-5 lg:w-2/5 lg:flex-shrink-0">
              <h3 className="text-foreground">
                Store name <span className="text-red-500">*</span>
              </h3>
              <p className="max-w-[420px] text-foreground-lighter">
                Appears on receipts, invoices, and more{" "}
              </p>
            </div>
            <div className="lg:flex-grow">
              <Input
                id="input_name"
                type="text"
                className=""
                placeholder="store name"
              />
            </div>
          </div>

          {/* record */}
          <div className="border-wedges-gray-100 border-b py-6 text-sm lg:flex lg:items-start">
            <div className="mb-1 space-y-1 lg:mb-0 lg:mr-5 lg:w-2/5 lg:flex-shrink-0">
              <h3 className="text-foreground">
                Email <span className="text-red-500">*</span>
              </h3>
              <p className="max-w-[420px] text-foreground-lighter">
                Contact email address
              </p>
            </div>
            <div className="lg:flex-grow">
              <Input
                id="input_name"
                type="text"
                className=""
                placeholder="store name"
              />
            </div>
          </div>
          {/* record */}
          <div className="border-wedges-gray-100 border-b py-6 text-sm lg:flex lg:items-start">
            <div className="mb-1 space-y-1 lg:mb-0 lg:mr-5 lg:w-2/5 lg:flex-shrink-0">
              <h3 className="text-foreground">
                Contact number <span className="text-red-500">*</span>
              </h3>
              <p className="max-w-[420px] text-foreground-lighter">
                {/* description for contact number field */}
                Contact number for your store
              </p>
            </div>
            <div className="lg:flex-grow">
              <Input
                id="input_name"
                type="text"
                className=""
                placeholder="store name"
              />
            </div>
          </div>
          {/* record */}
          <div className="border-wedges-gray-100 border-b py-6 text-sm lg:flex lg:items-start">
            <div className="mb-1 space-y-1 lg:mb-0 lg:mr-5 lg:w-2/5 lg:flex-shrink-0">
              <h3 className="text-foreground">
                Address <span className="text-red-500">*</span>
              </h3>
              <p className="max-w-[420px] text-foreground-lighter">
                {/* description for contact number field */}
                Address for your store
              </p>
            </div>
            <div className="lg:flex-grow flex gap-x-4">
              <Input
                id="input_address"
                type="text"
                className=""
                placeholder="address"
              />

              {/* <div className="flex items-center space-x-2 mt-2"> */}
              <Input
                id="input_city"
                type="text"
                className=""
                placeholder="city"
              />
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
