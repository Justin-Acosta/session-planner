import { useEffect, useState } from 'react'
import './CampaignListing.css'
import { readCampaignById } from '../../services/campaignServices.jsx'
import { Link } from 'react-router-dom'

export const CampaignListing = ({ currentUser, campaignId }) => {
    //---Use Params---

    //---Use States---

    const [currentCampaign, setCurrentCampaign] = useState(
        {
            id: 0,
            userId: 0,
            isActive: false,
            name: '',
            setting: '',
            image: ''
        }
    )

    //---Use Effects---

    useEffect(() => {
        readCampaignById(campaignId).then((res) => setCurrentCampaign(res))
    }, [])

    //---Functions---

    //---HTML---

    return (
        <Link
            to={`/session/1`}
            className='container__campaign-listing'
        >

            <div className='card__campaign-listing' >
                <div className='background-gradient'>

                    <div className='title'>session 1</div>
                    <div className='text'>encounter</div>
                </div>
            </div>

        </Link>
    )
}