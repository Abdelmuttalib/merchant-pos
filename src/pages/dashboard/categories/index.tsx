import DashboardLayout from "@/components/layout/dashboard-layout";
import CategoriesView from "@/components/views/category/categories-view";

export default function CategoriesPage() {
  return (
    <DashboardLayout pageTitle="Categories">
      <CategoriesView />
    </DashboardLayout>
  );
}
