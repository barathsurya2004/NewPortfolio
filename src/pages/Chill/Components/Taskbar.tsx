import React, { useState } from 'react'
import StartMenu from './StartMenu'
import border from '../../../assets/taskbar.png'
import startBg from '../../../assets/bgtex.png'
const Taskbar = ({ apps, HandleIconClick }: {
    apps: {
        id: number
        name: string
        icon: string
        active: boolean
        visible: boolean

    }[],
    HandleIconClick: (id: number) => void
}) => {
    const [startMenuOpen, setStartMenuOpen] = useState(false)
    const [time, setTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
    const [date, setDate] = useState(new Date().toLocaleDateString())

    const updateTime = () => {
        setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
        setDate(new Date().toLocaleDateString())
    }

    React.useEffect(() => {
        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div
            className='Taskbar holder w-full h-20 flex items-center z-10000 justify-center'

        >
            <div
                className='Taskbar-holder flex items-center justify-between w-full mx-2 h-full text-white '
                style={{
                    borderStyle: border ? 'solid' : 'none',
                    borderWidth: border ? '8px' : '0', // Adjust thickness as needed
                    borderImage: border
                        ? `url(${border}) 30 stretch` // Adjust slice value as needed
                        : 'none',
                }}
            >

                <div
                    className='start flex h-full flex-2 text-[25px] relative'
                >
                    <div
                        className='start-icon z-10  flex items-center justify-center h-full w-full cursor-pointer'
                        onClick={() => {
                            setStartMenuOpen(!startMenuOpen)
                        }}
                        style={{
                            backgroundImage: `url(${startBg})`,
                            backgroundSize: 'cover',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        🪟 Start
                    </div>
                    <StartMenu isOpen={startMenuOpen} />
                </div>
                <div
                    className='applications flex items-center justify-start h-full bg-gray-700 text-white px-4 flex-12 z-10'
                >
                    {apps.map((app) => {

                        return app.visible ? <div
                            key={app.id}
                            className={`app-icon flex items-center justify-center h-9/10 aspect-1/1 ml-1 mr-1 ${app.active ? 'opacity-100' : 'opacity-80'} text-white text-[12px] relative`}
                            onClick={() => {
                                HandleIconClick(app.id)
                            }}
                        >

                            <img src={app.icon} alt=""
                                className='absolute h-fulla aspect-1 object-cover'
                            />
                        </div> : null
                    }
                    )}
                </div>
                <div
                    className='Time-and-date flex items-center  h-full bg-red-700 text-white px-4 flex-2'
                >
                    <div
                        className='settings flex items-center justify-center h-full cursor-pointer'
                    >
                        ⚙️
                    </div>
                    <div
                        className='time-and-date flex flex-col items-center justify-center h-full w-full'
                    >
                        <span
                            className='time text-[15px] mr-2 block'
                        >
                            {time}
                        </span>
                        <span
                            className='date text-[15px] block'
                        >
                            {date}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Taskbar