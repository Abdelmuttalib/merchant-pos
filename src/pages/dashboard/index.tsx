import TailwindChart from "@/components/chart";
import DashboardLayout from "@/components/layout/dashboard-layout";
import ItemsView from "@/components/views/item/items-view";
import * as React from "react";

export default function Dashboard() {
  return (
    <DashboardLayout pageTitle="Home">
      <div className="flex flex-col gap-y-10">
        <div className="grid w-full grid-cols-1 lg:grid-cols-2 gap-4">
          <TailwindChart className="rounded-md border-2" />
          <TailwindChart className="rounded-md border-2" />
        </div>
        <div>
          <ItemsView />
        </div>
      </div>
    </DashboardLayout>
  );
}
