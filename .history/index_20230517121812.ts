import http from "http"
 
// const server = http.createServer((req:http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>)=>{
//     const {method,url}= req
//     if(method==="GET" && url==="/"){
//         res.write('Hello World')
//         res.end()

//     }
    
// })
// const port: number= 4000 
// server.listen(port,()=>{
//     console.log("")
//     console.log("Running on LocalHost", port)
// })

const server1 = http.createServer((req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>)=>{
    
    const {method, url}= req
    if(method==="GET" && url==="/"){
        res.write("Welcome User to Server-Side")
        res.end()


    }

})
const port:number = 5000
server1.listen(port,()=>{
    console.log("")
    console.log("Running Localhost")
})