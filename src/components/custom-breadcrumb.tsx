import { useRouter } from "next/router";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";
import Link from "next/link";

export function CustomBreadcrumb({
  rootPath = "/dashboard",
}: {
  rootPath?: string;
}) {
  const { pathname } = useRouter();

  // split pathname by '/'
  // remove empty strings

  const paths = pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb className="hidden md:flex">
      <BreadcrumbList>
        {paths.map((path, index) => {
          const isLast = index === paths.length - 1;
          return (
            <BreadcrumbItem key={path}>
              <BreadcrumbLink asChild>
                <Link href={`${rootPath}/${path}`}>{path}</Link>
              </BreadcrumbLink>
              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
