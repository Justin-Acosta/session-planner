

import './SessionListing.css'

import { Link } from 'react-router-dom'


export const SessionListing = ({sessionId}) => {
    //---Use Params---

    //---Use States---

    //---Use Effects---

    //---Functions---

    //---HTML---

    return (
        <Link
            to={`/session/1`}
            className='container__session-listing'
        >

            <div className='card__session-listing'>
                    <div className='title'>Session {sessionId}</div>
            </div>

        </Link>
    )
}