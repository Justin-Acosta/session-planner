import { useEffect, useState } from 'react'
import './EncounterListing.css'
import { readEncounterWithTypeById, updateEncounter } from '../../services/encounterServices.jsx'
import { readSessionWithEncountersById } from '../../services/sessionServices.jsx'
export const EncounterListing = ({ encounterId, currentSession, setCurrentSession, sortedEncounters, setSortedEncounters }) => {
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
    }, [currentSession])

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

    const switchExpand = async () => {
        const updatedEncounter = {
            ...currentEncounter,
            isExpanded: !currentEncounter.isExpanded
        }

        delete updatedEncounter.encounterType

        updateEncounter(updatedEncounter).then(() => readSessionWithEncountersById(currentEncounter.sessionId).then((res) => setCurrentSession(res)));
    };

    const movePositionUp = () => {

        // finds greatest position property value that is also let than current encounter position property value
        const foundObject = sortedEncounters.reduce((closestEncounterLessThan, encounter) => {
            if (currentEncounter.position > encounter.position) {
                closestEncounterLessThan = encounter
            }
            return closestEncounterLessThan
        })

        if (foundObject.position !== currentEncounter.position) {

            const tempPosition = foundObject.position

            foundObject.position = currentEncounter.position

            const currentEncounterTemp = {...currentEncounter, position: tempPosition}

            delete currentEncounterTemp.encounterType

            updateEncounter(foundObject).then(
                updateEncounter(currentEncounterTemp)).then(
                    () => readSessionWithEncountersById(currentEncounter.sessionId).then(
                        (res) => setCurrentSession(res)))
        }
    }

    const movePositionDown = () => {

        // finds greatest position property value that is also let than current encounter position property value
        const foundObject = sortedEncounters.reverse().reduce((closestEncounterLessThan, encounter) => {
            if ( encounter.position  > currentEncounter.position ) {
                closestEncounterLessThan = encounter
            }
            return closestEncounterLessThan
        })

        if (foundObject.position !== currentEncounter.position) {

            const tempPosition = foundObject.position

            foundObject.position = currentEncounter.position

            const currentEncounterTemp = {...currentEncounter, position: tempPosition}

            delete currentEncounterTemp.encounterType

            updateEncounter(foundObject).then(
                updateEncounter(currentEncounterTemp)).then(
                    () => readSessionWithEncountersById(currentEncounter.sessionId).then(
                        (res) => setCurrentSession(res)))
        }
    }
    
    //---HTML---

    return (
        <div className='container__encounter-listing' style={{ backgroundImage: `url(${currentEncounter.encounterType.image})` }}>

            <div className='card__encounter-listing'>
                <div className='background-gradient'>

                    <div className='header'>
                        <div className='type'>{currentEncounter.encounterType.name}</div>

                        {currentEncounter.isExpanded ?
                            <button className='button-expand' onClick={switchExpand}>
                                <div >⮝</div>
                            </button> :
                            <button className='button-expand' onClick={switchExpand}>
                                <div >⮟</div>
                            </button>}

                        <button onClick={switchToForm} className='button'>
                            <div >Edit</div>
                        </button>

                        <div className='container__position'>
                            <button className='up' onClick={movePositionUp}>🠝</button>
                            <button className='down' onClick={movePositionDown}>🠟</button>
                        </div>
                    </div>

                    {currentEncounter.isExpanded ?
                        <>
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
                        </> :
                        ''}



                </div>
            </div>

        </div>
    )
}