import axios from 'axios'
interface FormData {
    nome: string;
    tel: string;
    email: string;
    mensagem: string;
  } 

 export async function sendEmail(dados: FormData){ 
 
return new Promise((resolve, reject) => {

    axios.request({
        method: "POST",
        url: `/api/sendMail`, 
        data:JSON.parse(JSON.stringify(dados))
      }).then( response=> { 
              resolve(response.data)
            }
      ).catch( error =>{
        reject(error)
      })
})

}