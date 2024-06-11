export function getProductStatusBadgeColor(status: string) {
  switch (status.toLowerCase()) {
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
