import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { get, push, ref, set, serverTimestamp } from "firebase/database";
import { db } from "@/server/db";
import { Category } from "@/lib/types";

function firebaseObjectToArray(object: Record<string, any>) {
  return Object.entries(object).map(([key, value], i) => {
    return {
      id: key,
      ...value,
    };
  });
}

export const categoriesRouter = createTRPCRouter({
  getCategories: publicProcedure.query(async () => {
    const categoriesRef = ref(db, "categories");
    const snapshot = await get(categoriesRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      const categories: Category[] = firebaseObjectToArray(data);
      return categories;
    } else {
      return { message: "No data available" };
    }
  }),

  createCategory: publicProcedure
    .input(
      z.object({
        name: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const newCategoryRef = push(ref(db, "categories"));
      set(newCategoryRef, { ...input, createdAt: serverTimestamp() })
        .then(() => {
          console.log("Category added successfully");
        })
        .catch((error) => {
          console.error("Error adding category: ", error);
        });
    }),

  deleteCategory: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const categoryRef = ref(db, `categories/${input.id}`);
      set(categoryRef, null)
        .then(() => {
          console.log("Category deleted successfully");
        })
        .catch((error) => {
          console.error("Error deleting category: ", error);
        });
    }),

  getCategoryById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const categoryRef = ref(db, `categories/${input.id}`);
      const snapshot = await get(categoryRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        return { ...data, id: input.id };
      } else {
        return { message: "No data available" };
      }
    }),

  updateCategory: publicProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const categoryRef = ref(db, `categories/${input.id}`);
      set(categoryRef, input)
        .then(() => {
          console.log("Category updated successfully");
        })
        .catch((error) => {
          console.error("Error updating category: ", error);
        });
    }),
});
