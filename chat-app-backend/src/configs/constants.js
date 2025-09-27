export const db_name = 'whispr'

export const SocketEvents = Object.freeze({
    CONNECTION: 'connection',
    DISCONNECT: 'disconnect',

    JOIN_CHAT: 'joinChat',
    LEAVE_CHAT: 'leaveChat',
    NEW_MESSAGE: 'newMessage',
    TYPING: 'typing',
    STOP_TYPING: 'stopTyping',
    MESSAGE_READ: 'messageRead',

    MESSAGE_RECEIVED: 'messageReceived',
    TYPING_INDICATOR: 'typingIndicator',
    ONLINE_STATUS: 'onlineStatus',
    NEW_CHAT: 'newChat',
    READ_RECEIPT: 'readReceipt',
})