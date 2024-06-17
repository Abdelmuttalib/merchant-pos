import { Plus, Search } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconButton } from "@/components/ui/icon-button";
import { GridViewIcon, ListViewIcon } from "@/components/icons";
import { useMemo, useState } from "react";
import { type Category, ViewTypeEnum } from "@/lib/types";
import { useCategories } from "@/hooks/use-categories";
import { GridView } from "./grid-view";
import { ListView } from "./list-view";

export default function CategoriesView() {
  const [view, setView] = useState<ViewTypeEnum>(ViewTypeEnum.LIST);

  const [search, setSearch] = useState("");

  const { categories, isLoadingCategories } = useCategories();

  const filteredCategories: Category[] = useMemo(() => {
    return categories?.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, categories]);

  function handleViewChange(view: ViewTypeEnum) {
    setView(view);
  }

  return (
    <div>
      <div className="flex min-h-screen w-full flex-col">
        <div className="-ml-1.5 flex w-full flex-col-reverse items-center justify-between gap-x-6 gap-y-4 pb-[7px] sm:-ml-3 sm:flex-row">
          {/* search */}
          <div className="relative ml-auto w-full flex-1">
            <Search className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search categories"
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
              href="/dashboard/categories/new"
              iconLeft={<Plus className="w-5" />}
            >
              New Category
            </ButtonLink>
          </div>
        </div>
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <main className="items  -start grid flex-1 gap-4 py-4 sm:py-0 md:gap-8">
            {view === ViewTypeEnum.LIST && (
              <ListView
                data={filteredCategories}
                isLoading={isLoadingCategories}
                error={""}
              />
            )}
            {view === ViewTypeEnum.GRID && (
              <GridView
                data={filteredCategories}
                isLoading={isLoadingCategories}
                error={""}
              />
            )}
            <div className="text-xs text-foreground-muted">
              <strong>{filteredCategories?.length}</strong> categories
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
