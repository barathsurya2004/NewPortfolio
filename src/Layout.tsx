import {
    Routes,
    Route,
} from 'react-router'
import App from './App'
import ChillLayout from './pages/Chill/ChillLayout'
import ShutDown from './pages/Chill/Components/ShutDown'
import FullScreen from './pages/Chill/Components/FullScreen'
export const Layout = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path='/chill' element={
                <ChillLayout />
            } />
            <Route path='shutdown' element={<ShutDown mode='shutdown' />} />
            <Route path='restart' element={<ShutDown mode='restart' />} />
            <Route path='fullscreen' element={<FullScreen />} />
        </Routes>
    )
}
