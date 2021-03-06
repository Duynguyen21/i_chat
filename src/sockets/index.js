import addNewContact from "./contact/addNewContact";
import removeRequestContactSent from "./contact/removeRequestContactSent";
import removeRequestContactReceived from "./contact/removeRequestContactReceived";
import approveRequestContactReceived from "./contact/approveRequestContactReceived";
import removeContact from "./contact/removeContact";
import chatTextEmoji from "./chat/chatTextEmoji";
import chatImage from "./chat/chatImage";
import chatAttachment from "./chat/chatAttachment";
import typingOn from "./chat/typingOn";
import typingOff from "./chat/typingOff";
import userOnlineOffline from "./status/userOnlineOffline";


/**
 * @param {io} from socket.io library
 */
let initSockets = (io) => {
  addNewContact(io);
  removeRequestContactSent(io);
  removeRequestContactReceived(io);
  approveRequestContactReceived(io);
  removeContact(io);
  chatTextEmoji(io);
  chatImage(io);
  chatAttachment(io);
  typingOn(io);
  typingOff(io);
  userOnlineOffline(io)

};

module.exports = initSockets;
