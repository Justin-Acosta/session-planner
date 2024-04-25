export const readActiveCampaignsByUser = (userId) => {
    return fetch(`http://localhost:8088/campaigns?userId=${userId}&isActive=true`).then((res) => res.json())
} 

export const readCompletedCampaignsByUser = (userId) => {
    return fetch(`http://localhost:8088/campaigns?userId=${userId}&isActive=false`).then((res) => res.json())
} 

export const readCampaignById = (campaignId) => {
    return fetch(`http://localhost:8088/campaigns/${campaignId}`).then((res) => res.json())
} 

export const readCampaignWithSessionsById = (campaignId) => {
    return fetch(`http://localhost:8088/campaigns/${campaignId}?_embed=sessions`).then((res) => res.json())
}

export const createCampaign = (campaignObject) => {
    return fetch(`http://localhost:8088/campaigns`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(campaignObject),
    }).then((res) => res.json())
} 

export const updateCampaign = (campaignObject) => {
    return fetch(`http://localhost:8088/campaigns/${campaignObject.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(campaignObject),
    }).then((res) => res.json())
}
