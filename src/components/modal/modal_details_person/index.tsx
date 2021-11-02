import { FC } from 'react';
import { Person } from '../../../models/models';
import { maskCpf, phoneMask } from '../../../resources/masks';
import { getBestTimeToContact, getDateFromTimestamp, getGender, getGroupRiskTreated } from '../../../resources/utils';
import './style.css';

interface ModalProps {
    handleClose: () => void;
    person: Person;
}

const ModalDetailsPerson: FC<ModalProps> = ({ handleClose, person }) => {
    return (
        <div className={"modal display-block"}>
            <div className="modal-main">
                <div className='CloseModalContainer' onClick={handleClose}>
                    x
                </div>
                <div className='ModalDetailsContentContainer'>
                    <div className="TitleItem">
                        Nome
                    </div>
                    <div className="ItemDetails">
                        {person.nome}
                    </div>

                    <div className="TitleItem">
                        CPF
                    </div>
                    <div className="ItemDetails">
                        {maskCpf(person.CPF)}
                    </div>

                    <div className="TitleItem">
                        Gênero
                    </div>
                    <div className="ItemDetails">
                        {getGender(person.genero)}
                    </div>

                    <div className="TitleItem">
                        E-mail
                    </div>
                    <div className="ItemDetails">
                        {person.email}
                    </div>

                    <div className="TitleItem">
                        Telefone
                    </div>
                    <div className="ItemDetails">
                        {phoneMask(person.telefone)}
                    </div>

                    <div className="TitleItem">
                        Endereço
                    </div>
                    <div className="ItemDetails">
                        {person.endereco}
                    </div>

                    <div className="TitleItem">
                        Data de nascimento
                    </div>
                    <div className="ItemDetails">
                        {getDateFromTimestamp(person.nascimento)}
                    </div>

                    <div className="TitleItem">
                        Melhor horário para contato
                    </div>
                    <div className="ItemDetails">
                        {getBestTimeToContact(person.horario_contato)}
                    </div>

                    <div className="TitleItem">
                        Grupo de Risco
                    </div>
                    <div className="ItemDetails">
                        {getGroupRiskTreated(person.grupo_risco)}
                    </div>

                    <div className="TitleItem">
                        UBS
                    </div>
                    <div className="ItemDetails">
                        {person.UBS}
                    </div>

                    <div className="TitleItem">
                        Observações
                    </div>
                    <div className="ItemDetails">
                        {person.observacoes}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDetailsPerson;