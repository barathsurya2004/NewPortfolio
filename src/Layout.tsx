import {
    Routes,
    Route,
} from 'react-router'
import App from './App'
import ChillLayout from './pages/Chill/ChillLayout'
export const Layout = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path='/chill' element={
                <ChillLayout />
            } />
        </Routes>
    )
}
