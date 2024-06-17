import { Skeleton } from "@/components/ui/skeleton";
import { CategoryMenuActions } from "./category-menu-actions";
import { Badge } from "@/components/ui/badge";
import type { Category } from "@/lib/types";

export function GridView({
  data,
  isLoading,
  error,
}: {
  data: Category[];
  isLoading: boolean;
  error: unknown;
}) {
  return (
    <div className="grid w-full grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
      {!isLoading && data && data.length > 0
        ? data.map((category) => (
            <div
              key={category.name}
              className="group relative flex w-full max-w-sm flex-col gap-y-2 rounded-lg border bg-background p-3"
            >
              <div className="flex w-full items-center justify-between">
                <Badge color="blue" className="text-base capitalize">
                  {category.name}
                </Badge>
                <CategoryMenuActions categoryId={category?.id} />
              </div>
              <div className="px-1">
                <p className="text-sm text-foreground-lighter">
                  {category.description}
                </p>
                {/* <Badge
                color={getItemStatusBadgeColor(category.category)}
                className="capitalize"
              >
                {category.category}
              </Badge> */}
              </div>
              {/* <p className="mb-2 text-gray-600">Price: {category.price}</p> */}
              <div className="categories-center flex w-full justify-between">
                <div className="categories-center flex w-full gap-x-5 text-sm"></div>

                <div className="-mb-3 -mr-3"></div>
              </div>
            </div>
          ))
        : null}

      {isLoading &&
        !data &&
        [...Array.from({ length: 10 }, (_, index) => index + 1)].map((n) => (
          <CategoryCardLoaderUI key={n} />
        ))}

      {!isLoading && data && data.length === 0 ? (
        <p className="text-sm text-foreground-lighter">No categories found</p>
      ) : null}
    </div>
  );
}

function CategoryCardLoaderUI() {
  return (
    <div className="group relative flex w-full max-w-sm flex-col gap-y-3 rounded-lg border bg-background p-4">
      <div className="relative h-56 w-full">
        <Skeleton className="h-full w-full rounded-md capitalize" />
      </div>
      <div className="categories-center flex w-full justify-between">
        <Skeleton className="h-6 w-32 rounded-md capitalize" />
        {/* <h3 className="mb-2 text-lg font-semibold">{item.name}</h3> */}

        <Skeleton className="h-6 w-14 rounded-md capitalize" />
      </div>
      <div>
        <p className="font-medium">
          <Skeleton className="h-6 w-14 rounded-md capitalize" />
        </p>
      </div>
      <div className="categories-center flex w-full justify-between">
        <div className="categories-center flex w-full gap-x-5 text-sm">
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
