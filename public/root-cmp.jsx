const Router = ReactRouterDOM.HashRouter
const { Route, Routes } = ReactRouterDOM

import { AppHeader } from './cmps/app-header.jsx'
import { AppFooter } from './cmps/app-footer.jsx'
import { HomePage } from './pages/home-page.jsx'
import { AboutUs } from './pages/about-us.jsx'
import { CarApp } from './pages/car-app.jsx'
import { CarDetails } from './pages/car-details.jsx'

export function App() {
    return (
        <Router>
            <AppHeader />
            <Routes>
                <Route element={<HomePage />} path="/" />
                <Route element={<CarApp />} path="/car" />
                <Route element={<CarDetails />} path="/car/:carId" />
                <Route element={<AboutUs />} path="/about" />
            </Routes>
            <AppFooter />
        </Router>
    )
}





