
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import { LayoutOne } from './Layouts/LayoutOne'
import { LoginPage } from './Pages/LoginPage'
import { SignUpPage } from './Pages/SignUpPage'
import { NotFoundPage } from './Pages/NotFoundPage'
import { ToastContainer } from 'react-toastify'
import database from './firebase.config'
import ResetPassword from './components/LoginCompo/ResetPassword'
import { Home } from './components/home/Home'
import { HomePage } from './Pages/HomePage'
import { FriendPage } from './Pages/FriendPage'
import { ChatPage } from './Pages/ChatPage'
import { NotificationPage } from './Pages/NotificationPage'
import { UsersPage } from './Pages/UsersPage'
import { FriendRequPage } from './Pages/FriendRequPage'
import { BlockListPage } from './Pages/BlockListPage'
import { SentFriend } from './components/Users/SentFriend'
import app from './firebase.config'

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route>
           <Route path='/loginPage' element={<LoginPage/>}/>
           <Route path='/signupPage' element={<SignUpPage/>}/>
           <Route path='/resetPassword' element={<ResetPassword/>}/>
           <Route path='*' element={<NotFoundPage/>}/> 
           <Route path='/' element={<LayoutOne/>}>
             <Route index element={<HomePage/>}/>
             <Route path='/friendPage' element={<FriendPage/>}/>
             <Route path='/friendRequPage' element={<FriendRequPage/>}/>
             <Route path='/userPage' element={<UsersPage/>}/>
             <Route path='/chatPage' element={<ChatPage/>}/>
             <Route path='/blockPage' element={<BlockListPage/>}/>
             <Route path='/notificationPage' element={<NotificationPage/>}/>
           </Route>
      </Route>
    )
  )

  return (
    <>
      <RouterProvider router={route}/>
      <ToastContainer />

    </>
  )
}

export default App
