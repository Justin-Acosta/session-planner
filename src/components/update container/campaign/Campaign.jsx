
import { useEffect, useState } from 'react'
import './Campaign.css'
import { useParams } from 'react-router-dom'
import { readCampaignWithSessionsById } from '../../../services/campaignServices.jsx'

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


                <h2>Campaign Name</h2>

                <div className='card__campaign'>
                    <div>session 1</div>
                    <div>session 2</div>
                    <div>session 3</div>

                    <button className='button'>New Session</button>
                    <button className='button'>Complete Campaign</button>
                </div>
                

        </div>
    )
}