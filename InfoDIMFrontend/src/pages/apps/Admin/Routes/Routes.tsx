import React, { useState, useEffect } from "react";
import {
  Modal,
  FloatingLabel,
  InputGroup,
  Row,
  Col,
  Card,
  Button,
  FormCheck,
  Form,
} from "react-bootstrap";
import Table from "../../../../components/Table";
import { fetchRoutes, addRoute, updateRoute, deleteRoute } from "./RoutesAPI";
import { Route } from "./RoutesInterface";
import FeatherIcon from "feather-icons-react";
import { toast } from "react-toastify";

function AdminRouteApp() {
  const [showModal, setShowModal] = useState(false);
  const [editForm, setEditForm] = useState<Route | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [status, setStatus] = useState({
    activeRoutes: true,
    deletedRoutes: false,
  });
  const [defaultPosition, setDefaultPosition] = useState(1);
  const [routePosition, setRoutePosition] = useState(defaultPosition);
  const [pageSize, setPageSize] = useState(5);
  const [showAllRoutes, setShowAllRoutes] = useState(false);

  const columns = [
    { Header: "Nom", accessor: "name", sort: true, width: "35%" },
    { Header: "URL", accessor: "url", sort: false, width: "35%" },
    {
      Header: "Position",
      accessor: "position",
      sort: true,
      width: "10%",
      textAlign: "center",
    },
    {
      Header: "Visible",
      accessor: "visible",
      Cell: ({ value }: { value: boolean }) => (value ? "Oui" : "Non"),
      sort: true,
      width: "10%",
      textAlign: "center",
    },
    {
      Header: "Modifier",
      accessor: "modifier",
      Cell: ({ row }: { row: { original: Route } }) => (
        <FeatherIcon
          icon="edit"
          className="icon-dual"
          onClick={() => openEditForm(row.original)}
        />
      ),
      width: "10%",
      textAlign: "center",
    },
  ];

  const openEditForm = (route: Route) => {
    setEditForm(route);
    setShowModal(true);
  };

  const handleDelete = async () => {
    if (editForm) {
      try {
        await deleteRoute(editForm._id);
        toast.success("Route supprimée avec succès");
        setEditForm(null);
        setShowModal(false);
        setRoutes((prevRoutes) =>
          prevRoutes.filter((route) => route._id !== editForm._id)
        );
      } catch (error) {
        toast.error(`Erreur lors de la suppression de la route: ${error}`);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editForm) {
      const form = event.target as HTMLFormElement;
      const name = form.elements.namedItem("routeName") as HTMLInputElement;
      const position = form.elements.namedItem(
        "routePosition"
      ) as HTMLInputElement;
      const url = form.elements.namedItem("routeUrl") as HTMLInputElement;

      if (name && position && url) {
        const updatedRoute = {
          ...editForm,
          name: name.value,
          position: Number(position.value),
          url: "/" + url.value,
        };

        if (isDuplicateRoute('position', Number(position.value), editForm._id)) {
          toast.error(
            "Une route avec la même position existe déjà."
          );
          return;
        }

        if (isDuplicateRoute('url', url.value, editForm._id)) {
          toast.error(
            "Une route avec la même URL existe déjà."
          );
          return;
        }

        if (isDuplicateRoute('name', name.value, editForm._id)) {
          toast.error(
            "Une route avec le même nom existe déjà."
          );
          return;
        }

        try {
          await updateRoute(updatedRoute, updatedRoute.position);
          toast.success("Onglet mis à jour avec succès");
          setEditForm(null);
          setShowModal(false);
          setRoutes((prevRoutes) => {
            const index = prevRoutes.findIndex(
              (route) => route._id === updatedRoute._id
            );
            if (index !== -1) {
              const newRoutes = [...prevRoutes];
              newRoutes[index] = updatedRoute;
              return newRoutes;
            }
            return prevRoutes;
          });
        } catch (error) {
          toast.error(`Erreur lors de la mise à jour de la route: ${error}`);
        }
      }
    }
  };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editForm) {
      const form = event.target as HTMLFormElement;
      const name = form.elements.namedItem("routeName") as HTMLInputElement;
      const position = form.elements.namedItem(
        "routePosition"
      ) as HTMLInputElement;
      const url = form.elements.namedItem("routeUrl") as HTMLInputElement;

      if (name && position && url) {
        const updatedRoute = {
          ...editForm,
          name: name.value,
          position: Number(position.value),
          url: "/" + url.value,
        };

        if (isDuplicateRoute('position', Number(position.value), editForm._id)) {
          toast.error(
            "Une route avec la même position existe déjà."
          );
          return;
        }

        if (isDuplicateRoute('url', url.value, editForm._id)) {
          toast.error(
            "Une route avec la même URL existe déjà."
          );
          return;
        }

        if (isDuplicateRoute('name', name.value, editForm._id)) {
          toast.error(
            "Une route avec le même nom existe déjà."
          );
          return;
        }
      }
    }
  };

  const isDuplicateRoute = (field: keyof Route, value: string | number, id?: string) => {
    return routes.some((route) => route[field] === value && (!id || route._id !== id));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRoutes();
        setRoutes(data);
      } catch (error) {
        toast.error(`Erreur lors de la récupération des routes: ${error}`);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setDefaultPosition(getFirstAvailablePosition(routes));
  }, [routes]);

  useEffect(() => {
    setRoutePosition(defaultPosition);
  }, [defaultPosition]);

  const sizePerPageList = [
    { text: "5", value: 5 },
    { text: "10", value: 10 },
    { text: "25", value: 25 },
    { text: "Tous", value: routes.length },
  ];

  function generateSlug(name: string) {
    return name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-");
  }

  function getFirstAvailablePosition(routes: Route[]): number {
    const positions = routes
      .map((route) => route.position)
      .sort((a, b) => Number(a) - Number(b));
    let position = 1;
    for (let i = 0; i < positions.length; i++) {
      if (positions[i] !== position) {
        break;
      }
      position++;
    }
    return position;
  }

  const updateRoutes = (newRoute: Route) => {
    setRoutes((prevRoutes) => [...prevRoutes, newRoute]);
  };

  return (
    <>
      <Row>
        <Col>
          <div className="page-title-box">
            <div className="page-title-right">
              <form className="d-flex align-items-center mb-3">
                <Row></Row>
              </form>
            </div>
            <h4 className="page-title">Panneau d'Administration</h4>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={12} md={8}>
          <Card>
            <Card.Body>
              <Row>
                <Col className="col-9">
                  <h4>Modification d'Onglets</h4>
                  <p>
                    Permet de modifier, supprimer ou restaurer des onglets dans
                    la barre de navigation.
                  </p>
                </Col>
                <Col>
                  <FormCheck
                    type="checkbox"
                    label="Onglets visibles"
                    checked={status.activeRoutes}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setStatus({
                        ...status,
                        activeRoutes: event.target.checked,
                      })
                    }
                  />
                  <FormCheck
                    type="checkbox"
                    label="Onglets invisibles"
                    checked={status.deletedRoutes}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setStatus({
                        ...status,
                        deletedRoutes: event.target.checked,
                      })
                    }
                  />
                </Col>
                <Button
                  style={{ marginBottom: "1rem" }}
                  onClick={() => {
                    if (showAllRoutes) {
                      setStatus({
                        activeRoutes: false,
                        deletedRoutes: false,
                      });
                      setPageSize(5);
                    } else {
                      setStatus({
                        activeRoutes: true,
                        deletedRoutes: true,
                      });
                      setPageSize(routes.length);
                    }
                    setShowAllRoutes(!showAllRoutes);
                  }}
                >
                  {showAllRoutes ? "Tout Masquer" : "Tout Afficher"}
                </Button>
              </Row>
              <Row>
                <Col>
                  {editForm && (
                    <Modal show={showModal} onHide={() => setShowModal(false)}>
                      <Modal.Header closeButton>
                        <Modal.Title>Modifier la route</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                          <FloatingLabel
                            controlId="floatingRouteName"
                            label="Nom de la route"
                            className="mb-3"
                          >
                            <Form.Control
                              name="routeName"
                              type="text"
                              defaultValue={editForm.name}
                            />
                          </FloatingLabel>
                          <FloatingLabel
                            controlId="floatingRoutePosition"
                            label="Position de la route"
                            className="mb-3"
                          >
                            <Form.Control
                              name="routePosition"
                              type="number"
                              defaultValue={editForm.position}
                            />
                          </FloatingLabel>
                          <p>Chemin de la route</p>
                          <FloatingLabel
                            controlId="floatingRoutePath"
                            label=""
                            className="mb-3"
                          >
                            <InputGroup>
                              <InputGroup.Text>/</InputGroup.Text>
                              <Form.Control
                                name="routeUrl"
                                type="text"
                                defaultValue={editForm.url.substring(1)}
                              />
                            </InputGroup>
                          </FloatingLabel>
                          <FormCheck
                            className="mb-3"
                            type="checkbox"
                            label="Visible"
                            name="routeVisible"
                            defaultChecked={editForm.visible}
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              setEditForm({
                                ...editForm,
                                visible: event.target.checked,
                              });
                            }}
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
                    key={routes.length}
                    columns={columns}
                    data={routes.filter(
                      (route) =>
                        (status.activeRoutes && route.visible) ||
                        (status.deletedRoutes && !route.visible)
                    )}
                    pageSize={pageSize}
                    sizePerPageList={sizePerPageList}
                    isSortable={true}
                    pagination={true}
                    isSearchable={true}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={4}>
          <Card>
            <Card.Body>
              <h4>Ajout d'Onglets</h4>
              <p>Permet d'ajouter des onglets dans la barre de navigation</p>
              <Form
                onSubmit={async (event) => {
                  event.preventDefault();
                  const target = event.target as HTMLFormElement;
                  const routeNameElement = target.elements.namedItem(
                    "routeName"
                  ) as HTMLInputElement;
                  const routePositionElement = target.elements.namedItem(
                    "routePosition"
                  ) as HTMLInputElement;

                  if (routeNameElement && routePositionElement) {
                    const routeName = routeNameElement.value;
                    const routePosition = parseInt(
                      routePositionElement.value,
                      10
                    );
                    const routeUrl = "/" + generateSlug(routeName);

                    if (isDuplicateRoute('name', routeName)) {
                      toast.error("Une route avec le même nom existe déjà.");
                      return;
                    }

                    if (isDuplicateRoute('position', routePosition)) {
                      toast.error(
                        "Une route avec la même position existe déjà."
                      );
                      return;
                    }

                    try {
                      await addRoute(
                        routeName,
                        routePosition,
                        routeUrl,
                        updateRoutes
                      );
                      toast.success(
                        "Onglet créé avec succès, rafraichissez la page pour voir les changements"
                      );
                    } catch (error) {
                      toast.error(
                        `${error}`
                      );
                    }
                  }
                }}
              >
                <FloatingLabel
                  controlId="floatingRouteName"
                  label="Nom de la route"
                  className="mb-3"
                >
                  <Form.Control name="routeName" type="text" />
                </FloatingLabel>
                <FloatingLabel
                  controlId="floatingRoutePosition"
                  label="Position de la route"
                  className="mb-3"
                >
                  <Form.Control
                    name="routePosition"
                    type="number"
                    value={routePosition}
                    onChange={(e) => setRoutePosition(Number(e.target.value))}
                  />
                </FloatingLabel>
                <Button type="submit">Ajouter une route</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default AdminRouteApp;
