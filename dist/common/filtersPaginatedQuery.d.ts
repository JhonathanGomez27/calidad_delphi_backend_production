export declare class FiltersPaginatedQuery {
    page: number;
    limit: number;
    orden?: 'ASC' | 'DESC';
    criterioOrden?: 'alfabetico' | 'fecha';
    fechaInicio?: Date;
    fechaFin?: Date;
    estado?: 'Sincronizado' | 'Revisado' | 'Sin calidad';
}
