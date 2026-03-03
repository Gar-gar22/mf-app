/* eslint-disable react-refresh/only-export-components */
import { Redirect, Route, Switch } from 'react-router-dom';
import { IonApp, IonAvatar, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonPage, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact, useIonViewDidEnter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home, { user_icon } from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import "./echo";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import './theme/global.css';
import './pages/Auth/style.css'
import { chatboxEllipsesSharp, footballOutline, menuOutline, homeOutline, addOutline, trophyOutline, personOutline, peopleOutline, chatbubbleOutline, medalOutline, giftOutline, notificationsOffOutline, notificationsOutline, bookmarkOutline, settingsOutline, shieldOutline } from 'ionicons/icons'; 
import Community from './pages/Community';
import Leaderboard from './pages/Leaderboard'; 
import Me from './pages/Me';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register'; 
import Wallet from './pages/Wallet';
import { useQuery } from '@tanstack/react-query';
import Client from './pages/Client';  
import Fixtures from './pages/Fixtures/Fixtures';
import './pages/User/style.css'
import Message from './pages/User/Message/Message';
import { useState } from 'react'; 
import { modalController } from '@ionic/core';
import Chat from './pages/User/Chats/Chat';
import { menuController } from '@ionic/core/components';
import { formatNumber } from './helpers/NumberFormat';


setupIonicReact({
  mode: 'ios',  
});

export function useMe() {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await Client.get("/me");
      Client.interceptors.response.use(
  res => res,
  err => {
    
    return Promise.reject(err);
  }
);
      return res.data;
    }, 
  });
}
 

const App: React.FC = () => {
  const [SetCloseTabs, setSetCloseTabs] = useState(true) 
const { data: user, isLoading, } = useMe();
     


Client.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
     if(user){ 
       console.log('unauthorized')
    } 
  }
    return;
  }
); 
 


useIonViewDidEnter(() => {
       const handler = (ev: any) => {
      ev.detail.register(10, async () => {
    const top = await modalController.getTop();

  if (top) {
    await top.dismiss();
  }
      });
    };

    document.addEventListener("ionBackButton", handler);

    return () => {
      document.removeEventListener("ionBackButton", handler);
    };
})


 


if(isLoading){
return  <IonPage>
    <IonContent fullscreen> 

    </IonContent>
  </IonPage>
}


  return ( 
  <IonApp>
       <IonMenu type='overlay' menuId="menu" contentId="main-content">


        <IonList className='menu-profile'>
          <div className='menu-profile-frame'>
            <IonAvatar>
              <IonImg src={user_icon}></IonImg>
            </IonAvatar>
            <div className='menu-profile-name'>
              <p>{user?.data.name}</p>
              <span>@{user?.data.username}</span>
            </div>
          </div>
          <div className='menu-follow'>
            <p><span>{user && formatNumber.format(user?.data?.followers_count+97482)}</span> followers</p>
            <p><span>{user && formatNumber.format(user?.data?.following_count)} </span> following</p>
          </div>
        </IonList>
        


        <IonList className='menu-list' inset={false}>
          <IonMenuToggle autoHide={true}>
            <IonItem lines='none' button href="/me">
              <IonIcon slot='start' icon={personOutline} />
              <IonLabel>Profile</IonLabel>
            </IonItem>
            <IonItem lines='none' button href="/chat">
              <IonIcon slot='start' icon={chatbubbleOutline} />
              <IonLabel>Chats</IonLabel>
            </IonItem>
            <IonItem lines='none' button href="/clubs">
              <IonIcon slot='start' icon={peopleOutline} />
              <IonLabel>Clubs</IonLabel>
            </IonItem> 
            <IonItem lines='none' button href="/achievement">
              <IonIcon slot='start' icon={medalOutline} />
              <IonLabel>Achievements</IonLabel>
            </IonItem> 
            <IonItem lines='none' button href="/reward">
              <IonIcon slot='start' icon={giftOutline} />
              <IonLabel>Rewards</IonLabel>
            </IonItem> 
            <IonItem lines='none' button href="/notification">
              <IonIcon slot='start' icon={notificationsOutline} />
              <IonLabel>Notifications</IonLabel>
            </IonItem> 
            <IonItem lines='none' button href="/bookmark">
              <IonIcon slot='start' icon={bookmarkOutline} />
              <IonLabel>Bookmarks</IonLabel>
            </IonItem> 
            <IonItem lines='none' button href="/verification">
              <IonIcon slot='start' icon={shieldOutline} />
              <IonLabel>Verification</IonLabel>
            </IonItem> 
            <IonItem lines='none' button href="/settings">
              <IonIcon slot='start' icon={settingsOutline} />
              <IonLabel>Settings</IonLabel>
            </IonItem> 
          </IonMenuToggle>    

        </IonList>
      </IonMenu>
    <IonReactRouter >
  {    user ? <IonTabs > 
          <IonRouterOutlet id="main-content">   
            <Route exact path="/leaderboard">
              <Leaderboard />
            </Route>
            <Route exact path="/community">
              <Community />
            </Route>
            <Route exact path="/wallet">
              <Wallet />
            </Route> 
            <Route exact path="/chat">
              <Chat />
            </Route>
            <Route exact path="/chat/message/:id">
              <Message  SetCloseTabs={setSetCloseTabs}/>
            </Route>
            <Route exact path="/fixtures">
              <Fixtures />
            </Route>


            <Route exact path="/feed">
              {/* Replace <Home /> with your actual Wallet page/component */}
              <Home />
            </Route>
            <Route exact path="/me">
              <Me /> 
              </Route> 
            <Route exact path="/">
              <Redirect to={'feed'} />
            </Route> 
          </IonRouterOutlet>

{          SetCloseTabs && <IonTabBar slot="bottom">
            <IonTabButton tab="feed" href="/feed">
              <IonIcon icon={homeOutline} />
              Feed
            </IonTabButton> 
            <IonTabButton tab="fixtures" href="/fixtures">
              <IonIcon icon={footballOutline} />
              MatchDay
            </IonTabButton>
            <IonTabButton tab="chat" href="/chat">
              <IonIcon  icon={addOutline} />
              Chat
            </IonTabButton>
            <IonTabButton tab="community" href="/community">
              <IonIcon icon={trophyOutline} />
              Community
            </IonTabButton>
            
            <IonTabButton  onClick={()=>menuController.toggle('menu')} tab="menu" href="#">
              <IonIcon icon={menuOutline} />
              Menu
            </IonTabButton>
          </IonTabBar>}
        </IonTabs>:
        <IonRouterOutlet>
           <Switch>
              <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
           <Route exact path="*">
              <Redirect to='/login' /> 
              </Route>
              </Switch>
        </IonRouterOutlet>
        
        }
    </IonReactRouter>
  </IonApp> 
  ) };

export default App;
