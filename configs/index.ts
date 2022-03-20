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

  pageType:string;

  filterIsOpen:boolean;
  searchIsOpen:boolean;

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
  pageType:"home",
  filterIsOpen:false, 
  searchIsOpen:false,
});
 

