import { useEffect, useState } from "react";

export const useSmallScreen = () => {
    const [smallScreen, setSmallScreen] = useState<boolean>(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 930px)');
        const listener = (e: any) => {
            if (e.matches) {
                setSmallScreen(true);
            } else {
                setSmallScreen(false);
            }
        };
        listener(mediaQuery);
        mediaQuery.addEventListener('change', listener);
        return () => mediaQuery.removeEventListener('change', listener);
    }, []);

    return smallScreen;
};
