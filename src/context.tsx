import { createContext, useEffect, useState } from "react";

export const Context = createContext<{
    setUser: (user: string | null) => void;
    user: string | null;
    activeWindow: number | null;
    setActiveWindow: (window: number | null) => void;
    Auth: boolean | null;
    setAuth: (auth: boolean | null) => void;
    mousePos: { x: number; y: number };
}>({
    setUser: () => { },
    user: null,
    activeWindow: null,
    setActiveWindow: () => { },
    mousePos: { x: 0, y: 0 },
    Auth: null,
    setAuth: () => { }
});

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<string | null>(null);
    const [activeWindow, setActiveWindow] = useState<number | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [Auth, setAuth] = useState<boolean | null>(false);


    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    })

    return (
        <Context.Provider value={{ user, setUser, activeWindow, setActiveWindow, mousePos, Auth, setAuth }}>
            {children}
        </Context.Provider>
    );
}