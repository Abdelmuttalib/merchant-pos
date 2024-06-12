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
  NewItemFormValuesSchema,
  newItemformSchema,
} from "@/components/views/item/item-form";
import { Item } from "@/lib/types";
import { db } from "@/server/db";
import { api } from "@/utils/api";
import { getProductStatusBadgeColor } from "@/utils/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { get, push, ref } from "firebase/database";
import { ChevronLeft, Upload } from "lucide-react";
import { type GetServerSideProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
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
  data: any;
}) {

  const router = useRouter();


  const itemData = api.menu.items.getItemById.useQuery({ id: categoryId });

  const form = useForm<NewCategoryFormValuesSchema>({
    resolver: zodResolver(newCategoryformSchema),
    defaultValues: {
      name: data?.name,
      description: data?.description,
    },
  });

  //   console.log('default data: ', data);

  const updateCategoryMutation = api.menu.categories.updateCategory.useMutation(
    {
      onSuccess: async () => {
        toast.success("Category updated successfully");
        await router.push("/dashboard/categories");
      },
    },
  );

  function onUpdateCategory(data: { id: string, name: string; description?: string | undefined }) {
    updateCategoryMutation.mutate(data);
  }

  function onSubmit(values: NewCategoryFormValuesSchema) {
    onUpdateCategory({
      id: categoryId,
      ...values,
    });
    console.log("values: ", values);
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
                  href="/dashboard/categories"
                  variant="outline"
                  className="h-7 w-7"
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </IconLink>
                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Item Details
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
                </div>
              </div>
              <div className="w-ful flex items-center gap-2 md:hidden">
                <ButtonLink href="/dashboard/categories" variant="outline">
                  Discard
                </ButtonLink>
                <Button type="submit">Save Changes</Button>
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

  async function getCategories() {
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

  const data = await getCategories();

  return {
    props: {
      categoryId,
      data,
    },
  };
};
