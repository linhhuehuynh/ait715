import React, { Component } from 'react';
import { Button, Card, CardText, CardBody, CardTitle, CardColumns, Modal, ModalBody, Container, Row, Col, CardHeader } from 'reactstrap';
import { connect } from 'react-redux';
import { getRequestItems } from '../actions/requestItemActions';
import PropTypes from 'prop-types';

class RequestItemList extends Component {
    static propTypes = {
        getRequestItems: PropTypes.func.isRequired,
        requestitem: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
        this.props.getRequestItems();
    }

    state = {
        modal: false,
        name: null,
        category: null,
        description: null,
        email: null
    };

    render() {
        const { requestitems } = this.props.requestitem;
        return (
            <CardColumns>
                {requestitems.map(({ _id, name, category, description, email }) => (
                    <Card body outline color="info">
                        <CardHeader><strong>In Need</strong></CardHeader>
                        <CardBody>
                            <CardTitle>Item: {name}</CardTitle>
                            <CardText>Category {category}</CardText>

                            <div>
                                {this.props.isAuthenticated ? <Button
                                    color="info"
                                    onClick={() => this.setState({ name, category, description, email, modal: true })}
                                >More Details</Button> : null}


                                <Modal
                                    name={this.state.name}
                                    category={this.state.category}
                                    description={this.state.description}
                                    email={this.state.email}
                                    isOpen={this.state.modal}
                                    toggle={() => this.setState({ modal: false })}
                                    size="lg"
                                >
                                    <ModalBody>
                                        <Container body outline color="secondary">
                                            <Row>
                                                <Col><h3>Item: {this.state.name}</h3>
                                                    <h5>Category:</h5><p> {this.state.category}</p>
                                                    <h5>Description:</h5> <p>{this.state.description}</p>
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
    requestitem: state.requestitem,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getRequestItems })(RequestItemList);