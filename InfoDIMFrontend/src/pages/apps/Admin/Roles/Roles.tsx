import React, { useState, useEffect } from "react";
import {
  Modal,
  Row,
  Col,
  Card,
  Button,
  Form,
  FloatingLabel,
} from "react-bootstrap";
import Table from "../../../../components/Table";
import {
  fetchRoles,
  updateRole,
  createRole,
  deleteRole,
} from "./RolesAPI";
import { Role } from "./RolesTypes";
import { toast } from "react-toastify";
import FeatherIcon from "feather-icons-react";

function AdminRoleApp() {
  const [showModal, setShowModal] = useState(false);

  const [roles, setRoles] = useState<Role[]>([]);

  const [editForm, setEditForm] = useState<Role | null>(null);

  useEffect(() => {
    const fetchRolesData = async () => {
      try {
        const rolesData = await fetchRoles();
        setRoles(rolesData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRolesData();
  }, []);

  const roleColumns = [
    {
      Header: "Nom",
      accessor: "nom",
      sort: true,
    },
    {
      Header: "Date de création",
      accessor: "createdAt",
      sort: true,
      Cell: ({ value }: { value: any }) => (
        <div>{new Date(value).toLocaleString()}</div>
      ),
    },
    {
      Header: "Modifier",
      accessor: "modifier",
      Cell: ({ row }: { row: { original: Role } }) => (
        <FeatherIcon
          icon="edit"
          className="icon-dual"
          onClick={() => openEditForm(row.original)}
        />
      ),
    },
  ];

  const openEditForm = (role: Role) => {
    setEditForm(role);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (editForm && editForm._id) {
      try {
        await deleteRole(editForm._id.toString());
        toast.success("Rôle supprimé avec succès");
        setEditForm(null);
        setShowModal(false);
        setRoles((prevRoles) =>
          prevRoles.filter((role) => role._id !== editForm._id)
        );
      } catch (error) {
        toast.error(`Erreur lors de la suppression du rôle: ${error}`);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (editForm) {
        const nom = form.elements.namedItem("roleName") as HTMLInputElement;
        const id = editForm._id;

        if (nom && id) {
          const updatedRole = {
            ...editForm,
            nom: nom.value,
            _id: id,
          };
          try {
            await updateRole(updatedRole);
            const updatedRoles = await fetchRoles();
            setRoles(updatedRoles);
          } catch (error) {
            console.error(error);
          }
          setEditForm(null);
          setShowModal(false);
        }
      }
    }
  };

  return (
    <>
      <Row>
        <Col>
          <div className="page-title-box">
            <h4 className="page-title">Panneau d'Administration des Rôles</h4>
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={12} xl={8}>
          <Card>
            <Card.Body>
              <h4>Modification / Suppression de Rôles</h4>
              <p>
                Permet de supprimer ou de modifier des rôles dans la base de données.
              </p>
              <Row>
                <Col>
                  {editForm && (
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>Modifier le rôle</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form
                          noValidate
                          onSubmit={handleSubmit}
                        >
                          <Form.Control
                            required
                            name="roleName"
                            type="text"
                            value={editForm?.nom || ''}
                            className="mb-3"
                          />
                          <Button type="submit" style={{ marginRight: "1rem" }}>
                            Mettre à jour
                          </Button>
                          <Button
                            variant="danger"
                            onClick={handleDelete}
                            style={{ marginRight: "1rem" }}
                          >
                            Supprimer Définitivement
                          </Button>
                        </Form>
                      </Modal.Body>
                    </Modal>
                  )}
                  <Table
                    columns={roleColumns}
                    data={roles}
                    pageSize={5}
                    isSortable={true}
                    pagination={true}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col md={12} xl={4}>
          <Card>
            <Card.Body>
              <h4>Ajout de Rôles</h4>
              <p>Permet d'ajouter des rôles dans la base de données</p>
              <Form
                noValidate
                onSubmit={async (event) => {
                  event.preventDefault();
                  const target = event.target as HTMLFormElement;
                  const nameElement = target.elements.namedItem(
                    "roleName"
                  ) as HTMLInputElement;

                  if (nameElement && nameElement.value) {
                    const nom = nameElement.value;

                    createRole(nom)
                      .then(async (newRole) => {
                        const updatedRoles = await fetchRoles();
                        setRoles(updatedRoles);
                        target.reset();
                      })
                      .catch((error) =>
                        console.error(
                          "Erreur lors de l'ajout du rôle",
                          error
                        )
                      );
                  }
                }}
              >
                <FloatingLabel
                  controlId="floatingRoleName"
                  label="Nom"
                  className="mb-3"
                ></FloatingLabel>
                <Form.Control required name="roleName" type="text" className="mb-3" />
                <Button type="submit">Ajouter un rôle</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AdminRoleApp;
