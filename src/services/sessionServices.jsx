export const readSessionWithEncountersById = (sessionId) => {
    return fetch(`http://localhost:8088/sessions/${sessionId}?_embed=encounters`).then((res) => res.json())
}