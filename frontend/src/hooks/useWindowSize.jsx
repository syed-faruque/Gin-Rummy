import {useEffect, useState} from "react";

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
        const resize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            })
        }

        window.addEventListener('resize', resize);
    }, [])

    return windowSize;

}

export default useWindowSize;