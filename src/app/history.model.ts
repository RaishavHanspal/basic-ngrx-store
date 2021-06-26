export interface HistoryModel{
    queryParams:{ q: string, t: string};
    timeStamp:string;
    result?: any;
}

export interface SearchData{
    t: string;
    q: string;
    data: any;
}