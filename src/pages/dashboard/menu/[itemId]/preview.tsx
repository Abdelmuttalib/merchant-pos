/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import DashboardLayout from "@/components/layout/dashboard-layout";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { IconLink } from "@/components/ui/icon-button";
import Typography from "@/components/ui/typography";
import { getCategories } from "@/lib/categories";
import type { Item, ItemStatusEnum } from "@/lib/types";
import { cn } from "@/lib/utils";
import { db } from "@/server/db";
import { api } from "@/utils/api";
import { getItemStatusBadgeColor } from "@/utils/badge";
import { get, ref } from "firebase/database";
import { Check, ChevronLeft, Pencil } from "lucide-react";
import { type GetServerSideProps } from "next";
import Image from "next/image";
import { useState } from "react";

type AddOn = {
  image: string;
  name: string;
  price: number;
  stock: number;
};

export default function EditItemPage({ itemId }: { itemId: string }) {
  const itemData = api.menu.items.getItemById.useQuery({ id: itemId });

  const [selectedOptions, setSelectedOptions] = useState<string>("");

  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);

  return (
    <DashboardLayout pageTitle="Preview Item">
      <div className="flex flex-col sm:gap-4">
        <main className="grid flex-1 items-start gap-4 md:gap-8">
          <div className="mx-auto grid w-full flex-1 auto-rows-max gap-4 pb-56">
            <div className="flex items-center gap-4">
              <IconLink
                href="/dashboard/menu"
                variant="outline"
                className="h-7 w-7"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </IconLink>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <ButtonLink
                  href={`/dashboard/menu/${itemId}/edit`}
                  variant="secondary"
                  iconLeft={<Pencil className="w-[14px] text-foreground" />}
                >
                  Edit
                </ButtonLink>
              </div>
            </div>
            <div className="h-full w-full space-y-10">
              {/* images */}
              <div className="grid grid-cols-1 gap-2 lg:grid-cols-4">
                {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                {itemData?.data?.images?.map((image, index) => (
                  <div
                    key={index}
                    className={cn("relative h-80 w-full rounded-md", {
                      "lg:col-span-2": index === 0,
                      "lg:col-span-1": index !== 0,
                    })}
                  >
                    <Image
                      src={image}
                      alt="Item Image"
                      layout="fill"
                      objectFit="cover"
                      className="rounded-md"
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col items-center justify-between sm:flex-row">
                <div className="flex items-center gap-x-2">
                  <Typography as="h2" variant="xl/semibold">
                    {itemData.data?.name}
                  </Typography>
                  <Badge>{itemData.data?.category}</Badge>
                </div>
                <Badge
                  color={getItemStatusBadgeColor(
                    itemData?.data?.status as ItemStatusEnum,
                  )}
                  size="lg"
                  className="capitalize lg:text-base"
                >
                  {itemData.data?.status}
                </Badge>
              </div>
              <Typography
                as="p"
                variant="base/regular"
                className="text-foreround-light w-fit rounded-md bg-accent-hover/60 p-2 px-3"
              >
                {itemData.data?.description}
              </Typography>
              <div className="space-y-4">
                <Typography as="p" variant="base/regular">
                  <span className="font-semibold">Options:</span>{" "}
                </Typography>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
                  {/* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */}
                  {itemData.data?.options?.map(
                    (
                      option: { name: string; price: number; stock: number },
                      index,
                    ) => {
                      const isSelected =
                        selectedOptions ===
                        `${option.name}/${option.price}/${option.stock}`;

                      return (
                        <div
                          key={index}
                          onClick={() => {
                            // only one option can be selected
                            setSelectedOptions(
                              `${option.name}/${option.price}/${option.stock}`,
                            );
                            // setSelectedOptions((prev) =>
                            //   prev.includes(option.name)
                            //     ? prev.filter((item) => item !== option.name)
                            //     : [...prev, option.name],
                            // );
                          }}
                          className={cn(
                            "group relative flex cursor-pointer rounded-lg bg-background/5 px-5 py-4 text-foreground ring-2 ring-border transition hover:ring-primary focus:outline-none data-[checked]:bg-background/10 data-[focus]:outline-1 data-[focus]:outline-foreground",
                            {
                              "shadow-primary-100 ring-primary": isSelected,
                            },
                          )}
                        >
                          <div className="flex w-full items-center justify-between">
                            <div className="text-sm/6">
                              <p className="font-semibold text-foreground">
                                {option.name}
                              </p>
                              <div className="flex gap-2 text-foreground-light">
                                <div>Price: ${option.price}</div>
                                <div aria-hidden="true">&middot;</div>
                                <div>Stock: {option.stock}</div>
                                {/* <div aria-hidden="true">&middot;</div>
                            <div>{plan.disk}</div> */}
                              </div>
                            </div>
                            <span
                              className={cn(
                                "inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border bg-accent-hover text-transparent",
                                {
                                  "border-primary bg-primary text-background":
                                    isSelected,
                                },
                              )}
                            >
                              <Check className="h-4 w-4 text-current" />
                            </span>
                          </div>
                        </div>
                      );
                    },
                  )}
                </div>
              </div>
              <div className="space-y-4">
                <Typography as="p" variant="base/regular">
                  <span className="font-semibold">Add on:</span>{" "}
                </Typography>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
                  {[
                    {
                      image:
                        "https://images.unsplash.com/photo-1557925923-33b27f891f88?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      name: "Cheese Cake",
                      price: 5.99,
                      stock: 10,
                    },
                    {
                      image:
                        "https://images.unsplash.com/photo-1639024471283-03518883512d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b25pb24lMjByaW5nc3xlbnwwfHwwfHx8MA%3D%3D",
                      name: "Onion Rings",
                      price: 3.99,
                      stock: 20,
                    },
                    {
                      image:
                        "https://images.unsplash.com/photo-1607532941433-304659e8198a?q=80&w=1978&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                      name: "Salad",
                      price: 4.99,
                      stock: 15,
                    },
                  ].map((addOn, index) => {
                    const isSelected = selectedAddOns.includes(addOn.name);

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setSelectedAddOns((prev) =>
                            prev.includes(addOn.name)
                              ? prev.filter((item) => item !== addOn.name)
                              : [...prev, addOn.name],
                          );
                        }}
                        className={cn(
                          "group relative flex cursor-pointer rounded-lg bg-background/5 p-4 text-foreground ring-2 ring-border transition hover:ring-primary focus:outline-none data-[checked]:bg-background/10 data-[focus]:outline-1 data-[focus]:outline-foreground",
                          {
                            "shadow-primary-100 ring-primary": isSelected,
                          },
                        )}
                      >
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center gap-x-4">
                            <div className="relative h-16 w-20 rounded-md">
                              <Image
                                src={addOn.image}
                                alt="add on cheese cake"
                                layout="fill"
                                className="rounded-md object-cover"
                              />
                            </div>
                            <div className="text-sm/6">
                              <p className="font-semibold text-foreground">
                                {addOn.name}
                              </p>
                              <div className="flex gap-2 text-foreground-light">
                                <div>Price: ${addOn.price}</div>
                                {/* <div aria-hidden="true">&middot;</div>
                                <div>Stock: {addOn.stock}</div> */}
                              </div>
                            </div>
                          </div>

                          <span
                            className={cn(
                              "inline-flex h-6 w-6 items-center justify-center overflow-hidden rounded-lg border bg-accent-hover text-transparent",
                              {
                                "border-primary bg-primary text-background":
                                  isSelected,
                              },
                            )}
                          >
                            <Check className="h-4 w-4 text-current" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
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
