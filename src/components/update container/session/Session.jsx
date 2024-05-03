
import { useEffect, useState } from 'react'
import './Session.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { readSessionWithEncountersById } from '../../../services/sessionServices.jsx'
import { EncounterListing } from '../../encounter listing/EncounterListing.jsx'
import { createEncounter, deleteEncounter } from '../../../services/encounterServices.jsx'
import { readCampaignById } from '../../../services/campaignServices.jsx'
import { EditEncounter } from '../../edit encounter/EditEncounter.jsx'
import { generatePosition } from './SessionUtils.jsx'

export const Session = () => {

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

    const [sortedEncounters, setSortedEncounters] = useState([])

    //---Use Effects---

    useEffect(() => {
        readSessionWithEncountersById(sessionId).then((res) => setCurrentSession(res))
    }, [])

    useEffect(() => {
        const sortedEncountersByPosition = currentSession.encounters.sort((a, b) => a.position - b.position);
        setSortedEncounters(sortedEncountersByPosition)
    }, [currentSession])

    useEffect(() => {
        if (currentSession.campaignId > 0) {
            readCampaignById(currentSession.campaignId).then((res) => setCurrentCampaign(res))
        }
    }, [currentSession])

    //---Functions---

    const newEncounter = async () => {

        const positionTemp = generatePosition(currentSession.encounters)

        const newEncounterObject =
        {
            sessionId: currentSession.id,
            encounterTypeId: 1,
            isForm: true,
            position: positionTemp,
            objective: '',
            enemies: '',
            environment: '',
            tactics: '',
            isExpanded: true
        }

        await createEncounter(newEncounterObject)

        await readSessionWithEncountersById(sessionId).then(
            (res) => setCurrentSession(res))
    }


    //---HTML---

    return (
        <div className='container__session' style={{ backgroundImage: `url(${currentCampaign.image})` }}>



            <div className='card__session'>
                <h2>Session {currentSession.sessionNumber}</h2>

                {sortedEncounters.map((encounter) => {
                    if (encounter.isForm) {
                        return (<EditEncounter key={encounter.id} encounterId={encounter.id} setCurrentSession={setCurrentSession} />)
                    } else {
                        return (<EncounterListing key={encounter.id} encounterId={encounter.id} sortedEncounters={sortedEncounters} currentSession={currentSession} setCurrentSession={setCurrentSession} />)
                    }
                }
                )}


                <div className="container__buttons">
                    {/* <Link to={`/create-encounter/${currentSession.id}`} className='button'>
                        <div >Create Encounter</div>
                    </Link> */}

                    <button className='button' onClick={newEncounter}>Create Encounter</button>
                    <Link to={`/campaign/${currentSession.campaignId}`} className='button'>
                        <div >Back to Campaign</div>
                    </Link>
                </div>

            </div>


        </div>
    )
}