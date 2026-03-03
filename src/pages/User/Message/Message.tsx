import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonInput, IonLabel, IonList, IonPage, IonToolbar, useIonViewDidEnter, useIonViewWillEnter, useIonViewWillLeave } from '@ionic/react'
import { add, ellipsisHorizontalOutline } from 'ionicons/icons'
import { useEffect, useRef, useState } from 'react'
import Client from '../../Client';
import { useParams } from 'react-router-dom';
import { echo } from '../../../echo';
import { useMe } from '../../../App';
import { user_icon } from '../../Home';
import { GetChat } from './Helpers';
import MessageCard from './components/MessageCard';

interface MessageProps {
    SetCloseTabs: (close: boolean) => void;
}

const Message = ({ SetCloseTabs }: MessageProps) => {
    interface ChatMessage {
        id: number;
        text: string;
        sender: 'user' | 'Chat';
    }

    function scrollToBottom() {
        if (contentRef.current) {
            contentRef.current.scrollTop = contentRef.current.scrollHeight - contentRef.current.clientHeight;
        } 
    }


    const contentRef = useRef<HTMLIonListElement | null>(null);

    const [Messages, setMessages] = useState<ChatMessage[]>([])
    const [text, setText] = useState('')
    const [Chat, setChat] = useState({})
    const { data: user, } = useMe();
    const { id } = useParams() as { id: string };
    const conversationId = id; // TEMP — replace with real ID from API
 

    useIonViewWillEnter(() => {
        console.log(user.data.id)
        SetCloseTabs(false)

 

        GetChat(id).then((res) => {
            setMessages(res.data.data)
            setChat(res.data.chat)
        }).catch((err) => {
            console.log('error')
        })



    })
 
    useIonViewWillLeave(() => {
        SetCloseTabs(true)

    })






    useEffect(() => {

        Client.post(`/chat/${id}/mark-read`)
        const channel = echo.private(`chat.${conversationId}`); 
        channel.subscribed(() => console.log("Subscribed"))
            .listen(".message.sent", (e) => { 
                 LoadMessages(e)
                
            });
 
                scrollToBottom()

        return () => echo.leave(`chat.${conversationId}`);


    }, [conversationId, Messages]);


    const LoadMessages = async (message)=>{
       await setMessages((prev) => [ ...prev, message, ]);
    }





    const SendMessage = () => {
        Client.post(`/chat/${conversationId}`, {
            chat_id: conversationId,
            message: text,
        })
           
            .then(() => {
                console.log('sent')
                setText('')
            })
            .catch(() => console.log("error"));
    };





    return (
        <IonPage>
            <IonHeader>
                <IonToolbar  >
                    <IonAvatar slot='start'>
                        <IonImg src={Chat?.avatar || user_icon} />
                    </IonAvatar>
                    <IonLabel slot='start' className='ion-margin-horizontal'>
                        <p>{Chat?.display_name}</p>
                        <p>12:09 AM</p>

                    </IonLabel>
                    <IonButtons slot='end'>
                        <IonIcon icon={ellipsisHorizontalOutline}>

                        </IonIcon>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen  >
                <IonList className='message-list' ref={contentRef}>
                    <MessageCard messages={Messages} />


                </IonList>


                <div className='message-form'>
                    <IonIcon size='large' icon={add} />
                    <IonInput type='text' placeholder='Type a message' value={text} onIonInput={(e) => setText(e.detail.value)} />
                    <IonButton onClick={SendMessage}>Send</IonButton>
                </div>


            </IonContent>


        </IonPage>
    )
}

export default Message


