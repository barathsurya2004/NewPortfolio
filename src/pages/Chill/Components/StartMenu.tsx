import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import type React from "react"
import { useRef } from "react"
import { useNavigate } from "react-router"
const StartMenu = ({ isOpen }: { isOpen: boolean }) => {
    const ref: React.RefObject<HTMLDivElement | null> = useRef(null)
    const nav = useNavigate();
    useGSAP(() => {
        if (isOpen) {
            gsap.to(ref.current, {
                y: "-100%",
                duration: 0.5,
                ease: "power1.inOut",
            })
        } else {
            gsap.to(ref.current, {
                y: "100%",
                duration: 0.5,
                ease: "power1.inOut",
            })
        }
    }, [isOpen])
    return (
        <div
            className="start-menu absolute w-100 aspect-1/1 bg-gray-800 text-white flex items-center justify-center top-0 left-0 translate-y-full z-0"
            ref={ref}
        >
            <div
                className="start-menu-content flex flex-col items-center justify-center w-full h-full bg-gray-700 text-white"
            >
                <h1 className="text-2xl font-bold mb-4">Start Menu</h1>
                <div className="apps flex flex-col items-start">
                    <div className="app-item mb-2 cursor-pointer hover:bg-gray-600 p-2 rounded"
                        onClick={() => {
                            nav('/shutdown')
                        }}
                    >Shutdown</div>
                    <div className="app-item mb-2 cursor-pointer hover:bg-gray-600 p-2 rounded"
                        onClick={() => {
                            nav('/restart')
                        }}
                    >Restart</div>
                    <div className="app-item mb-2 cursor-pointer hover:bg-gray-600 p-2 rounded">App 3</div>
                </div>
            </div>
        </div>
    )
}

export default StartMenu