import './style.css';
import Header from "./Header";
import BoardHeader from './BoardHeader';
import PostForm from './PostForm';
import AuthModal from "./AuthModal";
import AuthModalContext from './AuthModalContext';




function App(){
  return(
<div>
  <Header/>
  <AuthModal/>
  
  <BoardHeader/>
  <PostForm/>
  
 
  <div className="px-6 bg-reddit_dark  text-reddit-text ">
  <div className = " border border-reddit_border bg-reddit_dark-brighter p-2 rounder-md">
    <h5 className= "text-reddit_text-darker  text-sm mb-2 ">Posted by W.Kezia 5 hours ago </h5>
    <h2 className=" text-2xl mb-3 text-white">My first year Experience as a Computer Science Student ALU... </h2>
    <div className="text-sm loading-6">
      <p className="text-white">Most of the times I had no Idea what the falicitors were talking about , but just like maths , in CS you can't afford to be left behind, because the not understanding may escalate into an ever ending loop like a while statement set to true or waiting for the end of a p14...!; <br></br>To more of my tale scroll down ! </p>
    </div>
    
     </div>

     </div>

 
</div>
  );
    


}
export default App;
