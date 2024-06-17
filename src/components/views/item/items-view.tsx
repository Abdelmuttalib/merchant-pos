import { Plus, Search } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconButton } from "@/components/ui/icon-button";
import { GridViewIcon, ListViewIcon } from "@/components/icons";
import { useMemo, useState } from "react";
import { type Item, ViewTypeEnum } from "@/lib/types";
import { useItems } from "@/hooks/use-items";
import { ListView } from "./list-view";
import { GridView } from "./grid-view";

export default function ItemsView() {
  const [view, setView] = useState<ViewTypeEnum>(ViewTypeEnum.LIST);

  const [search, setSearch] = useState("");

  const { items, isLoadingItems } = useItems();

  const filteredItems: Item[] = useMemo(() => {
    return items?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, items]);

  function handleViewChange(view: ViewTypeEnum) {
    setView(view);
  }

  return (
    <div>
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col-reverse items-center justify-between gap-x-6 gap-y-3 pb-[7px] sm:-ml-3 sm:flex-row sm:gap-y-0 sm:border-b">
          {/* search */}
          <div className="relative ml-auto w-full flex-1">
            <Search className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search items"
              className="h-11 w-full rounded-lg border-none bg-background pl-12 shadow-none hover:bg-accent-hover/60"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* actions */}
          <div className="flex w-full items-center gap-x-2 sm:-mr-3 sm:w-auto">
            <IconButton
              size="sm"
              variant={view === ViewTypeEnum.LIST ? "secondary" : "ghost"}
              onClick={() => handleViewChange(ViewTypeEnum.LIST)}
            >
              <ListViewIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant={view === ViewTypeEnum.GRID ? "secondary" : "ghost"}
              onClick={() => handleViewChange(ViewTypeEnum.GRID)}
            >
              <GridViewIcon />
            </IconButton>
            <ButtonLink
              href="/dashboard/menu/new"
              iconLeft={<Plus className="w-5" />}
            >
              New Product
            </ButtonLink>
          </div>
        </div>
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent"></header>
          <main className="grid flex-1 items-start gap-4 py-4 sm:py-0 md:gap-8">
            {/* content */}
            {view === ViewTypeEnum.LIST && (
              <ListView
                data={filteredItems}
                isLoading={isLoadingItems}
                error={""}
              />
            )}
            {view === ViewTypeEnum.GRID && (
              <GridView
                data={filteredItems}
                isLoading={isLoadingItems}
                error={""}
              />
            )}
            <div className="text-xs text-foreground-muted">
              <strong>{filteredItems?.length}</strong> products
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
