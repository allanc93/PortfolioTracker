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
                        <form className="form-inline">
                            <label className="sr-only" for="amount">Amount</label>
                            <input type="number" className="form-control mt-0 mb-2 mr-0" id="amount" placeholder="Amount to buy..." />

                            <button className="btn btn-success mt-0 mb-2">
                                Buy
                            </button>
                        </form>
                    </td>
                </tr>

            ))
            }
        </tbody >
    )
};

export default ShareInfo;