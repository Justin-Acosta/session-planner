import { useEffect, useState } from 'react'
import './NewCampaign.css'
import { createCampaign } from '../../../services/campaignServices.jsx'
import { useNavigate } from 'react-router-dom'

export const NewCampaign = ({ currentUser }) => {
    const navigate = useNavigate();

    const [campaignObject, setCampaignObject] = useState(
        {
            userId: 0,
            isActive: true,
            name: '',
            setting: '',
            image: ''
        }
    );

    useEffect(() => {
        setCampaignObject({ ...campaignObject, userId: currentUser.id });
    }, [currentUser]);

    const submitNewCampaign = async (event) => {
        event.preventDefault();

        if (event.target.checkValidity()) {
            let campaignId = 0;

            await createCampaign(campaignObject)
                .then((res) => {
                    campaignId = res.id;
                    navigate(`/campaign/${campaignId}`);
                });
        } else {
            event.target.reportValidity(); // Display native browser validation message
        }
    };

    return (
        <div className='container__new-campaign'>
            <h2>Create Your New Campaign</h2>
            <form className='form__new-campaign' onSubmit={submitNewCampaign}>

                <fieldset>
                    <input
                        required
                        className={'input'}
                        type="text"
                        placeholder="Campaign Name"
                        value={campaignObject.name}
                        onChange={(event) => setCampaignObject({ ...campaignObject, name: event.target.value })}
                    />
                </fieldset>

                <fieldset >
                    <input
                        required
                        className={'input'}
                        type="text"
                        placeholder="Setting"
                        value={campaignObject.setting}
                        onChange={(event) => setCampaignObject({ ...campaignObject, setting: event.target.value })}
                    />
                </fieldset>

                <fieldset>
                    <input
                        required
                        className={'input'}
                        type="text"
                        placeholder="Background Image URL"
                        value={campaignObject.image}
                        onChange={(event) => setCampaignObject({ ...campaignObject, image: event.target.value })}
                    />
                </fieldset>

                <fieldset>
                    <button className='button__create-campaign' type="submit">Create</button>
                </fieldset>

            </form>
        </div>
    );
}
