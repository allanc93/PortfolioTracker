import React from 'react';
import ShareInfo from './ShareInfo';

class ShareDisplay extends React.Component {
    render() {
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
                        <ShareInfo />
                    </tr>
                </table>
            </div>
        );
    }
}

export default ShareDisplay;