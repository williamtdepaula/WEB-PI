import { Fragment, useEffect, useState } from "react"
import BaseContent from "../../components/base_content"
import BasePage from "../../components/base_page"
import LinkButton from "../../components/button/link_button"
import DropdownMultiSelect, { OptionDropDownMulti } from "../../components/dropdown_multiselect"
import Loading from "../../components/animations/loading"
import ModalDetailsPerson from "../../components/modal/modal_details_person"
import SearchInput from "../../components/search_input"
import { Person } from "../../models/models"
import { maskCpf } from "../../resources/masks"
import { getGender, getGroupRiskTreated } from "../../resources/utils"
import { getGroupRiskAndUBSs, getPeople } from "../../sevices/requests"
import './style.css'
import EmptyAnimation from "../../components/animations/empty/empty"

let search: string | undefined = undefined;
let optionsUBSsSelected: string[] | undefined = undefined;
let optionsGroupRiskSelected: string[] | undefined = undefined;
let optionsGenderSelected: string[] | undefined = undefined;

const optionsGender: OptionDropDownMulti[] = [
    {
        label: 'Masculino',
        value: 'M'
    },
    {
        label: 'Feminino',
        value: 'F'
    },
    {
        label: 'Prefiro não dizer',
        value: 'N'
    },
]

const ListPeople = () => {

    const [people, setPeople] = useState<Person[]>([]);
    const [personSelectedToShow, setPersonSelectedToShow] = useState<Person | null>(null);
    const [showButtonLoadMore, setShowButtonLoadMore] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [optionsUBS, setOptionsUBS] = useState<OptionDropDownMulti[]>([]);
    const [optionsGroupRisk, setOptionsGroupRisk] = useState<OptionDropDownMulti[]>([]);

    useEffect(() => {
        fetchData(true)
    }, [])

    async function fetchData(firstTime: boolean = false, reset: boolean = false) {
        if (reset) setPeople([])

        let currentPageToFetch = reset ? 1 : currentPage

        setLoading(true)
        const { status, data: response } = await getPeople(
            20,
            currentPageToFetch,
            search,
            optionsUBSsSelected,
            optionsGroupRiskSelected,
            optionsGenderSelected
        );

        if ((status === 200 || status === 304) && response) {
            let dataToSet = reset ? response.data : people.concat(response.data);

            setPeople(dataToSet);

            let { lastPage } = response.pagination;

            if (currentPageToFetch < lastPage) {
                setShowButtonLoadMore(true);
                setCurrentPage(currentPageToFetch + 1);
            } else {
                setShowButtonLoadMore(false);
            }

            if (firstTime && dataToSet.length > 0) {
                await fetchGroupsAndUBSs()
            }
        } else if (status === 404) {
            setPeople([])
        }


        setLoading(false)
    }

    async function fetchGroupsAndUBSs() {
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
        }

        setLoading(false)
    }


    async function onSearch(value: string) {
        search = value;
        await fetchData(false, true)
    }

    async function onChangeUBSsFilter(UBSs: string[]) {
        optionsUBSsSelected = UBSs;
        await fetchData(false, true)
    }

    async function onChangeGruposRiscoFilter(grupos_risco: string[]) {
        optionsGroupRiskSelected = grupos_risco;
        await fetchData(false, true)
    }

    async function onChangeGendersFilter(genders: string[]) {
        optionsGenderSelected = genders;
        await fetchData(false, true)
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

                <SearchInput onSearch={onSearch} />

                {optionsUBS.length > 0 && optionsGroupRisk.length > 0 &&
                    <div className='ContainerItemsSideBySide'>
                        <DropdownMultiSelect
                            name='ubss'
                            title='UBSs'
                            options={optionsUBS}
                            onSelectOptions={onChangeUBSsFilter}
                        />

                        <DropdownMultiSelect
                            name='groups_risk'
                            title='Grupos de risco'
                            options={optionsGroupRisk}
                            onSelectOptions={onChangeGruposRiscoFilter}
                        />

                        <DropdownMultiSelect
                            name='genders'
                            title='Genêro'
                            options={optionsGender}
                            onSelectOptions={onChangeGendersFilter}
                        />
                    </div>
                }

                {loading && people.length === 0 &&
                    <Loading color='blue' style={{ height: 80 }} />
                }
                {!loading && people.length === 0 &&
                    <EmptyAnimation
                        text='Ops! Não encontramos nada, tente novamente mais tarde'
                    />
                }

                {people.length > 0 &&
                    <Fragment>
                        <div style={{ width: '100%', overflowX: 'auto', overflowWrap: 'inherit' }}>

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
                        </div>
                        {showButtonLoadMore &&
                            <LinkButton
                                title='Mostrar Mais'
                                onClick={() => fetchData(false, false)}
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