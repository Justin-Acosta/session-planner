export const generateSessionNumber = (sessionList) => {
    const sessionNumbers = sessionList.map((session) => session.sessionNumber)

    // currentCampaign.sessions.length > 0 ? Math.max(...sessionNumbers) + 1 : 1

    if (sessionList.length > 0) {
        return Math.max(...sessionNumbers) + 1
    } else {
        return 1
    }
}