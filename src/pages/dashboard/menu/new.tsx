import DashboardLayout from "@/components/layout/dashboard-layout";

import Image from "next/image";
import { ChevronLeft, Plus, Trash, Upload } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
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
import { IconButton, IconLink } from "@/components/ui/icon-button";
import Typography from "@/components/ui/typography";
import { getItemStatusBadgeColor } from "@/utils/badge";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  newItemformSchema,
  type NewItemFormValuesSchema,
} from "@/components/views/item/item-form";
import { useItems } from "@/hooks/use-items";
import { type GetServerSideProps } from "next";
import { ref } from "firebase/storage";
import { storage } from "@/server/db";
import { ItemStatusEnum, type Category } from "@/lib/types";
import { getCategories } from "@/lib/categories";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { toast } from "sonner";
import { useRouter } from "next/router";

const MAX_IMAGES_UPLOAD_LIMIT = 3;

export default function CreateNewProductPage({
  categories,
}: {
  categories: Category[];
}) {
  const { onCreateItem } = useItems();

  // 1. Define your form.
  const form = useForm<NewItemFormValuesSchema>({
    resolver: zodResolver(newItemformSchema),
    defaultValues: {
      options: [],
    },
  });

  const [enableOptions, setEnableOptions] = useState(false);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "options",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);

    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
  };

  async function uploadFile(file: File) {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map((file) => uploadFile(file));
    return Promise.all(uploadPromises);
  };

  // 2. Define a submit handler.
  function onSubmit(values: NewItemFormValuesSchema) {
    if (files.length > 0) {
      uploadImages(files)
        .then((urls) => {
          onCreateItem({ ...values, images: urls });
        })
        .catch(() => {
          toast.error("Failed to upload images");
        });
    } else {
      onCreateItem({ ...values, images: [] });
    }
  }

  function onRemoveImage(imageIndex: number) {
    setFiles((prev) => prev.filter((_, i) => i !== imageIndex));
    setPreviews((prev) => prev.filter((_, i) => i !== imageIndex));
  }

  return (
    <DashboardLayout pageTitle="New Item">
      <div className="flex flex-col pb-44 sm:gap-4">
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
                {/* <Badge variant="outline" className="ml-auto sm:ml-0">
                  In stock
                </Badge> */}
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <ButtonLink href="/dashboard/menu" variant="outline">
                    Discard
                  </ButtonLink>
                  <Button type="submit">Save Item</Button>
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
                                  <SelectValue placeholder="Select category" />
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
                  <div className="space-y-8">
                    {/* enable options */}
                    <div className="flex flex-col space-y-1">
                      <Badge
                        as="div"
                        className="flex w-fit items-center space-x-2"
                        color="gray"
                      >
                        <Checkbox
                          id="enableOptions"
                          className="size-5 bg-background p-0.5"
                          //  bg-accent-hover
                          checked={enableOptions}
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          // @ts-ignore
                          onCheckedChange={(
                            checked:
                              | boolean
                              | ((prevState: boolean) => boolean),
                          ) => {
                            setEnableOptions(checked);
                            // reset options when unchecked
                            if (!checked) {
                              form.setValue("options", []);
                            }
                          }}
                        />

                        <label
                          htmlFor="enableOptions"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Enable options
                        </label>
                      </Badge>
                      <Typography
                        as="p"
                        variant="xs/regular"
                        className="text-foreground-lighter"
                      >
                        options allow you to offer multiple variations of a menu item, such as different sizes or toppings.
                      </Typography>
                    </div>
                    <div>
                      {/* options form
                       */}
                      {enableOptions && (
                        <div className="space-y-5">
                          {fields.map((field, index) => (
                            <div key={field.id}>
                              <div className="relative grid place-items-end gap-3 sm:grid-cols-5">
                                <div>
                                  <Label>Name</Label>
                                  <Input
                                    {...form.register(`options.${index}.name`)}
                                    className=""
                                    placeholder="Option name"
                                  />
                                </div>
                                <div>
                                  <Label>Price</Label>
                                  <Input
                                    {...form.register(`options.${index}.price`)}
                                    type="number"
                                    className=""
                                    placeholder="Option price"
                                  />
                                </div>
                                <div>
                                  <Label>Cost</Label>
                                  <Input
                                    {...form.register(`options.${index}.cost`)}
                                    type="number"
                                    className=""
                                    placeholder="Option cost"
                                  />
                                </div>
                                <div>
                                  <Label>Stock</Label>
                                  <Input
                                    {...form.register(`options.${index}.stock`)}
                                    type="number"
                                    className=""
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
                            </div>
                          ))}
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
                      )}
                    </div>
                  </div>
                </div>
                <div className="grid auto-rows-max items-start gap-2">
                  <div className="space-y-1">
                    <Typography as="h3" variant="base/medium">
                      Images
                    </Typography>
                  </div>
                  {/* accept only images */}
                  <div className="grid grid-cols-2 gap-2">
                    {previews.map((preview, index) => (
                      <div
                        key={`${preview}${index}`}
                        className={cn(
                          "relative aspect-video w-full rounded-md object-cover",
                          {
                            "col-span-2": index === 0,
                            "col-span-1": index !== 0,
                          },
                        )}
                      >
                        <Image
                          src={preview}
                          alt={`Preview ${index}`}
                          className={cn(
                            "relative aspect-video w-full rounded-md object-cover",
                            {
                              "col-span-2": index === 0,
                              "col-span-1": index !== 0,
                            },
                          )}
                          width={index === 0 ? 300 : 84}
                          height={index === 0 ? 300 : 84}
                        />
                        <IconButton
                          variant="destructive"
                          onClick={() => onRemoveImage(index)}
                          className="absolute right-1.5 top-1.5"
                          size="xs"
                        >
                          <Trash className="w-[18px]" />
                        </IconButton>
                      </div>
                    ))}
                    {/* <Image
                      src="https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Product image"
                      className="aspect-video w-full rounded-md object-cover"
                      height="300"
                      width="300"
                    /> */}
                    <label
                      className={cn(
                        "group flex aspect-square h-full w-full cursor-pointer flex-col items-center justify-center gap-y-2 rounded-md border-2 border-dashed border-foreground-muted-dark",
                        {
                          "col-span-2 row-span-1": previews.length === 0,
                          "col-span-1": previews.length !== 0,
                          hidden: previews.length === MAX_IMAGES_UPLOAD_LIMIT,
                        },
                      )}
                    >
                      <Upload className="h-6 w-6 text-foreground-lighter transition-all duration-200 ease-in-out group-hover:-mt-6" />
                      {/* <p className="mb-2 text-xs">
                        <span className="font-semibold text-foreground underline underline-offset-4">
                          Click to upload
                        </span>
                      </p> */}
                      <p className="max-w-24 text-center text-xs text-foreground-lighter">
                        PNG, JPG, JPEG or WEBP
                        {/* (MAX. 800x400px) */}
                      </p>
                      <span className="sr-only">Upload</span>
                      <input
                        type="file"
                        multiple
                        disabled={previews.length === MAX_IMAGES_UPLOAD_LIMIT}
                        accept="image/png, image/jpg, image/jpeg"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 md:hidden">
                <ButtonLink href="/dashboard/menu" variant="outline" size="sm">
                  Discard
                </ButtonLink>
                <Button size="sm">Save Product</Button>
              </div>
            </form>
          </Form>
        </main>
      </div>
    </DashboardLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const categories = await getCategories();

  return {
    props: {
      categories,
    },
  };
};
