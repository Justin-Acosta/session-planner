import { useEffect, useState } from "react"
import { Routes, Route, Outlet } from 'react-router-dom'
import { NavBar } from "../components/nav bar/NavBar.jsx"
import { Welcome } from "../components/update container/welcome/Welcome.jsx"
import { NewCampaign } from "../components/update container/new-campaign/NewCampaign.jsx"
import { Campaign } from "../components/update container/campaign/Campaign.jsx"
import { Session } from "../components/update container/session/Session.jsx"
import { EditEncounter } from "../components/update container/edit encounter/EditEncounter.jsx"
import { CreateEncounter } from "../components/update container/create encounter/CreateEncounter.jsx"
import { readUserById } from "../services/userServices.jsx"



export const ApplicationViews = () => {

    //---Use States---

    const [currentUser,setCurrentUser] = useState(
        {
            id: 0,
            name: '',
            email: ''
        }
    )

    //---Use Effects---

    useEffect(() => {
        const learningUser = JSON.parse(localStorage.getItem('learning_user'))
        readUserById(learningUser.id).then((res) => setCurrentUser(res))
    },[])

    //---Functions---

    //---HTML---

    return (
        <Routes>
            <Route path='/' element={

                <div className="container__root">

                    <header className="container__header">
                        <NavBar />
                    </header>

                    <main className="container__main">
                        <Outlet />
                    </main>

                </div>
            }>

                <Route index element={<Welcome currentUser={currentUser}/>} />

                <Route path='new-campaign' element={<NewCampaign currentUser={currentUser}/>}/>

                <Route path="campaign">
                    <Route path=":campaignId" element={<Campaign currentUser={currentUser}/>}/>
                </Route>

                <Route path="session">
                    <Route path=":sessionId" element={<Session currentUser={currentUser}/>}/>
                </Route>

                <Route path="create-encounter">
                    <Route path=":sessionId" element={<CreateEncounter currentUser={currentUser}/>}/>
                </Route>
                
                <Route path="edit-encounter">
                    <Route path=":encounterId" element={<EditEncounter currentUser={currentUser}/>}/>
                </Route>

            </Route>
        </Routes>
    )

}