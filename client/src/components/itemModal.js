import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, FormText, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ItemModal extends Component {
    state = {
        modal: false,
        name: '',
        description: '',
        photo: ''
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

    onChangePhoto = e => {
        this.setState({ photo: e.target.files[0] });
    };

    onSubmit = e => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('description', this.state.description);
        formData.append('photo', this.state.photo);
        this.props.addItem(formData);


        this.setState({
            name: '',
            description: '',
            photo: ''
        });

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
                >Post an Item</Button> : <h4 className='mb-3 ml-4'> Please log in to manage items</h4>}


                <Modal
                    isOpen={this.state.modal}
                    toggle={this.toggle}
                >
                    <ModalHeader toggle={this.toggle}>Post an Item</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.onSubmit} encType='multipart/form-data'>
                            <FormGroup row>
                                <Label for="item" sm={2}>Item</Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="item"
                                        placeholder="What's the item?"
                                        onChange={this.onChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="description" sm={2}>Description</Label>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        name="description"
                                        id="description"
                                        placeholder="Describe your item."
                                        onChange={this.onChange} />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label for="photo" sm={2}>Photo</Label>
                                <Col sm={10}>
                                    <Input type="file" name='photo' id="photo" onChange={this.onChangePhoto} />
                                    <FormText color="muted">
                                        This is some placeholder block-level help text for the above input.
                                        It's a bit lighter and easily wraps to a new line.
                                </FormText>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Col sm={{ size: 10, offset: 2 }}>
                                    <Button
                                        color="dark"
                                        style={{ marginTop: '2rem' }}
                                        block
                                    >Add Item
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
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addItem })(ItemModal);