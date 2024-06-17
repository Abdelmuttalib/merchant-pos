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
import type { Category, Item } from "@/lib/types";
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

export default function EditItemPage({ itemId }: { itemId: string }) {
  const itemData = api.menu.items.getItemById.useQuery({ id: itemId });

  return (
    <DashboardLayout pageTitle="Edit Item">
      <div className="flex flex-col sm:gap-4">
        <main className="grid flex-1 items-start gap-4 md:gap-8">
          <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4">
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
          </div>
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
