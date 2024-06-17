import { Tab } from "@headlessui/react";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { NotificationItem } from "./notifications-item";

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime()),
  );
}

// Function to generate fake notifications data
function generateFakeNotifications(count: number) {
  const types = ["error", "sync", "warning"];
  const notifications = [];

  for (let i = 1; i <= count; i++) {
    const id = `${i}`;
    const type = types[Math.floor(Math.random() * types.length)]!;
    // ts hack to convert type with unknown type
    const date = randomDate(new Date(2023, 0, 1), new Date()) as unknown as string;
    const isRead = Math.random() < 0.5; // Randomly set isRead to true or false
    const description = `This is notification ${i}`;

    notifications.push({
      id,
      type,
      date,
      isRead,
      description,
    });
  }

  return notifications;
}

export function NotificationsTabs() {
  // Generate 10 fake notifications
  const fakeNotifications = generateFakeNotifications(50);
  const notificationsData = {
    All: fakeNotifications,
    Errors: fakeNotifications?.filter(
      (notification) => notification.type === "error",
    ),
    Sync: fakeNotifications?.filter(
      (notification) => notification.type === "sync",
    ),
    Warning: fakeNotifications?.filter(
      (notification) => notification.type === "warning",
    ),
  };

  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="bg-layer-2 flex px-5 dark:bg-background lg:px-6">
          {Object.keys(notificationsData).map((notificationLabel) => (
            <Tab
              key={notificationLabel}
              as="button"
              className={({ selected }) =>
                cn(
                  "border-b-2 border-transparent px-4 py-2 text-sm font-medium",
                  "text-foreground-lighter focus:outline-none dark:focus:bg-gray-800",
                  selected
                    ? "dark:border-primary-hover border-gray-800 text-foreground"
                    : "",
                )
              }
            >
              {notificationLabel.toLocaleLowerCase()}
              <Badge
                color="gray"
                className="dark:bg-layer ml-2 p-1 text-current"
              >
                {
                  notificationsData[
                    notificationLabel as keyof typeof notificationsData
                  ].length
                }
              </Badge>
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          <div>
            {Object.values(notificationsData).map((notifications, idx) => (
              <Tab.Panel key={idx} className="py-3 focus:outline-none">
                <ul className="w-full">
                  {notifications?.map((notification) => (
                    <NotificationItem
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </ul>
              </Tab.Panel>
            ))}
          </div>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
