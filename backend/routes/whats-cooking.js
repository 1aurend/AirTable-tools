import express from 'express';
import Airtable from 'airtable';
import fs from 'fs';
import idToName from '../Tools/id-to-name';

const router = express.Router();
require('dotenv').config();

var masterBase = new Airtable({apiKey: process.env.AIR_TABLE_KEY}).base(process.env.LL_MASTER_BASE_ID);
var activitiesBase = new Airtable({apiKey: process.env.AIR_TABLE_KEY}).base(process.env.LL_ACTIVITES_BASE_ID);


router.get('/', (req, res) => {

async function fetchActivitiesWithPeople(callback) {

  var testsList = [];
  var peopleList = [];
  var projectsList = []
  console.log(`Fetching Activites, People, and Projects -----------------------`);


    var activitiesFetch = activitiesBase('Activity Requests').select({
        // maxRecords: 100,
        view: "All activities"
      }).all()
      .then(records => { records.forEach((record) => {
            console.log('Retrieved', record.get('Keyword title'));
            // console.log(JSON.stringify(record, null, 3));
            testsList.push(record._rawJson);
        })}
      )
      .then(err => {
        if (err) { console.error(err); return; }
        return 'done';
        })


    var peopleFetch = activitiesBase('People').select({
        // maxRecords: 300,
        view: "Master"
      }).all()
      .then(records => { records.forEach((record) => {
            console.log('Retrieved', record.get('Grad name'));
            // console.log(JSON.stringify(record, null, 3));
            peopleList.push(record._rawJson)
        })}
      )
      .then(err => {
        if (err) { console.error(err); return; }
        return 'done';
        })

    var projectsFetch = activitiesBase('Projects').select({
        // maxRecords: 300,
        view: "MASTER"
      }).all()
      .then(records => { records.forEach((record) => {
            console.log('Retrieved', record.get('Course ID'));
            // console.log(JSON.stringify(record, null, 3));
            projectsList.push(record._rawJson)
        })}
      )
      .then(err => {
        if (err) { console.error(err); return; }
        return 'done';
        })

    console.log(await activitiesFetch);
    console.log(await peopleFetch);
    console.log(await projectsFetch);

    var theData = callback(peopleList, testsList, projectsList);
    var now = new Date();
    fs.writeFileSync(`/Users/laurendavidson/desktop/JSON/${now}_activities.json`, JSON.stringify(theData, null, 3));

    return res.json({data: theData});


  }

fetchActivitiesWithPeople(idToName);

})




export default router;
