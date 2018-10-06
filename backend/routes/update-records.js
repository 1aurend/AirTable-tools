import express from 'express';
import Airtable from 'airtable';

const router = express.Router();
require('dotenv').config();

var masterBase = new Airtable({apiKey: process.env.AIR_TABLE_KEY}).base(process.env.LL_MASTER_BASE_ID);
var activitiesBase = new Airtable({apiKey: process.env.AIR_TABLE_KEY}).base(process.env.LL_ACTIVITES_BASE_ID);

router.post('/', (req, res, next) => {
  console.log('Here are the updates to send to AirTable:\n');
  console.log(JSON.stringify(req.body, null, 3))

  const updates = req.body.updates;
  console.log(JSON.stringify(updates, null, 3));

  const masterUpdates = [];
  updates.map((update) => {if (update.status === 'missing from LL Master Base') {
    masterUpdates.push(update)}
    return null;})

  const activitiesUpdates = [];
  updates.map((update) => {if (update.status === 'missing from Activities Base') {
    activitiesUpdates.push(update)}
    return null;})

  for (var i = 0; i < activitiesUpdates.length; i++) {

      activitiesBase('Projects').create({
        "Course ID": activitiesUpdates[i].name,
        "Project": activitiesUpdates[i].project || null,
        "Implementation": activitiesUpdates[i].implementation || null,
        "Description": activitiesUpdates[i].description || null,
        "Folder": activitiesUpdates[i].folder || null,
        "Faculty or PI": activitiesUpdates[i].faculty || null,
        "Class schedule": activitiesUpdates[i].description || null,
        "Level of Involvement": activitiesUpdates[i].involvement || null,
        "Bok Staff": null,
        "Impact": activitiesUpdates[i].impact || null,
        "LLUFs": activitiesUpdates[i].llufs || null,
        "Grads": activitiesUpdates[i].grads || null,
    }, {typecast: true}, function(err, record) {
        if (err) { console.error(err); return; }
        console.log(JSON.stringify(record, null, 3));
    })

  }

  for (var i = 0; i < masterUpdates.length; i++) {

      masterBase('Projects').create({
        "Course ID": masterUpdates[i].name,
        "Project": masterUpdates[i].project || null,
        "Implementation": masterUpdates[i].implementation || null,
        "Description": masterUpdates[i].description || null,
        "Folder": masterUpdates[i].folder || null,
        "Faculty or PI": masterUpdates[i].faculty || null,
        "Class schedule": masterUpdates[i].schedule || null,
        "Level of Involvement": masterUpdates[i].involvement || null,
        "Bok Staff": masterUpdates[i].staff || null,
        "Impact": masterUpdates[i].impact || null,
        "LLUFs": masterUpdates[i].llufs || null,
        "Grads": masterUpdates[i].grads || null,
    }, {typecast: true}, function(err, record) {
        if (err) { console.error(err); return; }
        console.log(JSON.stringify(record, null, 3));
    })

  }

  return res.json({ success: true, error: 'update failed' }); //work on displaying errors to user

});

export default router;
