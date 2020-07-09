import React, { Component, createElement } from 'react';

class TableComponent extends Component {

    getKeys() {
        if (this.props.tableData[0]) {
            return Object.keys(this.props.tableData[0]);
        } else if (this.props.tableData) {
            Object.keys(this.props.tableData)
        } else {
            return '';
        }
    }

    getValues() {
        if (this.props.tableData[0]) {
            let values = [];
            this.props.tableData.forEach(share => {
                values.push(Object.values(share));
            });
            return values;
        } else if (this.props.tableData) {
            Object.values(this.props.tableData)
        } else {
            return '';
        }
    }

    getHeader() {
        let keys = this.getKeys();
        if (keys) {
            return keys.map((key) => {
                return <th key={key}>{this.capitalizeFirstLetter(key)}</th>
            });
        }
    }

    getBody() {
        let values = this.getValues();
        if (values) {
            return values.map((element) => {
                return this.getRow(element);
            });
        }
    }

    getRow(value) {
        let row = value.map((key) => {
            return <td key={key}>{key}</td>
        });

        return (<tr> {row} </tr>);
    }



    render() {
        return (
            <div>
                <table className="table table-bordered table-hover mx-auto my-5">
                    <thead className="thead-dark">
                        <tr>{this.getHeader()}</tr>
                    </thead>
                    <tbody>
                        {this.getBody()}
                    </tbody>
                </table>
            </div>

        );
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
export default TableComponent;