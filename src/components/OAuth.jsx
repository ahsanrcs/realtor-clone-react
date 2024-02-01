import { FcGoogle } from "react-icons/fc";
import { getAuth,signInWithPopup,GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { serverTimestamp, setDoc,getDoc,doc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router";

export default function OAuth() {
  const navigate =useNavigate();
  
 async function onGoogleClick(){
    try{
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result =await signInWithPopup(auth,provider);
      const user= result.user;
      console.log(user);
      const docRef = doc(db,'users',user.uid);
      const docSnap =await getDoc(docRef);
      if(!docSnap.exists()){
        await setDoc(docRef,{
          fullname:user.displayName,
          email:user.email,
          timestamp:serverTimestamp()
        });
      }
      navigate('/');

    }
    catch(error){
      toast.error("Something went Wrong with your google account");
      console.log(error);
    }
  }
  return (
    <button type="button" onClick={onGoogleClick} className='w-full px-7 py-3 uppercase flex items-center bg-red-700 justify-center font-semibold text-white hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transtion duration-200 ease-in-out rounded'>
        <FcGoogle className=" text-2xl bg-white rounded-full mr-2"/>
      Continue with google
    </button>
  )
}
