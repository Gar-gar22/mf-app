import { IonAvatar, IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonItemDivider, IonLabel, IonList, IonPage, IonRow, IonTitle,
     IonToolbar } from '@ionic/react'
import { user_icon } from './Home'
import { checkmarkCircle, footballOutline, locateOutline, locationOutline, locationSharp, mapOutline, musicalNoteOutline, notifications, peopleOutline, settingsOutline, starOutline, trophy } from 'ionicons/icons'
import { useMe } from '../App'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import Client from './Client'
import { useHistory } from 'react-router'

const Me = () => {
    const history = useHistory()
    const { data: user, } = useMe();

 
    const logout = useLogout();

    const handleLogout = async () => {
        await logout.mutateAsync();
        history.push("/login");
    };

    return (
        <IonPage>
            <IonContent fullscreen>
                <IonToolbar color={'secondary'}>
                    <IonButtons slot='start'>
                        <IonIcon slot='start' color='light' icon={settingsOutline} /> 
                    </IonButtons>
                    <IonTitle>MAD-FAN</IonTitle>
                    <IonButtons slot='end'>
                        <IonIcon slot='end'  color='light' icon={notifications} />
                    </IonButtons>
                </IonToolbar>
                <div className='profile'>
                    <div className='profile-frame'>
                        <IonAvatar>
                            <IonImg src={user_icon}></IonImg>
                        </IonAvatar>
                        <span className='profile-check'> 
                            <IonIcon icon={checkmarkCircle} />
                        </span>
                    </div>
                    <div className='username'>
                        <p>{user?.data.name}</p>
                        <span>@{user?.data.username}</span>
                    </div>
                    <div className='profile-user-btn'>
                        <div className='user-btn'>
                            <span>137 </span>
                             <span>Matches</span>
                        </div> 
                        <div className='user-btn'>
                            <span>137 </span>
                                <span>away days</span>
                        </div>
                        <div className='user-btn'>
                            <span>137 </span>
                            <span>level</span>
                        </div>
                    </div>
                </div>


                  <IonItemDivider className='mf-item-divider'>
                    <IonLabel>Badges</IonLabel>
                    <IonLabel slot='end'>
                        <span className='earned'>6 earned</span>
                         </IonLabel>
                  </IonItemDivider>

                  <IonList inset={true}>
                    <IonGrid>
                        <IonRow>
                            <IonCol>
                                <IonIcon icon={trophy}/>
                                <span>Seasonal survivor</span>
                            </IonCol>
                            <IonCol>
                                <IonIcon icon={starOutline}/>
                                <span>Match day hero</span>
                            </IonCol>
                            <IonCol>
                                <IonIcon icon={musicalNoteOutline}/>
                                <span>Chant Master</span>
                            </IonCol>
                            <IonCol>
                                <IonIcon icon={locationOutline}/>
                                <span>Away worrior</span>
                            </IonCol>
                            <IonCol>
                                <IonIcon icon={footballOutline}/>
                                <span>top scorer</span>
                            </IonCol>
                            <IonCol>
                                <IonIcon icon={peopleOutline}/>
                                <span>12th man</span>
                            </IonCol>
                        </IonRow>
                    </IonGrid>


                  </IonList>
                <IonButton onClick={handleLogout}>Logout</IonButton>
            </IonContent>
        </IonPage>
    )
}


export default Me


export function useLogout() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => Client.post("/logout"),

        onSuccess: () => {
            // Remove cached user
            queryClient.removeQueries({ queryKey: ["me"] });
        }
    });
}