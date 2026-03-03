import { IonAvatar, IonButton, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonSegmentContent, IonSegmentView, IonText, useIonLoading, useIonViewWillEnter } from '@ionic/react'
import { logo, user_avatar, user_icon } from './Home'
import { atCircle, chatboxEllipses, flameSharp } from 'ionicons/icons'
import { useState } from 'react' 
import CommunityComps from './comps/CommunityComps'
import Client from './Client'

const Community = () => {

    const [data, setData] = useState();
    const [com_data, setCom_Data] = useState();
    const [present, dismiss] = useIonLoading()
    const [isOpen, setIsOpen] = useState(false)

    const getData = () => {
       present({
        spinner:'lines-sharp',
        duration:1000,
        cssClass:'spinnner-loader'
       })
        Client.get('/communities').then((res) => {
            setData(res.data.data) 
        }).finally(() => {
 
        })
    }

    useIonViewWillEnter(() => {
        getData()
    })

    function HandleModal(m) {
 
        setCom_Data(m)
        setIsOpen(true)
        return
    }

    return (
        <IonPage>
            <IonHeader   className='status'>
                <p>Fans Stories</p>
                <div>
                    <IonAvatar>
                        <IonImg src={user_icon} />
                    </IonAvatar>
                    <IonAvatar>
                        <IonImg src={user_avatar} />
                    </IonAvatar>
                    <IonAvatar>
                        <IonImg src={logo} />
                    </IonAvatar>
                    <IonAvatar>
                        <IonImg src={user_icon} />
                    </IonAvatar>
                    <IonAvatar>
                        <IonImg src={user_avatar} />
                    </IonAvatar>
                </div>
            </IonHeader>
            <IonContent fullscreen>
                <IonSegment value={'community'} className='community-segment'>
                    <IonSegmentButton value="community" contentId='community'>Communities</IonSegmentButton>
                    <IonSegmentButton value={'club'} contentId='club'>Clubs</IonSegmentButton>
                    <IonSegmentButton value={'friends'} contentId='friends'>Find Friends</IonSegmentButton>
                </IonSegment>
                <IonSegmentView>

                    <IonSegmentContent id='community'>
                        <IonList inset={true} className='community'>
                            {data && data.map((m, index: number) => (

                                <IonItem key={index} lines='none' onClick={() => HandleModal(m)}>
                                    <IonImg slot='start' src={logo} />
                                    <IonLabel className='community-title'>
                                        <div className='title'><p>{m.name}</p></div  >
                                        <div className='desc'> <p>{m.description}</p> </div>
                                        <div className='fans'>Members: <span> {m.members_count}</span>
                                            {!m.is_member ? <IonButton slot='end' className='btn'>Join now</IonButton> : <IonButton disabled slot='end' className='btn'>Joined</IonButton>}
                                        </div>
                                        <div className='community-btn'>
                                            <span>
                                                <IonIcon className='boost' icon={flameSharp}></IonIcon>
                                                23.4k
                                            </span>
                                            <span>
                                                <IonIcon className='chat' icon={chatboxEllipses}></IonIcon>
                                                {m.posts_count}
                                            </span>
                                            <span> <IonIcon className='online' icon={atCircle}></IonIcon> 1.2k </span>
                                        </div>
                                    </IonLabel>
                                </IonItem>
                            ))
                            }
                        </IonList>
                    </IonSegmentContent>
                    <IonSegmentContent id='club'>

                    </IonSegmentContent>
                    <IonSegmentContent id='friends'>

                    </IonSegmentContent>
                </IonSegmentView>

                <CommunityComps com_data={com_data} isOpen={isOpen} setIsOpen={setIsOpen} />
            </IonContent>

        </IonPage>
    )
}

export default Community
