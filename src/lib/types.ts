// {
//     name: "Orbit Gaming Mouse",
//     status: "draft",
//     price: "$49.99",
//     totalSales: "10",
//     createdAt: "2024-06-01 07:15 PM",
//   },

export type Item = {
  image: string;
  name: string;
  category: string;
  price: number;
  cost: number;
  sales: number;
  stock: number;
  options: Record<string, any>;
};

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export type ViewType = "list" | "grid";
