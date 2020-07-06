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
    shares = Object.entries(shares)
    console.log(typeof shares)
    console.log(shares[0])

    return (
        <tbody>

            {shares.map((share) => (
                <tr>
                    <td>{share[1]["1. symbol"]}</td>
                    <td>{share[1]["2. name"]}</td>
                    <td>{share[1]["3. type"]}</td>
                    <td>{share[1]["4. region"]}</td>
                    <td>{share[1]["8. currency"]}</td>
                </tr>

            ))
            }
        </tbody >
    )
};

export default ShareInfo;