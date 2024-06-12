import { api } from "@/utils/api";
import { toast } from "sonner";

const testItem = {
  image: '',
  name: 'Test',
  category: 'Test',
  price: 49.99,
  cost: 25.0,
  sales: 10,
  stock: 100,
  options: {
  },
}

export function useItems() {

  const apiContext = api.useContext();


  const { data, isLoading, error } = api.menu.items.getItems.useQuery();

 
  const createItem = api.menu.items.createItem.useMutation({
    onSuccess: async () => {
      // Invalidate and refetch
      await apiContext.menu.items.getItems.invalidate();
      toast.success('Item added successfully');
    },
  });

  function onCreateItem(data) {
    createItem.mutate({ item: data });
  };


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
    deleteItem,
    onDeleteItem,
  };
}
