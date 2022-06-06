const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("welcome to c3 evolution")
})

app.post("/user/create", (req,res)=>{
    fs.readFile("./data.json", { encoding: "utf-8" }, (err, data) => {
        const parsed = JSON.parse(data);
        parsed.users = [...parsed.users, req.body];
    
        fs.writeFile(
          "./data.json",
          JSON.stringify(parsed),
          { encoding: "utf-8" },
          () => {
            res.status(201).send("user created");
          }
        );
      });
});

app.get("/votes/party/:party",(req,res)=>{

    const {party} = req.params;
    fs.readFile("./data.json", {encoding:"utf-8"}, (err,data)=>{
        const parsed = JSON.parse(data);
       
        parsed.users = parsed.users.filter((el)=>{
            if(el.party == party){
                res.send(el);
            }
            
        })
        

    });
 
});

app.get("/votes/voters",(req,res)=>{ 

    // const {voter} = req.params;
    fs.readFile("./data.json", {encoding:"utf-8"}, (err,data)=>{
        const parsed = JSON.parse(data);
        const arr = [];
        // parsed.users = parsed.users.filter((el)=>{
        //     if(el.role == "voter"){
        //         // console.log(el)
        //         res.send(el);
                
        //     }
        for(let i=0;i<parsed.users.length;i++){
            if(parsed.users[i].role == "voter"){
                        // console.log(el)
                        arr.push(parsed.users[i])
                        
                        
                    }
                }
                res.send(arr)
            
        })
        

    });


    app.post("/votes/vote/:user", (req, res) => {

        const {user} = req.params;
         
      fs.readFile("./data.json", { encoding: "utf-8" }, (err, data) => {
        const parsed = JSON.parse(data);
        parsed.users = parsed.users.filter((el)=>{
            if(el.name == user){
                el.votes = el.votes+1;
                
            }
            // return el;
        })
    
        fs.writeFile(
          "./data.json",
          JSON.stringify(parsed),
          { encoding: "utf-8" },
          () => {
            res.end("vote incremented");
          }
        );
      });
    });
 


const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log("listening at 8080")
})