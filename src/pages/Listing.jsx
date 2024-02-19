import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { EffectFace, Autoplay, Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css/bundle";

export default function Listing() {
  const params = useParams();
  const [listing, setListing] = useState();
  const [loading, setLoading] = useState(true);
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
      <Swiper slidesPerView={1} navigation pagination={{type:'progressbar'}} effect="fade" modules={[EffectFade]} autoplay={{delay:3000}}>
        {listing.imgUrls.map((url, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover"
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
}
