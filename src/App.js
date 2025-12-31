import NavBar from './Components/NavBar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./Components/Home";
import Books from "./Components/Books";
import Contact from "./Components/Contact";
import Authors from "./Components/Authors";
import Offers from "./Components/Offers";
import AuthPage from './Components/AuthPage';
import AdminDashboard from './Components/AdminDashboard';
import UserPage from './Components/UserPage';
import AdminLayout from './Components/AdminLayout';
import AdminBooks from './Components/AdminBooks';
import AdminUsers from './Components/AdminUsers';
import UserLayout from './Components/UserLayout';
import UserProfile from './Components/UserProfile';
import UserPurchased from './Components/UserPurchased';
import UserStore from './Components/UserStore'; 
import AdminMessages from './Components/AdminMessages';

function App() {
  
  return (
      <div className="App">
 <Router>
           {/* <NavBar /> */}
           <Routes>
             <Route path="/" exact element={<Home />} />

<Route path="/admin" element={<AdminLayout />}>
  <Route path="users" element={<AdminUsers />} />
  <Route path="books" element={<AdminBooks />} />
    <Route path="messages" element={<AdminMessages />} />
     <Route path="dashboard" element={<AdminDashboard />} />
</Route>
        {/* <Route path="/shop" element={<UserPage/>} /> */}
        <Route path="/login" element={<AuthPage/>} />


<Route path="/shop" element={<UserLayout />}>
          <Route path="profile" element={<UserProfile />} />
          <Route path="purchased" element={<UserPurchased />} />
          <Route path="store" element={<UserStore />} />
     </Route>


<Route path="/books" exact element={<Books/>} />

 <Route path="/contact" exact element={<Contact/>} />
             {/* <Route path="/books" exact element={<Books/>} />
             <Route path="/contact" exact element={<Contact/>} />
             <Route path="/authors" exact element={<Authors/>} />
             <Route path="/offers" exact element={<Offers/>} /> */}
           </Routes>
             </Router>
    </div>
  );
}

export default App;
