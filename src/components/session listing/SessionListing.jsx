import { useEffect, useState } from 'react'
import './CampaignListing.css'
import { readCampaignById } from '../../services/campaignServices.jsx'
import { Link } from 'react-router-dom'

export const SessionListing = ({ currentUser, sessionId }) => {
    //---Use Params---

    //---Use States---



    //---Use Effects---



    //---Functions---

    //---HTML---

    return (
        <Link
            to={`/campaign/${currentCampaign.id}`}
            className='container__campaign-listing'
        >

            <div className='card__campaign-listing' style={{ backgroundImage: `url(${currentCampaign.image})` }}>
                <div className='background-gradient'>

                    <div className='title'>{currentCampaign.name}</div>
                    <div className='text'>Setting: {currentCampaign.setting}</div>
                </div>
            </div>

        </Link>
    )
}