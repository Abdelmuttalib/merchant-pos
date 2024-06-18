import type { NewItemFormValuesSchema } from "@/components/views/item/item-form";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { toast } from "sonner";


export function useItems() {

  const router = useRouter();

  const apiContext = api.useContext();


  const { data, isLoading, error } = api.menu.items.getItems.useQuery();


  async function redirectToMenuItemsPage() {
    await router.push("/dashboard/menu");
  }
 
  const createItem = api.menu.items.createItem.useMutation({
    onSuccess: async () => {
      // Invalidate and refetch
      await apiContext.menu.items.getItems.invalidate();
      toast.success('Item added successfully');
      await redirectToMenuItemsPage();
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onCreateItem(data: any) {
    createItem.mutate({ item: data });
  };

  const updateItemMutation = api.menu.items.updateItem.useMutation({
    onSuccess: async () => {
      toast.success("Item updated successfully");
      await redirectToMenuItemsPage();
    },
  });

  function onUpdateItem(
    data: NewItemFormValuesSchema & {
      id: string;
    },
  ) {
    updateItemMutation.mutate({ item: data });
  }


  const deleteItem = api.menu.items.deleteItem.useMutation({
    onSuccess: async () => {
      // Invalidate and refetch
      await apiContext.menu.items.getItems.invalidate();
      toast.success('Item deleted successfully');
    },
  });

  function onDeleteItem(id: string) {
    deleteItem.mutate({ id });
  };
  

  return {
    items: data,
    isLoadingItems: isLoading,
    error,
    createItem,
    onCreateItem,
    updateItemMutation,
    onUpdateItem,
    deleteItem,
    onDeleteItem,
  };
}
