import React, { Component } from 'react';

import { connect } from 'react-redux';

import ShoppingList from './ShoppingList';

export class ItemsContainer extends Component {
    render() {
        const { items } = this.props;
        let content = '';

        content =
            items.Response === 'True'
                ? items.Search.map((item, index) => (
                    <ShoppingList key={index} item={item} />
                ))
                : null;
        return <div className="row">{content}</div>;
    }
}

const mapStateToProps = state => ({
    items: state.items
});

export default connect(mapStateToProps)(ItemsContainer);