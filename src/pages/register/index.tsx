import { useRef, useState } from 'react';
import BaseContent from '../../components/base_content';
import BasePage from '../../components/base_page';
import Button from '../../components/button';
import DatePicker from '../../components/date_picker';
import DropDownPicker from '../../components/dropdown';
import Modal from '../../components/modal';
import RadioCollection from '../../components/radio/radio_collection';
import TextInput, { ItemFormRef, validateAll } from '../../components/text_input';
import { phoneMask } from '../../resources/masks';
import { addressIsValid, emailIsValid, nameIsValid, phoneIsValid } from '../../resources/validations';
import './style.css';

function Register() {
    const nameRef = useRef<ItemFormRef>(null)
    const emailRef = useRef<ItemFormRef>(null)
    const addressRef = useRef<ItemFormRef>(null)
    const phoneRef = useRef<ItemFormRef>(null)

    const [nome, setNome] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [gender, setGender] = useState<string>("M")
    const [birthDate, setBirthDate] = useState<string>("M")
    const [bestTimeToContact, setBestTimeToContact] = useState<string>("M")
    const [groupRisk, setGroupRisk] = useState<string | null>(null)
    const [UBS, setUBS] = useState<string | null>(null)

    function onSave() {
        if (validateAll([nameRef, addressRef, emailRef, phoneRef])) {
            console.log({
                nome,
                email,
                address,
                phone,
                gender,
                birthDate,
                bestTimeToContact,
                groupRisk,
                UBS
            })
        }
    }

    return (
        <BasePage>
            <BaseContent>
                <Modal handleClose={() => { }} show={false}>
                    <div style={{width: 300, height: 200, background:'#098'}}>
                        Teste
                    </div>
                </Modal>
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
                        <div className="ItemSideBySideTextInput">
                            <DatePicker
                                title="Data de nascimento"
                                onSelectDate={setBirthDate}
                            />
                        </div>
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
                                options={[{ value: 'a', label: 'Jardim Bela Vista' }]}
                                onSelect={setUBS}
                            />
                        </div>
                        <div className="ItemSideBySideTextInput">
                            <DropDownPicker
                                title='Grupo de Risco'
                                options={[{ value: 'a', label: 'teste' }]}
                                onSelect={setGroupRisk}
                            />
                        </div>
                        <div className="ItemRadioSideBySide">
                            <RadioCollection
                                nameCollection='radio_time_contact'
                                title='Melhor horário para contato'
                                items={[
                                    { title: "Manhã", value: "M" },
                                    { title: "Tarde", value: "FT" },
                                ]}
                                onChangeOption={setBestTimeToContact}
                            />
                        </div>
                    </div>
                </div>
                <Button onClick={onSave} />
            </BaseContent>
        </BasePage>
    );
}

export default Register;
