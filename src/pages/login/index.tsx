import { useEffect, useRef, useState } from 'react';
import Loading from '../../components/animations/loading';
import Box from '../../components/Box';
import Button from '../../components/button';
import DropDownPicker, { Option } from '../../components/dropdown';
import ErrorPage from '../../components/error_page';
import Modal, { ModalSkull } from '../../components/modal';
import TextInput, { ItemFormRef } from '../../components/text_input';
import { getUBSs } from '../../sevices/requests';
import {useSmallScreen} from '../../resources/hooks';

import './style.css';
import { useAuth } from '../../resources/contexts/AuthContext';
import { useHistory } from 'react-router-dom';

function LoginPage() {
    const passwordRef = useRef<ItemFormRef>(null)

    const history = useHistory()

    const {login, loading: loadingLogin, statusCodeLogin, isAuthenticated} = useAuth()
    const isMobile = useSmallScreen()

    const [optionsUBSsDropdown, setOptionsUBSsDropdown] = useState<Option[]>([])
    const [UBS, setUBS] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)
    const [showModalError, setShowModalError] = useState<ModalSkull>({ show: false })
    const [errorServer, setErrorServer] = useState<boolean>(false);

    useEffect(() => {
        document.title = 'Login'
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            history.replace('/relatorio')
        } else {
            getUBSsToDropdown()
        }
    }, [isAuthenticated])

    useEffect(() => {
        treatLoginStatusCode()
    }, [statusCodeLogin])

    function treatLoginStatusCode() {
        if (statusCodeLogin){
            if (statusCodeLogin === 200) {
                history.replace('/relatorio')
            } else if (statusCodeLogin === 403) {
                setShowModalError({
                    show: true,
                    title: 'Senha incorreta!',
                    message: 'Senha informada está incorreta, verifique e tente novamente.'
                })
            } else {
                setShowModalError({
                    show: true,
                    title: 'OOPS!! Algo deu errado',
                    message: 'Ocorreu um erro desconhecido ao tentar efeutar a autenticação, tente novamente.'
                })
            }
        }
    }

    async function getUBSsToDropdown() {
        setErrorServer(false)
        setLoading(true)
        let {data: UBSs, status} = await getUBSs(false);

        if (status === 200){
            if (UBSs){
                const optionsUBSTreated = UBSs.map(UBS => {
                    return { value: UBS.idUBS.toString(), label: UBS.nome }
                })

                setOptionsUBSsDropdown(optionsUBSTreated)
                setUBS(optionsUBSTreated[0].value)
            }
        } else {
            setErrorServer(true)
        }
        setLoading(false)
    }

    async function loginUser(){
        let isValid = passwordRef.current?.validate()

        if (isValid){
            await login(UBS, password)
        }
    }
    
    function onCloseModalIncorrectLogin() {
        setPassword('')
        setShowModalError({ show: false })
    }

    return (
        <div className='center'>
            {errorServer 
                ?
                    <ErrorPage onPressTryAgain={getUBSsToDropdown}/>
                :
                    loading
                        ?
                            <Loading color='blue' style={{height: 100}}/>
                        :
                            <Box styles={{ width: isMobile ? '100%' : 450, backgroundColor: isMobile ? 'transparent' : undefined}}>
                                <h3>CADASTRO ACELERADO DE SAÚDE</h3>

                                <div className='container-form'>
                                    <DropDownPicker
                                        title='UBS mais próxima'
                                        options={optionsUBSsDropdown}
                                        onSelect={setUBS}
                                        style={{width: '80%', fontWeight: 'normal'}}
                                    />
                                    <TextInput
                                        ref={passwordRef}
                                        placeholder='Digite sua senha'
                                        title='Senha'
                                        onChange={({target}) => setPassword(target.value)}
                                        value={password}
                                        maxLength={20}
                                        isValid={password.length > 0}
                                        type='password'
                                        style={{width: '80%'}}
                                        titleStyle={{ fontWeight: 'normal' }}
                                        errorMessage='Esse campo é obrigatório'
                                    />

                                    <Modal
                                        show={showModalError.show}
                                        title={showModalError.title ?? ''}
                                        message={showModalError.message ?? ''}
                                        handleClose={onCloseModalIncorrectLogin}
                                    />

                                    <Button title='ENTRAR' onClick={loginUser} loading={loadingLogin} />
                                </div>
                            </Box>
            }
        </div>
    );
}

export default LoginPage;
