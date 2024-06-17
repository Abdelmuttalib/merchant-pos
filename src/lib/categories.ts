import { db } from "@/server/db";
import { get, ref } from "firebase/database";
import type { Category } from "./types";
import { firebaseObjectValToArray } from "./db";

export async function getCategories() {
    const categoriesRef = ref(db, "categories");
    const snapshot = await get(categoriesRef);

    if (snapshot.exists()) {
      const data = snapshot.val();
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const categories: Category[] = firebaseObjectValToArray(data);
      return categories;
    } else {
      return { message: "No data available" };
    }
  }