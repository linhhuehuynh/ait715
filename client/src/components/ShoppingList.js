import React, { Component } from 'react';
import { Button, Card, CardHeader, CardImg, CardText, CardBody, CardTitle, CardColumns, Modal, ModalBody, Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
        this.props.getItems();
    }

    onDeleteClick = id => {
        this.props.deleteItem(id);
    }

    state = {
        modal: false,
        name: null,
        photo: null,
        category: null,
        description: null,
        condition: null,
        email: null
    };

    render() {
        const { items } = this.props.item;
        return (
            <CardColumns>
                {items.map(({ _id, name, category, description, condition, email, photo }) => (
                    <Card body outline color="secondary">
                        <CardHeader><strong>Exchange/Donation</strong></CardHeader>
                        <CardImg top width="60%" src={photo} alt={name} />
                        <CardBody>
                            <CardTitle><strong>Item:</strong> {name}</CardTitle>
                            <CardText><strong>Category:</strong> {category}</CardText>
                            <CardText><strong>Condition:</strong> {condition}</CardText>


                            <div>
                                {this.props.isAuthenticated ? <Button
                                    color="info"
                                    onClick={() => this.setState({ name, photo, category, description, condition, email, modal: true })}
                                >More Details</Button> : null}

                                <Modal
                                    name={this.state.name}
                                    category={this.state.category}
                                    description={this.state.description}
                                    condition={this.state.condition}
                                    email={this.state.email}
                                    photo={this.state.photo}
                                    isOpen={this.state.modal}
                                    toggle={() => this.setState({ modal: false })}
                                    size="lg"
                                >
                                    <ModalBody>
                                        <Container body outline color="secondary">
                                            <Row>
                                                <Col xs="4"><img width="80%" src={this.state.photo} alt="Item" /></Col>
                                                <Col xs="8"><h3>Item: {this.state.name}</h3>
                                                    <h5>Category:</h5><p>{this.state.category}</p>
                                                    <h5>Condition:</h5><p>{this.state.condition}</p>
                                                    <h5>Description:</h5><p> {this.state.description}</p>
                                                    <h5>Email:</h5>
                                                    <p><a href={"mailto:" + this.state.email}>{this.state.email}</a></p>
                                                </Col>
                                            </Row>
                                        </Container>
                                    </ModalBody>
                                </Modal>
                            </div>
                        </CardBody>
                    </Card>
                ))}
            </CardColumns>
        );
    }
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);