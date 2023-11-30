import React, { useEffect, useState } from "react";
import { Row, Col, Card, Modal, Button } from "react-bootstrap";
import Table from "../../../../components/Table";
import Changes from "./Changes";

const ChangeLogModal = ({ change }: { change: any[] }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Voir les détails
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Détails du changement</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Changes change={change} />
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

const AdminChangelogsApp = () => {
  const [changelogs, setChangelogs] = useState<any[]>([]);
  const sizePerPageList = [
    {
      text: "5",
      value: 5,
    },
    {
      text: "10",
      value: 10,
    },
    {
      text: "25",
      value: 25,
    },
    {
      text: "Tous",
      value: changelogs.length,
    },
  ];

  const changelogColumns = [
    {
      Header: "Action",
      accessor: "action",
      sort: true,
    },
    {
      Header: "ID du document",
      accessor: "documentId",
      sort: true,
    },
    {
      Header: "Nom de la collection",
      accessor: "collectionName",
      sort: true,
    },
    {
      Header: "Changements",
      accessor: "changes",
      sort: true,
      Cell: ({ value }: { value: any }) => <ChangeLogModal change={value} />,
    },
    {
      Header: "Horodatage",
      accessor: "timestamp",
      sort: true,
      Cell: ({ value }: { value: any }) => (
        <div>{new Date(value).toLocaleString()}</div>
      ),
    },
    {
      Header: "Utilisateur",
      accessor: "user",
      sort: true,
    },
  ];

  useEffect(() => {
    const fetchChangelogs = async () => {
      try {
        const response = await fetch("http://localhost:3333/changelogs");
        const data = await response.json();
        if (Array.isArray(data)) {
          setChangelogs(data);
          return data;
        } else {
          console.error(
            "Erreur lors de la récupération des données:",
            data.message
          );
          return [];
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        return [];
      }
    };

    fetchChangelogs();
  }, []);

  return (
    <>
      <Row>
        <Col>
          <div className="page-title-box">
            <h4 className="page-title">Panneau d'Administration</h4>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h4>journal des modifications</h4>
              <p>Permet d'afficher les journaux de modifications</p>
              <Row>
                <Col>
                  <Table
                    columns={changelogColumns}
                    data={changelogs}
                    pageSize={5}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminChangelogsApp;
