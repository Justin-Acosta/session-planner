export const findClosestEncounterLessThanCurrent = (sortedEncounters, currentEncounter) => {

    const foundObject = sortedEncounters.reduce((closestEncounterLessThan, encounter) => {

        if (currentEncounter.position > encounter.position) {
            closestEncounterLessThan = encounter
        }

        return closestEncounterLessThan
    })

    return foundObject
}


export const findClosestEncounterGreaterThan = (sortedEncounters, currentEncounter) => {

    const foundObject = sortedEncounters.reverse().reduce((closestEncounterGreaterThan, encounter) => {

        if (encounter.position > currentEncounter.position) {
            closestEncounterGreaterThan = encounter
        }

        return closestEncounterGreaterThan
    })

    return foundObject
}


export const switchPositionPropertyValues = (foundObject, currentEncounter) => {

        const tempPosition = foundObject.position

        foundObject.position = currentEncounter.position

        currentEncounter = { ...currentEncounter, position: tempPosition }

        delete currentEncounter.encounterType

    return { foundObject: foundObject, currentEncounter: currentEncounter}
}