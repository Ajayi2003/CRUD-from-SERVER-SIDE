import http from "http"
 
const server = http.createServer((req:http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>)=>{
    const {method,url}= req
    if(method==="GET" && url==="/"){
        res.write('Hello World')
        res.end()

    }
    

   



})
const port: number= 4000 
server.listen(port,()=>{
    console.log("Running on LocalHost", port)
})