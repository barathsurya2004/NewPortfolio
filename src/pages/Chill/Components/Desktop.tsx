import gsap from "gsap"

const Desktop = ({ apps, HandleIconClick, setActiveWindow }: {
    apps: {
        id: number
        name: string
        icon: string
        active: boolean
        visible: boolean
    }[], HandleIconClick: (id: number) => void,
    setActiveWindow: (id: number) => void
}) => {
    return (
        <div
            className='Desktop h-full w-full bg-gray-900'
        >
            <div
                className='DesktopIcons flex w-1/6 h-full bg-gray-800'
            >
                <div
                    className='IconColumn flex flex-col w-1/2 h-full bg-gray-700 text-white pt-10 pb-10 items-center'
                >
                    {apps.map((app) => (
                        <div
                            key={app.id}
                            className={`Icon-${app.id} flex items-center justify-center aspect-1/1 w-9/10 bg-gray-600 m-1 rounded-lg cursor-pointer hover:bg-gray-500`}
                            onDoubleClick={() => {
                                HandleIconClick(app.id)
                                setActiveWindow(app.id)
                            }}
                            onClick={() => {
                                const tl = gsap.timeline()
                                tl.to(`.Icon-${app.id}`, {
                                    scale: 0.9,
                                    duration: 0.03,
                                    ease: "power1.inOut",
                                })
                                    .to(`.Icon-${app.id}`, {
                                        scale: 1,
                                        duration: 0.03,
                                        ease: "power1.inOut",
                                    })
                            }}
                        >
                            <span className='ml-2'>{app.name}</span>
                        </div>
                    ))}
                </div>

            </div>
        </div >
    )
}

export default Desktop