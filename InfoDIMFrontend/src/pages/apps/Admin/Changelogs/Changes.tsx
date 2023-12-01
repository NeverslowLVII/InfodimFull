import React from "react";
import { Table } from "react-bootstrap";

const Changes = ({ change, documentId, collectionName }: { change: any[], documentId: string, collectionName: string }) => (
  <div>
    <Table>
      <tbody>
        <tr>
          <td>ID du document</td>
          <td>{documentId}</td>
        </tr>
        <tr>
          <td>Nom de la collection</td>
          <td>{collectionName}</td>
        </tr>
      </tbody>
    </Table>
    <Table>
    
      <thead style={{backgroundColor: '#f8f9fa'}}> 
        <tr>
          <th></th>
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
  </div>
);

export default Changes;
