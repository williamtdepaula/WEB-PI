interface GroupRisk {
    idGrupoRisco: number;
    descricao: string;
}

interface UBS {
    idUBS: number;
    CNES: number;
    nome: string;
    isADM: boolean;
}

interface Person {
    CPF: string;
    nome: string;
    endereco: string;
    telefone: string;
    nascimento: string;
    email?: string;
    genero: string;
    horario_contato: string;
    observacoes?: string;
    UBS: string;
    grupo_risco: string;
}

interface PersonToSave {
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
    grupos_risco: string[];
}


export type { GroupRisk, UBS, Person, PersonToSave }