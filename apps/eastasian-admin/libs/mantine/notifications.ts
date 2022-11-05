import {
  showNotification as showNotificationMantine,
  NotificationProps,
} from '@mantine/notifications';

export const showNotification = (payload: NotificationProps) => {
  return showNotificationMantine(payload);
};
