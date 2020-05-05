import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { addRequestItem } from '../actions/requestItemActions';
import PropTypes from 'prop-types';

class RequestItemModal extends Component {
    state = {
        modal: false,
        name: '',
        category: '2',
        description: ''
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }
    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = e => {
        this.setState(
            { [e.target.name]: e.target.value });
    }

    onSubmit = e => {
        e.preventDefault();

        const newItem = {
            name: this.state.name,
            category: this.state.category,
            description: this.state.description,
        }

        //Add item via addItem action
        this.props.addRequestItem(newItem);
        //Close modal
        this.toggle();

    }

    render() {
        return (
            <div>
                {this.props.isAuthenticated ? <Button
                    color="info"
                    style={{ marginBottom: '2rem' }}
                    onClick={this.toggle}
                >Ask for a slice!</Button> : null}


                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Ask for an Item</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup row>
                                <Label for="item" sm={2}>Item</Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="item"
                                        placeholder="What item do you need?"
                                        onChange={this.onChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="category" sm={2}>Category</Label>
                                <Col sm={10}>
                                    <Input type="select" name="category" id="category" value={this.state.category} onChange={this.onChange}>
                                        <option value='2' disabled>Select</option>
                                        {
                                            ['Appliances', 'Auto Parts', 'Electronics & Computers', 'Furniture', 'Tools', 'Vehicles', 'Miscellaneous'].map((i, j) => {
                                                return <option key={i} value={i}>{i}</option>
                                            })
                                        }
                                    </Input>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="description" sm={2}>Description</Label>
                                <Col sm={10}>
                                    <Input
                                        type="textarea"
                                        name="description"
                                        id="description"
                                        placeholder="Describe the item as detailed as possible."
                                        onChange={this.onChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col sm={{ size: 10, offset: 2 }}>
                                    <Button
                                        color="dark"
                                        style={{ marginTop: '2rem' }}
                                        block
                                    >Submit
                                    </Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    requestitem: state.requestitem,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addRequestItem })(RequestItemModal);