import { createNotification } from './services/createNotification'
import { getNotifications } from './services/getNotifications'
import { updateNotification } from './services/updateNotification'
import { seenAllNotifications } from './services/seenAllNotifications'
import { deleteNotification } from './services/deleteNotification'
export const notificationService = {
    getNotifications,
    createNotification,
    updateNotification,
    seenAllNotifications,
    deleteNotification
}
