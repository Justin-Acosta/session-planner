import { useEffect, useState } from 'react'
import { readSessionWithEncountersById } from '../../../services/sessionServices.jsx'
import './Session.css'
import { useParams } from 'react-router-dom'

export const Session = ({currentUser}) => {
    //---Use Params---

    const {sessionId} = useParams()

    //---Use States---

    const [currentSession,setCurrentSession] = useState(
        {
                id: 0,
                sessionId: 0,
                sessionNumber: 0,
                encounters: []
        }
    )

    //---Use Effects---

    useEffect(() => {
        readSessionWithEncountersById(sessionId).then((res) => setCurrentSession(res))
    },[])

    //---Functions---

    //---HTML---

    return (
        <div className='container__update'>

            <div className='container__session'>

                <h2>Session 1</h2>
                
                <div className='container__encounter-list'>
                    <div>
                        <div className='container__encounter'>
                            encounter
                        </div>
                        <div className='container__encounter'>
                            encounter
                        </div>
                        <div className='container__encounter'>
                            encounter
                        </div>
                        <div className='container__encounter'>
                            encounter
                        </div>
                    </div>
                </div>

                <button>Add Encounter</button>
            </div>

        </div>
    )
}