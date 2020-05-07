import React, { Component, Fragment } from 'react';
import { NavItem, Input, InputGroupAddon, Button, Form } from 'reactstrap';
import { connect } from 'react-redux';
import { searchItem, fetchItems } from '../actions/searchActions';

export class Search extends Component {

    onChange = e => {
        this.props.searchItem(e.target.value);
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.fetchItems(this.props.text);
    }

    render() {
        return (
            <Fragment>
                <NavItem>
                    <Input
                        type="text"
                        placeholder="What are you looking for?"
                        className="mr-4"
                        onChange={this.onChange}
                    />
                </NavItem>

                <NavItem>
                    <InputGroupAddon><Button
                        color="secondary" className="mr-4"
                    >Search</Button></InputGroupAddon>

                </NavItem>
            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    text: state.searchitems.text
});

export default connect(mapStateToProps, { searchItem, fetchItems })(Search);