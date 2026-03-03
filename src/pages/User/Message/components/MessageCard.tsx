import { IonLabel } from '@ionic/react'
import React from 'react'
import { useMe } from '../../../../App'; 

interface Messages {
    body:string;
    sender_id:number;
    id:number;
}
const MessageCard  = ({ messages }) => {

    const { data: user, } = useMe();
    return (
        <>

            {messages.length > 0 && messages.map((m:Messages, index:number) => (
                <div key={index} className={m.sender_id != user.data.id ? 'msg-left' : 'msg-right'}>
                    <IonLabel slot='start'>

                        <p className='msg-text'>{m.body}</p>
                        {/* <p className='msg-time'>{m.time}</p> */}
                    </IonLabel>
                </div>
            ))
            }
        </>
    )
}

export default MessageCard
