import React, { useState, useEffect } from 'react';
import { Modal, FloatingLabel, InputGroup, Row, Col, Card, Button, FormCheck, Form } from 'react-bootstrap';
import Table from "../../../../components/Table";
import { FormInput } from "../../../../components/";
import { fetchRoutes, addRoute, updateRoute } from './RoutesAPI';
import { Route } from './RoutesTypes';

function AdminRouteApp() {

    const [showModal, setShowModal] = useState(false);

    const columns = [
        {
            Header: "Nom",
            accessor: "name",
            sort: true,
        },
        {
            Header: "Position",
            accessor: "position",
            sort: true,
        },
        {
            Header: "URL",
            accessor: "url",
            sort: false,
        },
        {
            Header: "Visible",
            accessor: "visible",
            Cell: ({ value }: { value: boolean }) => value ? 'Oui' : 'Non',
            sort: true,
        },
        {
            Header: "Actions",
            accessor: "actions",
            Cell: ({ row }: { row: { original: Route } }) => (
                <Button onClick={() => openEditForm(row.original)}>Modifier</Button>
            ),
        },
    ];

    const [editForm, setEditForm] = useState<Route | null>(null);

    const openEditForm = (route: Route) => {
        setEditForm(route);
        setShowModal(true);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (editForm) {
            const form = event.target as HTMLFormElement;
            const name = form.elements.namedItem('routeName') as HTMLInputElement;
            const position = form.elements.namedItem('routePosition') as HTMLInputElement;
            const url = form.elements.namedItem('routeUrl') as HTMLInputElement; // Change 'routePath' to 'routeUrl'
    
            if (name && position && url) {
                const updatedRoute = {
                    ...editForm,
                    name: name.value,
                    position: Number(position.value),
                    url: '/' + url.value,
                };
                try {
                    await updateRoute(updatedRoute, updatedRoute.position);
                    setEditForm(null);
                    setShowModal(false);
                    setRoutes(prevRoutes => {
                        const index = prevRoutes.findIndex(route => route._id === updatedRoute._id);
                        if (index !== -1) {
                            const newRoutes = [...prevRoutes];
                            newRoutes[index] = updatedRoute;
                            return newRoutes;
                        }
                        return prevRoutes;
                    });
                } catch (error) {
                    console.error(`Erreur lors de la mise à jour de la route: ${error}`);
                }
            }
        }
    };

    const [routes, setRoutes] = useState<Route[]>([]);
    const [status, setStatus] = useState({
        activeRoutes: true,
        deletedRoutes: false,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchRoutes();
                setRoutes(data);
            } catch (error) {
                console.error(`Erreur lors de la récupération des routes: ${error}`);
            }
        };
        fetchData();
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
            text: "All",
            value: routes.length,
        },
    ];

    return (
        <>
            <Row>
                <Col>
                    <div className="page-title-box">
                        <div className="page-title-right">
                            <form className="d-flex align-items-center mb-3">
                                {/* <div className="input-group input-group-sm"> */}
                                    <Row>
                                        <Col>
                                            <FormCheck
                                                type="checkbox"
                                                label="Routes actives"
                                                checked={status.activeRoutes}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                    setStatus({ ...status, activeRoutes: event.target.checked })
                                                }
                                            />
                                        </Col>
                                        <Col>
                                            <FormCheck
                                                type="checkbox"
                                                label="Routes inactives"
                                                checked={status.deletedRoutes}
                                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                                    setStatus({ ...status, deletedRoutes: event.target.checked })
                                                }
                                            />
                                        </Col>
                                    </Row>

                                {/* </div> */}
                                <Button
                                    onClick={() =>
                                        setStatus({
                                            activeRoutes: true,
                                            deletedRoutes: true,
                                        })}>
                                    Tout Afficher
                                </Button>
                            </form>
                        </div>
                        <h4 className="page-title">Panneau d'Administration</h4>
                    </div>
                </Col>
            </Row>

            <Row>
                <Col className='col-8'>
                    <Card>
                        <Card.Body>
                            <h4>Modification d'Onglets</h4>
                            <p>Permet de modifier, supprimer ou restaurer des onglets dans la barre de navigation.</p>
                            <Row>
                                <Col>
                                    {editForm && (
                                        <Modal show={showModal} onHide={() => setShowModal(false)}>
                                            <Modal.Header closeButton>
                                                <Modal.Title>Modifier la route</Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Form onSubmit={handleSubmit}>
                                                    <FloatingLabel controlId="floatingRouteName" label="Nom de la route" className="mb-3">
                                                        <Form.Control name="routeName" type="text" defaultValue={editForm.name} />
                                                    </FloatingLabel>
                                                    <FloatingLabel controlId="floatingRoutePosition" label="Position de la route" className="mb-3">
                                                        <Form.Control name="routePosition" type="number" defaultValue={editForm.position} />
                                                    </FloatingLabel>
                                                    <p>Chemin de la route</p>
                                                    <FloatingLabel controlId="floatingRoutePath" label="" className="mb-3">
                                                        <InputGroup>
                                                            <InputGroup.Text>/</InputGroup.Text>
                                                            <Form.Control name="routeUrl" type="text" defaultValue={editForm.url.substring(1)} />
                                                        </InputGroup>
                                                    </FloatingLabel>
                                                    <FormCheck
                                                        className="mb-3"
                                                        type="checkbox"
                                                        label="Visible"
                                                        name="routeVisible"
                                                        defaultChecked={editForm.visible}
                                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                            setEditForm({ ...editForm, visible: event.target.checked });
                                                        }}
                                                    />
                                                    <Button type="submit">Mettre à jour</Button>
                                                </Form>
                                            </Modal.Body>
                                        </Modal>
                                    )}
                                    <Table
                                        columns={columns}
                                        data={routes.filter(route => (status.activeRoutes && route.visible) || (status.deletedRoutes && !route.visible))}
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
                <Col>
                    <Card>
                        <Card.Body>
                            <h4>Ajout d'Onglets</h4>
                            <p>Permet d'ajouter des onglets dans la barre de navigation</p>
                            <Form onSubmit={async (event) => {
                                event.preventDefault();
                                const target = event.target as HTMLFormElement;
                                const routeNameElement = target.elements.namedItem('routeName') as HTMLInputElement;
                                const routePositionElement = target.elements.namedItem('routePosition') as HTMLInputElement;
                                const routeUrlElement = target.elements.namedItem('routeUrl') as HTMLInputElement;

                                if (routeNameElement && routePositionElement && routeUrlElement) {
                                    const routeName = routeNameElement.value;
                                    const routePosition = parseInt(routePositionElement.value, 10);
                                    const routeUrl = '/' + routeUrlElement.value;
                                }
                            }}>
                                <FloatingLabel controlId="floatingRouteName" label="Nom de la route" className="mb-3">
                                    <Form.Control name="routeName" type="text" />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingRoutePosition" label="Position de la route" className="mb-3">
                                    <Form.Control name="routePosition" type="number" />
                                </FloatingLabel>
                                <p>Chemin de la route</p>
                                <FloatingLabel controlId="floatingRouteUrl" label="" className="mb-3">
                                    <InputGroup>
                                        <InputGroup.Text>/</InputGroup.Text>
                                        <Form.Control name="routeUrl" type="text" placeholder='' />
                                    </InputGroup>
                                </FloatingLabel>
                                <Button type="submit">Ajouter une route</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default AdminRouteApp;