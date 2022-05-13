import { createContext, FC, useContext, useEffect, useState } from "react";
import { login } from '../../sevices/requests';

interface ApplicationContextData {
  pixelsToAdd: number;
  addFontSize: () => void;
  minusFontSize: () => void;
}

export const ApplicationContext = createContext<ApplicationContextData>({
    pixelsToAdd: 0,
    addFontSize: () => {
        throw Error('addFontSize provider not set');
    },
    minusFontSize: () => {
        throw Error('minusFontSize error');
    },
});

export const useApplication = () => useContext(ApplicationContext);

export const ApplicationProvider: FC = ({children}) => {
    const [pixelsToAdd, setpixelsToAdd] = useState<number>(0)
    
    function addFontSize(){
        if (pixelsToAdd < 10){
            setpixelsToAdd(oldState => oldState + 4)
        }
    }

    function minusFontSize(){
        if (pixelsToAdd > 0){
            setpixelsToAdd(oldState => oldState - 4)
        }
    }

    return (
        <ApplicationContext.Provider
            value={{
                pixelsToAdd,
                addFontSize,
                minusFontSize
            }}
        >
        {children}
        </ApplicationContext.Provider>
    );
};