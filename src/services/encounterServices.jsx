export const readEncounterWithTypeById = (encounterId) => {
    return fetch(`http://localhost:8088/encounters/${encounterId}?_expand=encounterType`).then((res) => res.json())
}

export const readEncountersBySessionId = (sessionId) => {
    return fetch(`http://localhost:8088/encounters?sessionId=${sessionId}`).then((res) => res.json())
}

export const readEncounterById = (encounterId) => {
    return fetch(`http://localhost:8088/encounters/${encounterId}`).then((res) => res.json())
}

export const createEncounter = (encounterObject) => {
    return fetch(`http://localhost:8088/encounters`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(encounterObject),
    }).then((res) => res.json())
} 

export const deleteEncounter = (deleteId) => {
    return fetch(`http://localhost:8088/encounters/${deleteId}`, 
    {method: 'DELETE'}).then((res) => res.json())
}

export const updateEncounter = (encounterObject) => {
    return fetch(`http://localhost:8088/encounters/${encounterObject.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(encounterObject),
    }).then((res) => res.json())
}