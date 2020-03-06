import ContactModel from "./../models/contactModel";
import UserModel from "./../models/userModel";
import ChatGroupModel from "./../models/chatGroupModel";
import MessageModel from "./../models/messageModel";
import _ from "lodash";



const LIMIT_CONVERSATIONS_TAKEN = 15;
const LIMIT_MESSAGES_TAKEN = 30;
/**
 * get all conversation
 * @param {string} curentUserId 
 */
let getAllConversationItems = (currentUserId) => {
  return new Promise(async (resolve, reject) => {
    try {
        let contacts = await ContactModel.getContacts(currentUserId, LIMIT_CONVERSATIONS_TAKEN );
        let userConversationPromise = contacts.map(async (contact) => {

          if(contact.contactId == currentUserId){          
            let getUserContact =  await UserModel.getNormalUserDataById(contact.userId);
            getUserContact.updatedAt = contact.updatedAt;
            return getUserContact;
          }else{
            let getUserContact = await UserModel.getNormalUserDataById(contact.contactId);
            getUserContact.updatedAt = contact.updatedAt;
            return getUserContact;
        }
      });
        let userConversations = await Promise.all(userConversationPromise);

        let groupConversations = await ChatGroupModel.getChatGroups(currentUserId, LIMIT_CONVERSATIONS_TAKEN);

        let allConversations = userConversations.concat(groupConversations);

        allConversations = _.sortBy(allConversations, (item) => {
          return -item.updatedAt;
        });

        // get messages to apply in screen chat 
        let allConversationWithMessagesPromise = allConversations.map(async (conversation) => {
          let getMessages = await MessageModel.model.getMessages(currentUserId, conversation._id, LIMIT_MESSAGES_TAKEN);
          conversation = conversation.toObject();
          conversation.messages = getMessages;
          return conversation;
        });
        let allConversationWithMessages = await Promise.all(allConversationWithMessagesPromise);
        //sort by updatedAt desending 
        allConversationWithMessages= _.sortBy(allConversationWithMessages, (item) => {
          return -item.updatedAt;
        });

      resolve({
        userConversations: userConversations,
        groupConversations: groupConversations,
        allConversations: allConversations,
        allConversationWithMessages: allConversationWithMessages
      });
    } catch (error) {
      reject(error);
    }
  })
};

module.exports = {
  getAllConversationItems: getAllConversationItems
};