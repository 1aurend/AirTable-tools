import React, {Component} from 'react';
import 'whatwg-fetch';
import ListItems from './list-items';

class RecordList extends Component {
  constructor() {
      super();
      this.state = {
        records: null,
        toCompare: null,
        projectsWithStatus: [],
        error: null,
        ready: false,
        submitted: false,
      };
    }

  componentDidMount() {
      this.setState({ ready: false });
      this.loadRecordsFromServer()
    }


    loadRecordsFromServer = () => {
      fetch('http://localhost:3001/masterbase')
        .then(res => res.json())
        .then(res => {
          if (!res.success) this.setState({ error: res.error })
          else this.setState({ records: res.data.records })
          console.log(`here is records: ${this.state.records}`);
          console.log(`number of records = ${this.state.records.length}`);
          // console.log(`here is error: ${this.state.error}`);
          if (this.state.toCompare) {
            this.compareRecords();
          }
        })

        fetch('http://localhost:3001/activitiesbase')
          .then(res => res.json())
          .then(res => {
            if (!res.success) this.setState({ error: res.error })
            else this.setState({ toCompare: res.data.records })
            console.log(`here is toCompare: ${this.state.toCompare}`);
            console.log(`number of records = ${this.state.toCompare.length}`);
            // console.log(`here is error: ${this.state.error}`);
            if (this.state.records) {
              this.compareRecords();
            }

          })
    }

    compareRecords = () => {
      var projectsWithStatus = [];

      for (var i = 0; i < this.state.records.length; i++) {
        var project = {
              name: this.state.records[i]['Course ID'],
              status: '',
              index: i+1,
              update: false,
              project: this.state.records[i]['Project'],
              implementation: this.state.records[i]['Implementation'],
              description: this.state.records[i]['Description'],
              folder: this.state.records[i]['Folder'],
              faculty: this.state.records[i]['Faculty or PI'],
              schedule: this.state.records[i]['Class Schedule'],
              involvement: this.state.records[i]['Level of Involvement'],
              staff: this.state.records[i]['Bok Staff'],
              impact: this.state.records[i]['Impact'],
              llufs: this.state.records[i]['LLUFs'],
              grads: this.state.records[i]['Grads'],
            }

        if (!project.name) {
          project.name = 'blank';
        }

        for (var j = 0; j < this.state.toCompare.length; j++) {
          if (project.name === this.state.toCompare[j]['Course ID']) {
            project.status = 'match';
            break;
          }
          else if (j+1 === this.state.toCompare.length) {
            project.status = 'missing from Activities Base';
            break;
          }
        }

        projectsWithStatus.push(project);
      }

      for (var i = 0; i < this.state.toCompare.length; i++) {
        var index = projectsWithStatus.length+1;

        for (var j = 0; j < projectsWithStatus.length; j++) {
          if (this.state.toCompare[i]['Course ID'] === projectsWithStatus[j].name) {
            break;
          }
          else if (j+1 === projectsWithStatus.length) {
            var project = {
                  name: this.state.toCompare[i]['Course ID'],
                  status: 'missing from LL Master Base',
                  index: index,
                  update: false,
                  project: this.state.toCompare[i]['Project'],
                  implementation: this.state.toCompare[i]['Implementation'],
                  description: this.state.toCompare[i]['Description'],
                  folder: this.state.toCompare[i]['Folder'],
                  faculty: this.state.toCompare[i]['Faculty or PI'],
                  schedule: this.state.toCompare[i]['Class Schedule'],
                  involvement: this.state.toCompare[i]['Level of Involvement'],
                  staff: this.state.toCompare[i]['Bok Staff'],
                  impact: this.state.toCompare[i]['Impact'],
                  llufs: this.state.toCompare[i]['LLUFs'],
                  grads: this.state.toCompare[i]['Grads'],
                }

            if (!project.name) {
              project.name = 'blank';
            }

            projectsWithStatus.push(project);
            index += 1;
            break;
          }
        }

      }
      console.log(projectsWithStatus)
      this.setState({projectsWithStatus: projectsWithStatus})
      this.setState({ready: true})
    }


  onCheck = (event) => {
    const checked = event.target.checked;
    const recordToUpdate = event.target.name;

    var updatedProjectList = this.state.projectsWithStatus.slice();
    var indexToUpdate;

    for (var i = 0; i < updatedProjectList.length; i++) {
      if (recordToUpdate === updatedProjectList[i].name) {
        indexToUpdate = i;
      }
    }

    if (checked) {
      updatedProjectList[indexToUpdate].update = true;
      this.setState({projectsWithStatus: updatedProjectList})
    }
    if (!checked) {
      updatedProjectList[indexToUpdate].update = false;
      this.setState({projectsWithStatus: updatedProjectList})
    }

    console.log(this.state.projectsWithStatus);

  }

  onSubmit = (event) => {
    event.preventDefault();

    const { projectsWithStatus } = this.state;
    const updates = [];
    projectsWithStatus.map((project) => {if (project.update === true) {
      updates.push(project)}
      return null;})

    fetch('http://localhost:3001/update-airtable', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({updates}),
       }).then(res => res.json()).then((res) => {
         console.log(res);
         if (!res.success) {this.setState({ error: res.error });
          console.log(this.state.error)
          }
         else {
           console.log('Success! Updates Sent')
           this.setState({submitted: true})
         }
       });
  }


  render() {
    const { ready, submitted, projectsWithStatus } = this.state;

    if (!ready && !submitted) {
      return <h4>Loading ...</h4>;
    }

    const updates = [];
    projectsWithStatus.map((project) => {if (project.update === true) {
      updates.push(project)}
      return null;})
    const listOfUpdates = updates.map(update => {return <li key={update.index}>{update.name}</li>})

    if (submitted) {
      return (
        <div>
        <h5>Thanks for the updates! These changes will be sent to AirTable:</h5>
          <ul>
            {listOfUpdates}
          </ul>
        </div>
      );
    }

    return (
      <div className="container">
      <h5> Status of Project Tables:</h5>
        <table className="u-full-width">
          <thead>
              <tr>
                <th>Count</th>
                <th>Name</th>
                <th>Status</th>
                <th>Update?</th>
              </tr>
          </thead>
              <ListItems records={this.state.projectsWithStatus} onCheck={this.onCheck} />
        </table>
        <form onSubmit={this.onSubmit}>
          <button className="button-primary u-pull-right" value="Submit" type="submit">Submit Updates</button>
        </form>
      </div>
    );
  }

}




export default RecordList;
