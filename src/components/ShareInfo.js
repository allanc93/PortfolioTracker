import React from 'react';

// class ShareInfo extends React.Component {
//     render() {
//         // const company = this.props;
//         return (
//             <tr>
//                 {/* Result for each share displayed in individual row */}
//                 <td>1</td>
//                 <td>2</td>
//                 <td>3</td>
//                 <td>3</td>
//                 <td>3</td>
//                 <td>3</td>
//             </tr>
//         );
//     }
// }

const ShareInfo = ({ shares }) => {
    shares = Object.values(shares)

    return (
        <tbody>
            {shares.map((share) => (
                <tr>
                    <td>{share["1. symbol"]}</td>
                    <td>{share["2. name"]}</td>
                    <td>{share["3. type"]}</td>
                    <td>{share["4. region"]}</td>
                    <td>{share["8. currency"]}</td>
                </tr>

            ))
            }
        </tbody >
    )
};

export default ShareInfo;