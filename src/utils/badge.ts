export function getProductStatusBadgeColor(category: string) {
  switch (category.toLowerCase()) {
    case "active":
      return "green";
    case "draft":
      return "gray";
    case "inactive":
      return "yellow";
    case "archived":
      return "dark-gray";
    default:
      return "blue";
  }
}
