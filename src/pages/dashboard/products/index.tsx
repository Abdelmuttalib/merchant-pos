import DashboardLayout from "@/components/layout/dashboard-layout";
import ItemsView from "@/components/views/item/items-view";

export default function ItemsPage() {
  

  return (
    <DashboardLayout pageTitle="Products">
      <ItemsView />
    </DashboardLayout>
  );
}
