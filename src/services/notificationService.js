import NotificationModel from "./../models/notificationModel";
import UserModel from "./../models/userModel";

const LIMIT_NUMBER_TAKEN = 10;

/**
 * Get notification when refresh f5 page
 * just 10 item one time.
 * @param {string} currentUserId  
 */
let getNotifications = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let notifications = await NotificationModel.model.getByUserIdAndLimit(currentUserId, LIMIT_NUMBER_TAKEN);

      let getNotifContents = notifications.map(async (notification) => {
          let sender = await UserModel.findUserById(notification.senderId);
          return NotificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar);
      });

     resolve(await Promise.all(getNotifContents));
      
    } catch (error) {
      reject (error);
    }
  });
  
};

/**
 * Count all notifications unread
 * 
 */
let countNotifUnread = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let notificatonsUnread = await NotificationModel.model.countNotifUnread(currentUserId);
      resolve(notificatonsUnread);
    } catch (error) {
      reject (error);
    }
  });
  
};
/**
 * 
 * @param {string} currentUserId 
 * @param {number} skipNumberNotification 
 */
let readMore = (currentUserId, skipNumberNotification) => {
  return new Promise(async (resolve, reject) => {
    try {
      let newNotifications =  await NotificationModel.model.readmore(currentUserId, skipNumberNotification, LIMIT_NUMBER_TAKEN);
      let getNotifContents = newNotifications.map(async (notification) => {
        let sender = await UserModel.findUserById(notification.senderId);
        return NotificationModel.contents.getContent(notification.type, notification.isRead, sender._id, sender.username, sender.avatar);
      });
      resolve(await Promise.all(getNotifContents));
    } catch (error) {
      reject (error);
    }
  });
  
};

module.exports = {
  getNotifications: getNotifications,
  countNotifUnread: countNotifUnread,
  readMore: readMore
};
