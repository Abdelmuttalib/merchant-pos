import DashboardLayout from "@/components/layout/dashboard-layout";
import { SettingsLayout } from "@/components/settings";

export default function Settings() {
  return (
    <DashboardLayout pageTitle="Settings">
      <SettingsLayout />
    </DashboardLayout>
  );
}