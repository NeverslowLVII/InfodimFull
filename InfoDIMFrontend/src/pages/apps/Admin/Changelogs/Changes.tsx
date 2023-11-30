import React from "react";
import { Table } from "react-bootstrap";

const Changes = ({ change }: { change: any[] }) => (
  <Table>
    <thead style={{backgroundColor: '#f8f9fa'}}>
      <tr>
        <th>Champ</th>
        <th>Ancienne valeur</th>
        <th>Nouvelle valeur</th>
      </tr>
    </thead>
    <tbody>
      {change.map((change, index) => (
        <tr style={{backgroundColor: index % 2 === 0 ? '#e9ecef' : '#fff'}}>
          <td>{change.field}</td>
          <td>{change.oldValue}</td>
          <td>{change.newValue}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default Changes;