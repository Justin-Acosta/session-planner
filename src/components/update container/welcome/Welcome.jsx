import './Welcome.css'

export const Welcome = ({ currentUser }) => {
    //---Use Params---

    //---Use States---

    //---Use Effects---

    //---Functions---

    //---HTML---

    return (
        <div className='container__welcome'>

            <section className='container__left'>
                <div className='container__welcome-message'>
                    <h2>Welcome</h2>
                    <button>New Campaign</button>
                </div>
            </section>

            <section className='container__right'>
                <div className="container__list-button">

                    <div className='container__campaign-list'>
                        <div className='container__active'>
                            <h2>Active Campaigns</h2>
                            <ul>
                                <li>campaign</li>
                                <li>campaign</li>
                                <li>campaign</li>
                                <li>campaign</li>
                                <li>campaign</li>

                            </ul>
                        </div>
                        <div className='container__completed'>
                            <h2>Completed Campaigns</h2>
                            <ul>
                                <li>campaign</li>
                                <li>campaign</li>
                                <li>campaign</li>
                                <li>campaign</li>
                                <li>campaign</li>

                            </ul>
                        </div>
                    </div>

                </div>
            </section>

        </div>
    )
}