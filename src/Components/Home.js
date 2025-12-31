import {Link} from 'react-router-dom';
import NavBar from './NavBar';
function Home(){

return (
    <>
     <NavBar/>
<div className="w-full min-h-screen bg-indigo-700 text-white py-20 px-6 text-center">
   
<h1 className="text-4xl font-bold mb-4">Welcome to Our Online Bookstore</h1>
<p className="text-lg max-w-2xl mx-auto mb-6">
Discover a world of knowledge, stories, and imagination. Your next
favorite book is waiting for you!
</p>


<button className="bg-white text-indigo-700 font-semibold py-3 px-6 rounded-xl shadow-md hover:bg-gray-200 transition">
<Link to="/books"> Explore Books </Link>
</button>
</div>
</>
);

}
export default Home;