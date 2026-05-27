import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./Pages/Body"
import Profile from "./Pages/Profile"
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"
import Feed from "./Pages/Feed"
import Connections from "./Pages/Connections"
import Requests from "./Pages/Requests"
import Chat from "./Pages/Chat"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"

function App() {
  return (
    <>
    <Provider store={appStore}>
      <BrowserRouter basename="/">
    
    <Routes>
      <Route path="/" element={<Body/>}>
        <Route index element={<Feed/>} />
        <Route path="profile" element={<Profile/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<SignUp/>}/>
        <Route path="feed" element={<Feed/>}/>
        <Route path="connections" element={<Connections/>}/>
        <Route path="requests" element={<Requests/>}/>
        <Route path="chat/:targetUserId" element={<Chat/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App
