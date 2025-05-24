import gsap from "gsap"
import whatsapp from "../../../assets/whatsapp.png"
import desktop from "../../../assets/desktop.png"
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
            className='Desktop h-full w-full'
        >
            <img src={desktop} alt=""
                className="absolute w-full h-full object-cover z-0 "
            />
            <div
                className='DesktopIcons flex w-1/7 h-full z-1'
            >
                <div
                    className='IconColumn flex flex-col w-1/2 h-full bg-gray-700 text-white pt-10 pb-10 items-center '
                >
                    {apps.map((app) => (
                        <div
                            className={`IconContainer flex flex-col aspect-1 w-8/10 z-1 justify-center items-center`}
                            key={app.id}
                        >

                            <div
                                key={app.id}
                                className={`Icon-${app.id} flex items-center justify-center aspect-1/1 w-full rounded-lg cursor-pointer hover:bg-gray-500 relative`}
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
                                <img src={app.icon} alt=""
                                    className='absolute w-full h-full object-cover rounded-lg z-1 opacity-50'
                                />
                                <img src={app.icon} alt=""
                                    className='absolute w-full h-full object-cover rounded-lg blur-[2px] z-0'
                                />
                            </div>
                            <div
                                className='IconName text-[24px] text-center w-full rounded-b-lg flex items-center justify-center cursor-pointer'
                                onClick={() => {
                                    HandleIconClick(app.id)
                                    setActiveWindow(app.id)
                                }}
                            >
                                {app.name}
                            </div>

                        </div>

                    ))}
                </div>

            </div>
        </div >
    )
}

export default Desktop