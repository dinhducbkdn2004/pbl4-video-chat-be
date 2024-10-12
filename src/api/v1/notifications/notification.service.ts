import { createNotification } from './services/createNotification'
import { getNotifications } from './services/getNotifications'
import { seenNotification } from './services/seenNotification'
export const notificationService = {
    getNotifications,
    createNotification,
    seenNotification
}
