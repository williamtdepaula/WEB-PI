import { Fragment, useEffect, useState } from "react"
import BaseContent from "../../components/base_content"
import BasePage from "../../components/base_page"
import Button from "../../components/button"
import LinkButton from "../../components/button/link_button"
import Loading from "../../components/loading"
import ModalDetailsPerson from "../../components/modal/modal_details_person"
import { Person } from "../../models/models"
import { maskCpf } from "../../resources/masks"
import { getGender, getGroupRiskTreated } from "../../resources/utils"
import { getPeople } from "../../sevices/requests"
import './style.css'

const ListPeople = () => {

    const [people, setPeople] = useState<Person[]>([]);
    const [personSelectedToShow, setPersonSelectedToShow] = useState<Person | null>(null);
    const [showButtonLoadMore, setShowButtonLoadMore] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchData()
    }, [])

    async function fetchData() {
        setLoading(true)
        const { status, data: response } = await getPeople(20, currentPage);

        if ((status === 200 || status === 304) && response) {
            setPeople(old => old.concat(response.data));

            let { lastPage } = response.pagination;

            if (currentPage < lastPage) {
                setShowButtonLoadMore(true);
                setCurrentPage(currentPage + 1);
            } else {
                setShowButtonLoadMore(false);
            }

        }
        setLoading(false)
    }

    function renderLine() {
        return people.map((person, index) => {
            return (
                <div
                    key={person.CPF}
                    className='LineTable'
                    style={{ backgroundColor: index % 2 === 0 ? '#F0F0F0' : '#FFFFFF' }}
                    onClick={() => setPersonSelectedToShow(person)}
                >
                    <div className='ItemLineTable'>
                        {person.nome}
                    </div>
                    <div className='ItemLineTable'>
                        {maskCpf(person.CPF)}
                    </div>
                    <div className='ItemLineTable'>
                        {getGender(person.genero)}
                    </div>
                    <div className='ItemLineTable'>
                        {getGroupRiskTreated(person.grupo_risco)}
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
                {personSelectedToShow &&
                    <ModalDetailsPerson
                        handleClose={() => setPersonSelectedToShow(null)}
                        person={personSelectedToShow}
                    />
                }
                {loading && people.length === 0 &&
                    <Loading color='blue' style={{ height: 80 }} />
                }
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
                        {showButtonLoadMore &&
                            <LinkButton
                                title='Carregar mais'
                                onClick={fetchData}
                                loading={loading}
                            />
                        }
                    </Fragment>
                }
            </BaseContent>
        </BasePage>
    )
}

export default ListPeople;