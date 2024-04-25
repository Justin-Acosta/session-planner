export const readEncounterTypes = () => {
    return fetch(`http://localhost:8088/encounterTypes`).then((res) => res.json())
}