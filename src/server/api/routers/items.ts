import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { get, push, ref, serverTimestamp, set } from "firebase/database";
import { db } from "@/server/db";
import type { Item } from "@/lib/types";

let post = {
  id: 1,
  name: "Hello World",
};

// Object.entries(data).map(([key, value], i) => {
//   return (
//     <div key={key} className="rounded-md border p-2">
//       <p>{i}</p>
//       <p>{value.name}</p>
//       <p>{value.price}</p>
//       <p>{value.category}</p>
//     </div>
//   );
// })
function firebaseObjectToArray(object: Record<string, any>) {
  return Object.entries(object).map(([key, value], i) => {
    return {
      id: key,
      ...value,
    };
  });
}

export const itemsRouter = createTRPCRouter({
  // export default async function handler(req, res) {
  //     try {
  //       const menuItemsRef = ref(db, "menuItems");
  //       const snapshot = await get(menuItemsRef);

  //       if (snapshot.exists()) {
  //         const data = snapshot.val();
  //         res.status(200).json(data);
  //       } else {
  //         res.status(404).json({ message: "No data available" });
  //       }
  //     } catch (error) {
  //       res.status(500).json({ message: error.message });
  //     }
  //   }
  getItems: publicProcedure.query(async () => {
    const menuItemsRef = ref(db, "menuItems");
    const snapshot = await get(menuItemsRef);

    if (snapshot.exists()) {
      const data: Item[] = snapshot.val();
      const items = firebaseObjectToArray(data);
      return items;
    } else {
      return { message: "No data available" };
    }
  }),
  // export type Item = {
  //   image: string;
  //   name: string;
  //   category: string;
  //   price: number;
  //   cost: number;
  //   sales: number;
  //   stock: number;
  //   options: Record<string, any>;
  // };

  createItem: publicProcedure
    .input(
      z.object({
        item: z.object({
          name: z.string(),
          description: z.string(),
          category: z.string(),
          status: z.string(),
          price: z.number(),
          cost: z.number(),
          // sales: z.number(),
          stock: z.number(),
          options: z.record(z.any()),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      console.log("input", input);
      const newItemRef = push(ref(db, "menuItems"));
      set(newItemRef, {...input.item, createdAt: serverTimestamp()})
        .then(() => {
          console.log("Item added successfully");
        })
        .catch((error) => {
          console.error("Error adding item: ", error);
        });
    }),

  // Delete data
  // The simplest way to delete data is to call remove() on a reference to the location of that data.

  // You can also delete by specifying null as the value for another write operation such as set() or update(). You can use this technique with update() to delete multiple children in a single API call.
  deleteItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const itemRef = ref(db, `menuItems/${input.id}`);
      set(itemRef, null)
        .then(() => {
          console.log("Item deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting item: ", error);
        });
    }),

  getItemById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const menuItemsRef = ref(db, `menuItems/${input.id}`);
      const snapshot = await get(menuItemsRef);

      if (snapshot.exists()) {
        const data: Item[] = snapshot.val();
        // const items = firebaseObjectToArray(data);
        return { ...data, id: input.id };
      } else {
        return { message: "No data available" };
      }
    }),

  updateItem: publicProcedure
    .input(
      z.object({
        item: z.object({
          id: z.string(),
          name: z.string(),
          description: z.string(),
          category: z.string(),
          status: z.string(),
          price: z.number(),
          cost: z.number(),
          // sales: z.number(),
          stock: z.number(),
          options: z.record(z.any()),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      const itemRef = ref(db, `menuItems/${input.item.id}`);
      set(itemRef, input.item)
        .then(() => {
          console.log("Item updated successfully");
        })
        .catch((error) => {
          console.error("Error updating item: ", error);
        });
    }),

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      post = { id: post.id + 1, name: input.name };
      return post;
    }),

  getLatest: publicProcedure.query(() => {
    return post;
  }),
});
