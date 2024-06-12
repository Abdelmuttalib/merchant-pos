export const sitePaths = {
  home: "/",
  dashboard: {
    home: "/dashboard",
    menu: {
      home: "/dashboard/menu",
      new: "/dashboard/menu/new",
      edit: "/dashboard/:itemId/edit",
    },
    categories: {
      home: "/dashboard/categories",
      new: "/dashboard/categories/new",
      edit: "/dashboard/categories/:categoryId/edit",
    },
    settings: {
      home: "/dashboard/settings/general",
      general: "/dashboard/settings/general",
      appearance: "/dashboard/settings/appearance",
    },
  },
};
