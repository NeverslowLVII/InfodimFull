import React, { useState, useEffect } from "react";
import {
  Modal,
  FloatingLabel,
  Row,
  Col,
  Card,
  Button,
  Form,
  Badge,
} from "react-bootstrap";
import Table from "../../../../components/Table";
import Select from "react-select";
import {
  fetchUsers,
  updateUser,
  addUser,
  fetchRoles,
  deleteUser,
} from "./UsersAPI";
import { User } from "./UsersTypes";
import FormInput from "../../../../components/FormInput";
import { generateTempPassword } from "../../../../utils/password";
import mongoose from "mongoose";
import { toast } from "react-toastify";
import FeatherIcon from "feather-icons-react";

type OptionType = { value: string; label: string };

function AdminUserApp() {
  const [showModal, setShowModal] = useState(false);

  const [selectedRolesAdd, setSelectedRolesAdd] = useState<
    { value: string; label: string }[]
  >([]);
  const [selectedRolesEdit, setSelectedRolesEdit] = useState<
    { value: string; label: string }[]
  >([]);

  const [roleOptions, setRoleOptions] = useState<any[]>([]);

  const [validatedEditForm, setValidatedEditForm] = useState<boolean>(false);

  const [validatedAddForm, setValidatedAddForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsersData();
  }, []);

  useEffect(() => {
    const fetchRolesData = async () => {
      try {
        const rolesData = await fetchRoles();
        const formattedRoles = rolesData.map((role) => ({
          value: role._id,
          label: role.nom,
        }));
        setRoleOptions(formattedRoles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRolesData();
  }, []);

  useEffect(() => {}, [selectedRolesEdit]);

  const userColumns = [
    {
      Header: "Prénom",
      accessor: "firstName",
      sort: true,
    },
    {
      Header: "Nom",
      accessor: "lastName",
      sort: true,
    },
    {
      Header: "Matricule",
      accessor: "matricule",
      sort: true,
    },
    {
      Header: "Rôles",
      accessor: "roles",
      Cell: ({ value }: { value: any }) =>
        value.map((role: { nom: string }) => (
          <Badge bg="primary" className="me-1">
            {role.nom}
          </Badge>
        )),
      sort: true,
    },
    {
      Header: "Modifier",
      accessor: "modifier",
      Cell: ({ row }: { row: { original: User } }) => (
        <FeatherIcon
          icon="edit"
          className="icon-dual"
          onClick={() => openEditForm(row.original)}
        />
      ),
    },
  ];

  const [editForm, setEditForm] = useState<User | null>(null);

  const openEditForm = (user: User) => {
    setEditForm(user);
    setShowModal(true);
    const userRoles = user.roles
      .map((role) => {
        const roleOption = roleOptions.find(
          (option) => option.value === role._id.toString()
        );
        return roleOption || null;
      })
      .filter((role) => role !== null) as { value: string; label: string }[];

    setSelectedRolesEdit(userRoles);
  };

  const handleDelete = async () => {
    if (editForm) {
      try {
        await deleteUser(editForm._id.toString());
        toast.success("Utilisateur supprimé avec succès");
        setEditForm(null);
        setShowModal(false);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== editForm._id)
        );
      } catch (error) {
        toast.error(`Erreur lors de la suppression de l'utilisateur: ${error}`);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (editForm && selectedRolesEdit.length > 0) {
        const firstName = form.elements.namedItem(
          "userFirstName"
        ) as HTMLInputElement;
        const lastName = form.elements.namedItem(
          "userLastName"
        ) as HTMLInputElement;
        const matricule = form.elements.namedItem(
          "userMatricule"
        ) as HTMLInputElement;

        if (
          firstName &&
          lastName &&
          matricule &&
          selectedRolesEdit.length > 0
        ) {
          const roles = selectedRolesEdit
            .map((role) => {
              if (/^[0-9a-fA-F]{24}$/.test(role.value)) {
                return new mongoose.Types.ObjectId(role.value);
              } else {
                console.error(`Invalid ObjectId: ${role.value}`);
                return null;
              }
            })
            .filter((role) => role !== null) as mongoose.Types.ObjectId[];
          const updatedUser = {
            ...editForm,
            firstName: firstName.value,
            lastName: lastName.value,
            matricule: matricule.value,
            roles: roles,
          };
          try {
            await updateUser(updatedUser);
            const updatedUsers = await fetchUsers();
            setUsers(updatedUsers);
          } catch (error) {
            console.error(error);
          }
          setEditForm(null);
          setShowModal(false);
        }
      } else {
        console.log(
          "Veuillez remplir tous les champs et sélectionner au moins un rôle."
        );
      }
    }
    setValidatedEditForm(true);
  };

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

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
      value: users.length,
    },
  ];

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
        <Col md={12} xl={8}>
          <Card>
            <Card.Body>
              <h4>Modification / Suppression d'Utilisateurs</h4>
              <p>
                Permet de supprimer ou de modifier des utilisateurs dans la abse
                de données.
              </p>
              <Row>
                <Col>
                  {editForm && (
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>Modifier l'utilisateur</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form
                          noValidate
                          validated={validatedEditForm}
                          onSubmit={handleSubmit}
                        >
                          <FloatingLabel
                            controlId="floatingUserFirstName"
                            label="Prénom de l'utilisateur"
                            className="mb-3"
                          >
                            <Form.Control
                              required
                              name="userFirstName"
                              type="text"
                              defaultValue={editForm?.firstName}
                            />
                          </FloatingLabel>
                          <FloatingLabel
                            controlId="floatingUserLastName"
                            label="Nom de l'utilisateur"
                            className="mb-3"
                          >
                            <Form.Control
                              required
                              name="userLastName"
                              type="text"
                              defaultValue={editForm?.lastName}
                            />
                          </FloatingLabel>
                          <FloatingLabel
                            controlId="floatingUserMatricule"
                            label="Matricule de l'utilisateur"
                            className="mb-3"
                          >
                            <Form.Control
                              required
                              name="userMatricule"
                              type="text"
                              defaultValue={editForm?.matricule}
                            />
                          </FloatingLabel>
                          <FloatingLabel
                            controlId="floatingUserNewPassword"
                            label=""
                            className="mb-3"
                          >
                            <Button
                              onClick={() => {
                                const tempPassword = generateTempPassword();
                                console.log(tempPassword);
                              }}
                            >
                              Réinitialiser le mot de passe
                            </Button>
                          </FloatingLabel>
                          <FloatingLabel
                            controlId="floatingUserRoles"
                            label=""
                            className="mb-3"
                          >
                            <Select
                              isMulti={true}
                              name="userRoles"
                              options={roleOptions}
                              value={selectedRolesEdit}
                              placeholder="Rôles de l'utilisateur"
                              className="basic-multi-select"
                              classNamePrefix="select"
                              onChange={(
                                newValue: ReadonlyArray<OptionType>,
                                actionMeta: any
                              ) => {
                                if (newValue) {
                                  setSelectedRolesEdit([...newValue]);
                                } else {
                                  setSelectedRolesEdit([]);
                                }
                              }}
                            />
                          </FloatingLabel>
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
                    columns={userColumns}
                    data={users}
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
        <Col md={12} xl={4}>
          <Card>
            <Card.Body>
              <h4>Ajout d'Utilisateurs</h4>
              <p>Permet d'ajouter des utilisateurs dans la base de données</p>
              <Form
                noValidate
                validated={validatedAddForm}
                onSubmit={async (event) => {
                  event.preventDefault();
                  const target = event.target as HTMLFormElement;
                  const firstNameElement = target.elements.namedItem(
                    "userFirstName"
                  ) as HTMLInputElement;
                  const lastNameElement = target.elements.namedItem(
                    "userLastName"
                  ) as HTMLInputElement;
                  const matriculeElement = target.elements.namedItem(
                    "userMatricule"
                  ) as HTMLInputElement;
                  const passwordElement = target.elements.namedItem(
                    "userPassword"
                  ) as HTMLInputElement;

                  console.log(
                    "Étape 1: Récupération des valeurs du formulaire",
                    {
                      firstName: firstNameElement.value,
                      lastName: lastNameElement.value,
                      matricule: matriculeElement.value,
                      password: passwordElement.value,
                      roles: selectedRolesAdd,
                    }
                  );

                  if (
                    firstNameElement &&
                    lastNameElement &&
                    matriculeElement &&
                    matriculeElement.value &&
                    passwordElement &&
                    selectedRolesAdd.length > 0
                  ) {
                    const firstName = firstNameElement.value;
                    const lastName = lastNameElement.value;
                    const matricule = matriculeElement.value;
                    const password = passwordElement.value;
                    const roles = selectedRolesAdd.map(
                      (role) => new mongoose.Types.ObjectId(role.value)
                    );

                    console.log(
                      "Étape 2: Préparation des données pour l'ajout de l'utilisateur",
                      {
                        firstName,
                        lastName,
                        matricule,
                        password,
                        roles,
                      }
                    );

                    addUser(firstName, lastName, matricule, password, roles)
                      .then(async (newUser) => {
                        console.log(
                          "Étape 3: Utilisateur ajouté avec succès",
                          newUser
                        );
                        const updatedUsers = await fetchUsers();
                        setUsers(updatedUsers);
                        target.reset();
                        setSelectedRolesAdd([]);
                      })
                      .catch((error) =>
                        console.error(
                          "Erreur lors de l'ajout de l'utilisateur",
                          error
                        )
                      );
                  } else {
                    console.log(
                      "Veuillez remplir tous les champs, fournir un matricule et sélectionner au moins un rôle."
                    );
                  }
                  setValidatedAddForm(true);
                }}
              >
                <FloatingLabel
                  controlId="floatingUserFirstName"
                  label="Prénom"
                  className="mb-3"
                >
                  <Form.Control required name="userFirstName" type="text" />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingUserLastName"
                  label="Nom"
                  className="mb-3"
                >
                  <Form.Control required name="userLastName" type="text" />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingUserMatricule"
                  label="Matricule"
                  className="mb-3"
                >
                  <Form.Control required name="userMatricule" type="text" />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingUserPassword"
                  label=""
                  className="mb-3"
                >
                  <FormInput
                    name="userPassword"
                    type="password"
                    placeholder="Mot de passe (faculatif)"
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingUserRoles"
                  label=""
                  className="mb-3"
                >
                  <Select
                    isMulti={true}
                    name="userRoles"
                    options={roleOptions}
                    placeholder="Rôles de l'utilisateur"
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={(
                      newValue: ReadonlyArray<OptionType>,
                      actionMeta: any
                    ) => {
                      if (newValue) {
                        setSelectedRolesAdd([...newValue]);
                      } else {
                        setSelectedRolesAdd([]);
                      }
                    }}
                  />
                </FloatingLabel>
                <Button type="submit">Ajouter un utilisateur</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AdminUserApp;
