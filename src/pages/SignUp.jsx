import React, { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";
import {getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { db } from "../firebase";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

export default function SignUp() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    fullname:"",
    email: "",
    password: "",
  });
  const { fullname, email, password } = formData;
  function onchange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }
 async function onSubmit(e){
    e.preventDefault()
    try{
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      updateProfile(auth.currentUser,{
        displayName:fullname
      });
      const user = userCredential.user;
      const formDataCopy = {...formData};
      delete formDataCopy.password;
      formDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db,'users',user.uid),formDataCopy);
      toast.success("SignUp was successFull");
      navigate('/');
    }
    catch(error){
      toast.error("Something is Wrong with Registration");
    }
  }
  return (
    <section>
      <h1 className="mt-6 text-center font-bold text-3xl">Sign Up</h1>
      <div className="flex justify-center flex-wrap mx-w-6xl px-6 py-12 items-center mx-auto">
        <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
          <img
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=1373&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="key"
            className="w-full rounded-3xl"
          />
        </div>
        <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
          <form onSubmit={onSubmit}>
          <input
              type="text"
              id="fullname"
              value={fullname}
              onChange={onchange}
              placeholder="Full Name"
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transion ease-in-out"
            />
            <input
              type="email"
              id="email"
              value={email}
              onChange={onchange}
              placeholder="Email"
              className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transion ease-in-out"
            />
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                id="password"
                value={password}
                onChange={onchange}
                placeholder="Password"
                className="mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transion ease-in-out"
              />
              {showPass ? (
                <FaEyeSlash
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPass(false)}
                />
              ) : (
                <FaRegEye
                  className="absolute right-3 top-3 text-xl cursor-pointer"
                  onClick={() => setShowPass(true)}
                />
              )}
            </div>
            <div className="flex justify-between text-sm whitespace-nowrap sm:text-lg">
              <p>
                Have an account ?{" "}
                <Link
                  className="text-red-600 hover:text-red ease-in-out transition duration-200"
                  to="/sign-in"
                >
                  Sign in
                </Link>{" "}
              </p>
              <Link
                className=" mb-6 text-blue-800 hover:text-red ease-in-out transition duration-200"
                to="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <button
            type="submit"
            className="text-white bg-blue-600 w-full px-7 py-3 uppercase rounded shadow-md font-medium hover:bg-blue-700 hover:shadow-lg transition duration-150 ease-in-out active:bg-blue-800 "
          >
            Sign Up
          </button>
          <div className=" my-4 flex items-center before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
            <p className="text-center font-semibold mx-4">OR</p>
          </div>
          <OAuth/>
          </form>
          
        </div>
      </div>
    </section>
  );
}
