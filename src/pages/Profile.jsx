import React, { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import {doc,updateDoc} from 'firebase/firestore'
import { useNavigate } from "react-router";
import {toast} from 'react-toastify';
import {db} from '../firebase';
import { FcHome } from "react-icons/fc";
import { Link } from "react-router-dom";

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();
  const [changeDetail, setChangeDetail] = useState(false);
  const [formData, setFormData] = useState({
    fullname: auth.currentUser.displayName,
    email: auth.currentUser.email,
  });
  
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
  const { fullname, email } = formData;
  function onSignOut() {
    auth.signOut();
    navigate("/");
  }
 async function onSubmit(){
    try{
      if(auth.currentUser.displayName !==fullname){
      await updateProfile(auth.currentUser,{
        displayName:fullname
      });

      const decRef = doc(db,"users", auth.currentUser.uid);
      await updateDoc(decRef,{
        fullname
      });
      }
      toast.success("Profile is updated");
    }
    catch(e){
      toast.error("Cant Apply Changes");
    }
  }
  return (
    <>
      <section className="max-w-6xl mx-auto flex justify-center flex-col items-center">
        <h1 className="text-3xl text-center font-bold mt-6">My Profile</h1>
        <div className="w-full md:w-[50%] mt-6">
          <form >
            <input
              onChange={onChange}
              type="text"
              id="fullname"
              value={fullname}
              disabled={!changeDetail}
              className={`mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out  ${changeDetail && 'bg-red-300 focus:bg-red-300'}`}
            />
            <input
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition ease-in-out "
              type="email"
              id="email"
              value={email}
              disabled
            />
            <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg mb-6">
              <p className="flex items-center">
                {" "}
                Do you want to change your name?
                <span
                  onClick={() =>{ 
                    changeDetail && onSubmit();
                    setChangeDetail((prevState) => !prevState)}}
                  className="text-rose-600 hover:text-red transition ease-in-out duration-200 ml-1 cursor-pointer"
                >
                  {changeDetail ? "Apply Changes" : "Edit"}
                </span>
              </p>
              <p
                onClick={onSignOut}
                className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out cursor-pointer"
              >
                Sign Out
              </p>
            </div>
          </form>
          <button type="submit"  className="w-full bg-blue-500 uppercase text-white px-7 py-3 text-sm 
          font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg 
          active: bg-blue-900">
            <Link to="/create-listing" className="flex justify-center items-center">
          <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2"/>
          Sell or Rent your HOME
          </Link>
          </button>
        </div>
      </section>
    </>
  );
}
