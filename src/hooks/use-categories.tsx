import { api } from "@/utils/api";
import { toast } from "sonner";


export function useCategories() {

  const apiContext = api.useContext();


  const { data, isLoading, error } = api.menu.categories.getCategories.useQuery();

 
  const createCategory = api.menu.categories.createCategory.useMutation({
    onSuccess: async () => {
      // Invalidate and refetch
      await apiContext.menu.categories.getCategories.invalidate();
      toast.success('Item added successfully');
    },
  });

  function onCreateCategory(data: {name: string, description: string}) {
    createCategory.mutate(data);
  };


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
    deleteCategory,
    onDeleteCategory,
  };
}
