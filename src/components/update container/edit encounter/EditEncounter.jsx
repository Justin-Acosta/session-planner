import { useEffect, useState } from 'react'
import './EditEncounter.css'
import { readEncounterTypes } from '../../../services/encounterTypeService.jsx'
import { useNavigate } from 'react-router-dom'
import { readEncounterById, updateEncounter } from '../../../services/encounterServices.jsx'
import { readSessionWithEncountersById } from '../../../services/sessionServices.jsx'

export const EditEncounter = ({ encounterId,setCurrentSession }) => {
    const navigate = useNavigate()
    //---Use Params---



    //---Use States---

    const [encounterTypes, setEncounterTypes] = useState([])
    const [currentType, setCurrentType] = useState('')
    const [encounterObject, setEncounterObject] = useState(
        {
            sessionId: 0,
            encounterTypeId: 0,
            isForm: true,
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
    }, [])

    useEffect(() => {
        readEncounterTypes().then((res) => setEncounterTypes(res))
    }, [encounterObject])

    useEffect(() => {
        if (encounterObject.encounterTypeId > 0) {
            const currentType = encounterTypes.find((type) => encounterObject.encounterTypeId === type.id)

            setCurrentType(currentType)
        } else {
            setCurrentType('')
        }
    }, [encounterTypes])



    //---Functions---

    const switchToForm = () => {

        const encounterObjectTemp = { 
            id: encounterObject.id,
            sessionId: encounterObject.sessionId,
            encounterTypeId: encounterObject.encounterTypeId,
            isForm: false,
            position: encounterObject.position,
            objective: encounterObject.objective,
            enemies: encounterObject.enemies,
            environment: encounterObject.environment,
            tactics: encounterObject.tactics
        }

        updateEncounter(encounterObjectTemp).then(() => readSessionWithEncountersById(encounterObject.sessionId).then((res) => setCurrentSession(res)))

    }

    //---HTML---

    return (
        <div className='container__edit-encounter' style={{ backgroundImage: `url(${currentType.image})` }}>

            <div className='card__edit-encounter' >
                <div className='background-gradient-edit'>

                    <div className='header'>
                        <div className='type'>{currentType.name}</div>
                        <button className='button' onClick={switchToForm}>
                            <div >Save</div>
                        </button>
                    </div>

                    <form className='form__edit-encounter' onSubmit={switchToForm}>

                        <fieldset>
                            <select required value={encounterObject.encounterTypeId} onChange={(event) => setEncounterObject({ ...encounterObject, encounterTypeId: parseInt(event.target.value) })}>
                                <option value="0"></option>
                                {encounterTypes.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </fieldset>

                        <fieldset>
                            <textarea
                                required
                                className={'textarea'}
                                type="text"
                                value={encounterObject.objective}
                                onChange={(event) => setEncounterObject({ ...encounterObject, objective: event.target.value })}
                            />
                        </fieldset>

                        <fieldset >
                            <textarea
                                required
                                className={'textarea'}
                                type="text"
                                value={encounterObject.enemies}
                                onChange={(event) => setEncounterObject({ ...encounterObject, enemies: event.target.value })}
                            />
                        </fieldset>

                        <fieldset>
                            <textarea
                                required
                                className={'textarea'}
                                type="text"
                                value={encounterObject.environment}
                                onChange={(event) => setEncounterObject({ ...encounterObject, environment: event.target.value })}
                            />
                        </fieldset>

                        <fieldset>
                            <textarea
                                required
                                className={'textarea'}
                                type="text"
                                value={encounterObject.tactics}
                                onChange={(event) => setEncounterObject({ ...encounterObject, tactics: event.target.value })}
                            />
                        </fieldset>

                    </form>
                </div >
            </div>
        </div>
    )
}


