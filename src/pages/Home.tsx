import { IonAvatar, IonCard, IonCardContent, IonCardTitle, IonContent, IonFooter, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonProgressBar, IonToolbar, useIonLoading, useIonViewWillEnter } from '@ionic/react';
import './Home.css';
import { useState } from 'react';
import { BadgeCheck, Flame } from 'lucide-react';
import { chatboxEllipsesOutline, ellipsisHorizontalOutline, eyeOutline, flashOutline, heartOutline, heartSharp, shareSocialOutline } from 'ionicons/icons';
import Client from './Client';
import PostCard from './Post/components/PostCard';


export const user_avatar = 'https://footballtoday.com/wp-content/uploads/2025/07/fc-barcelona-v-real-madrid-cf-la-liga-ea-sports-2-2048x1421.jpg'
export const user_icon =  'https://www.bing.com/th/id/OIP.IznpuT0U1Pn3hg2mthVpLgHaHa?w=232&h=211&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2'
export const logo = 'https://static.vecteezy.com/system/resources/previews/014/600/616/original/mf-letter-logo-design-in-illustration-logo-calligraphy-designs-for-logo-poster-invitation-etc-vector.jpg'

const Home: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [present, dismiss] = useIonLoading()


  useIonViewWillEnter(() => {
       present({
        spinner:'lines-sharp',
        duration:1000,
        cssClass:'spinnner-loader'
       })

    Client.get('/post').then((res) => {
      dismiss();
      if (res.data) {
        setData(res.data.post) 
      }


    }).finally(() => {

      dismiss();
    })



  }) 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar >
          <IonAvatar slot='start' style={{ width: '35px', height: '35px' }}>
            <IonImg src={logo} />
          </IonAvatar>

          <div  className='head-title'  >
            <span> <IonIcon icon={flashOutline}/> Seasion 2026</span>
          </div>
          <IonAvatar slot='end' style={{ width: '35px', height: '35px', border: '1px solid white' }}>
            <IonImg src={user_icon} />
          </IonAvatar>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>


        <IonCard className='home-card'>
          <IonCardTitle
            style={{ width: '100%', marginTop: '10px', fontSize: '22px' }} >
            <Flame />12,48773
            <span className='ptl'> Fan Points</span>
          </IonCardTitle>
          <IonCardContent>

            <IonLabel>Level 7 - Ultra Loyal</IonLabel>
            <IonProgressBar type='determinate' color={'danger'} 
            style={{padding:'3px'}}
            value={0.55} buffer={0.24}></IonProgressBar>


            <div className='home-card-btn'>
              <span className='btn-a'>Redeem Reward</span>

              <span className='btn-b'>View LeaderBoards</span>
            </div>


          </IonCardContent>
        </IonCard>
        {
          data && data?.map((m, index: number) => (
            <div key={index} id={m.id} >
               <PostCard  m={m}/>  

              <IonCard className='post' >
                <IonItem lines='none'  >
                  <IonAvatar slot='start' style={{ width: '35px', height: '35px' }}><IonImg src={user_icon}></IonImg></IonAvatar>
                  <IonLabel >
                    <div className='post-title'>
                      <span className='post-title-name'>
                        {m.poster.name}
                        {m.poster.type != 'user' && <BadgeCheck size={'20'} />}
                      </span>
                      <span className='post-title-time'>{m.created_at}</span>
                    </div>
                  </IonLabel>
                  <IonLabel slot='end' className='post-settings'>
                   <IonIcon icon={ellipsisHorizontalOutline} /> 
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
              </IonCard>
            </div>
          ))


        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
