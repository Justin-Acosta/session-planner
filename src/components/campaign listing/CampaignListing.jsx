import { useEffect, useState } from 'react'
import './CampaignListing.css'
import { readCampaignById } from '../../services/campaignServices.jsx'
import { Link } from 'react-router-dom'

export const CampaignListing = ({ campaignId }) => {
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
        readCampaignById(campaignId).then(
            (res) => setCurrentCampaign(res))
    }, [])
    

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