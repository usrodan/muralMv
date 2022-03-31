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
  loading:boolean;
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
  loading:true,
});
 

