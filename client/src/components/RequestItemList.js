import React, { Component } from 'react';
import { Button, Card, CardText, CardBody, CardTitle, CardColumns, Modal, ModalBody, Container, Row, Col } from 'reactstrap';
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
        description: null
    };

    render() {
        const { requestitems } = this.props.requestitem;
        return (
            <CardColumns>
                {requestitems.map(({ _id, name, category, description }) => (
                    <Card body outline color="secondary">
                        <CardBody>
                            <CardTitle>Item: {name}</CardTitle>
                            <CardText>Category {category}</CardText>

                            <div>
                                {this.props.isAuthenticated ? <Button
                                    color="info"
                                    style={{ marginBottom: '2rem' }}
                                    onClick={() => this.setState({ name, category, description, modal: true })}
                                >More Details</Button> : null}

                                <Modal
                                    name={this.state.name}
                                    category={this.state.category}
                                    description={this.state.description}
                                    isOpen={this.state.modal}
                                    toggle={() => this.setState({ modal: false })}
                                    size="lg"
                                >
                                    <ModalBody>
                                        <Container body outline color="secondary">
                                            <Row>
                                                <Col xs="8"><h2>Item: {this.state.name}</h2>
                                                    <h5>Category: {this.state.category}</h5>
                                                    <h5>Description: {this.state.description}</h5>
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