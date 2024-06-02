import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify'
import { create } from 'zustand'
import { db } from './firebase';

export const useUserStore = create((set) => ({
    currentUser : null,
    isLoading : true,
    fetchUserInfo : async (uid) => {
        if(!uid) return set({currentUser:null,isLoading:false})
        try {
            const docRef = doc(db, "users", uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data());
                set({currentUser:docSnap.data(), isLoading:false})
            } else {
                set({currentUser:null,isLoading:false})
            }
        } catch (error) {
            toast.error(error.message)
            return set({currentUser:null,isLoading:false})
        }
    }
}))