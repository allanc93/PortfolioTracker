import axios from 'axios';

let classData = {
    usedCalls: [],
    callMap: []
};

async function APICall(APIfunction, APIsearch) {


    let param = '';
    APIfunction === "SYMBOL_SEARCH" ? param = 'keywords' : param = 'symbol';
    const APIlink = `https://www.alphavantage.co/query?function=${APIfunction}&${param}=${APIsearch}&interval=1min&apikey=BC34PVP226M1KDMR&outputsize=compact`;
    if (classData.usedCalls.includes(APIlink)) {
        let x = findValue(classData.callMap, APIlink);
        console.log(x);
        return x;
    } else {
        let resp = await axios.get(APIlink);
        classData = {
            usedCalls: classData.usedCalls.concat(APIlink),
            callMap: classData.callMap.concat([{ APIlink, resp }])
        };

        setTimeout(removeOldData.bind(null,APIlink), 60000);


        return resp;
    }

}

function findValue(arr, key) {
    for(let i = 0; i <arr.length; i++){
        if (arr[i]) {
            let bool = (arr[i].APIlink === key);
            if (bool) {
                return arr[i].resp;
            }
        }
    }
}

function removeOldData(APIlink){
    console.log('removing old data');

            // Remove the APIlink from usedCalls
            for (let i = 0; i < classData.usedCalls.length; i++) {
                console.log('looking at ' + classData.usedCalls[i]);
                console.log('looking at ' + APIlink);
                if (classData.usedCalls[i] === APIlink) {
                    
                    classData.usedCalls.splice(i, 1);
                }
            }

            //Remove the APIlink from callMap
            for (let i = 0; i < classData.callMap.length; i++) {
                if (classData.callMap[i].APIlink === APIlink) {
                    classData.callMap.splice(i, 1);
                }
            }

}

export default APICall;