import { FC, Fragment } from 'react';
import { Person } from '../../../models/models';
import { maskCpf, phoneMask } from '../../../resources/masks';
import { SiGooglemaps } from 'react-icons/si'
import { getBestTimeToContact, getDateFromTimestamp, getGender, getGroupRiskTreated } from '../../../resources/utils';
import './style.css';
import { useHistory } from 'react-router-dom';

interface ModalProps {
    handleClose: () => void;
    person: Person;
}

const ModalDetailsPerson: FC<ModalProps> = ({ handleClose, person }) => {

    function openMap() {
        window.location.href = (`/maps?CPF=${person.CPF}&user_address=${person.endereco}`)
    }

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

                    {person.observacoes && person.observacoes.length > 0 && 
                        <Fragment>
                            <div className="TitleItem">
                                Observações
                            </div>

                            <div className="ItemDetails">
                                {person.observacoes}
                            </div>
                        </Fragment>
                    }

                    <div className='SeeMap' onClick={openMap}>
                        <SiGooglemaps color='#53C0D8' size={30}/>
                        Veja no mapa como chegar!
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalDetailsPerson;