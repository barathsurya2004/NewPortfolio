import React from 'react'

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
    return (
        <div
            className='Taskbar holder w-full bg-gray-800 h-15 flex items-center'>
            <div
                className='start flex items-center justify-start h-full bg-red-900 text-white px-4 flex-1'
            >
                {">>> "}
                start
            </div>
            <div
                className='applications flex items-center justify-start h-full bg-gray-700 text-white px-4 flex-10'
            >
                {apps.map((app) => {

                    return app.visible ? <div
                        key={app.id}
                        className={`app-icon flex items-center justify-center h-9/10 aspect-1/1 ml-1 mr-1 ${app.active ? 'bg-gray-600' : 'bg-blue-700'} text-white font-1`}
                        onClick={() => {
                            HandleIconClick(app.id)
                        }}
                    >

                        <span className='ml-2 '>{app.name}</span>
                    </div> : null
                }
                )}
            </div>
            <div
                className='settings flex items-center justify-start h-full bg-red-700 text-white px-4 flex-2'
            >Time and date</div>
        </div>
    )
}

export default Taskbar