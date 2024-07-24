import express from 'express'
const app = express()
const port = 3000
    
import helmet from 'helmet'
app.use(helmet())

const activities = [
  {
      "id":"pushups",
      "duration": "30",
      "type":"upperbody",
      "date":"03/09/2024"
  
  },
  {
      "id":"running",
      "duration": "40",
      "type":"cardio",
      "date":"04/09/2024" 
  },
  {
      "id":"squats",
      "duration": "50",
      "type":"lowerbody",
      "date":"05/09/2024"   
  
  }]
  
app.get('/',(req, res)=> {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
  })

app.get('/activities/:id',(req, res) => {
    const activityid = req.params.id
    console.log(`Requested activity ID: ${activityid}`)
    const activity = activities.find(activityid);
    if (activity){
      res.json(activity)

    }else
    {res.status(404).send('Activity not found')}

  });