import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { get, push, ref, serverTimestamp, set } from "firebase/database";
import { db } from "@/server/db";
import type { Item } from "@/lib/types";
import { firebaseObjectValToArray } from "@/lib/db";

export const itemsRouter = createTRPCRouter({
  //
  getItems: publicProcedure.query(async () => {
    const menuItemsRef = ref(db, "menuItems");
    const snapshot = await get(menuItemsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const items: Item[] = firebaseObjectValToArray(data);
      return items;
    } else {
      return { message: "No data available" };
    }
  }),

  createItem: publicProcedure
    .input(
      z.object({
        item: z.object({
          images: z.array(z.string()),
          name: z.string(),
          description: z.string(),
          category: z.string(),
          status: z.string(),
          price: z.number(),
          cost: z.number(),
          // sales: z.number(),
          stock: z.number(),
          // options is array of objects, each object has 'name' 'price' 'cost' 'stock'
          options: z.array(z.record(z.any())),
          // options: z.record(z.any()),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      const newItemRef = push(ref(db, "menuItems"));
      set(newItemRef, { ...input.item, createdAt: serverTimestamp() })
        .then()
        .catch(() => {
          throw new Error("Error adding item");
        });
    }),

  deleteItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const itemRef = ref(db, `menuItems/${input.id}`);
      set(itemRef, null)
        .then()
        .catch(() => {
          throw new Error("Error deleting item");
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
          images: z.array(z.string()),
          name: z.string(),
          description: z.string(),
          category: z.string(),
          status: z.string(),
          price: z.number(),
          cost: z.number(),
          // sales: z.number(),
          stock: z.number(),
          options: z.array(z.record(z.any())).optional(),
          createdAt: z.number(),
        }),
      }),
    )
    .mutation(async ({ input }) => {
      const itemRef = ref(db, `menuItems/${input.item.id}`);
      set(itemRef, { ...input.item, updatedAt: serverTimestamp() })
        .then()
        .catch(() => {
          throw new Error("Error updating item");
        });
    }),
});
