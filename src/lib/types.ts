// {
//     name: "Orbit Gaming Mouse",
//     status: "draft",
//     price: "$49.99",
//     totalSales: "10",
//     createdAt: "2024-06-01 07:15 PM",
//   },

type Option = {
  name: string;
  price: number;
  cost: number;
  stock: number;
}

export type Item = {
  id: string;
  images: string[];
  name: string;
  category: string;
  price: number;
  cost: number;
  status: ItemStatusEnum;
  sales: number;
  stock: number;
  options: Record<string, Option>;
  createdAt: string;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export enum ViewTypeEnum {
  GRID = "grid",
  LIST = "list",
  // TABLE = "table",
}

export enum ItemStatusEnum {
  DRAFT = "draft",
  ARCHIVED = "archived",
  ACTIVE = "active",
  INACTIVE = "inactive",
}