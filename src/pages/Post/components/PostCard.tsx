import { IonAvatar, IonCard, IonCardContent, IonContent, IonFooter, IonIcon, IonImg, IonItem, IonLabel, IonModal } from '@ionic/react'
import { heartSharp, heartOutline, chatboxEllipsesOutline, eyeOutline, shareSocialOutline } from 'ionicons/icons'
import { BadgeCheck } from 'lucide-react'
import React from 'react'
import { user_icon, user_avatar } from '../../Home'
interface POST_Interface {
  id:string;
  created_at: string;
  content: string;
  is_liked: boolean;
  poster: {
    name: string;
    type: string;
  }
}
const PostCard  = ({m}) => {
  return (
    <IonModal  trigger={m?.id}>
      <IonContent fullscreen className='post'  > 
          <IonItem lines='none' routerLink='#'>
            <IonAvatar slot='start' style={{ width: '35px', height: '35px' }}><IonImg src={user_icon}></IonImg></IonAvatar>
            <IonLabel color={'light'}>
              <div className='post-title'>
                <span className='post-title-name'>
                  {m.poster.name}
                  {m.poster.type != 'user' && <BadgeCheck size={'20'} />}
                </span>
                <span className='post-title-time'>{m.created_at}</span>
              </div>
            </IonLabel>

          </IonItem>
          <IonCardContent>
            <IonImg className='post-img' src={user_avatar}></IonImg>
            <p>{m.content.slice(0, 50)}</p>
          </IonCardContent>
          <IonFooter>
            <IonItem lines='none' className='post-btn'>
              <IonLabel><IonIcon className={'like'}
                icon={m.is_liked ? heartSharp : heartOutline} /> <span> 12k</span> </IonLabel>
              <IonLabel><IonIcon className='comment' icon={chatboxEllipsesOutline} /> <span>30</span></IonLabel>
              <IonLabel><IonIcon className='views' icon={eyeOutline} /> <span>381</span> </IonLabel>
              <IonLabel><IonIcon className='share' icon={shareSocialOutline} /> <span>4</span> </IonLabel>
            </IonItem>
          </IonFooter> 
      </IonContent>
    </IonModal>
  )
}

export default PostCard
