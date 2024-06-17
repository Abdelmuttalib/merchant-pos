import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table-2";
import type { Item } from "@/lib/types";
import Image from "next/image";
import { ItemMenuActions } from "./item-menu-actions";
import { formatShortDateWithYear } from "@/lib/date";
import { getItemStatusBadgeColor } from "@/utils/badge";
import { ImageIcon } from "lucide-react";

export function ListView({
  data,
  isLoading = false,
  error,
}: {
  data: Item[];
  isLoading: boolean;
  error: unknown;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] pl-3 sm:table-cell">
            <span className="sr-only">Image</span>
            <ImageIcon className="w-4" />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead className="hidden md:table-cell">Category</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead className="hidden md:table-cell">Cost</TableHead>
          {/* <TableHead className="hidden md:table-cell">Sales</TableHead> */}
          <TableHead className="hidden md:table-cell">Stock</TableHead>
          <TableHead className="">Status</TableHead>
          <TableHead className="hidden md:table-cell">Created at</TableHead>
          <TableHead className="">
            Actions
            {/* <span className="sr-only">Actions</span> */}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading &&
          !data &&
          [...Array.from({ length: 10 }, (_, index) => index + 1)].map((n) => (
            <TableRow key={n}>
              <TableCell className="hidden sm:table-cell">
                <Skeleton className="aspect-square h-9 w-10 rounded-md" />
              </TableCell>
              <TableCell className="font-medium">
                <Skeleton className="h-6 w-52 rounded-md capitalize" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-16 rounded-md capitalize" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-6 w-14 rounded-md capitalize" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-6 w-12 rounded-md capitalize" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-6 w-9 rounded-md capitalize" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-6 w-14 rounded-md capitalize" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-6 w-24 rounded-md capitalize" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-8 w-8 rounded-md capitalize" />
              </TableCell>
            </TableRow>
          ))}
        {!isLoading && data && data.length > 0
          ? data.map((item) => (
              <TableRow key={`${item.name}${item.createdAt}`}>
                <TableCell className="hidden sm:table-cell">
                  {/* const IMAGE_PLACEHOLDER_URL = "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"; */}
                  {item?.images?.length > 0 ? (
                    <Image
                      // src="https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      src={item.images?.[0]}
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="40"
                      width="40"
                    />
                  ) : (
                    <Image
                      // src="https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      src="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="40"
                      width="40"
                    />
                  )}
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge color="blue" className="capitalize">
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  ${item.price}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  ${item.cost}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.stock}
                </TableCell>
                <TableCell>
                  <Badge
                    color={getItemStatusBadgeColor(item.status)}
                    className="capitalize"
                  >
                    {item.status ?? "-"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatShortDateWithYear(item.createdAt)}
                </TableCell>
                <TableCell>
                  <ItemMenuActions itemId={item?.id} />
                </TableCell>
              </TableRow>
            ))
          : null}
        {!isLoading && data && data.length === 0 ? <ListItemLoaderUI /> : null}
      </TableBody>
    </Table>
  );
}

function ListItemLoaderUI() {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell"></TableCell>
      <TableCell className="py-3 text-sm text-foreground-lighter">
        - no products found
      </TableCell>
      <TableCell></TableCell>
      <TableCell className="hidden md:table-cell"></TableCell>
      <TableCell className="hidden md:table-cell"></TableCell>
      <TableCell className="hidden md:table-cell"></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}
