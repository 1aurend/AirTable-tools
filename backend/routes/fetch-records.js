import express from 'express';
import Airtable from 'airtable';

const router = express.Router();
require('dotenv').config();

var masterBase = new Airtable({apiKey: process.env.AIR_TABLE_KEY}).base(process.env.LL_MASTER_BASE_ID);
var activitiesBase = new Airtable({apiKey: process.env.AIR_TABLE_KEY}).base(process.env.LL_ACTIVITES_BASE_ID);



router.get('/masterbase', (req, res) => {
  var masterList = { records: [] };

    masterBase('Projects').select({
      maxRecords: 300,
      view: "MASTER"
  }).eachPage(function page(records, fetchNextPage) {

      records.forEach(function(record) {
          console.log('Retrieved', record.get('Course ID'));
          console.log(JSON.stringify(record, null, 3));
          masterList.records.push(record.fields);
      });

      fetchNextPage();

  }, function done(err) {
      if (err) { console.error(err); return; }
      return res.json({ success: true, data: masterList, error: 'failed to fetch' });
  });


})

router.get('/activitiesbase', (req, res) => {
  var activitiesList = { records: [] };

      activitiesBase('Projects').select({
        maxRecords: 300,
        view: "MASTER"
    }).eachPage(function page(records, fetchNextPage) {

        records.forEach(function(record) {
            console.log('Retrieved', record.get('Course ID'));
            // console.log(`this is a project record: ${JSON.stringify(record._rawJson, null, 4)}`);
            activitiesList.records.push(record.fields);
        });

        fetchNextPage();

    }, function done(err) {
        if (err) { console.error(err); return; }
        return res.json({ success: true, data: activitiesList, error: 'failed to fetch' });
    });


})

export default router;
