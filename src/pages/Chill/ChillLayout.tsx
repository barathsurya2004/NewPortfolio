import React, { useEffect, useState } from "react"
import Taskbar from "./Components/Taskbar"
import Window from "./Components/Window"
import { useGSAP } from "@gsap/react"
import Desktop from "./Components/Desktop"
import gsap from "gsap"

const ChillLayout = () => {
  const [windows, setWindows] = useState<{ id: number; visible: boolean, name: string, icon: string, active: boolean, minimized: boolean }[]>([
    { id: 1, visible: false, name: "App 1", icon: "icon3.png", active: false, minimized: false },
    { id: 2, visible: false, name: "App 2", icon: "icon3.png", active: false, minimized: false },
    { id: 3, visible: false, name: "App 3", icon: "icon3.png", active: false, minimized: false },
    { id: 4, visible: false, name: "App 4", icon: "icon3.png", active: false, minimized: false },
    { id: 5, visible: false, name: "App 5", icon: "icon3.png", active: false, minimized: false },
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
  const MinimizeHandler = (id: number) => {
    console.log("Handling minimize")

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
          <div>
            {window.visible && (
              <Window
                key={index}
                id={window.id}
                CloseHandler={CloseButtonHandler}
                ZIndex={topZIndex}
                SetZIndex={setTopZIndex}
                setActiveWindow={setActiveWindow}
                MinimizeHandler={MinimizeHandler}
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