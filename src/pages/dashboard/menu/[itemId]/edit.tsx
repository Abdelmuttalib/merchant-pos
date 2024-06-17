import DashboardLayout from "@/components/layout/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IconLink } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Typography from "@/components/ui/typography";
import {
  type NewItemFormValuesSchema,
  newItemformSchema,
} from "@/components/views/item/item-form";
import { getCategories } from "@/lib/categories";
import { ItemStatusEnum, type Category, type Item } from "@/lib/types";
import { db } from "@/server/db";
import { api } from "@/utils/api";
import { getItemStatusBadgeColor } from "@/utils/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { get, ref } from "firebase/database";
import { ChevronLeft, Upload } from "lucide-react";
import { type GetServerSideProps } from "next";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditItemPage({
  itemId,
  data,
  categories,
}: {
  itemId: string;
  data: Item;
  categories: Category[];
}) {
  const itemData = api.menu.items.getItemById.useQuery({ id: itemId });

  const form = useForm({
    resolver: zodResolver(newItemformSchema),
    defaultValues: {
      name: data?.name,
      description: data?.description,
      price: data?.price,
      cost: data?.cost,
      stock: data?.stock,
      category: data?.category,
      status: data?.status,
    },
  });

  //   console.log('default data: ', data);

  const updateItemMutation = api.menu.items.updateItem.useMutation({
    onSuccess: () => {
      toast.success("Item updated successfully");
    },
  });

  function onUpdateItem(
    data: NewItemFormValuesSchema & {
      id: string;
    },
  ) {
    updateItemMutation.mutate({ item: data });
  }

  function onSubmit(values: NewItemFormValuesSchema) {
    onUpdateItem({
      id: itemId,
      ...values,
    });
  }

  return (
    <DashboardLayout pageTitle="Edit Item">
      <div className="flex flex-col sm:gap-4">
        <main className="grid flex-1 items-start gap-4 md:gap-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto grid w-full flex-1 auto-rows-max gap-4"
            >
              <div className="flex items-center gap-4">
                <IconLink
                  href="/dashboard/menu"
                  variant="outline"
                  className="h-7 w-7"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </IconLink>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Item Details
                </h1>
                <Badge variant="outline" className="ml-auto sm:ml-0">
                  In stock
                </Badge>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button variant="outline" type="button">
                    Discard
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="item name" {...field} />
                          </FormControl>
                          <FormDescription>
                            {/* description for field */}
                            Give your item a short and clear name.
                          </FormDescription>
                          {/* <FormMessage /> */}
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              id="description"
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {/* description for field */}
                            Describe your item.
                          </FormDescription>
                          {/* <FormMessage /> */}
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-1.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price per unit</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute inline-flex h-full w-9 items-center justify-center rounded-l-md border border-r-0 border-foreground-muted-dark bg-accent-hover text-sm text-foreground-lighter">
                                $
                              </span>
                              <Input
                                id="price"
                                type="number"
                                className="pl-11"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            {/* This is your public display name. */}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cost"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Cost per unit</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <span className="absolute inline-flex h-full w-9 items-center justify-center rounded-l-md border border-r-0 border-foreground-muted-dark bg-accent-hover text-sm text-foreground-lighter">
                                $
                              </span>
                              <Input
                                id="cost"
                                type="number"
                                className="pl-11"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            {/* This is your public display name. */}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input id="stock" type="number" {...field} />
                          </FormControl>
                          <FormDescription>
                            {/* This is your public display name. */}
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-4">
                    <div className="grid gap-3 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger
                                  id="category"
                                  aria-label="Select category"
                                >
                                  <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                              </FormControl>

                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem
                                    key={category.id}
                                    value={category.name}
                                  >
                                    <Badge color="blue" className="capitalize">
                                      {category.name}
                                    </Badge>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              {/* This is your public display name. */}
                            </FormDescription>
                            {/* <FormMessage /> */}
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Item status</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger
                                  id="status"
                                  aria-label="Select status"
                                >
                                  <SelectValue placeholder="Select item status" />
                                </SelectTrigger>
                              </FormControl>

                              <SelectContent>
                                {Object.values(ItemStatusEnum).map((status) => (
                                  <SelectItem key={status} value={status}>
                                    <Badge
                                      color={getItemStatusBadgeColor(status)}
                                      className="capitalize"
                                    >
                                      {status}
                                    </Badge>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              {/* This is your public display name. */}
                            </FormDescription>
                            {/* <FormMessage /> */}
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid auto-rows-max items-start gap-2">
                  <div className="space-y-1">
                    <Typography as="h3" variant="base/medium">
                      Images
                    </Typography>
                  </div>
                  <div className="grid gap-2">
                    <Image
                      src="https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Product image"
                      className="aspect-video w-full rounded-md object-cover"
                      height="300"
                      width="300"
                    />
                    <div className="grid grid-cols-3 gap-2">
                      <button>
                        <Image
                          src="https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="84"
                          width="84"
                        />
                      </button>
                      <button>
                        <Image
                          src="https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="Product image"
                          className="aspect-square w-full rounded-md object-cover"
                          height="84"
                          width="84"
                        />
                      </button>
                      <button className="flex aspect-square w-full items-center justify-center rounded-md border-2 border-dashed border-foreground-muted-dark">
                        <Upload className="h-6 w-6 text-foreground-lighter" />
                        <span className="sr-only">Upload</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm" type="button">
                  Discard
                </Button>
                <Button size="sm">Save Changes</Button>
              </div>
            </form>
          </Form>
        </main>
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const itemId = params?.itemId as string;

  if (!itemId) {
    return {
      redirect: {
        destination: "/dashboard/menu",
        permanent: false,
      },
    };
  }

  async function getItemData() {
    const menuItemsRef = ref(db, `menuItems/${itemId}`);
    const snapshot = await get(menuItemsRef);

    if (snapshot.exists()) {
      const data: Item[] = snapshot.val();
      // const items = firebaseObjectToArray(data);
      return { ...data, id: itemId };
    } else {
      return { message: "No data available" };
    }
  }

  const data = await getItemData();

  const categories = await getCategories();

  return {
    props: {
      itemId,
      data,
      categories,
    },
  };
};
