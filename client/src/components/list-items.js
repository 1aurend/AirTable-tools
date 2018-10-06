import React from 'react';
import Record from './record';


const ListItems = ({records, onCheck}) => {

var matchCount = 0;
records.map((record) => {if (record.status === 'match') {
  matchCount++;}
  return null;
})

const listOfRecords = records.map((record) => {
    return (
      <Record
        key={record.index}
        index={record.index}
        id={record.name}
        status={record.status}
        onCheck={onCheck} />
    );
  })

  return (
    <tbody>
      <tr>
        <td>{matchCount}</td>
        <td>Various Projects</td>
        <td>match</td>
        <td>x</td>
      </tr>
      {listOfRecords}
    </tbody>
  );

}

export default ListItems;
