/*this code is for the header , i used tailwind for css and heroicons for icons , other resourse are : https://www.youtube.com/watch?v=6tRAuj9q5ys&list=PLChiukrA-RMNVQ2D4AlxSNg7DxmyHjW_l&index=1 */
import Logo from "./logo1.png"
import Avatar from "./avatar.png";
import {
  SearchIcon,
  BellIcon,
  ChatIcon,
  ChevronDownIcon,
  LoginIcon,
  LogoutIcon,
  PlusIcon,
  
  UserIcon
} from "@heroicons/react/outline";
import * as Icons from "heroicons-react";
import Button from "./Button";
import {useState,useContext ,useRef} from 'react';
import ClickOutHandler from 'react-clickout-handler';



 function Header() {
  const [userDropdownVisibilityClass,setUserDropdownVisibilityClass] = useState('hidden');
 
  function toggleUserDropdown() {

  
    if (userDropdownVisibilityClass === 'hidden') {
      setUserDropdownVisibilityClass('block');
    } else {
      setUserDropdownVisibilityClass('hidden');
    }
  }

return(

<header className="flex w=full bg-reddit_dark p-2">
        <div className= "mr=4 flex relative " >
        <img scr={Logo}
        
        alt="Reddit" className="w=8 h=8  text-white" />
      </div>
      <form action="" className="bg-reddit_dark-brighter px-3 flex rounded-md border border-reddit_border mx-4 flex-grow  ">
        <SearchIcon className ="text-gray-300  h-6 w-6 mt-1 "/>
        <input type="text" className="bg-reddit_dark-brighter h-6 text-sm p-1 pl-2 pr-0 focus:outline-none block text-white" placeholder="Search " />
      </form>
    
     {/* <button className="px-2 py-1">
              <BellIcon className="text-gray-400 w-6 h-6 mx-2" />
            </button>
            <button className="px-2 py-1">
              <ChatIcon className="text-gray-400 w-6 h-6 mx-2" />
            </button>
            <button className="px-2 py-1">
              <PlusIcon className="text-gray-400 w-6 h-6 mx-2" />
            </button> */}
            <div className ="mx-2 hidden sm:block"> 
            <Button outline className="ml-2 mr-1 text-white">Log In</Button>
            <Button className="mr-2">Sign Up</Button> 
            </div>
         
            <ClickOutHandler onClickOut={() => setUserDropdownVisibilityClass('hidden')}>
                <button className="rounded-md flex ml-4 border border-gray-700" onClick={() => toggleUserDropdown()}>
                  <UserIcon className="w-6 h-6 text-gray-400 m-1" /> 

                  {/* <div className='w-8 h-8 bg-gray-600 rounded-md flex '>
                    {/* <img src ={Avatar} alt=''style={{filter:'invert(100%)'}} className="block" /> 
                  
                    </div>  */}
          
                    <ChevronDownIcon className= "text-gray-500 w-5 h-5 mt-2 ml-1" />
                  </button> 
              
            {/* working on the drop down in the defaulf page befor the user has signIn or logIn */}
            <div className={"absolute right-0 top-8 bg-reddit_dark border border-gray-700 z-10 rounded-md text-reddit_text overflow-hidden "+ userDropdownVisibilityClass} >
              <button className="block flex w-50 py-2 px-3 hover:bg-gray-300 hover:text-black text-small">
                <LoginIcon className=" w-5 h-5 mr-2 "/>
                Log In /Sign Up   
              </button>
            </div>
            </ClickOutHandler>
 </header>
   );
  
 }
 export default Header;