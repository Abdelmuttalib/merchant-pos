import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Typography from "@/components/ui/typography";
import type { Item } from "@/lib/types";
import Image from "next/image";
import { ItemMenuActions } from "./item-menu-actions";

export function GridView({
    data,
    isLoading,
    error,
  }: {
    data: Item[];
    isLoading: boolean;
    error: unknown;
  }) {
    return (
      <div className="grid w-full grid-cols-1 place-items-center gap-4 sm:grid-cols-2 sm:place-items-baseline xl:grid-cols-4">
        {!isLoading && data && data.length > 0
          ? data.map((item) => <ItemCard key={item.name} item={item} />)
          : null}
  
        {isLoading &&
          !data &&
          [...Array.from({ length: 10 }, (_, index) => index + 1)].map((n) => (
            <ItemCardLoaderUI key={n} />
          ))}
  
        {!isLoading && data && data.length === 0 ? (
          <p className="text-sm text-foreground-lighter">No products found</p>
        ) : null}
      </div>
    );
  }
  
  function ItemCard({ item }: { item: Item }) {
    return (
      <div
        key={item.name}
        className="group relative flex w-full max-w-sm flex-col gap-y-3 rounded-lg border bg-background p-4"
      >
        <div className="relative h-56 w-full">
          <Image
            src="https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Product image"
            className="rounded-md object-cover"
            layout="fill"
          />
        </div>
        <div className="flex w-full items-center justify-between">
          <Typography as="h3" variant="base/regular">
            {item.name}
          </Typography>
          <Badge
            color='blue'
            className="capitalize"
          >
            {item.category}
          </Badge>
        </div>
        <div>
          <p className="font-medium">${item.price}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-x-5 text-sm">
            <div className="inline-flex gap-x-1">
              <p className="text-foreground-lighter">Stock:</p>
              <span className="text-foreground">{item.stock}</span>
            </div>
            <div className="inline-flex gap-x-1">
              <p className="text-foreground-lighter">
                Sales:{" "}
                {/* Created At: {new Date(item.createdAt).toLocaleString()} */}
              </p>
              <span className="text-foreground">{item.sales}</span>
            </div>
          </div>
  
          <div className="-mb-3 -mr-3">
            <ItemMenuActions itemId={item?.id} />
          </div>
        </div>
      </div>
    );
  }
  
  function ItemCardLoaderUI() {
    return (
      <div className="group relative flex w-full max-w-sm flex-col gap-y-3 rounded-lg border bg-background p-4">
        <div className="relative h-56 w-full">
          <Skeleton className="h-full w-full rounded-md capitalize" />
        </div>
        <div className="flex w-full items-center justify-between">
          <Skeleton className="h-6 w-32 rounded-md capitalize" />
          {/* <h3 className="mb-2 text-lg font-semibold">{item.name}</h3> */}
  
          <Skeleton className="h-6 w-14 rounded-md capitalize" />
        </div>
        <div>
          <p className="font-medium">
            <Skeleton className="h-6 w-14 rounded-md capitalize" />
          </p>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex w-full items-center gap-x-5 text-sm">
            <div className="inline-flex gap-x-1">
              <p className="text-foreground-lighter">Stock:</p>
              <Skeleton className="h-6 w-6 rounded-md capitalize" />
            </div>
            <div className="inline-flex gap-x-1">
              <p className="text-foreground-lighter">Sales: </p>
              <Skeleton className="h-6 w-6 rounded-md capitalize" />
            </div>
          </div>
  
          <div className="-mb-4 -mr-3">
            <Skeleton className="h-8 w-8 rounded-md capitalize" />
          </div>
        </div>
      </div>
    );
  }