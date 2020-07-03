import React from 'react';

class ShareDisplay extends React.Component {
    render() {
        const company = this.props;
        return (
            <div className="share-table">
                <table>
                    <tr>
                        <th>Company Name</th>
                        <th>Symbol</th>
                        <th>High</th>
                        <th>Low</th>
                        <th>Price</th>
                        <th>XYZ</th>
                    </tr>

                    {/* Loop through share results */}
                    <tr>
                        {/* Result for each share displayed in individual row */}
                        <td>{company.CompanyName.value}</td>
                        <td>{company.Symbol.value}</td>
                        <td>{company.High.value}</td>
                        <td>{company.Low.value}</td>
                        <td>{company.Price.value}</td>
                        <td>{company.XYZ.value}</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default ShareDisplay;