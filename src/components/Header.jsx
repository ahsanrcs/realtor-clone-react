import { useLocation, useNavigate } from "react-router-dom";


export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  function pathMathRoute(rout){
    if(rout === location.pathname){
      return true;
    }
  }
  
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="realtor.com logo"
            className="h-5 cursor-pointer"
          />
        </div>
        <div>
          <ul className="flex space-x-10">
            <li onClick={()=>navigate('/')} className={`cursor-pointer py-3 text-sm font-semibold  border-b-[3px]  ${ pathMathRoute("/") && "text-black border-b-red-500"}`}>Home</li>
            <li onClick={()=>navigate("/offers")} className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px]  ${ pathMathRoute('/offers') && "text-black border-b-red-500"}`}>Offers</li>
            <li onClick={()=>navigate("/sign-in")} className={`cursor-pointer py-3 text-sm font-semibold border-b-[3px]  ${ pathMathRoute('/sign-in') && "text-black border-b-red-500"}`}>Sign In</li>
          </ul>
        </div>
      </header>
    </div>
  );
}
