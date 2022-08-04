export interface Product{
    id:number;
    nom:String;
    description:String;
    currentPrice:number;
    promotion:boolean;
    selected:boolean;
    available:boolean;
    photoName:String;
    quantity:number;

    _links:{
     self:{
     href:string
     },
     product:{
     href:string
     },
     category:{
          href:string
          }
    }
}

