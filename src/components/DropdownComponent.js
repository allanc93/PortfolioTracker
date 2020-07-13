import React, { Component } from 'react';

class DropdownComponent extends Component {

    getDropDownData(){
        return this.props.menuData.map((element)=>{
            return (<option key={element}>{element}</option>);
        });
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