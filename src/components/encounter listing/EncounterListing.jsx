import { useEffect, useState } from 'react'
import './EncounterListing.css'
import { readEncounterWithTypeById } from '../../services/encounterServices.jsx'
import { Link } from 'react-router-dom'

export const EncounterListing = ({ encounterId }) => {
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

    //---HTML---

    return (
        <div className='container__encounter-listing' style={{ backgroundImage: `url(${currentEncounter.encounterType.image})` }}>

            <div className='card__encounter-listing'>
                <div className='background-gradient'>

                    <div className='header'>
                        <div className='type'>{currentEncounter.encounterType.name}</div>
                        <Link to={`/edit-encounter/${currentEncounter.id}`} className='button'>
                            <div >Edit</div>
                        </Link>
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