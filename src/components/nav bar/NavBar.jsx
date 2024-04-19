import { Link, useNavigate } from 'react-router-dom'
import './NavBar.css'

export const NavBar = () => {

    const navigate = useNavigate()

    return (
        <div className="container__navbar">

            <div className='container__navbar-header'>
                <div to='/' className='container__navbar-header--title'>Chronicle</div>
            </div>

            <div className="container__navbar-buttons">
                <Link to='/' className='button__navbar button__navbar--home'>
                    <div>Home</div>
                </Link>

                <Link to='' className="button__navbar button__navbar--logout" onClick={() => {
                    localStorage.removeItem('learning_user')
                    navigate('/', { replace: true })
                }}>
                    <div>Logout</div>
                </Link>
            </div>
        </div>
    )

}