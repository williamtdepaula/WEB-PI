import { useEffect, useRef, useState } from 'react';
import BaseContent from '../../components/base_content';
import BasePage from '../../components/base_page';
import Button from '../../components/button';
import DatePicker from '../../components/date_picker';
import DropDownPicker, { Option } from '../../components/dropdown';
import Modal from '../../components/modal';
import RadioCollection from '../../components/radio/radio_collection';
import TextInput, { ItemFormRef, validateAll } from '../../components/text_input';
import TextInputMultiline from '../../components/text_input/text_input_multiline';
import { maskCpf, maskRemoveAllSpecialCharacters, phoneMask } from '../../resources/masks';
import { addressIsValid, CPFIsValid, emailIsValid, nameIsValid, phoneIsValid } from '../../resources/validations';
import { getGroupRiskAndUBSs, savePerson } from '../../sevices/requests';
import './style.css';

function Register() {
    const nameRef = useRef<ItemFormRef>(null)
    const CPFRef = useRef<ItemFormRef>(null)
    const emailRef = useRef<ItemFormRef>(null)
    const addressRef = useRef<ItemFormRef>(null)
    const phoneRef = useRef<ItemFormRef>(null)

    const [nome, setNome] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [CPF, setCPF] = useState<string>("")
    const [obs, setObs] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [gender, setGender] = useState<string>("M")
    const [birthDate, setBirthDate] = useState<string>("")
    const [bestTimeToContact, setBestTimeToContact] = useState<string>("M")
    const [groupRisk, setGroupRisk] = useState<string>('')
    const [UBS, setUBS] = useState<string>('')

    //Page state controll
    const [loading, setLoading] = useState<boolean>(false);
    const [optionsUBS, setOptionsUBS] = useState<Option[]>([]);
    const [optionsGroupRisk, setOptionsGroupRisk] = useState<Option[]>([]);
    const [status, setStatus] = useState<{ success: boolean, message: string } | null>(null);

    useEffect(() => {
        fetchData();
    }, [])

    async function fetchData() {
        setLoading(true)
        const { data } = await getGroupRiskAndUBSs();

        if (data) {
            const optionsUBSTreated = data.UBSs.map(UBS => {
                return { value: UBS.idUBS.toString(), label: UBS.nome }
            })
            const optionsGroupRiskTreated = data.grupo_de_risco.map(group => {
                return { value: group.idGrupoRisco.toString(), label: group.descricao }
            })
            setOptionsUBS(optionsUBSTreated)
            setOptionsGroupRisk(optionsGroupRiskTreated)

            if (optionsUBSTreated.length > 0 && optionsUBSTreated.length > 0) {
                setUBS(optionsUBSTreated[0].value)
                setGroupRisk(optionsUBSTreated[0].value)
            }
        }

        setLoading(false)
    }

    async function onSave() {
        if (validateAll([nameRef, addressRef, emailRef, phoneRef, CPFRef])) {
            const { status } = await savePerson({
                nome,
                email,
                CPF: maskRemoveAllSpecialCharacters(CPF),
                endereco: address,
                telefone: maskRemoveAllSpecialCharacters(phone),
                genero: gender,
                nascimento: birthDate,
                horario_contato: bestTimeToContact,
                idGrupoRisco: groupRisk,
                UBS_idUBS: UBS,
                observacoes: obs.length > 0 ? obs : undefined
            })

            if (status === 500) {
                setStatus({
                    success: false,
                    message: "Tente novamente mais tarde"
                })
            } else if (status === 409) {
                setStatus({
                    success: false,
                    message: "Usuário já cadastrado"
                })
            } else if (status === 201) {
                setStatus({
                    success: true,
                    message: "Usuário criado com sucesso"
                })
            }
        }
    }

    function onCloseModal() {
        setStatus(null)
    }

    return (
        <BasePage>

            {loading
                ?
                <div>Carregando...</div>
                :
                <BaseContent>
                    <Modal
                        handleClose={onCloseModal}
                        show={status !== null}
                        title={status?.success ? "Sucesso" : "Ops! Algo deu errado"}
                        message={status?.message ?? ''}
                    />
                    <div className="ContainerForm">
                        <TextInput
                            ref={nameRef}
                            isValid={nameIsValid(nome)}
                            title="Nome completo"
                            value={nome}
                            onChange={({ target }) => setNome(target.value)}
                            style={{ width: "100%" }}
                            errorMessage='Esse campo é obrigatório'
                            placeholder='Digite seu nome'
                        />
                        <div className="ContainerItemsSideBySide">
                            <div className="ItemSideBySideTextInput">
                                <TextInput
                                    ref={emailRef}
                                    isValid={emailIsValid(email)}
                                    title="E-mail"
                                    placeholder='Digite seu e-mail'
                                    value={email}
                                    errorMessage={
                                        email.length === 0
                                            ?
                                            "Esse campo é obrigatório"
                                            :
                                            "E-mail inválido"
                                    }
                                    style={{ width: "100%" }}
                                    onChange={({ target }) => setEmail(target.value)}
                                />
                            </div>
                            <span style={{ marginLeft: 20 }} />
                            <div className="ItemSideBySideTextInput">
                                <TextInput
                                    ref={CPFRef}
                                    isValid={CPFIsValid(CPF)}
                                    title="CPF"
                                    placeholder='Digite seu CPF'
                                    value={maskCpf(CPF)}
                                    maxLength={14}
                                    errorMessage={
                                        CPF.length === 0
                                            ?
                                            "Esse campo é obrigatório"
                                            :
                                            "CPF inválido"
                                    }
                                    style={{ width: "100%" }}
                                    onChange={({ target }) => setCPF(target.value)}
                                />
                            </div>
                        </div>

                        <TextInput
                            ref={addressRef}
                            isValid={addressIsValid(address)}
                            title="Endereço"
                            placeholder='Nº, Bairro, Cidade'
                            errorMessage='Esse campo é obrigatório'
                            value={address}
                            style={{ width: "100%" }}
                            onChange={({ target }) => setAddress(target.value)}
                        />

                        <div className="ContainerItemsSideBySide">
                            <div className="ItemSideBySideTextInput">
                                <TextInput
                                    ref={phoneRef}
                                    isValid={phoneIsValid(phone)}
                                    title='Telefone'
                                    value={phoneMask(phone)}
                                    maxLength={15}
                                    placeholder='(11) 12345-9744'
                                    errorMessage={
                                        phone.length === 0
                                            ?
                                            "Esse campo é obrigatório"
                                            :
                                            "Número de telefone inválido"
                                    }
                                    style={{ width: "100%" }}
                                    onChange={({ target }) => setPhone(target.value)}
                                />
                            </div>
                            <span style={{ marginLeft: 20 }} />
                            <div className="ItemSideBySideTextInput">
                                <DatePicker
                                    title="Data de nascimento"
                                    onSelectDate={setBirthDate}
                                />
                            </div>
                            <span style={{ marginLeft: 20 }} />
                            <div className="ItemRadioSideBySide">
                                <RadioCollection
                                    nameCollection='radio_gender'
                                    title='Gênero'
                                    items={[
                                        { title: "Masculino", value: "M" },
                                        { title: "Feminino", value: "F" },
                                        { title: "Prefiro não dizer", value: "N" },
                                    ]}
                                    onChangeOption={setGender}
                                />
                            </div>
                        </div>

                        <div className="ContainerItemsSideBySide">
                            <div className="ItemSideBySideTextInput">
                                <DropDownPicker
                                    title='UBS mais próxima'
                                    options={optionsUBS}
                                    onSelect={setUBS}
                                />
                            </div>
                            <span style={{ marginLeft: 20 }} />
                            <div className="ItemSideBySideTextInput">
                                <DropDownPicker
                                    title='Grupo de Risco'
                                    options={optionsGroupRisk}
                                    onSelect={setGroupRisk}
                                />
                            </div>
                            <span style={{ marginLeft: 20 }} />
                            <div className="ItemRadioSideBySide">
                                <RadioCollection
                                    nameCollection='radio_time_contact'
                                    title='Melhor horário para contato'
                                    items={[
                                        { title: "Manhã", value: "M" },
                                        { title: "Tarde", value: "T" },
                                    ]}
                                    onChangeOption={setBestTimeToContact}
                                />
                            </div>
                        </div>
                        <TextInputMultiline
                            title="Observações"
                            placeholder='Digite algo...'
                            value={obs}
                            style={{ width: "100%", height: 100 }}
                            onChange={({ target }) => setObs(target.value)}
                        />
                    </div>
                    <Button onClick={onSave} />
                </BaseContent>
            }

        </BasePage>
    );
}

export default Register;