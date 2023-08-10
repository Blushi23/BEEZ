import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import { createContext, useEffect, useState } from 'react';
import Login from './components/Login';
import Favorites from './components/Favorites';
import MyCards from './components/MyCards';
import PageNotFound from './components/PageNotFound';
import { ToastContainer } from "react-toastify";
import NewCard from './components/NewCard';
import UpdateCard from './components/UpdateCard';
import Footer from './components/Footer';
import Card from './interfaces/Card';
import User from './interfaces/User';
import UsersManagment from './components/UsersManagment';
import UserUpdate from './components/UserUpdate';
import { getUserById } from './services/usersService';

let theme = {
  light: "light",
  dark: "dark",
};

export let SiteTheme = createContext(theme.light);

function App() {
  let [userInfo, setUserInfo] = useState(JSON.parse(sessionStorage.getItem("userInfo") as string) == null ? { email: false, password: false, role: false } : JSON.parse(sessionStorage.getItem("userInfo") as string));
  let [cards, setCards] = useState<Card[]>([]);
  let [openModal, setOpenModal] = useState<boolean>(false);
  let [darkMode, setDarkMode] = useState<boolean>(JSON.parse(localStorage.getItem("darkMode")!));
  let [users, setUsers] = useState<User[]>([]);
  let [user, setUser] = useState<User>({
    firstName: "", middleName: "", lastName: "", phone: "", email: "", password: "", imageUrl: "", imageAlt: "", state: "", country: "", city: "", street: "", houseNumber: 0, zip: "", role: ""
  })
  let [openProfileModal, setOpenProfileModal] = useState<boolean>(false)

  useEffect(() => {
    if (userInfo.userId) {
      getUserById(userInfo.userId as number)
        .then((res) => setUser(res.data))
        .catch((err) => console.log(err))
    }
  }, [userInfo.userId]);


  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
  };



  return (
    <div className={`App ${darkMode ? theme.light : theme.dark}`} >

      <SiteTheme.Provider value={darkMode ? "light" : "dark"}>

        <ToastContainer theme={`${darkMode ? "dark" : "light"}`} />
        <Router>
          <Navbar userInfo={userInfo} setUserInfo={setUserInfo} setDarkMode={setDarkMode} darkMode={darkMode} user={user} setUser={setUser} handleUpdateUser={handleUpdateUser} />
          <Routes>
            <Route path='/' element={<Home userInfo={userInfo} openModal={openModal} setOpenModal={setOpenModal} cards={cards} setCards={setCards}
            />} />

            <Route path='/register' element={<Register setUserInfo={setUserInfo} />} />
            <Route path='/login' element={<Login setUserInfo={setUserInfo} />} />
            <Route path='/about' element={<About />} />
            <Route path='/favorites' element={<Favorites userInfo={userInfo} openModal={openModal} setOpenModal={setOpenModal} />} />
            <Route path='/my-cards' element={<MyCards userInfo={userInfo} openModal={openModal} setOpenModal={setOpenModal} />} />
            <Route path='/new' element={<NewCard userInfo={userInfo} />} />
            <Route path='/update/:id' element={<UpdateCard userInfo={userInfo} />} />
            <Route path='/sandBox' element={<UsersManagment handleUpdateUser={handleUpdateUser} users={users} setUsers={setUsers} />} />
            <Route path='/update-user/:id' element={<UserUpdate userInfo={userInfo} onHide={() => setOpenProfileModal(false)} handleUpdateUser={handleUpdateUser} />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
          <Footer userInfo={userInfo} />
        </Router>
      </SiteTheme.Provider>

    </div>
  );
}
export default App;
