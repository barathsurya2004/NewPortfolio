import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useEffect } from "react"
import { useNavigate } from "react-router"
const ShutDown = ({ mode }: { mode: string }) => {
    const nav = useNavigate();
    useGSAP(() => {
        gsap.to(".LoaderIcon", {
            rotate: 360,
            repeat: -1,
            duration: 2,
        })
    }, [])
    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.replace("https://www.google.com/search?q=cute+cat+pics&sca_esv=d41d77eb53f75a2f&hl=en&sxsrf=AHTn8zrfJ_DQnxVot1KCbPN1IfLkrWSLag:1746975547505&source=hp&biw=1912&bih=966&ei=O7sgaI6iHOj71e8Pv7ye-QI&iflsig=ACkRmUkAAAAAaCDJS-9sH_aEQgl2ESCYFDqxO-tprsQg&oq=cute&gs_lp=EgNpbWciBGN1dGUqAggAMgcQIxgnGMkCMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMggQABiABBixAzIIEAAYgAQYsQMyCBAAGIAEGLEDMgUQABiABDIFEAAYgAQyCBAAGIAEGLEDSMsRUNsCWPMLcAF4AJABAJgBjwGgAZoEqgEDMC40uAEDyAEA-AEBigILZ3dzLXdpei1pbWeYAgWgAqsEqAIKwgIKECMYJxjJAhjqAsICDhAAGIAEGLEDGIMBGIoFwgILEAAYgAQYsQMYgwGYAwaSBwMxLjSgB94ZsgcDMC40uAelBA&sclient=img&udm=2");
        }, 5000);

        return () => clearTimeout(timer); // Clear the timer if the component unmounts or the effect re-runs
    }, []);
    return (
        <div>
            <div
                className="Loader h-200 aspect-16/9 bg-gray-800 text-white flex items-center justify-center"
            >
                <div className="LoaderContent flex flex-col items-center justify-center w-full h-full bg-gray-700 text-white">
                    <h1 className="text-2xl font-bold mb-4">Shutting Down...</h1>
                    <div className="LoaderIcon flex items-center justify-center w-16 h-16 bg-gray-600 rounded-full animate-spin">
                        <span className="text-white text-lg">🔄</span>
                    </div>
                    <p className="text-sm mt-4">{mode}</p>
                </div>
            </div>
        </div>
    )
}

export default ShutDown