import { createContext, FC, useContext, useEffect, useState } from "react";
import { login } from '../../sevices/requests';

interface AuthContextData {
  isAuthenticated: boolean;
  idUBS: null | number;
  name: null | string;
  CNES: null | number;
  isADM: null | boolean;
  ubsAddress: null | string;
  loading: boolean;
  statusCodeLogin: null | number; 
  login: (UBS: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
  idUBS: null,
  name: null,
  CNES: null,
  isADM: null,
  ubsAddress: null,
  loading: false,
  statusCodeLogin: null,
  login: () => {
    throw Error('Auth provider not set');
  },
  logout: () => {
    throw Error('Logout error');
  },
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: FC = ({children}) => {
  const [name, setName] = useState<null | string>(null)
  const [idUBS, setIdUBS] = useState<null | number>(null);
  const [CNES, setCNES] = useState<null | number>(null);
  const [isADM, setIsADM] = useState<null | boolean>(null);
  const [ubsAddress, setUBSAddress] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [statusCodeLogin, setStatusCodeLogin] = useState<number | null>(null);

  useEffect(() => {
    loadUserFromCookies()
  }, []);

  async function loadUserFromCookies() {
    const storedIdUBS = localStorage.getItem('userIdUBS');
    const storedName = localStorage.getItem('userName');
    const storedCNES = localStorage.getItem('userCNES');
    const storedIsADM = localStorage.getItem('userIsADM');
    const storedUBSAddress = localStorage.getItem('userUBSAddress');
    
    if (storedIdUBS && storedName && storedCNES && storedIsADM) {
      setName(storedName);
      setIdUBS(parseInt(storedIdUBS));
      setCNES(parseInt(storedCNES));
      setIsADM(storedIsADM === '1' ? true : false);
      setUBSAddress(storedUBSAddress === '' ? null : storedUBSAddress);
    }

    setLoading(false);
  }

  const loginUBS = async (UBS: string, password: string) => {
    setStatusCodeLogin(null)
    setLoading(true)
    const {data, status} = await login(UBS, password)

    setStatusCodeLogin(status)

    if (status === 200 && data) {
      const {CNES, idUBS, isADM, nome, address} = data

      setName(nome);
      setCNES(CNES);
      setIdUBS(idUBS);
      setIsADM(isADM);
      setUBSAddress(address ?? null)

      localStorage.setItem('userCNES', CNES.toString());
      localStorage.setItem('userIdUBS', idUBS.toString());
      localStorage.setItem('userName', nome);
      localStorage.setItem('userIsADM', isADM ? '1' : '0');
      localStorage.setItem('userUBSAddress', address ?? '');
    }

    setLoading(false)
  };

  const logout = async () => {
    localStorage.removeItem('userCNES');
    localStorage.removeItem('userIdUBS');
    localStorage.removeItem('userName');
    localStorage.removeItem('userIsADM');
    localStorage.removeItem('userUBSAddress');

    setName(null);
    setCNES(null);
    setIdUBS(null);
    setIsADM(null);
    setUBSAddress(null);
  };

  return (
    <AuthContext.Provider
      value={{
        name,
        CNES,
        idUBS,
        isADM,
        ubsAddress,
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