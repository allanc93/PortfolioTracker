import React from 'react';

class ShareInfo extends React.Component {
    render() {
        const company = this.props;
        return (
            <div>
                {/* Result for each share displayed in individual row */}
                <td>{company.CompanyName.value}</td>
                <td>{company.Symbol.value}</td>
                <td>{company.High.value}</td>
                <td>{company.Low.value}</td>
                <td>{company.Price.value}</td>
                <td>{company.XYZ.value}</td>
            </div>
        );
    }
}

export default ShareInfo;