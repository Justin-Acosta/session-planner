
import { useEffect, useState } from 'react'
import './Session.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { readSessionWithEncountersById } from '../../../services/sessionServices.jsx'
import { EncounterListing } from '../../encounter listing/EncounterListing.jsx'
import { deleteEncounter } from '../../../services/encounterServices.jsx'
import { readCampaignById } from '../../../services/campaignServices.jsx'
import { EditEncounter } from '../edit encounter/EditEncounter.jsx'

export const Session = ({ currentUser }) => {

    const navigate = useNavigate()

    //---Use Params---

    const { sessionId } = useParams()

    //---Use States---

    const [currentSession, setCurrentSession] = useState(
        {
            id: 0,
            campaignId: 0,
            sessionNumber: 0,
            encounters: []
        }
    )

    const [currentCampaign, setCurrentCampaign] = useState(
        {
            id: 0,
            userId: 0,
            isActive: true,
            name: 0,
            setting: '',
            image: ''
        }
    )

    //---Use Effects---

    useEffect(() => {
        readSessionWithEncountersById(sessionId).then((res) => setCurrentSession(res))
    }, [])

    useEffect(() => {
        if (currentSession.campaignId > 0) {
            readCampaignById(currentSession.campaignId).then((res) => setCurrentCampaign(res))
        }
    }, [currentSession])

    //---Functions---


    //          ***---FIGURE OUT HOW THIS WORKS---***
    const deleteLast = () => {

        const foundObject = currentSession.encounters.reduce((highestPossitionObject, encounter) => {
            return encounter.position > highestPossitionObject.position ? encounter : highestPossitionObject;
        });

        deleteEncounter(foundObject.id).then(() => readSessionWithEncountersById(sessionId).then((res) => setCurrentSession(res)))
    }

    //---HTML---

    return (
        <div className='container__session' style={{ backgroundImage: `url(${currentCampaign.image})` }}>



            <div className='card__session'>
                <h2>Session {currentSession.sessionNumber}</h2>

                {currentSession.encounters.map((encounter) => {
                    if (encounter.isForm) {
                        return(<EditEncounter key={encounter.id} encounterId={encounter.id} setCurrentSession={setCurrentSession}/>)
                    } else {
                        return (<EncounterListing key={encounter.id} encounterId={encounter.id} setCurrentSession={setCurrentSession}/>)
                    }
                }
                )}


                <div className="container__buttons">
                    <Link to={`/create-encounter/${currentSession.id}`} className='button'>
                        <div >Create Encounter</div>
                    </Link>
                    <button className='button' onClick={deleteLast}>Delete Last</button>
                    <Link to={`/campaign/${currentSession.campaignId}`} className='button'>
                        <div >Back to Campaign</div>
                    </Link>
                </div>

            </div>


        </div>
    )
}