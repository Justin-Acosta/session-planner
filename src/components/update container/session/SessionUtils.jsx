export const generatePosition = (encounters) => {
    const highestPosition = encounters.reduce((highestNumber, encounter) => {
        if(encounter.position > highestNumber) {
            highestNumber = encounter.position
        }
        return highestNumber
    },0)

    return highestPosition + 1
}