import "./style.css";
import logo from "./logo.png"
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <header className="flex w-full bg-reddit_dark p-2">
        <div className="ax-4"> 
        <img src={logo} alt="" className="w-8 h-8" />
        </div>
      
    <form action="" className="bg-reddit_dark-brighter p-1 px-3 flex rounded-md  border border-grey-700">
      <SearchIcon className = "text-gray-300 h-7 w-7" />
        <input type="text" className="bg-reddit_dark-brighter h-6 text-sm p-1 pl-2 pr-0 block focus:outline-none text-white" placeholder="Search" />
      </form>
       <BellIcon className =" text-white w-18 h-8"/>

      </header>
      </div>

  );
}

export default App;


