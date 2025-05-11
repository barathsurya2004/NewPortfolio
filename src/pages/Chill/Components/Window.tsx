import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { useContext, useEffect, useRef, useState } from "react"
import { Context } from "../../../context";
const Window = ({ id, CloseHandler, ZIndex, SetZIndex, setActiveWindow, MinimizeHandler }: {
    id: number, CloseHandler: (id: number) => void,
    ZIndex: number, SetZIndex: (id: number) => void,
    setActiveWindow: (id: number) => void,
    MinimizeHandler: (id: number, ref: React.RefObject<HTMLDivElement> | null) => void
}) => {
    const [clicked, setClicked] = useState(false);
    const { mousePos } = useContext(Context);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (clicked) {
            setActiveWindow(id);
            SetZIndex(ZIndex + 1);
            gsap.set(ref.current, {
                zIndex: ZIndex,
            })
        }
    }, [clicked])
    useGSAP(() => {
        if (clicked) {
            // Move to new position
            gsap.to(ref.current, {
                scale: 0.985,
                duration: 0.1,
                ease: "power1.inOut",
            })
            gsap.to(ref.current, {
                x: mousePos.x - offset.x,
                y: mousePos.y - offset.y,
                duration: 0.01,
                ease: "power1.inOut",
                onUpdate: () => {
                    setPosition({
                        x: mousePos.x - offset.x,
                        y: mousePos.y - offset.y
                    });
                }
            });
        } else {
            // Smoothly scale back when released
            gsap.to(ref.current, {
                scale: 1,
                duration: 0.1,
                ease: "power1.inOut",
            });
        }
    }, [clicked, mousePos]);
    useGSAP(() => {

        gsap.fromTo(ref.current, {
            x: "0",
            y: "100vh",
            scale: 0
        },
            {
                x: "50vh",
                y: "25vh",
                zIndex: ZIndex + 1,
                scale: 1,
                duration: 0.2,
                ease: "power1.out",
                onComplete: () => {
                    SetZIndex(ZIndex + 1);
                }


            })
    }, [])
    return (
        <div
            className={`Window${id} absolute w-1/2 h-1/2 bg-gray-800 text-white flex items-center justify-center top-100vh left-0 `}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
            }}
            onClick={() => {
                setActiveWindow(id);
                SetZIndex(ZIndex + 1);
                gsap.set(ref.current, {
                    zIndex: ZIndex,
                })
            }}
            ref={ref}
        >
            <div
                className="MenuBar absolute top-0 left-0 w-full h-10 bg-gray-700 flex items-center justify-between px-2"

            >
                <div className="WindowTitle flex-1 text-center"
                    onPointerDown={(e) => {
                        const rect = ref.current?.getBoundingClientRect();
                        setOffset({
                            x: e.clientX - (rect?.left ?? 0),
                            y: e.clientY - (rect?.top ?? 0),
                        });

                        setClicked(true);


                    }}
                    onPointerUp={() => {

                        setClicked(false);
                    }}

                >
                    <div
                        className="Grab-Padding absolute top-0 left-0 w-full h-full pt-15 -translate-y-2.5 bg-red-500 opacity-50 z-0"
                    />
                    Window {id}
                </div>

                <button
                    className="CloseButton z-1"
                    onClick={() => {
                        const tl = gsap.timeline()
                        tl.to(ref.current, {
                            scale: 0,
                            duration: 0.2,
                            ease: "power1.out",
                        })
                            .to(ref.current, {
                                x: "-100vh",
                                y: "100vh",
                                duration: 0.3,
                                ease: "power1.out",
                                onComplete: () => {
                                    CloseHandler(id);
                                }
                            }, "<")
                        setActiveWindow(-1);
                    }}
                >
                    X
                </button>
            </div>
            Window {id}
        </div>
    );
};


export default Window