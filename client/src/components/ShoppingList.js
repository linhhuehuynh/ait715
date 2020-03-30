import React, { Component } from 'react';
import { Button, Card, CardText, CardBody, CardTitle, CardColumns } from 'reactstrap';
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

    render() {
        const { items } = this.props.item;
        return (
            <CardColumns>
                {items.map(({ _id, name, description, photo }) => (

                    <Card body outline color="secondary">
                        <CardBody>
                            <img width="100%" src={photo} alt="Item Photo" />
                            <CardTitle>Item: {name}</CardTitle>
                            <CardText>Description: {description}</CardText>
                            {this.props.isAuthenticated ? <Button
                                className="remove-btn"
                                color="danger"
                                size="md"
                                onClick={this.onDeleteClick.bind(this, _id)}
                            >
                                Delete</Button> : null}
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