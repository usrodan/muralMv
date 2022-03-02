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

  filterIsOpen:boolean;

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
  filterIsOpen:false,
});
 

