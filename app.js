//grabbing all the dependencies
import express from 'express'
import { v4 as uuidv4 } from 'uuid';
import helmet from 'helmet'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
//we are using system variables to link the url path to our file
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
//specifying the port and package we are using
const app = express()
const port = 3000
const activitiesFilePath = path.join(__dirname, 'Activities.json');
//using helmet
app.use(helmet())
app.use(express.json());
//reading activities from the file and also checking its synced properly 
function readActivities() {
  if (!fs.existsSync(activitiesFilePath)) {
    return []; // Returns empty array if file does not exist
  }
  const data = fs.readFileSync(activitiesFilePath , 'utf-8');
  return JSON.parse(data);
}
//making a function to write where the activities will go and converting it properly
function writeActivities(activities) {
  fs.writeFileSync(activitiesFilePath, JSON.stringify(activities, 'null', 2), 'utf-8');//null is just a placeholder and 2 is just indenting 
}
//testing get request 
app.get('/',(req, res)=> {
    res.send('Hello buddy')
})
//get request with use of an id
app.get('/activities/:id',(req, res) => {
    const activityid = req.params.id
    console.log(`Requested activity ID: ${activityid}`)

    const activities = readActivities()
    const activity = activities.find(activity => activity.id === activityid);


    if (activity){
      res.json(activity)

    }else{
      res.status(404).send('Activity not found')
    }
  });
  //post activity using the specified id,duration,date,type using an object
  app.post('/activities', (req, res) => {
    const newActivity = req.body;

    // Ensure the request body has the necessary fields
    if (!newActivity.duration || !newActivity.type || !newActivity.date) {
        return res.status(400).send('Missing required fields');
    }

    // Generate a unique ID and timestamp
    const activityId = uuidv4();
    const activitySubmitted = Date.now();

    // Create the new activity object
    const activityToAdd = {
        id: activityId,
        duration: newActivity.duration,
        type: newActivity.type,
        date: newActivity.date,
        activity_submitted: activitySubmitted
    };

    // Read current activities, add the new one, and save back to file
    const activities = readActivities();
    activities.push(activityToAdd);
    writeActivities(activities);

    // Send a success response
    res.status(200).json(activityToAdd);
});

//listening to the port
app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})