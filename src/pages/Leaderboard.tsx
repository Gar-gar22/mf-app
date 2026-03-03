import { IonAvatar, IonContent, IonImg, IonItem, IonItemGroup, IonLabel, IonList, IonPage } from '@ionic/react'
import React from 'react'
import { user_icon } from './Home'
import first from './assets/first.png'
import second from './assets/second.png'
import third from './assets/third.png'

const Leaderboard = () => {

    return (
        <IonPage>
            <IonContent fullscreen> 
                <IonList className='list-leaderboard'> 
                    <div className='leaderboard'>
                        <div className='leaderboard-second'>
                            <div>
                                <IonImg src={second} />
                                <IonAvatar><IonImg src={user_icon} /></IonAvatar>
                                <span>Second</span>
                            </div>
                        </div>
                        <div className='leaderboard-first'>
                            <div>
                                <IonImg src={first} />
                                <IonAvatar><IonImg src={user_icon} /></IonAvatar>
                                <span>First</span>
                            </div>
                        </div>
                        <div className='leaderboard-third'>
                            <div>
                                <IonImg src={third} />
                                <IonAvatar><IonImg src={user_icon} /></IonAvatar>
                                <span>Third</span>
                            </div>
                        </div>
                    </div>
                </IonList>


                <div className='leaderboard-list'>
                    <IonList inset={true}>
                        <IonItemGroup>
                            <IonItem>


                                <IonAvatar>
                                    <IonImg src={user_icon} />
                                </IonAvatar>
                                <IonLabel>
                                    <p>John Doe</p>
                                    <p>@jond_123</p>
                                </IonLabel> 
                                <IonLabel slot='end'>1</IonLabel>
                            </IonItem>
                        </IonItemGroup>
                    </IonList>

                </div>
            </IonContent>

        </IonPage>
    )
}

export default Leaderboard
