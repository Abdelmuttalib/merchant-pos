import TailwindChart from "@/components/chart";
import DashboardLayout from "@/components/layout/dashboard-layout";
import * as React from "react";

export default function Dashboard() {
  return (
    <DashboardLayout pageTitle="Home">
      <div className="grid w-full grid-cols-1 lg:grid-cols-2">
        <TailwindChart className="border-2 rounded-md" />
      </div>
    </DashboardLayout>
  );
}
