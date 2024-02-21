import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

export default function Contact({ userRef, listing }) {
  const [Landlord, setLandlord] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function getLandlord() {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("Could not get Landlord Data");
      }
    }
    getLandlord();
  }, [userRef]);
  function handleOnChange(e) {
    setMessage(e.target.value);
  }
  return (
    <>
      {Landlord !== null && (
        <div className="flex flex-col w-full mt-6">
          <p>
            Contact {Landlord.fullname} for the {listing.fullname.toLowerCase()}
          </p>
          <div className="mt-3 mb-6">
            <textarea
              className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-slate-600"
              name="message"
              id="message"
              rows="2"
              value={message}
              onChange={handleOnChange}
            ></textarea>
          </div>
          <a
            href={`mailto:${Landlord.email}?Subject=${listing.fullname}&body=${message}`}
          >
            <button className="px-7 py-3 bg-blue-600 text-white rounded text-sm uppercase shadow-md 
            hover:shadow-lg hover:bg-blue-700  focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg
            transition duration-150 ease-in-out w-full text-center">Send Message</button>
          </a>
        </div>
      )}
    </>
  );
}
