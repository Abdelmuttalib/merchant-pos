import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { toast } from "sonner";


export function useCategories() {

  const router = useRouter();

  const apiContext = api.useContext();


  const { data, isLoading, error } = api.menu.categories.getCategories.useQuery();

  async function redirectToCategoriesPage() {
    await router.push("/dashboard/categories");
  }

 
  const createCategory = api.menu.categories.createCategory.useMutation({
    onSuccess: async () => {
      // Invalidate and refetch
      await apiContext.menu.categories.getCategories.invalidate();
      toast.success('Item added successfully');
      await redirectToCategoriesPage();
    },
  });

  function onCreateCategory(data: {name: string, description?: string}) {
    createCategory.mutate(data);
  };


  const updateCategoryMutation = api.menu.categories.updateCategory.useMutation(
    {
      onSuccess: async () => {
        toast.success("Category updated successfully");
        await redirectToCategoriesPage();
      },
    },
  );

  function onUpdateCategory(data: {
    id: string;
    name: string;
    description?: string | undefined;
    createdAt: number;
  }) {
    updateCategoryMutation.mutate(data);
  }


  const deleteCategory = api.menu.categories.deleteCategory.useMutation({
    onSuccess: async () => {
      // Invalidate and refetch
      await apiContext.menu.categories.getCategories.invalidate();
      toast.success('category deleted successfully');
    },
  });

  function onDeleteCategory(id: string) {
    deleteCategory.mutate({ id });
  };
  

  return {
    categories: data,
    isLoadingCategories: isLoading,
    error,
    createCategory,
    onCreateCategory,
    updateCategoryMutation,
    onUpdateCategory,
    deleteCategory,
    onDeleteCategory,
  };
}
