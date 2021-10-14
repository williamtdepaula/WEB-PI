import { Fragment, useEffect, useState } from "react"
import BaseContent from "../../components/base_content"
import BasePage from "../../components/base_page"
import { Person } from "../../models/models"
import { getPeople } from "../../sevices/requests"
import './style.css'

const ListPeople = () => {

    const [people, setPeople] = useState<Person[]>([]);

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        const { status, data } = await getPeople(15, 1);

        if ((status === 200 || status === 304) && data) {
            setPeople(data.data)
        }
    }

    function renderLine() {
        return people.map((person, index) => {
            return (
                <div className='LineTable' style={{ backgroundColor: index % 2 === 0 ? '#F0F0F0' : '#FFFFFF' }}>
                    <div className='ItemLineTable'>
                        {person.nome}
                    </div>
                    <div className='ItemLineTable'>
                        {person.CPF}
                    </div>
                    <div className='ItemLineTable'>
                        {person.genero}
                    </div>
                    <div className='ItemLineTable'>
                        {person.grupo_risco ? (person.grupo_risco).replace(',', ', ') : ''}
                    </div>
                    <div className='ItemLineTable'>
                        {person.UBS}
                    </div>
                </div>
            )
        });
    }

    return (
        <BasePage>
            <BaseContent>
                {people.length > 0 &&
                    <Fragment>
                        <div className='HeaderTable'>
                            <div className='ItemHeaderTable'>
                                Nome
                            </div>
                            <div className='ItemHeaderTable'>
                                CPF
                            </div>
                            <div className='ItemHeaderTable'>
                                Gênero
                            </div>
                            <div className='ItemHeaderTable'>
                                Grupo de Risco
                            </div>
                            <div className='ItemHeaderTable'>
                                UBS
                            </div>
                        </div>
                        {renderLine()}
                    </Fragment>
                }
            </BaseContent>
        </BasePage>
    )
}

export default ListPeople;