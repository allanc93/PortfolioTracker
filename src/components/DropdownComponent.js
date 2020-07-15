import React, { Component } from 'react';

class DropdownComponent extends Component {

    getDropDownData() {
        if (this.props.menuData) {
            return this.props.menuData.map((element) => {
                return (<option key={element}>{element}</option>);
            });
        } else {
            return null;
        }
    }

    render() {
        return (
            <div>
                <select onChange={this.props.handleChange} id={this.props.id} name="DropdownList">
                    {this.getDropDownData()}
                </select>
            </div>
        );
    }
}

export default DropdownComponent;