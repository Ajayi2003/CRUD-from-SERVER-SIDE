import http,{ServerResponse} from "http"
import fs from "fs"

interface iDataEntry{
    id: number;
    course: string;

}
interface iData{
    status: number;
    message:string;
    name: string;
    sucesss: boolean;
    data: iDataEntry | iDataEntry[]| null;

}
let dataEntry:iDataEntry[]=[
    {id:1, course: "Node"},
    {id:2, course: "React"}
]
let data: iData={
    message: "Request not found",
    name: "Request Error",
    status: 404,
    sucesss: false,
    data: null

}
 
const server : http.Server<
    typeof http.IncomingMessage, 
    typeof http.ServerResponse
> = http.createServer((req:http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>)=>{
    const {method,url}= req
    let body:any= []
    req.on("data",(chunks)=>{
        body.push(chunks);
        
    })

    req.on("data",()=>{
        // Reading from Static database
        if(method==="GET" && url==="/"){
            data.message= "Reading from Database";
            data.name= "GET Request";
            data.status= 200;
            data.sucesss= true;
            data.data= dataEntry;
  
    
        }
        // DELETE Data
        else if(method==="DELETE") {
            let id = parseInt(req.url?.split("/")[1]!)-1;
            let Value= dataEntry.filter((el:any)=>{
                return el.id === id;
            })
 
            data.message= `Deleting "${dataEntry[id].course}" from Database`;
            data.name= "DELETE-ONE Request";
            data.status= 201;
            data.sucesss= true;
            data.data= Value;
  
        }
        
        // Updata Data from Database
        else if(method==="PATCH") {
            const {course} = JSON.parse(body)
            let id = parseInt(req.url?.split("/")[1]!)-1

            dataEntry[id].course =course;
 
            data.message= `Updating "${dataEntry[id].course}" from Database`;
            data.name= "UPDATE-ONE Request";
            data.status= 201;
            data.sucesss= true;
            data.data= dataEntry;
  
        }
        // Getting Data from Database
        else if(method==="GET") {
            let id = req.url?.split("/")[1]
 
            data.message= "Reading single Item from Database";
            data.name= "GET-ONE Request";
            data.status= 200;
            data.sucesss= true;
            data.data= dataEntry[parseInt(id!)-1];
  
        }
        // Writing to Static Database
        else if(method==="POST" && url==="/"){
            dataEntry.push(JSON.parse(body))

            
            data.message= "Writing from Database";
            data.name= "POST Request";
            data.status= 201;
            data.sucesss= true;
            data.data= dataEntry;
  
        }
        // Reading and Show Error 
        else{
            data.message= "Request not found";
            data.name= "Request Error";
            data.status= 404;
            data.sucesss= false,
            data.data= null

        }
    res.writeHead(data.status,{
        "content-type": "application/json"})
    res.end(JSON.stringify(data));

    })

},
)
const port: number= 4000 
server.listen(port,()=>{
    console.log("")
    console.log("Running on LocalHost", port)
})

