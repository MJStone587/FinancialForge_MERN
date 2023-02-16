import React from 'react';
import { Link } from 'react-router-dom';

function Datatable(props) {
  return (
    <tr key={props.dataKey}>
      <td>
        <Link id="dataName" to="/:id">
          <h3>{props.name}</h3>
        </Link>
      </td>
      <td id="dataFrom">{props.from}</td>
      <td id="dataAmt">${props.amount}</td>
    </tr>
  );
}

export default Datatable;
