import DashboardLayout from "@/components/layout/dashboard-layout";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { IconLink } from "@/components/ui/icon-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCategories } from "@/hooks/use-categories";
import type { Category, Item } from "@/lib/types";
import { db } from "@/server/db";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { get, ref } from "firebase/database";
import { ChevronLeft } from "lucide-react";
import { type GetServerSideProps } from "next";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const newCategoryformSchema = z.object({
  name: z.string(),
  description: z.string().optional(),
});

export type NewCategoryFormValuesSchema = z.infer<typeof newCategoryformSchema>;

export default function EditItemPage({
  categoryId,
  data,
}: {
  categoryId: string;
  data: Category;
}) {
  const { onUpdateCategory } = useCategories();

  const categoryData = api.menu.items.getItemById.useQuery({ id: categoryId });

  const form = useForm<NewCategoryFormValuesSchema>({
    resolver: zodResolver(newCategoryformSchema),
    defaultValues: {
      name: data?.name,
      description: data?.description,
    },
  });

  function onSubmit(values: NewCategoryFormValuesSchema) {
    onUpdateCategory({
      id: categoryId,
      ...values,
    });
  }

  return (
    <DashboardLayout pageTitle="Edit Category">
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
                            <Input placeholder="category name" {...field} />
                          </FormControl>
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
                              placeholder="category description"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            {/* description for field */}
                            Describe the category and what it includes.
                          </FormDescription>
                          {/* <FormMessage /> */}
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center gap-2 md:hidden">
                <ButtonLink href="/dashboard/categories" variant="outline">
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
  const categoryId = params?.categoryId as string;

  if (!categoryId) {
    return {
      redirect: {
        destination: "/dashboard/categories",
        permanent: false,
      },
    };
  }

  async function getCategoryData() {
    const menuItemsRef = ref(db, `categories/${categoryId}`);
    const snapshot = await get(menuItemsRef);

    if (snapshot.exists()) {
      const data: Item[] = snapshot.val();
      // const items = firebaseObjectToArray(data);
      return { ...data, id: categoryId };
    } else {
      return { message: "No data available" };
    }
  }

  const data = await getCategoryData();

  if (!data) {
    return {
      redirect: {
        destination: "/dashboard/categories",
        permanent: false,
      },
    };
  }

  return {
    props: {
      categoryId,
      data,
    },
  };
};
