import { doc, getDoc} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useParams } from "react-router";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed, FaBath,FaParking,FaChair} from "react-icons/fa";
import {
  EffectFace,
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
} from "swiper/modules";
import "swiper/css/bundle";
import { FaShare } from "react-icons/fa";
import Contact from "../components/Contact";

export default function Listing() {
  const auth = getAuth();
  const params = useParams();
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);
  SwiperCore.use([Autoplay, Navigation, Pagination]);
  useEffect(() => {
    async function fetchLisiing() {
      const docRef = doc(db, "listings", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    }
    fetchLisiing();
    console.log(listing);
  }, [params.id]);
  if (loading) {
    return <Spinner />;
  }
  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center "
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLink(true);
          setTimeout(() => {
            setShareLink(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLink && (
        <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">
          Link Copied
        </p>
      )}
      <div className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4  rounded-lg border-3 shadow-lg bg-white lg:space-x-4">
        <div className=" w-full ">
          <p className="text-2xl font-bold mb-3 text-blue-900">
            {listing.fullname}-${" "}
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  {listing.type === "rent" ? " / Month" : " "}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaLocationDot className="text-green-700 mr-1 "/>
              {listing.address}
          </p>
          <div className="flex justify-start items-center space-x-4 w-[75%]">
            <p className="bg-red-800 w-full max-w-[200px] rounded-md p-1 text-white text-center font-semibold shadow-md">{listing.type ===  "rent" ? "Rent" : "Sale"}</p>
            {listing.offer && (<p className="w-full max-w-[200px] bg-green-800 rounded-md p-1 text-white text-center font-semibold shadow-md">${+listing.regularPrice- +listing.discountedPrice} Discounted</p>)}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold"> 
            Dsscription - </span>
            {listing.description}
          </p>
          <ul className="flex items-center space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center">
            <FaBed className="text-lg mr-1" />
              {+listing.bedroooms > 1 ? `${listing.bedroooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center">
            <FaBath className="text-lg mr-1" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center">
            <FaParking className="text-lg mr-1" />
              {listing.parking? "Parking Spot" : "No Parking"}
            </li>
            <li className="flex items-center">
            <FaChair className="text-lg mr-1" />
            {listing.furnshid? "Furnished" : "Not Furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button onClick={()=>setContactLandlord(true)} className="px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md 
              hover:bg-blue-700 hover:shadow-lg focus::bg-blue-700 focus:shadow-lg  w-full text-center transition duration-150 ease-in-out">
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && (
            <Contact userRef ={listing.userRef} listing = {listing}/>
          )}
        </div>
        <div className="bg-blue-300 w-full h-[200px] lg--[400px] z-10 overflow-x-hidden"></div>
      </div>
    </main>
  );
}
