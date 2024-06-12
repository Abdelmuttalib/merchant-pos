import { createCallerFactory, createTRPCRouter } from "@/server/api/trpc";
import { itemsRouter } from "./items";
import { categoriesRouter } from "./categories";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const menuRouter = createTRPCRouter({
    items: itemsRouter,
    categories: categoriesRouter,
});

// export type definition of API


