import DashboardLayout from "@/components/layout/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
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
import { Label } from "@/components/ui/label";
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
import { useItems } from "@/hooks/use-items";
import { getCategories } from "@/lib/categories";
import { ItemStatusEnum, type Category, type Item } from "@/lib/types";
import { cn } from "@/lib/utils";
import { db } from "@/server/db";
import { api } from "@/utils/api";
import { getItemStatusBadgeColor } from "@/utils/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { get, ref } from "firebase/database";
import { ChevronLeft, Plus, Trash } from "lucide-react";
import { type GetServerSideProps } from "next";
import Image from "next/image";
import { useFieldArray, useForm } from "react-hook-form";

export default function EditItemPage({
  itemId,
  data,
  categories,
}: {
  itemId: string;
  data: Item;
  categories: Category[];
}) {
  const { onUpdateItem } = useItems();

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
      images: data?.images,
      options: data?.options ?? [],
      createdAt: data?.createdAt,
    },
  });

  console.log(data);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    name: "options",
  });

  function onSubmit(values: NewItemFormValuesSchema) {
    // console.log(values);
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
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
                  <ButtonLink href="/dashboard/menu" variant="outline">
                    Discard
                  </ButtonLink>
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
                  <div className="space-y-8 pb-14">
                    {/* enable options */}
                    <div className="space-y-5">
                      <Badge color="gray" className="text-sm">
                        Options
                      </Badge>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          {fields.map((field, index) => (
                            <div
                              key={field.id}
                              className="relative grid place-items-end gap-3 sm:grid-cols-5"
                            >
                              <div>
                                <Label>Name</Label>
                                <Input
                                  {...form.register(`options.${index}.name`)}
                                  placeholder="Option name"
                                />
                              </div>
                              <div>
                                <Label>Price</Label>
                                <Input
                                  {...form.register(`options.${index}.price`)}
                                  type="number"
                                  placeholder="Option price"
                                />
                              </div>
                              <div>
                                <Label>Cost</Label>
                                <Input
                                  {...form.register(`options.${index}.cost`)}
                                  type="number"
                                  placeholder="Option cost"
                                />
                              </div>
                              <div>
                                <Label>Stock</Label>
                                <Input
                                  {...form.register(`options.${index}.stock`)}
                                  type="number"
                                  placeholder="Option stock"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="destructive"
                                // className="absolute -right-3 -top-3"
                                onClick={() => remove(index)}
                                iconLeft={<Trash className="w-4" />}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          // className=""
                          onClick={() =>
                            append({ name: "", price: 0, cost: 0, stock: 0 })
                          }
                          iconLeft={<Plus className="w-4 text-current" />}
                        >
                          Add Option
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* <div className="space-y-4">
                    <Typography as="h3" variant="lead">
                      Item Options
                    </Typography>
                    <div>
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-4">
                          <FormField
                            control={form.control}
                            name={`options.${index}.name`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input placeholder="Option name" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name={`options.${index}.price`}
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="Option price"
                                    {...field}
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          <Button
                            variant="destructive"
                            type="button"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      variant="outline"
                      type="button"
                      onClick={() => append({ name: "", price: 0 })}
                    >
                      Add Option
                    </Button>
                  </div> */}
                </div>
                <div className="grid auto-rows-max items-start gap-2">
                  <div className="space-y-1">
                    <Typography as="h3" variant="base/medium">
                      Images
                    </Typography>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {form.getValues().images?.length > 0 ? (
                      form.getValues().images.map((image, index) => (
                        <div
                          key={image}
                          className={cn(
                            "relative aspect-video w-full rounded-md object-cover",
                            {
                              "col-span-2": index === 0,
                              "col-span-1": index !== 0,
                            },
                          )}
                        >
                          <Image
                            src={image}
                            alt="Product image"
                            className={cn(
                              "relative aspect-video w-full rounded-md object-cover",
                              {
                                "col-span-2": index === 0,
                                "col-span-1": index !== 0,
                              },
                            )}
                            // layout="fill"
                            width={index === 0 ? 300 : 84}
                            height={index === 0 ? 300 : 84}
                            // width={index === 0 ? "300" : '84'}
                            // height={index === 0 ? "300" : '84'}
                          />
                        </div>
                      ))
                    ) : (
                      <div className="col-span-2 flex h-56 items-center justify-center rounded-md bg-accent-hover/70 text-sm font-normal italic text-foreground-lighter">
                        no images
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="my-10 flex w-full items-center justify-center gap-2 md:hidden">
                <ButtonLink href="/dashboard/menu" variant="outline">
                  Discard
                </ButtonLink>
                <Button type="submit" className="flex-grow">
                  Save Changes
                </Button>
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
