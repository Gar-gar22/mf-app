import { IonButtons, IonContent, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonSegmentContent, IonTitle, IonToolbar } from '@ionic/react'
import { notifications } from 'ionicons/icons'

const Fixtures = () => {
const barca = 'https://th.bing.com/th/id/OSB.HUhNQYtTYvLwMeBbN6jtpQ--.png?w=50&h=50&c=6&qlt=90&o=6&dpr=2&pid=BingSports'

  return (
    <IonPage>
        <IonHeader>
            <IonToolbar >
                <IonButtons slot='end'>
                    <IonIcon icon={notifications}/>
                </IonButtons>
                <IonTitle>MatchDay</IonTitle>
            </IonToolbar>
        </IonHeader>
     <IonContent fullscreen>
        <IonSegment value={'ongoing'} className='fixtures-segment'>
            <IonSegmentButton value={'ongoing'} className='fixtures-segment'>Ongoing</IonSegmentButton>
            <IonSegmentButton value={'live'}>Live</IonSegmentButton>
            <IonSegmentButton value={'past'}>Past</IonSegmentButton>
        </IonSegment>
        <IonSegmentContent id='ongoing'>
            <IonList inset={true}>
               <div className='match'>
                  <div className='match_team'>
                    <IonImg src={barca}></IonImg>
                    <span>barcelona</span>
                  </div>
                  <div className='match_team'>
                    <IonImg src={barca}></IonImg>
                    <span>barcelona</span>
                  </div> 
               </div>

            </IonList>

        </IonSegmentContent>
        <IonSegmentContent id='live'></IonSegmentContent>
        <IonSegmentContent id='past'></IonSegmentContent>
         
     </IonContent> 
    </IonPage>
  )
}

export default Fixtures
