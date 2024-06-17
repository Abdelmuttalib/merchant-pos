import { ItemStatusEnum } from "@/lib/types";

export function getItemStatusBadgeColor(status: ItemStatusEnum) {
  switch (status) {
    case ItemStatusEnum.ACTIVE:
      return "green";
    case ItemStatusEnum.DRAFT:
      return "gray";
    case ItemStatusEnum.INACTIVE:
      return "yellow";
    case ItemStatusEnum.ARCHIVED:
      return "dark-gray";
    default:
      return "blue";
  }
}
