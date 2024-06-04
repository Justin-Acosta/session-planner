import { useEffect, useState } from 'react'
import './EditEncounter.css'
import { readEncounterTypes } from '../../../services/encounterTypeService.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { readEncounterById, updateEncounter } from '../../../services/encounterServices.jsx'

export const EditEncounter = () => {
    const navigate = useNavigate()
    //---Use Params---

    const {encounterId} = useParams()

    //---Use States---

    const [encounterTypes, setEncounterTypes] = useState([])
    const [backgroundImage, setBackgroundImage] = useState('')
    const [encounterObject, setEncounterObject] = useState(
        {
            sessionId: 0,
            encounterTypeId: 0,
            position: 0,
            objective: '',
            enemies: '',
            environment: '',
            tactics: '',
        }
    )


    //---Use Effects---

    useEffect(() => {
        readEncounterById(parseInt(encounterId)).then((res) => setEncounterObject(res))
    },[])

    useEffect(() => {
        readEncounterTypes().then((res) => setEncounterTypes(res))
    }, [encounterObject])

    useEffect(() => {
        if (encounterObject.encounterTypeId > 0) {
            const currentType = encounterTypes.find((type) => encounterObject.encounterTypeId === type.id)

            setBackgroundImage(currentType.image)
        } else {
            setBackgroundImage('')
        }
    },[encounterTypes])

    //---Functions---

    const editEncounter = (event) => {
        event.preventDefault()
    
        if (event.target.checkValidity()) {
    
            updateEncounter(encounterObject)
                .then(() => {navigate(`/session/${encounterObject.sessionId}`)});
    
        } else {
            event.target.reportValidity(); 
        }
    }

    //---HTML---

    return (
        <div className='container__edit-encounter' style={{ backgroundImage: `url(${backgroundImage})` }} >
            <h2>Edit Encounter</h2>
            <form className='form__edit-encounter' onSubmit={editEncounter}>

                <fieldset>
                    <select required value={encounterObject.encounterTypeId} onChange={(event) => setEncounterObject({...encounterObject, encounterTypeId: parseInt(event.target.value) })}>
                        <option value="0"></option>
                        {encounterTypes.map((type) => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </fieldset>

                <fieldset>
                    <input
                        required
                        className={'input'}
                        type="text"
                        value={encounterObject.objective}
                        onChange={(event) => setEncounterObject({...encounterObject, objective: event.target.value})}
                    />
                </fieldset>

                <fieldset >
                    <input
                        required
                        className={'input'}
                        type="text"
                        value={encounterObject.enemies}
                        onChange={(event) => setEncounterObject({...encounterObject, enemies: event.target.value})}
                    />
                </fieldset>

                <fieldset>
                    <input
                        required
                        className={'input'}
                        type="text"
                        value={encounterObject.environment}
                        onChange={(event) => setEncounterObject({...encounterObject, environment: event.target.value})}
                    />
                </fieldset>

                <fieldset>
                    <input
                        required
                        className={'input'}
                        type="text"
                        value={encounterObject.tactics}
                        onChange={(event) => setEncounterObject({...encounterObject, tactics: event.target.value})}
                    />
                </fieldset>

                <fieldset>
                    <button className='button__create-campaign' type="submit">Save Changes</button>
                </fieldset>

            </form>
        </div>
    )
}