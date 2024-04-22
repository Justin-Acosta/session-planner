import './NewCampaign.css'

export const NewCampaign = ({currentUser}) => {
    //---Use Params---

    //---Use States---

    //---Use Effects---

    //---Functions---

    //---HTML---

    return (
        <div className='container__new-campaign'>

            <form className='form__new-campaign'>
                <h1>Create Your New Campaign</h1>
                <fieldset>
                    <input type="text" placeholder="Campaign Name" />
                </fieldset>

                <fieldset>
                    <button>Create</button>
                </fieldset>

            </form>
        </div>
    )
}