import React, { useContext, useEffect, useState } from "react"
import Taskbar from "./Components/Taskbar"
import Window from "./Components/Window"
import { useGSAP } from "@gsap/react"
import Desktop from "./Components/Desktop"
import gsap from "gsap"
import { Context } from "../../context"
import { useNavigate } from "react-router"
import whatsapp from "../../assets/whatapp.png"
import adobe from "../../assets/Adobe.png"
import chrome from "../../assets/chrome.png"
import kindle from "../../assets/Kindle.png"
import recycleBin from "../../assets/recyclebin.png"
import Resume from "./Components/Windows/Resume"
import TestWindow from "./Components/Windows/TestWindow"
import Chrome from "./Components/Windows/Chrome"
const ChillLayout = () => {



  const [windows, setWindows] = useState<{ id: number; visible: boolean, name: string, icon: string, active: boolean, minimized: boolean, Content: React.ReactNode }[]>([
    { id: 1, visible: false, name: "App 1", icon: whatsapp, active: false, minimized: false, Content: <Resume /> },
    { id: 2, visible: false, name: "App 2", icon: chrome, active: false, minimized: false, Content: <Chrome /> },
    { id: 3, visible: false, name: "App 3", icon: adobe, active: false, minimized: false, Content: <TestWindow /> },
    { id: 4, visible: false, name: "App 4", icon: kindle, active: false, minimized: false, Content: <TestWindow /> },
    { id: 5, visible: false, name: "App 5", icon: recycleBin, active: false, minimized: false, Content: <TestWindow /> },
  ])
  const setActiveWindow = (id: number) => {
    const temp = [...windows]
    temp.forEach((window) => {
      if (window.id === id) {
        window.active = true
      } else {
        window.active = false
      }
    })
    setWindows(temp)
  }

  const CloseButtonHandler = (id: number) => {
    const temp = [...windows]
    temp.forEach((window) => {
      if (window.id === id) {
        window.visible = !window.visible
      }
    })
    setWindows(temp)
  }
  const [topZIndex, setTopZIndex] = useState<number>(0)

  const HandleDesktopIconClick = (id: number) => {
    const temp = [...windows]
    temp.forEach((window) => {
      if (window.id === id && window.visible === false) {
        window.visible = !window.visible
      }
      if (window.id === id) {
        window.active = true
        setTopZIndex(topZIndex + 1)
        gsap.set(`.Window${id}`, {
          zIndex: topZIndex + 1,
        })
      }
      else {
        window.active = false
      }
    })
    setWindows(temp)
  }

  return (
    <div
      className="chilllayout h-screen w-screen bg-blue-900 text-white flex flex-col relative"
    >
      {
        windows.map((window, index) => (
          <div key={index}>
            {window.visible && (
              <Window
                key={index}
                app={window}
                CloseHandler={CloseButtonHandler}
                ZIndex={topZIndex}
                SetZIndex={setTopZIndex}
                setActiveWindow={setActiveWindow}
              />
            )}
          </div>

        ))
      }
      <Desktop
        apps={windows}
        HandleIconClick={HandleDesktopIconClick}
        setActiveWindow={setActiveWindow}

      />
      <Taskbar
        apps={windows}
        HandleIconClick={HandleDesktopIconClick}

      />

    </div>
  )
}

export default ChillLayout