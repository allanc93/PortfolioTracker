import React from 'react';

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
                    <td>
                        <button className="btn btn-primary mt-0 mb-2">
                            View Share
                        </button>
                    </td>
                </tr>

            ))
            }
        </tbody >
    )
};

export default ShareInfo;