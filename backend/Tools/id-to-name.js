
function idToName (people, records, projects) {

  for (var i = 0; i < records.length; i++) {

    if (records[i].fields['Made by']) {
      var requestors = [];

      for (var m = 0; m < records[i].fields['Made by'].length; m++) {
        for (var j = 0; j < people.length; j++) {
          if (people[j].id == records[i].fields['Made by'][m]) {
            requestors.push(people[j].fields['Grad name']);
          }
        }
      }
      records[i].fields['Made by'] = requestors;
    }

    if (records[i].fields['Tested by']) {
      var testers = [];

      for (var k = 0; k < records[i].fields['Tested by'].length; k++) {
        for (var l = 0; l < people.length; l++) {
          if (people[l].id == records[i].fields['Tested by'][k]) {
            testers.push(people[l].fields['Grad name']);
          }
        }
      }
      records[i].fields['Tested by'] = testers;
    }

    if (records[i].fields['Related Project']) {
      var relateds = [];

      for (var n = 0; n < records[i].fields['Related Project'].length; n++) {
        for (var o = 0; o < projects.length; o++) {
          if (projects[o].id == records[i].fields['Related Project'][n]) {
            relateds.push(projects[o].fields['Course ID']);
            console.log(relateds);
          }
        }
      }
      records[i].fields['Related Project'] = relateds;
    }

  }
  //
  // console.log('here is people now: ' + JSON.stringify(people.records[1], null, 3));
  // console.log('here is records now: ' + JSON.stringify(records.records[1], null, 3));
  return records;
}


export default idToName;
