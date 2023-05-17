import http,{ServerResponse} from "http"

interface iDataEntry{
    id: number;
    course: string;

}
interface iData{
    status: number;
    message:string;
    name: string;
    sucesss: boolean;
    data: iDataEntry[]| null;

}
let dataEntry:iDataEntry[]=[
    {id:1, course: "Node"},
    {id:2, course: "React"}
]
let data: iData={
    message: "Request nof found",
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
        if(method==="GET" && url==="/"){
            data.message= "Reading from Database";
            data.name= "GET Request";
            data.status= 200;
            data.sucesss= true;
            data.data= dataEntry;
  
    
        }
        else if(method==="POST" && url==="/"){
            dataEntry.push(JSON.parse(body))
            data.message= "Writing from Database";
            data.name= "POST Request";
            data.status= 201;
            data.sucesss= true;
            data.data= dataEntry;
  
            // Reading and Show Error 
        }
        else{
            data.message= "Request nof found";
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

