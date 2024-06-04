
import './App.css'
import { Routes, Route,} from 'react-router-dom'
import { Authorized } from './views/Authorized.jsx'
import { ApplicationViews } from './views/ApplicationViews.jsx'
import { Register } from './components/auth/Register.jsx'
import { Login } from './components/auth/Login.jsx'

export const App = () => {

  // const [allPosts, setAllPosts] = useState([])

  // useEffect(() => { getPosts().then((res) => setAllPosts(res)) }, [])


  return (
    <Routes>

      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />

      <Route path='*' element={
        //checks if user is authorized and returns application views accordingly.
        //uses the 
        <Authorized>
          <ApplicationViews />
        </Authorized>
      } />

    </Routes>
  )
}
