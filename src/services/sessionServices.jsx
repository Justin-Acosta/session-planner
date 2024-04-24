export const readSessionWithEncountersById = (sessionId) => {
    return fetch(`http://localhost:8088/sessions/${sessionId}?_embed=encounters`).then((res) => res.json())
}

export const readSessionById = (sessionId) => {
    return fetch(`http://localhost:8088/sessions/${sessionId}`).then((res) => res.json())
}

export const createSession = (sessionObject) => {
    return fetch('http://localhost:8088/sessions', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionObject),
    }).then((res) => res.json())
}