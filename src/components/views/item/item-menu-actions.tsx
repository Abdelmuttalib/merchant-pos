import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/ui/icon-button";
import { useItems } from "@/hooks/use-items";
import { Eye, MoreHorizontal, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/router";

export function ItemMenuActions({ itemId }: { itemId: string }) {
  const { push } = useRouter();

  const { onDeleteItem } = useItems();

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
          onClick={() => push(`/dashboard/menu/${itemId}/preview`)}
        >
          <Eye className="mr-2 h-4 w-4 text-foreground-lighter" />
          Preview
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => push(`/dashboard/menu/${itemId}/edit`)}
        >
          <Pencil className="mr-2 h-4 w-4 text-foreground-lighter" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => onDeleteItem(itemId)}
        >
          <Trash className="mr-2 h-4 w-4 text-destructive" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
