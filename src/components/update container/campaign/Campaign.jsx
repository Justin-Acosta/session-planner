
import { useEffect, useState } from 'react'
import './Campaign.css'
import { useParams } from 'react-router-dom'
import { readCampaignWithSessionsById } from '../../../services/campaignServices.jsx'
import { SessionListing } from '../../session listing/SessionListing.jsx'

export const Campaign = ({ currentUser }) => {
    //---Use Params---

    const { campaignId } = useParams()

    //---Use States---

    const [currentCampaign, setCurrentCampaign] = useState(
        {
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
        readCampaignWithSessionsById(campaignId).then((res) => setCurrentCampaign(res))
    }, [])

    //---Functions---

    //---HTML---

    return (
        <div className='container__campaign' style={{ backgroundImage: `url(${currentCampaign.image})` }}>


            <h2>{currentCampaign.name}</h2>

            <div className='card__campaign'>

                {currentCampaign.sessions.map((session) => (
                    
                <SessionListing key={session.id} currentUser={currentUser} sessionId={session.id}/>
                ))}

                <span>
                    <button className='button'>New Session</button>
                    <button className='button'>Complete Campaign</button>
                </span>
            </div>


        </div>
    )
}