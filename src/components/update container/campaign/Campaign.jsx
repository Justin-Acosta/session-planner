
import { useEffect, useState } from 'react'
import './Campaign.css'
import { useParams } from 'react-router-dom'
import { readCampaignWithSessionsById, updateCampaign } from '../../../services/campaignServices.jsx'
import { SessionListing } from '../../session listing/SessionListing.jsx'
import { createSession } from '../../../services/sessionServices.jsx'
import { generateSessionNumber } from './CampaignUtils.jsx'

export const Campaign = ({ currentUser }) => {
    //---Use Params---

    const { campaignId } = useParams()

    //---Use States---

    const [currentCampaign, setCurrentCampaign] = useState(
        {
            id: 0,
            userId: 0,
            isActive: true,
            name: '',
            setting: '',
            image: '',
            sessions: []
        }
    )

    //---Use Effects---

    useEffect(() => {
        readCampaignWithSessionsById(campaignId).then(
            (res) => setCurrentCampaign(res))
    }, [])

    //---Functions---

    const newSession = () => {

        const sessionObject = {
            campaignId: currentCampaign.id,
            sessionNumber: generateSessionNumber(currentCampaign.sessions)
        }

        createSession(sessionObject).then(() => readCampaignWithSessionsById(campaignId).then((res) => setCurrentCampaign(res)))
    }


    const toggleActive = () => {

        const currentCampaignTemp = {...currentCampaign, isActive: !currentCampaign.isActive}

        updateCampaign(currentCampaignTemp).then(
            () => readCampaignWithSessionsById(campaignId).then(
                (res) => setCurrentCampaign(res)))
    }

    //---HTML---

    return (
        <div className='container__campaign' style={ { backgroundImage: `url(${currentCampaign.image})` } }>



            <div className='card__campaign'>
            <h2>{currentCampaign.name}</h2>

                {currentCampaign.sessions.map((session) => (
                    
                <SessionListing key={session.id} currentUser={currentUser} sessionId={session.id}/>
                ))}

                <span>
                    {currentCampaign.isActive ? <button className='button' onClick={newSession}>New Session</button>: ''}
                    {currentCampaign.isActive ? <button className='button' onClick={toggleActive}>Complete Campaign</button>: <button className='button' onClick={toggleActive}>Switch to Active</button>}
                </span>
            </div>


        </div>
    )
}