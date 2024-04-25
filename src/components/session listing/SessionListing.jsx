

import { useEffect, useState } from 'react'
import './SessionListing.css'

import { Link } from 'react-router-dom'
import { readSessionById } from '../../services/sessionServices.jsx'


export const SessionListing = ({sessionId}) => {
    //---Use Params---

    //---Use States---

    const [sessionObject,setSessionObject] = useState(
        {
            id: 0,
            campaignId: 0,
            sessionNumber: 0
        }
    )

    //---Use Effects---

    useEffect(() => {
       readSessionById(sessionId).then((res) => setSessionObject(res))
    },[])

    //---Functions---

    //---HTML---

    return (
        <Link
            to={`/session/${sessionId}`}
            className='container__session-listing'
        >

            <div className='card__session-listing'>
                    <div className='title'>Session {sessionObject.sessionNumber}</div>

            </div>

        </Link>
    )
}