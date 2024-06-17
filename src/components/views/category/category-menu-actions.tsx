import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { useCategories } from "@/hooks/use-categories";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/router";

export function CategoryMenuActions({ categoryId }: { categoryId: string }) {
  const { push } = useRouter();

  const { onDeleteCategory } = useCategories();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton aria-haspopup="true" variant="ghost" size="xs">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => push(`/dashboard/categories/${categoryId}/edit`)}
        >
          <Pencil className="mr-2 h-4 w-4 text-foreground-lighter" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>Copy ID</DropdownMenuItem>
          <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => onDeleteCategory(categoryId)}
        >
          <Trash className="mr-2 h-4 w-4 text-destructive" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
