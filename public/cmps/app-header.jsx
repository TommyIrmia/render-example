import { UserMsg } from './user-msg.jsx'
import { userService } from '../services/user.service.js'
import { LoginSignup } from './login-signup.jsx'

const { useState } = React
const { NavLink } = ReactRouterDOM

export function AppHeader() {

    const [user, setUser] = useState(userService.getLoggedinUser())

    function onLogout() {
        userService
            .logout()
            .then(() => { setUser(null) })
    }

    return (
        <header>
            <UserMsg />
            <nav>
                <NavLink to='/'>Home</NavLink> |
                <NavLink to='/car'>Cars</NavLink> |
                <NavLink to='/about'>About</NavLink>
            </nav>
            <h1>Cars are Forever</h1>
            <GreetUser
                user={user}
                onLogout={onLogout}
                setUser={setUser}
            />
        </header>
    )
}

function GreetUser({ user, onLogout, setUser }) {
    if (!user) return <LoginSignup setUser={setUser} />
    else {
        return (
            <div>
                <h2>Hello {user.fullname}</h2>
                <button onClick={onLogout}>Logout</button>
            </div>
        )
    }
}
