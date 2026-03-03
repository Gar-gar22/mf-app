import { IonContent, IonIcon, IonModal } from '@ionic/react'
import React from 'react'
import './style.css'
import { personCircleSharp, radioButtonOffOutline } from 'ionicons/icons'

const CommunityComps = ({isOpen, setIsOpen,com_data}) => {
  return (
   <IonModal ex isOpen={isOpen} onWillDismiss={()=>setIsOpen(false)}>
     <IonContent fullscreen>

        <div className='community-view'>
            <div className='community-view-head'>
                <div className='image'>

                </div>
                <p className='title'>{com_data?.name}</p>

            </div>
            </div>
            <div className='community-view-info'>
                <div  className='info-btn'>
                    <IonIcon icon={personCircleSharp}></IonIcon>
                    <span>238,934,434</span>
                </div>
                <div className='online'>
                    <IonIcon icon={radioButtonOffOutline}/>
                    <span>online</span>
                </div>
            </div>
        

     </IonContent>

   </IonModal>
  )
}

export default CommunityComps
