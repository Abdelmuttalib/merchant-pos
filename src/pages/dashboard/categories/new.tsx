import DashboardLayout from "@/components/layout/dashboard-layout";

import { ChevronLeft } from "lucide-react";

import { Button, ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { IconLink } from "@/components/ui/icon-button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useCategories } from "@/hooks/use-categories";
import { z } from "zod";



export const newCategoryformSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type NewCategoryFormValuesSchema = z.infer<typeof newCategoryformSchema>;

export default function CreateNewCategoryPage() {

  const { onCreateCategory } = useCategories();

  const form = useForm<NewCategoryFormValuesSchema>({
    resolver: zodResolver(newCategoryformSchema),
  });

  function onSubmit(values: NewCategoryFormValuesSchema) {
    onCreateCategory(values);
  }


  return (
    <DashboardLayout pageTitle="New Category">
      <div className="flex flex-col sm:gap-4">
        <main className="grid flex-1 items-start gap-4 md:gap-8">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto grid w-full flex-1 auto-rows-max gap-4"
            >
              <div className="flex items-center gap-4">
                <IconLink
                  href="/dashboard/categories"
                  variant="outline"
                  className="h-7 w-7"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </IconLink>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Category Details
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <ButtonLink href="/dashboard/categories" variant="outline">
                    Discard
                  </ButtonLink>
                  <Button type="submit">Save Category</Button>
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
                          <FormLabel>Category Name</FormLabel>
                          <FormControl>
                            <Input placeholder="category name" {...field} />
                          </FormControl>
                          <FormDescription>
                            {/* description for field */}
                            Give your category a short and clear name.
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
                          <FormLabel>Category Description</FormLabel>
                          <FormControl>
                            <Textarea
                              id="description"
                              className="min-h-32"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {/* description for field */}
                            Describe the category.
                          </FormDescription>
                          {/* <FormMessage /> */}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center w-full gap-2 md:hidden">
                <ButtonLink href="/dashboard/categories" variant="outline">
                  Discard
                </ButtonLink>
                <Button type="submit" className="flex-grow">
                  Save Category
                </Button>
              </div>
            </form>
          </Form>
        </main>
      </div>
    </DashboardLayout>
  );
}
