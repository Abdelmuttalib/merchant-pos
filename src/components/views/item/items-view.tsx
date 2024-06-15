import Image from "next/image";
import Link from "next/link";
import {
  Home,
  ImageIcon,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  Plus,
  Search,
  ShoppingCart,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button, ButtonLink } from "@/components/ui/button";
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
import {  useMemo, useState } from "react";
import Typography from "@/components/ui/typography";
import type { Item, ViewType } from "@/lib/types";
import { formatShortDate, formatShortDateWithYear } from "@/lib/date";
import { getProductStatusBadgeColor } from "@/utils/badge";
import { api } from "@/utils/api";
import { toast } from "sonner";
import { useItems } from "@/hooks/use-items";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/router";

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from "@/server/db";



// UploadComponent.js


const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error('Upload failed:', error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setDownloadURL(url);
          console.log('File available at', url);
          // Save the download URL to your database if needed
        });
      }
    );
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {progress > 0 && <progress value={progress} max="100" />}
      {downloadURL && <a href={downloadURL} target="_blank">View Uploaded Image</a>}
    </div>
  );
};




export default function ItemsView() {
  const [view, setView] = useState<ViewType>("list");

  const [search, setSearch] = useState("");

  const { items, isLoadingItems, onDeleteItem } = useItems();

  const filteredProducts = useMemo(() => {
    return items?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, items]);

  function handleViewChange(view: ViewType) {
    setView(view);
  }




  // const handleAddItem = async () => {
  //   const newItemRef = push(ref(db, 'menuItems'));
  //     const { name, category, price, cost, stock, sales, options } = productsData[7];
  //     // console.log({ name, category, price, cost, stock, options });
  //     await set(newItemRef, {
  //       image: '',
  //       name,
  //       category,
  //       price,
  //       cost,
  //       stock,
  //       sales,
  //       options,
  //     }).then(() => {
  //       // Clear the form after successful submission
  //       console.log('Item added successfully');
  //     });
  // };


  return (
    <div>
      <div className="flex min-h-screen w-full flex-col">
        <div className="-ml-3 flex w-full items-center justify-between gap-x-6 border-b pb-[7px]">
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
              href="/dashboard/menu/new"
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
          </header>
          <main className="grid flex-1 items-start gap-4 py-4 sm:py-0 md:gap-8">
            {/* content */}
            {view === "list" && (
              <ListView
                data={filteredProducts}
                isLoading={isLoadingItems}
                error={""}
              />
            )}
            {view === "grid" && (
              <GridView
                data={filteredProducts}
                isLoading={isLoadingItems}
                error={""}
              />
            )}
            <div className="text-xs text-foreground-muted">
              <strong>{filteredProducts?.length}</strong> products
            </div>
            
          </main>
        </div>
      </div>
    </div>
  );
}

function ListView({
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
          <TableHead>Category</TableHead>
          <TableHead className="hidden md:table-cell">Price</TableHead>
          <TableHead className="hidden md:table-cell">Cost</TableHead>
          {/* <TableHead className="hidden md:table-cell">Sales</TableHead> */}
          <TableHead className="hidden md:table-cell">Stock</TableHead>
          <TableHead className="hidden md:table-cell">Status</TableHead>
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
                  <Image
                    src="https://images.unsplash.com/photo-1606963060045-1e3eaa0e6eac?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="40"
                    width="40"
                  />
                </TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>
                  <Badge
                    color='blue'
                    className="capitalize"
                  >
                    {item.category}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {/* $  */}
                  ${item.price}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {/* $  */}
                  ${item.cost}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {/* $  */}
                  {item.stock}
                </TableCell>
                {/* <TableCell className="hidden md:table-cell">
                  {item.sales}
                </TableCell> */}
                <TableCell>
                  <Badge
                    color={getProductStatusBadgeColor(item.status)}
                    className="capitalize"
                  >
                    {item.status ?? '-'}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {/* 2023-07-12 10:42 AM */}
                  {formatShortDateWithYear(item.createdAt)}
                  {/* {formatDate(item.createdAt ?? new Date())} */}
                </TableCell>
                <TableCell>
                  <ItemMenuOptions itemId={item?.id} />
                </TableCell>
              </TableRow>
            ))
          : null}
        {!isLoading && data && data.length === 0 ? (
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
        ) : null}
      </TableBody>
    </Table>
  );
}

function GridView({
  data,
  isLoading,
  error,
}: {
  data: Item[];
  isLoading: boolean;
  error: unknown;
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {!isLoading && data && data.length > 0
        ? data.map((item) => (
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
                {/* <h3 className="mb-2 text-lg font-semibold">{item.name}</h3> */}

                <Badge
                  color={getProductStatusBadgeColor(item.category)}
                  className="capitalize"
                >
                  {item.category}
                </Badge>
              </div>
              <div>
                <p className="font-medium">${item.price}</p>
                {/* <Badge
              color={getProductStatusBadgeColor(item.category)}
              className="capitalize"
            >
              {item.category}
            </Badge> */}
              </div>
              {/* <p className="mb-2 text-gray-600">Price: {item.price}</p> */}
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
                  <ItemMenuOptions itemId={item?.id} />
                </div>
              </div>
            </div>
          ))
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

function ItemMenuOptions({ itemId }: { itemId: string }) {
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
      <DropdownMenuContent align="end" className="absolute">
        <DropdownMenuItem
          onClick={() => push(`/dashboard/menu/${itemId}/edit`)}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>Preview</DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>Copy ID</DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          className="text-destructive focus:text-destructive"
          onClick={() => onDeleteItem(itemId)}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}



function TrpcShowcase() {
    const apiContext = api.useContext();
  
    const { data, isLoading, error } = api.menu.items.getItems.useQuery();
  
    const createItem = api.menu.items.createItem.useMutation({
      onSuccess: async () => {
        // Invalidate and refetch
        await apiContext.menu.items.getItems.invalidate();
        toast.success("Item added successfully");
      },
    });
  
    function onCreateItem() {
      createItem.mutate({ item: dd });
    }
  
    return (
      <>
        <div>
          <Button onClick={onCreateItem}>Add Item</Button>
        </div>
        <div className="text-sm">
          {/* {data?.map((item) => (
            <div key={item.id} className="border rounded-md p-2">
              <p>{item.name}</p>
              <p>{item.price}</p>
              <p>{item.category}</p>
            </div>
          ))} */}
          {JSON.stringify(data, null, 2)}
          <div className="flex flex-wrap gap-5">
            {data &&
              Object.entries(data).map(([key, value], i) => {
                return (
                  <div key={key} className="rounded-md border p-2">
                    <p>{i}</p>
                    <p>{value.name}</p>
                    <p>{value.price}</p>
                    <p>{value.category}</p>
                  </div>
                );
              })}
          </div>
          {JSON.stringify(isLoading)}
          {JSON.stringify(error)}
          {/* {hello.data ? hello.data.greeting : "Loading tRPC query..."} */}
        </div>
      </>
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
