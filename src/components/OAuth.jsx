import { FcGoogle } from "react-icons/fc";

export default function OAuth() {
  return (
    <button className='w-full px-7 py-3 uppercase flex items-center bg-red-700 justify-center font-semibold text-white hover:bg-red-800 active:bg-red-900 shadow-md hover:shadow-lg active:shadow-lg transtion duration-200 ease-in-out rounded'>
        <FcGoogle className=" text-2xl bg-white rounded-full mr-2"/>
      Continue with google
    </button>
  )
}
