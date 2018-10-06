import React from 'react';


const Record = ({index, id, status, onCheck}) => {

  if (status === 'missing from LL Master Base') {
    const style = {color: '#FF33E6'}

    return (
      <tr style={style}>
        <td>{index}</td>
        <td>{id}</td>
        <td>{status}</td>
        <td>
          <input type="checkbox" onChange={onCheck} name={id}/>
        </td>
      </tr>
    );
  }

  else if (status === 'missing from Activities Base') {
    const style = {color: '#8F42DF'}

    return (
      <tr style={style}>
        <td>{index}</td>
        <td>{id}</td>
        <td>{status}</td>
        <td>
          <input type="checkbox" onChange={onCheck} name={id}/>
        </td>
      </tr>
    );
  }

  else if (status !== 'match' && status !== 'missing from Activities Base' && status !== 'missing from LL Master Base') {
    const style = {color: 'black'}

    return (
      <tr style={style}>
        <td>{index}</td>
        <td>{id}</td>
        <td>{status}</td>
        <td>x</td>
      </tr>
    );
  }

  else {
    return null;
  }

}

export default Record;
