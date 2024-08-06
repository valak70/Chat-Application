import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify'
import { create } from 'zustand'
import { db } from './firebase';
import { useUserStore } from './userStore';

export const useChatStore = create((set) => ({
    chatId : null,
    user : null,
    isCurrUserBlocked : false,
    isReceiverBlocked : false,
    changeChat : (chatId,user) =>{
        const currentUser = useUserStore.getState().currentUser
        if(user.blocked.includes(currentUser.id)){
            return(set({
                chatId,
                user : null,
                isCurrUserBlocked : true,
                isReceiverBlocked : false,
            }))
        }
        else if(currentUser.blocked.includes(user.id)){
            return(set({
                chatId,
                user,
                isCurrUserBlocked : false,
                isReceiverBlocked : true,
            }))
        }else{
            return(set({
                chatId,
                user,
                isCurrUserBlocked : false,
                isReceiverBlocked : false,
            }))
        }
    },
    changeBlock  : ()=>{
        set((state)=>({
            ...state,isReceiverBlocked : !state.isReceiverBlocked
        }))
    }
}))