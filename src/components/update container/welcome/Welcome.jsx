import { Link } from 'react-router-dom'
import './Welcome.css'
import { useEffect, useState } from 'react'
import { readActiveCampaignsByUser, readCompletedCampaignsByUser } from '../../../services/campaignServices.jsx'
import { CampaignListing } from '../../campaign listing/CampaignListing.jsx'

export const Welcome = ({ currentUser }) => {
    //---Use Params---

    //---Use States---

    const [activeCampaigns, setActiveCampaigns] = useState([])

    const [completedCampaigns, setCompletedCampaigns] = useState([])

    //---Use Effects---

    useEffect(() => {
        readActiveCampaignsByUser(currentUser.id).then((res) => setActiveCampaigns(res))
    }, [currentUser])

    useEffect(() => {
        readCompletedCampaignsByUser(currentUser.id).then((res) => setCompletedCampaigns(res))
    }, [currentUser])

    //---Functions---

    //---HTML---

    return (
        <div className='container__welcome'>

            <section className='container__left'>
                <div className='container__welcome-message'>

                    <h2>Welcome</h2>
                    <p>Select a campaign to view your sessions or click New Campaign to start a new adventure</p>

                    <Link to='/new-campaign' className='button__new-campaign'>
                        <div >New Campaign</div>
                    </Link>

                </div>
            </section>

            <section className='container__right'>
                <div className="container__list-button">

                    <div className='container__active-completed'>
                        <div className='container__title'>
                            <h2>Active Campaigns</h2>
                            <div className='container__campaign-list'>
                                {activeCampaigns.map((campaign) => (
                                    <CampaignListing key={campaign.id} currentUser={currentUser} campaignId={campaign.id}/>
                                ))}
                            </div>
                        </div>
                        <div className='container__title'>
                            <h2>Completed Campaigns</h2>
                            <div className='container__campaign-list'>
                                {completedCampaigns.map((campaign) => (
                                    <CampaignListing key={campaign.id} currentUser={currentUser} campaignId={campaign.id}/>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    )
}