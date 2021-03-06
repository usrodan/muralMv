import { Store } from "pullstate";

interface iConfig { 
  open: boolean,
  url: string;
  siteTitle: string;
  siteDescription: string;
  cookieBarBgColor:string;
  urlSite:string;
  city:string;
  type:string;
  search:string;
  page:number;
  pageType:string;
  filterIsOpen:boolean;
  searchIsOpen:boolean;
  reportModalIsOpen:boolean;
  shareModalIsOpen:boolean;
  imageModalIsOpen:boolean;
  loginModalIsOpen:boolean;
  menuIsOpen:boolean,
  loading:boolean;
  loggedUser:{
    nome: string,
     id: number,
     ativo: boolean,
     email: string,
     cnpj:string,
     empresa:string,
     blocked:boolean,
     username:string,
     whatsapp:string,  
     imagem:{
      id:number,
      url:string
    }
  }
}

 

export const Configs = new Store<iConfig>({ 
  open: false,
  url:"",
  siteTitle:"MaisVagasES",
  siteDescription:"",
  urlSite:"https://mural.maisvagases.com.br",
  cookieBarBgColor:"#000",
  city:"",
  type:"",
  search:"",
  page:1,
  pageType:"home",
  filterIsOpen:false, 
  searchIsOpen:false,
  reportModalIsOpen:false,
  shareModalIsOpen:false,
  imageModalIsOpen:false,
  loginModalIsOpen:false,
  menuIsOpen:false,
  loading:true,
  loggedUser:{
    nome: "",
     id: 0,
     ativo: false,
     email: "",
     cnpj:"",
     empresa:"",
     blocked:false,
     username:"",
     whatsapp:"",
     imagem:{
       id:0,
       url:""
     }
  }
});
 

