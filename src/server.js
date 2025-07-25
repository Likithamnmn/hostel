const express = require('express');
const app = express();

let initiateAndServe=async()=>{
  try{
    app.listen(3000,()=>{
      console.log("Server is running on port 3000");    
    })
  }catch(e){
    console.log("Error starting server: " + e.message); 
    process.exit(1);
  }
}
initiateAndServe();

app.get('/api/test', (req, res) => {
  res.status(200).send('Hello World!');
}); 

app.use(express.json());

