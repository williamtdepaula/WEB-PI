interface GroupRisk {
    idGrupoRisco: number;
    descricao: string;
}

interface UBS {
    idUBS: number;
    CNES: number;
    nome: string;
    logradouro: string;
    bairro: string;
    latitude: string;
    longitude: string;
}

interface Person {
    CPF: string;
    nome: string;
    endereco: string;
    telefone: string;
    nascimento: string;
    email?: string;
    genero: string;
    horario_contato?: string;
    observacoes?: string;
    UBS_idUBS: string;
    idGrupoRisco: string;
}

export type { GroupRisk, UBS, Person }