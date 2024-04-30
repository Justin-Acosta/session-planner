import { useEffect, useState } from 'react'
import './EditEncounter.css'
import { readEncounterTypes } from '../../services/encounterTypeService.jsx'
import { readEncounterById, updateEncounter } from '../../services/encounterServices.jsx'
import { readSessionWithEncountersById } from '../../services/sessionServices.jsx'

export const EditEncounter = ({ encounterId, setCurrentSession }) => {
    //---Use Params---

    //---Use States---

    const [encounterTypes, setEncounterTypes] = useState([])
    const [currentType, setCurrentType] = useState('')
    const [currentEncounter, setCurrentEncounter] = useState(
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
        readEncounterById(parseInt(encounterId)).then((res) => setCurrentEncounter(res))
    }, [])

    useEffect(() => {
        readEncounterTypes().then((res) => setEncounterTypes(res))
    }, [currentEncounter])

    useEffect(() => {
        if (currentEncounter.encounterTypeId > 0) {
            const currentType = encounterTypes.find((type) => currentEncounter.encounterTypeId === type.id)

            setCurrentType(currentType)
        } else {
            setCurrentType('')
        }
    }, [encounterTypes])

    //---Functions---

    const switchToForm = () => {
        let currentEncounterTemp =
        {
            ...currentEncounter,
            isForm: !currentEncounter.isForm
        }

        delete currentEncounterTemp.encounterType

        updateEncounter(currentEncounterTemp).then(() => readSessionWithEncountersById(currentEncounter.sessionId).then((res) => setCurrentSession(res)))
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
                            <select required value={currentEncounter.encounterTypeId} onChange={(event) => setCurrentEncounter({ ...currentEncounter, encounterTypeId: parseInt(event.target.value) })}>
                                <option value="0"></option>
                                {encounterTypes.map((type) => (
                                    <option key={type.id} value={type.id}>{type.name}</option>
                                ))}
                            </select>
                        </fieldset>

                        <fieldset>
                            <h3>Objective:</h3>
                            <textarea
                                required
                                className={'textarea'}
                                type="text"
                                value={currentEncounter.objective}
                                onChange={(event) => setCurrentEncounter({ ...currentEncounter, objective: event.target.value })}
                            />
                        </fieldset>

                        <fieldset >
                            <h3>Enemies:</h3>
                            <textarea
                                required
                                className={'textarea'}
                                type="text"
                                value={currentEncounter.enemies}
                                onChange={(event) => setCurrentEncounter({ ...currentEncounter, enemies: event.target.value })}
                            />
                        </fieldset>

                        <fieldset>
                            <h3>Environment:</h3>
                            <textarea
                                required
                                className={'textarea'}
                                type="text"
                                value={currentEncounter.environment}
                                onChange={(event) => setCurrentEncounter({ ...currentEncounter, environment: event.target.value })}
                            />
                        </fieldset>

                        <fieldset>
                            <h3>Tactics:</h3>
                            <textarea
                                required
                                className={'textarea'}
                                type="text"
                                value={currentEncounter.tactics}
                                onChange={(event) => setCurrentEncounter({ ...currentEncounter, tactics: event.target.value })}
                            />
                        </fieldset>

                    </form>
                </div >
            </div>
        </div>
    )
}


