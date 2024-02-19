import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import {
  EffectFace,
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
} from "swiper/modules";
import "swiper/css/bundle";
import { FaShare } from "react-icons/fa";

export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(true);
  const [shareLink, setShareLink] = useState(false);
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
      <div className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center items-center "
       onClick={()=>{
        navigator.clipboard.writeText(window.location.href);
        setShareLink(true);
        setTimeout(()=>{
          setShareLink(false);
        },2000)
       }}> 
      <FaShare className="text-lg text-slate-500"/>
      </div>
      {shareLink && (
        <p className="fixed top-[23%] right-[5%] font-semibold border-2 border-gray-400 rounded-md bg-white z-10 p-2">Link Copied</p>
      )}
    </main>
  );
}
