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


export const getUnread = ( message, chat_user, current_user) => {

   return message.created_at > chat_user.last_read_at && message.sender_id != current_user.id

}