import './EditEncounter.css'

export const EditEncounter = ({currentUser}) => {
    //---Use Params---

    //---Use States---

    //---Use Effects---

    //---Functions---

    //---HTML---

    return (
        <div className='container__update'>

            <form className='form__new-campaign'>

                <h1>Edit Encounter</h1>

                <fieldset>
                    <select name="types" id="">
                        <option value="1">Combat</option>
                    </select>
                </fieldset>

                <fieldset>
                    <input type="text" placeholder="Objective" />
                </fieldset>

                <fieldset>
                    <input type="text" placeholder="Enemies" />
                </fieldset>

                <fieldset>
                    <input type="text" placeholder="Environment" />
                </fieldset>

                <fieldset>
                    <input type="text" placeholder="Tactics" />
                </fieldset>

                <fieldset>
                    <button>Save Changes</button>
                </fieldset>

            </form>
        </div>
    )
}