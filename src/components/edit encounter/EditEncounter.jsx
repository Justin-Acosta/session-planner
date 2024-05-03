import { useEffect, useState } from 'react'
import './EditEncounter.css'
import { readEncounterTypes } from '../../services/encounterTypeService.jsx'
import { readEncounterById, updateEncounter } from '../../services/encounterServices.jsx'
import { readSessionWithEncountersById } from '../../services/sessionServices.jsx'

export const EditEncounter = ({ encounterId, setCurrentSession }) => {
    //---Use Params---

    //---Use States---

    const [encounterTypes, setEncounterTypes] = useState([])
    const [currentType, setCurrentType] = useState({ image: '', name: '' })
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
    const [unsavedChanges, setUnsavedChanges] = useState(false)

    //---Use Effects---

    useEffect(() => {
        readEncounterTypes().then((res) => setEncounterTypes(res))
    }, [])

    useEffect(() => {
        readEncounterById(parseInt(encounterId)).then((res) => setCurrentEncounter(res))
    }, [encounterTypes])



    useEffect(() => {
        if (currentEncounter.encounterTypeId > 0) {
            const currentType = encounterTypes.find((type) => currentEncounter.encounterTypeId === type.id)

            setCurrentType(currentType)
        } else {
            setCurrentType({})
        }
    }, [currentEncounter])


    useEffect(() => {
        const timer = setTimeout(() => {
            if (unsavedChanges) {

                let currentEncounterTemp = { ...currentEncounter }
                
                delete currentEncounterTemp.encounterType

                updateEncounter(currentEncounterTemp).then(
                    setUnsavedChanges(false)
                )

                console.log('changes saved')
            }
        }, 3000);

        return () => clearTimeout(timer);
    }, [currentEncounter]);


    //---Functions---

    const switchToForm = () => {
        let currentEncounterTemp =
            { ...currentEncounter, isForm: !currentEncounter.isForm }

        delete currentEncounterTemp.encounterType

        updateEncounter(currentEncounterTemp).then(
            () => readSessionWithEncountersById(currentEncounter.sessionId).then(
                (res) => setCurrentSession(res)))
    }

    //---HTML---

    return (
        <div className='container__edit-encounter' style={{ backgroundImage: `url(${currentType?.image})` }}>

            <div className='card__edit-encounter' >
                <div className='background-gradient-edit'>

                    <div className='header'>
                        <div className='type'>{currentType?.name}</div>
                        {unsavedChanges ? <div className='save-status'>saving changes...</div> : <div className='save-status'>saved</div>}
                        <button className='button' onClick={switchToForm}>
                            <div >Done</div>
                        </button>
                    </div>

                    <form className='form__edit-encounter' onSubmit={switchToForm}>

                        <fieldset>
                            <select required value={currentEncounter.encounterTypeId} onChange={(event) => {
                                setCurrentEncounter({ ...currentEncounter, encounterTypeId: parseInt(event.target.value) })
                                setUnsavedChanges(true)
                            }}>
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
                                onChange={(event) => {
                                    setCurrentEncounter({ ...currentEncounter, objective: event.target.value })
                                    setUnsavedChanges(true)
                                }}
                            />
                        </fieldset>

                        <fieldset >
                            <h3>Enemies:</h3>
                            <textarea
                                required
                                className={'textarea'}
                                type="text"
                                value={currentEncounter.enemies}
                                onChange={(event) => {
                                    setCurrentEncounter({ ...currentEncounter, enemies: event.target.value })
                                    setUnsavedChanges(true)
                                }}
                            />
                        </fieldset>

                        <fieldset>
                            <h3>Environment:</h3>
                            <textarea
                                required
                                className={'textarea'}
                                type="text"
                                value={currentEncounter.environment}
                                onChange={(event) => {
                                    setCurrentEncounter({ ...currentEncounter, environment: event.target.value })
                                    setUnsavedChanges(true)
                                }}
                            />
                        </fieldset>

                        <fieldset>
                            <h3>Tactics:</h3>
                            <textarea
                                required
                                className={'textarea'}
                                type="text"
                                value={currentEncounter.tactics}
                                onChange={(event) => {
                                    setCurrentEncounter({ ...currentEncounter, tactics: event.target.value })
                                    setUnsavedChanges(true)
                                }}
                            />
                        </fieldset>

                    </form>
                </div >
            </div>
        </div>
    )
}


