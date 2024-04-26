import { useEffect, useState } from 'react'
import './EncounterListing.css'
import { readEncounterWithTypeById, updateEncounter } from '../../services/encounterServices.jsx'
import { readSessionWithEncountersById } from '../../services/sessionServices.jsx'
export const EncounterListing = ({ encounterId, setCurrentSession }) => {
    //---Use Params---

    //---Use States---

    const [currentEncounter, setCurrentEncounter] = useState(
        {
            id: 0,
            sessionId: 0,
            objective: '',
            enemies: '',
            environment: '',
            tactics: '',
            encounterType: { name: '', image: '' }
        }
    )

    //---Use Effects---

    useEffect(() => {
        readEncounterWithTypeById(encounterId).then((res) => setCurrentEncounter(res))
    }, [])

    //---Functions---

    const switchToForm = () => {
        const currentEncounterTemp = 
        { 
            id: currentEncounter.id,
            sessionId: currentEncounter.sessionId,
            encounterTypeId: currentEncounter.encounterTypeId,
            isForm: true,
            position: currentEncounter.position,
            objective: currentEncounter.objective,
            enemies: currentEncounter.enemies,
            environment: currentEncounter.environment,
            tactics: currentEncounter.tactics
        }

        updateEncounter(currentEncounterTemp).then(() => readSessionWithEncountersById(currentEncounter.sessionId).then((res) => setCurrentSession(res)))
    }

    //---HTML---

    return (
        <div className='container__encounter-listing' style={{ backgroundImage: `url(${currentEncounter.encounterType.image})`}}>

            <div className='card__encounter-listing'>
                <div className='background-gradient'>

                    <div className='header'>
                        <div className='type'>{currentEncounter.encounterType.name}</div>
                        <button onClick={switchToForm} className='button'>
                            <div >Edit</div>
                        </button>
                    </div>

                    <div className='container__text'>
                        <div className='title'>Objective:</div>
                        <div className='encounter-info objective'> {currentEncounter.objective}</div>
                    </div>

                    <div className='container__text'>
                        <div className='title'>Enemies:</div>
                        <div className='encounter-info enemies'>{currentEncounter.enemies}</div>
                    </div>

                    <div className='container__text'>
                        <div className='title'>Environment:</div>
                        <div className='encounter-info environment'>{currentEncounter.environment}</div>
                    </div>

                    <div className='container__text'>
                        <div className='title'>Tactics:</div>
                        <div className='encounter-info tactics'>{currentEncounter.tactics}</div>
                    </div>

                </div>
            </div>

        </div>
    )
}