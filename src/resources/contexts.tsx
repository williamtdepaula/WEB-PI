import { createContext, FC, useContext, useEffect, useState } from "react";
import { login } from '../sevices/requests';

interface AuthContextData {
  isAuthenticated: boolean;
  idUBS: null | number;
  name: null | string;
  CNES: null | number;
  isADM: null | boolean;
  loading: boolean;
  login: (UBS: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  statusCodeLogin: null | number; 
}

export const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  idUBS: null,
  name: null,
  CNES: null,
  isADM: null,
  loading: false,
  login: () => {
    throw Error('Auth provider not set');
  },
  logout: () => {
    throw Error('Logout error');
  },
  statusCodeLogin: null
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC = ({children}) => {
  const [name, setName] = useState<null | string>(null)
  const [idUBS, setIdUBS] = useState<null | number>(null);
  const [CNES, setCNES] = useState<null | number>(null);
  const [isADM, setIsADM] = useState<null | boolean>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusCodeLogin, setStatusCodeLogin] = useState<number | null>(null);

  useEffect(() => {
    console.log("AQUIIII")
    loadUserFromCookies()
  }, []);

  async function loadUserFromCookies() {
    const storedIdUBS = localStorage.getItem('userIdUBS');
    const storedName = localStorage.getItem('userName');
    const storedCNES = localStorage.getItem('userCNES');
    const storedIsADM = localStorage.getItem('userIsADM');
    
    console.log("AQUIIII1234", storedIdUBS)
    if (storedIdUBS && storedName && storedCNES && storedIsADM) {
      setName(storedName);
      setIdUBS(parseInt(storedIdUBS));
      setCNES(parseInt(storedCNES));
      setIsADM(storedIsADM === '1' ? true : false);
    }

    setLoading(false);
  }

  const loginUBS = async (UBS: string, password: string) => {
    setLoading(true)
    const {data, status} = await login(UBS, password)

    setStatusCodeLogin(status)

    if (status === 200 && data) {
      const {CNES, idUBS, isADM, nome} = data

      setName(nome);
      setCNES(CNES);
      setIdUBS(idUBS);
      setIsADM(isADM);

      localStorage.setItem('userCNES', CNES.toString());
      localStorage.setItem('userIdUBS', idUBS.toString());
      localStorage.setItem('userName', nome);
      localStorage.setItem('userIsADM', isADM ? '1' : '0');
    }

    setLoading(false)
  };

  const logout = async () => {
    localStorage.removeItem('userCNES');
    localStorage.removeItem('userIdUBS');
    localStorage.removeItem('userName');
    localStorage.removeItem('userIsADM');

    setName(null);
    setCNES(null);
    setIdUBS(null);
    setIsADM(null);
  };

  return (
    <AuthContext.Provider
      value={{
        name,
        CNES,
        idUBS,
        isADM,
        isAuthenticated: !!idUBS,
        loading,
        statusCodeLogin,
        login: loginUBS,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};