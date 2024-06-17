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
import { formatShortDateWithYear } from "@/lib/date";
import type { Category } from "@/lib/types";
import { CategoryMenuActions } from "./category-menu-actions";

export function ListView({
  data,
  isLoading = false,
  error,
}: {
  data: Category[];
  isLoading: boolean;
  error: unknown;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {/* <TableHead className="hidden sm:table-cell">
            ID
          </TableHead> */}
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead className="hidden md:table-cell">Created at</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading &&
          !data &&
          [...Array.from({ length: 10 }, (_, index) => index + 1)].map((n) => (
            <TableRow key={n}>
              {/* <TableCell className="hidden sm:table-cell">
                <Skeleton className="aspect-square h-9 w-10 rounded-md" />
              </TableCell> */}
              <TableCell className="font-medium">
                <Skeleton className="h-6 w-24 rounded-md capitalize" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-52 rounded-md capitalize" />
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
          ? data.map((category) => (
              <TableRow key={`${category.name}${category.createdAt}`}>
                {/* <TableCell className="hidden sm:table-cell">
                  {category.id}
                </TableCell> */}
                <TableCell>
                  <Badge
                    color='blue'
                    className="capitalize"
                  >
                    {category.name}
                  </Badge>
                </TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {/* 2023-07-12 10:42 AM */}
                  {formatShortDateWithYear(category.createdAt)}
                </TableCell>
                <TableCell>
                  <CategoryMenuActions categoryId={category?.id} />
                </TableCell>
              </TableRow>
            ))
          : null}
        {!isLoading && data && data.length === 0 ? (
          <CategoryPlaceholder />
        ) : null}
      </TableBody>
    </Table>
  );
}

function CategoryPlaceholder() {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell"></TableCell>
      <TableCell className="py-3 text-sm text-foreground-lighter">
        - no categories found
      </TableCell>
      <TableCell></TableCell>
      <TableCell className="hidden md:table-cell"></TableCell>
      <TableCell></TableCell>
    </TableRow>
  );
}
