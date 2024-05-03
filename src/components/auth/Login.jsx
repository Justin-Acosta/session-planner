import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getUserByEmail } from "../../services/userServices.jsx"
import './Login.css'

export const Login = () => {
  const [email, set] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    return getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "learning_user",
          JSON.stringify({
            id: user.id,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="auth-container">

      <section>

        <h2>Please sign in</h2>
        <form className="auth-form" onSubmit={handleLogin}>


          <fieldset className="auth-fieldset">
            <div>
              <input
                type="email"
                value={email}
                className="auth-form-input"
                onChange={(evt) => set(evt.target.value)}
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>

          <fieldset className="auth-fieldset">
            <div>
              <button type="submit" className="button">Sign in</button>
            </div>
          </fieldset>

        </form>

      </section>

      <section className="register-link">
        <Link to="/register">
          <div>Not a member yet?</div>
        </Link>
      </section>

    </main>
  )
}

