import { useRouter } from "next/router";
import { Input } from "./ui/input";
import Link from "next/link";
import { Button } from "./ui/button";

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

export function SettingsLayout() {
  const { pathname } = useRouter();
  return (
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
                    } hover:bg-accent-hover/70 mb-2 block rounded-md px-3.5 py-2.5`}
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
            <p className="text-foreground-lighter text-sm">
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
            <p className="text-foreground-lighter max-w-[420px]">
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
            <p className="text-foreground-lighter max-w-[420px]">
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
            <p className="text-foreground-lighter max-w-[420px]">
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
      </div>
    </div>
  );
}
