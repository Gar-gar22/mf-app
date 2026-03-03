import { IonAvatar, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonItemGroup, IonLabel, IonList, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react'
import React, { useEffect, useState } from 'react' 
import { add, addCircleOutline, checkmarkDoneOutline } from 'ionicons/icons'
import { useMe } from '../../../App'
import Client from '../../Client'
import { user_icon } from '../../Home'
import { echo } from '../../../echo'
 

const Chat = () => {
    const { data: user } = useMe()
    const [Data, setData] = useState<any[]>([]);

    const GetChat = () => {

        Client.get(`/chat`).then((res) => {

            console.log(res.data)
            setData(res?.data?.data)
        }).catch((err) => {

            console.log('error')
        })
    }

    useIonViewWillEnter(() => {
        GetChat()
        
    })

    useEffect(()=>{

                const channel = echo.channel(`chat`); 
                channel.subscribed(() => console.log("Subscribed"))
                    .listen(".new.chat", (e) => {  
                          GetChat()
                    });
          
        
                return () => echo.leave(`chat`);
        
    })
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar  >
                    <IonTitle>Chat with Friends</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen  >
                <IonList  className='chat' >

                    <IonItemGroup>
                        {Data?.length > 0 && Data?.map((m,index) => (
                            <IonItem lines='none' key={index} href={'chat/message/'+m.id} className='ion-margin-vertical'>
                                <IonAvatar><IonImg src={user_icon} /> </IonAvatar>
                                <IonLabel>
                                    <p className='display_name'>{m?.display_name}</p>
                                    <p className='last_message'> {m?.last_message?.body?.slice(0,30)}</p>
                                   { m.unread_count > 0 && <p className='unreed_count'>{m.unread_count}</p>}
                                </IonLabel>
                                <IonLabel slot='end' className='read_mark'>
                                   { m?.last_message?.sender_id ? m?.last_message?.sender_id === user.data.id && <IonIcon icon={checkmarkDoneOutline}/>:''}
                                </IonLabel>
                            </IonItem>

                        ))}
                    </IonItemGroup>
                </IonList>


            </IonContent>
                        <IonFab color='primary'  vertical='bottom' horizontal='end'>
                <IonFabButton color={'primary'}>
                    <IonIcon icon={addCircleOutline}/>
                </IonFabButton>
            </IonFab>
        </IonPage>
    )
}

export default Chat
