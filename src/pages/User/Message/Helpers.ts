import Client from "../../Client" 


export const GetChat = (id: string) => {
    return Client.get(`/chat/${id}`)
}

export const SendMessage = (conversationId: string, body: string) => {
    return Client.post(`/chat/${conversationId}/message`, {
        
        message:body
    })
}

export const  MarkAsRead = (conversationId: string) => {
    return Client.post(`/chat/${conversationId}/read`)
}   


interface Message {
    created_at: string;
    sender_id: string;
}

interface ChatUser {
    last_read_at: string;
}

interface CurrentUser {
    id: string;
}

export const getUnread = (message: Message, chat_user: ChatUser, current_user: CurrentUser): boolean => {
    return message.created_at > chat_user.last_read_at && message.sender_id != current_user.id
}