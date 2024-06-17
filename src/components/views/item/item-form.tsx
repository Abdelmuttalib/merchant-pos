import { CustomDialog } from "@/components/ui/animated-dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Plus, Upload } from "lucide-react";
import Image from "next/image";
import { getItemStatusBadgeColor } from "@/utils/badge";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Typography from "@/components/ui/typography";
import { IconButton } from "@/components/ui/icon-button";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useItems } from "@/hooks/use-items";
import { ItemStatusEnum } from "@/lib/types";

export const itemOptionSchema = z.object({
  name: z.string().min(1, "Option name is required"),
  price: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(1, { message: "Price must be at least 1" }),
  ),
  cost: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(1, { message: "Price must be at least 1" }),
  ),
  stock: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number().min(1, { message: "Stock must be at least 1" }),
  ),
});

export const newItemformSchema = z.object({
  images: z.array(z.string().url()).optional(),
  // images => .nonempty({ message: "At least one image is required" })
  name: z.string().min(1),
  description: z.string().min(1),
  // price: z.preprocess(
  //   (val) => parseFloat(z.string().parse(val)),
  //   z.number().min(1),
  // ),
  // price: z.preprocess(
  //   (val) => {
  //     if (typeof val === "string") {
  //       return parseFloat(val);
  //     }
  //     return val;
  //   },
  //   z.number().min(1, { message: "Price must be at least 1" })
  // ),
  // cost: z.preprocess(
  //   (val) => parseFloat(z.string().parse(val)),
  //   z.number().min(1),
  // ),
  // stock: z.preprocess(
  //   (val) => parseInt(z.string().parse(val)),
  //   z.number().min(1),
  // ),
  price: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(1, { message: "Price must be at least 1" }),
  ),
  cost: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(1, { message: "Cost must be at least 1" }),
  ),
  stock: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number().min(1, { message: "Stock must be at least 1" }),
  ),
  category: z.string().min(1),
  status: z.string().min(1),
  options: z.array(itemOptionSchema).optional(),
});

export type NewItemFormValuesSchema = z.infer<typeof newItemformSchema>;

export function NewItemFormDialog() {
  const { onCreateItem } = useItems();

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => setIsOpen((prevValue) => !prevValue);

  const form = useForm({
    resolver: zodResolver(newItemformSchema),
  });

  // 2. Define a submit handler.
  function onSubmit(values: NewItemFormValuesSchema) {
    // Do something with the form values.
    onCreateItem({ ...values, options: {} });
    form.reset();
    toggleModal();
  }

  function onDiscard() {
    form.reset();
    toggleModal();
  }

  return (
    <>
      <CustomDialog
        open={isOpen}
        onClose={onDiscard}
        title="Add Item"
        // className='px-0'
        fullScreen
        triggerButton={
          <IconButton
            size="xs"
            variant="secondary"
            className="text-foreground-muted"
            onClick={toggleModal}
          >
            <Plus className="w-5" />
          </IconButton>
        }
      >
        <div className="-mx-6 flex flex-col py-4 pb-[27px]">
          <div className="px-6">
            <Typography
              as="p"
              variant="sm/regular"
              className="text-foreground-lighter"
            >
              Add a new item to your store
            </Typography>
          </div>
        </div>
        {/* form */}
        <Form {...form}>
          <form
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col py-5"
          >
            <div className="flex flex-col">
              <Accordion type="multiple" className="w-full space-y-3">
                {/* genearal */}
                <div>
                  <AccordionItem value="general" className="border-b-0">
                    <AccordionTrigger
                      className={cn(
                        "flex items-center gap-x-3 rounded-md bg-accent-hover/60 px-3 py-2.5 text-sm font-medium text-foreground-light hover:bg-accent-hover hover:no-underline",
                        // {
                        //   "bg-accent-hover/60 text-primary": false,
                        // },
                      )}
                    >
                      General
                    </AccordionTrigger>
                    <AccordionContent className="space-y-7 px-3 py-4">
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
                                <SelectItem value="clothing">
                                  Clothing
                                </SelectItem>
                                <SelectItem value="electronics">
                                  Electronics
                                </SelectItem>
                                <SelectItem value="accessories">
                                  Accessories
                                </SelectItem>
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
                    </AccordionContent>
                  </AccordionItem>
                </div>
                {/* media */}
                <div>
                  <AccordionItem value="media" className="border-b-0">
                    <AccordionTrigger
                      className={cn(
                        "flex items-center gap-x-3 rounded-md bg-accent-hover/60 px-3 py-2.5 text-sm font-medium text-foreground-light hover:bg-accent-hover hover:no-underline",
                        // {
                        //   "bg-accent-hover/60 text-primary": false,
                        // },
                      )}
                    >
                      Media
                    </AccordionTrigger>
                    <AccordionContent className="space-y-7 px-3 py-4">
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
                    </AccordionContent>
                  </AccordionItem>
                </div>
              </Accordion>
            </div>
            <div className="mt-16 flex w-full items-center justify-between gap-x-2 border-t bg-background pt-6">
              <Button variant="secondary" onClick={onDiscard}>
                Discard
              </Button>
              <Button type="submit" className="flex-1">
                Save Product
              </Button>
            </div>
          </form>
        </Form>
      </CustomDialog>
    </>
  );
}
