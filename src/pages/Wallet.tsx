import { IonAvatar, IonContent, IonIcon, IonImg, IonItem, IonItemGroup, IonLabel, IonList, IonPage } from '@ionic/react'
import { downloadOutline, paperPlaneOutline, repeatOutline, scanOutline } from 'ionicons/icons'
import { user_avatar } from './Home'

const Wallet = () => {
    return (
        <IonPage>

            <IonContent fullscreen>


                <div className='wallet'>
                    <div className='wallet-avatar'>
                        <div className='wallet-address'>
                           <p>YHsq9232iu3i2</p>
                        </div>
                         <div className='avatar'>
                                                    <IonAvatar slot='end'>
                            <IonImg src={user_avatar} />
                        </IonAvatar>
                         </div>
                    </div>
                    <div className='wallet-balance'>
                        <p className='balance'>MFT 23,432.00</p>
                        <p className='value'>$894.954</p>

                        <div className='wallet-btn'>
                            <div className='send'> <IonIcon icon={paperPlaneOutline} /></div>
                            <div className='send'> <IonIcon icon={downloadOutline} /></div>
                            <div className='send'> <IonIcon icon={scanOutline} /></div>
                            <div className='send'> <IonIcon icon={repeatOutline} /></div>
                        </div>
                    </div>
                </div>
                <IonList className='wallet-history' inset={true}>
                    <IonItemGroup>
                        <IonItem>
                            <IonLabel>Transfer</IonLabel>
                            <IonLabel>438.34</IonLabel>
                        </IonItem>
                    </IonItemGroup>

                </IonList>

            </IonContent>

        </IonPage>
    )
}

export default Wallet
