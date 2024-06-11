import Image from "next/image";
import Link from "next/link";
import {
  File,
  Home,
  ImageIcon,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  Plus,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Upload,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table-2";
import { IconButton } from "@/components/ui/icon-button";
import DashboardLayout from "@/components/layout/dashboard-layout";
import { GridViewIcon, ListViewIcon } from "@/components/icons";
import { useMemo, useState } from "react";
import Typography from "@/components/ui/typography";
import { productsData } from "@/data/products";
import type { Product } from "@/lib/types";
import { formatShortDateWithYear } from "@/lib/date";
import { getProductStatusBadgeColor } from "@/utils/badge";

type ViewType = "list" | "grid";

export default function Products() {
  const [view, setView] = useState<ViewType>("list");

  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  function handleViewChange(view: ViewType) {
    setView(view);
  }

  return (
    <DashboardLayout pageTitle="Products">
      <div className="flex min-h-screen w-full flex-col">
        {/* <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Products</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Customers</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Customers</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>  */}
        <div className="-ml-3 flex w-full items-center justify-between gap-x-6 border-b pb-[7px]">
          {/* search */}
          <div className="relative ml-auto w-full flex-1">
            <Search className="absolute left-4 top-3 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products"
              className="h-11 w-full rounded-lg border-none bg-background pl-12 shadow-none hover:bg-accent-hover/60"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {/* actions */}
          <div className="-mr-3 flex items-center gap-x-2">
            <IconButton
              size="sm"
              variant={view === "list" ? "secondary" : "ghost"}
              onClick={() => handleViewChange("list")}
            >
              <ListViewIcon />
            </IconButton>
            <IconButton
              size="sm"
              variant={view === "grid" ? "secondary" : "ghost"}
              onClick={() => handleViewChange("grid")}
            >
              <GridViewIcon />
            </IconButton>
            <ButtonLink
              href="/dashboard/products/new"
              iconLeft={<Plus className="w-5" />}
            >
              New Product
            </ButtonLink>
          </div>
        </div>
        <div className="flex flex-col sm:gap-4 sm:py-4">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background sm:static sm:h-auto sm:border-0 sm:bg-transparent">
            <Sheet>
              <SheetTrigger asChild>
                <IconButton variant="outline" className="sm:hidden">
                  <PanelLeft className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </IconButton>
              </SheetTrigger>
              <SheetContent side="left" className="sm:max-w-xs">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="#"
                    className="text-primary-foreground group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold md:text-base"
                  >
                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Home className="h-5 w-5" />
                    Dashboard
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    Orders
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-foreground"
                  >
                    <Package className="h-5 w-5" />
                    Products
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <Users2 className="h-5 w-5" />
                    Customers
                  </Link>
                  <Link
                    href="#"
                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                  >
                    <LineChart className="h-5 w-5" />
                    Settings
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            {/* <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href="/dashboard/products">Products</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                
              </BreadcrumbList>
            </Breadcrumb> */}
            {/* <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div> */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton
                  variant="outline"
                  className="overflow-hidden rounded-full"
                >
                  <Image
                    src="/placeholder-user.jpg"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </IconButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </header>
          <main className="grid flex-1 items-start gap-4 py-4 sm:py-0 md:gap-8">
            {/* content */}
            {view === "list" && <ListView products={filteredProducts} />}
            {view === "grid" && <GridView products={filteredProducts} />}
            <div className="text-xs text-foreground-muted">
              <strong>{filteredProducts.length}</strong> products
              {/* Showing <strong>1-10</strong> of <strong>32</strong> products */}
              {/* Showing <strong>1-10</strong> of <strong>32</strong> products */}
            </div>
            {/* <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="active">Active</TabsTrigger>
                  <TabsTrigger value="draft">Draft</TabsTrigger>
                  <TabsTrigger value="archived" className="hidden sm:flex">
                    Archived
                  </TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filter
                        </span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Active
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Archived
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <Button size="sm" variant="outline" className="h-8 gap-1">
                    <File className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Export
                    </span>
                  </Button>
                  <Button size="sm" className="h-8 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Add Product
                    </span>
                  </Button>
                </div>
              </div>
              <TabsContent value="all"></TabsContent>
            </Tabs> */}
          </main>
        </div>
      </div>
    </DashboardLayout>
  );
}

function ListView({ products }: { products: Product[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
            <ImageIcon className="w-4" />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden text-left md:table-cell">
            Price
          </TableHead>
          <TableHead className="hidden md:table-cell">Total Sales</TableHead>
          <TableHead className="hidden md:table-cell">Created at</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.length ? (
          products.map((product) => (
            <TableRow key={`${product.name}${product.createdAt}`}>
              <TableCell className="hidden sm:table-cell">
                <Image
                  src="https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="40"
                  width="40"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                <Badge
                  color={getProductStatusBadgeColor(product.status)}
                  className="capitalize"
                >
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {/* $  */}
                {product.price}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {/* 25 */}
                {product.totalSales}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {/* 2023-07-12 10:42 AM */}
                {formatShortDateWithYear(product.createdAt)}
              </TableCell>
              <TableCell>
                <ProductMenuOptions />
              </TableCell>
            </TableRow>
          ))
        ) : (
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
        )}
      </TableBody>
    </Table>
  );
}

function GridView({ products }: { products: Product[] }) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
      {products.length ? (
        products.map((product) => (
          <div
            key={product.name}
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
                {product.name}
              </Typography>
              {/* <h3 className="mb-2 text-lg font-semibold">{product.name}</h3> */}

              <Badge
                color={getProductStatusBadgeColor(product.status)}
                className="capitalize"
              >
                {product.status}
              </Badge>
            </div>
            <div>
              <p className="font-medium">{product.price}</p>
              {/* <Badge
              color={getProductStatusBadgeColor(product.status)}
              className="capitalize"
            >
              {product.status}
            </Badge> */}
            </div>
            {/* <p className="mb-2 text-gray-600">Price: {product.price}</p> */}
            <div className="flex w-full items-center justify-between">
              <div className="flex w-full items-center gap-x-5 text-sm">
                <div className="inline-flex gap-x-1">
                  <p className="text-foreground-lighter">Stock:</p>
                  <span className="text-foreground">{product.totalSales}</span>
                </div>
                <div className="inline-flex gap-x-1">
                  <p className="text-foreground-lighter">
                    Sales:{" "}
                    {/* Created At: {new Date(product.createdAt).toLocaleString()} */}
                  </p>
                  <span className="text-foreground">{product.totalSales}</span>
                </div>
              </div>

              <div className="-mb-3 -mr-3">
                <ProductMenuOptions />
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-sm text-foreground-lighter">No products found</p>
      )}
    </div>
  );
}

function ProductMenuOptions() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <IconButton aria-haspopup="true" variant="ghost" size="xs">
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Toggle menu</span>
        </IconButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="absolute">
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Preview</DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>Copy ID</DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from "@tanstack/react-query";

// function QueryShowcase(){
//     // Access the client
//     const queryClient = useQueryClient()

//     // Queries
//     const query = useQuery({ queryKey: ['todos'], queryFn: getTodos })

//     // Mutations
//     const mutation = useMutation({
//       mutationFn: postTodo,
//       onSuccess: () => {
//         // Invalidate and refetch
//         queryClient.invalidateQueries({ queryKey: ['todos'] })
//       },
//     })

//     return (
//       <div>
//         <ul>{query.data?.map((todo) => <li key={todo.id}>{todo.title}</li>)}</ul>

//         <button
//           onClick={() => {
//             mutation.mutate({
//               id: Date.now(),
//               title: 'Do Laundry',
//             })
//           }}
//         >
//           Add Todo
//         </button>
//       </div>
//     )
// };

{
  /* <IconButton className='relative' variant='ghost' onClick={toggleModal}>
        <span className='absolute top-4 right-4 inline-flex h-4 w-4 translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-red-600 text-xs font-bold leading-none text-white dark:bg-red-500'>
          9+
        </span>
        <BellIcon className='w-6 text-foreground-light' aria-hidden='true' />
      </IconButton>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={toggleModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-70' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-screen w-full items-center justify-center'>
              <Transition.Child
                as={Fragment}
                enter='duration-300 ease-out'
                enterFrom='opacity-0 -translate-y-1 sm:-translate-y-0 sm:-translate-x-1'
                enterTo='opacity-100 translate-y-0 sm:translate-x-0'
                leave='duration-200 ease-in'
                leaveFrom='opacity-100 translate-y-0 sm:translate-x-0'
                leaveTo='opacity-0 -translate-y-1 sm:-translate-y-0 sm:-translate-x-1'
              >
                <Dialog.Panel className='absolute right-0 left-0 bottom-0 h-[70%] w-full overflow-y-scroll rounded-t-md bg-white pt-2.5 shadow-xl dark:bg-gray-900 dark:text-gray-200 sm:left-auto sm:top-0 sm:right-0 sm:min-h-screen sm:max-w-sm sm:rounded-md md:max-w-md lg:max-w-lg'>
                  <div className='w-full px-5 text-left lg:mb-3 lg:px-6'>
                    <Dialog.Title
                      as='div'
                      className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-200'
                    >
                      <h5 className='h5 sm:hidden'>
                        {t('notifications.notifications')}
                      </h5>
                      <h4 className='h4 hidden sm:block lg:hidden'>
                        {t('notifications.notifications')}
                      </h4>
                      <h3 className='h3 hidden lg:block'>
                        {' '}
                        {t('notifications.notifications')}
                      </h3>
                    </Dialog.Title>

                    <IconButton
                      className='absolute top-2 right-2 focus:border-2 focus:border-gray-800'
                      variant='outline'
                      size='sm'
                      onClick={toggleModal}
                    >
                      <XMarkIcon className='w-6' aria-hidden='true' />
                    </IconButton>
                  </div>
                  <div>
                    <NotificationsTabs />
                  </div>
                  <Button
                    type='button'
                    className='w-full'
                    iconLeft={<CheckCircleIcon className='w-5' />}
                    variant='secondary'
                  >
                    {t('notifications.mark_all_as_read')}
                  </Button>
                  <div className='absolute bottom-0 w-full border-t bg-white py-2 px-4 shadow-lg'>
                    <Button
                      type='button'
                      className='inline-flex w-full gap-1'
                      iconLeft={<CheckCircleIcon className='w-5' />}
                      variant='link'
                    >
                      {t('notifications.mark_all_as_read')}
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> */
}
