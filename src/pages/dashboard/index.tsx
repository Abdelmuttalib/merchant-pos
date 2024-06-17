import TailwindChart from "@/components/chart";
import DashboardLayout from "@/components/layout/dashboard-layout";
import Typography from "@/components/ui/typography";
import CategoriesView from "@/components/views/category/categories-view";
import ItemsView from "@/components/views/item/items-view";
import * as React from "react";

export default function Dashboard() {
  return (
    <DashboardLayout pageTitle="Home">
      <div className="flex flex-col gap-y-14">
        {/* <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2">
          <TailwindChart className="rounded-md border-2" />
          <TailwindChart className="rounded-md border-2" />
        </div> */}
        <div className="space-y-6">
          <Typography as="h2" variant="lg/medium">
            Menu Items
          </Typography>
          <ItemsView />
        </div>
        <div className="space-y-6">
          <Typography as="h2" variant="lg/medium">
            Categories
          </Typography>
          <CategoriesView />
        </div>
      </div>
    </DashboardLayout>
  );
}
