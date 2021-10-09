import { useState } from 'react';
import BaseContent from '../../components/base_content';
import BasePage from '../../components/base_page';
import Button from '../../components/button';
import TextInput from '../../components/text_input';
import './style.css';

function Register() {
    const [nome, setNome] = useState<string>("")
    const [email, setEmail] = useState<string>("")

    return (
        <BasePage>
            <BaseContent>
                <div className="ContainerForm">
                    <TextInput
                        title="Nome completo"
                        value={nome}
                        onChange={({target}) => setNome(target.value)}
                    />
                    <TextInput
                        title="E-mail"
                        value={email}
                        onChange={({target}) => setEmail(target.value)}
                    />
                </div>
                <Button/>
            </BaseContent>
        </BasePage>
    );
}

export default Register;
