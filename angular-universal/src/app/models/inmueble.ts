export interface IInmueble{
    postID : string;
    date : string;
    desc ?: {comoditics: string , info : string};
    email : string;
    images : string[];
    phone : number;
    place : string;
    price : number;
    sold : boolean;
    title : string;
    userID : string;
}