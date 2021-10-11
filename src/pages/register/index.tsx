import { useState } from 'react';
import BaseContent from '../../components/base_content';
import BasePage from '../../components/base_page';
import Button from '../../components/button';
import DatePickerBR from '../../components/date_picker';
import DropDownPicker from '../../components/dropdown';
import RadioCollection from '../../components/radio/radio_collection';
import TextInput from '../../components/text_input';
import './style.css';

function Register() {
    const [nome, setNome] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [address, setAddress] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [gender, setGender] = useState<string>("M")
    const [birthDate, setBirthDate] = useState<string>("M")
    const [bestTimeToContact, setBestTimeToContact] = useState<string>("M")
    const [groupRisk, setGroupRisk] = useState<string | null>(null)
    const [UBS, setUBS] = useState<string | null>(null)

    return (
        <BasePage>
            <BaseContent>
                <div className="ContainerForm">
                    <TextInput
                        title="Nome completo"
                        value={nome}
                        onChange={({ target }) => setNome(target.value)}
                        style={{ width: "100%" }}
                    />
                    <TextInput
                        title="E-mail"
                        value={email}
                        style={{ width: "100%" }}
                        onChange={({ target }) => setEmail(target.value)}
                    />
                    <TextInput
                        title="Endereço"
                        value={address}
                        style={{ width: "100%" }}
                        onChange={({ target }) => setAddress(target.value)}
                    />

                    <div className="ContainerItemsSideBySide">
                        <div className="ItemSideBySideTextInput">
                            <TextInput
                                title='Telefone'
                                value={phone}
                                style={{ width: "100%" }}
                                onChange={({ target }) => setPhone(target.value)}
                            />
                        </div>
                        <div className="ItemSideBySideTextInput">
                            <DatePickerBR
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
                <Button />
            </BaseContent>
        </BasePage>
    );
}

export default Register;
