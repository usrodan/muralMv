import { Request, Response } from "express";
import { File } from "formidable";
import Formidable from "formidable-serverless";
import fs from "fs";
import axios from "axios";
export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadUrl = `${process.env.NEXT_PUBLIC_STRAPI}/api/upload`;

export default function uploadFormFiles(req: Request, res: Response) {
  return new Promise(async (resolve, reject) => {
    const form = new Formidable.IncomingForm({
      multiples: true,
      keepExtensions: true,
    });
    var newPath = "";
    form
      .on("file", async (name: string, file: File) => {
        const data = fs.readFileSync(file.path);
        newPath = `./public/temp/${file.name}`;
        fs.writeFileSync(newPath, data);
        fs.unlinkSync(file.path);
      })
      .on("aborted", () => {
        reject(res.status(500).send("Aborted"));
      })
      .on("end", async () => {
        console.log(newPath); 
        var FormData = require("form-data"); 
        var data = new FormData();
        data.append(
          "files",
          fs.createReadStream(newPath)
        ); 

        axios({
          method: "post",
          url: uploadUrl,
          headers: {
            ...data.getHeaders(),
          },
          data: data,
        })
          .then(function (response) {

            fs.unlink(newPath, (err) => {
              if (err) {
                console.error(err)
                return
              } 
            })
            resolve(res.status(200).json(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });      
      }); 
    await form.parse(req);
  });
}