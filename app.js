import express from 'express'
const app = express()
const port = 3000
const activities= 
    
 import helmet from 'helmet'
app.use(helmet())

app.get('/',(req, res)=> {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })

  app.get('/activities/:id', async (req,res) => {
    try {activities(req,body))
        

              
  