import { IonButton, IonContent, IonInput, IonItem, IonList, IonPage } from '@ionic/react'
import {   useQueryClient } from '@tanstack/react-query';
import { useState } from 'react'
import Client from '../Client';

import { useMutation } from "@tanstack/react-query";
import { useHistory } from 'react-router';
 

 
export function useLogin() {
  const queryClient = useQueryClient();


  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      Client.post("/login", data),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["me"] });
    }
  });
}

const Login = () => {
  const history  = useHistory()
 const [Email, setEmail] = useState('')
 const [Password, setPassword] = useState('password')
 
    const login = useLogin();

const handleSubmit = async () => {
  await login.mutateAsync({email:Email,password:Password}); 
      history.push('/feed')
};




  return (
    <IonPage> 
      <IonContent fullscreen>
 
            <IonList inset={true} className='login'>
               
               <IonItem lines='none'>
                <IonInput onIonInput={(e)=>setEmail(e.target.value)}  type='text' value={Email}/>
               </IonItem> 
               <IonItem lines='none'>
                <IonInput onIonInput={(e)=>setPassword(e.target.value)}  type='password' value={Password}/>
               </IonItem> 
               <IonButton onClick={handleSubmit}> Login </IonButton>
            </IonList> 

      </IonContent>
    </IonPage>
  )
}

export default Login



