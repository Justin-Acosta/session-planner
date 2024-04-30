import { useEffect, useState } from 'react'
import './NewEncounter.css'
import { readEncounterTypes } from '../../../services/encounterTypeService.jsx'
import { useNavigate, useParams } from 'react-router-dom'
import { createEncounter, readEncountersBySessionId } from '../../../services/encounterServices.jsx'

export const NewEncounter = () => {
    const navigate = useNavigate()
    //---Use Params---

    const {sessionId} = useParams()

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
    const [sessionEncounters,setSessionEncounters] = useState([])

    //---Use Effects---

    useEffect(() => {
        readEncounterTypes().then((res) => setEncounterTypes(res))
    }, [])

    useEffect(() => {
        if (encounterObject.encounterTypeId > 0) {
            const currentType = encounterTypes.find((type) => encounterObject.encounterTypeId === type.id)

            setBackgroundImage(currentType.image)
        } else {
            setBackgroundImage('')
        }

    },[encounterObject])

    useEffect(() => {
       readEncountersBySessionId(sessionId).then((res) => setSessionEncounters(res)) 
    },[])

    //---Functions---

    const newEncounter = (event) => {
        event.preventDefault()
    
        if (event.target.checkValidity()) {
    
            const encounterPositions = sessionEncounters.map((encounter) => encounter.position)
    
            const encounterObjectTemp = { 
                sessionId: parseInt(sessionId),
                encounterTypeId: encounterObject.encounterTypeId,
                isForm: false,
                isExpanded: true,
                position: sessionEncounters.length > 0 ? Math.max(...encounterPositions) + 1 : 1,
                objective: encounterObject.objective,
                enemies: encounterObject.enemies,
                environment: encounterObject.environment,
                tactics: encounterObject.tactics,
            }
    
            createEncounter(encounterObjectTemp)
                .then(() => {navigate(`/session/${sessionId}`)});
    
        } else {
            event.target.reportValidity(); 
        }
    }
    

    //---HTML---

    return (
        <div className='container__new-campaign' style={{ backgroundImage: `url(${backgroundImage})` }} >
            <h2>Create a New Encounter</h2>
            <form className='form__new-campaign' onSubmit={newEncounter}>

                <fieldset>
                    <select required onChange={(event) => setEncounterObject({...encounterObject, encounterTypeId: parseInt(event.target.value) })}>
                        <option value="0">Select an Encounter Type</option>
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
                        placeholder="Objective"
                        onChange={(event) => setEncounterObject({...encounterObject, objective: event.target.value})}
                    />
                </fieldset>

                <fieldset >
                    <input
                        required
                        className={'input'}
                        type="text"
                        placeholder="Enemies"
                        onChange={(event) => setEncounterObject({...encounterObject, enemies: event.target.value})}
                    />
                </fieldset>

                <fieldset>
                    <input
                        required
                        className={'input'}
                        type="text"
                        placeholder="Environment"
                        onChange={(event) => setEncounterObject({...encounterObject, environment: event.target.value})}
                    />
                </fieldset>

                <fieldset>
                    <input
                        required
                        className={'input'}
                        type="text"
                        placeholder="Tactics"
                        onChange={(event) => setEncounterObject({...encounterObject, tactics: event.target.value})}
                    />
                </fieldset>

                <fieldset>
                    <button className='button__create-campaign' type="submit">Create</button>
                </fieldset>

            </form>
        </div>
    )
}