import firebase from 'firebase';

//var database = firebase.database();
var firebaseConfig = {
    apiKey: "AIzaSyDM9u_T3gpt9HGt_0EVATDDGbK47dsGzts",
    authDomain: "portfolio-manager-4feaa.firebaseapp.com",
    databaseURL: "https://portfolio-manager-4feaa.firebaseio.com",
    projectId: "portfolio-manager-4feaa",
    storageBucket: "portfolio-manager-4feaa.appspot.com",
    messagingSenderId: "867737441302",
    appId: "1:867737441302:web:7f5197bf63df720d0f5137",
    measurementId: "G-N2959W2M1T"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

class PortfolioManager {

    // Returns a list of the portfolios
    async getPortfolioList() {
        let listOfFiles = [];
        let pfs;
        await firebase.database().ref('/portfolios/').once('value').then(function (snapshot) {
            pfs = snapshot.val();
            console.log(pfs);
            Object.values(pfs).forEach(element => {
                listOfFiles.push(Object.keys(element)[0]);
            });;

        });
        return listOfFiles;
    }

    async removePortfolio(title) {
        let listOfFiles = await this.getPortfolioList();
        if (listOfFiles) {
            console.log('lets see if you are an array...');
            console.log(listOfFiles);
            if (listOfFiles.includes(title)) {
                let num = -1;
                for (let index = 0; index < listOfFiles.length; index++) {
                    const element = listOfFiles[index];
                    if (element === title) {
                        num = index;
                    }
                }
                if (num === -1) {
                    alert('The portfolio you are trying to remove does not exist!!!!');
                    return;
                }
                console.log(`removing /portfolios/${num}/${title}`);
                return firebase.database().ref(`/portfolios/${num}/${title}`).remove();
            } else {
                alert('The portfolio you are trying to remove does not exist!');
            }
        } else {
            alert('List of files is empty!');
        }
    }

    async getPortfolioData(title) {
        if (!title) {
            alert('No title passed to getPortfolioData!');
            return null;
        }
        let data = {};
        await firebase.database().ref('/portfolios/').once('value').then(function (snapshot) {
            let pfs = snapshot.val();
            pfs.forEach(element => {
                if (Object.keys(element)[0] === title) {
                    data = Object.values(element)[0];
                }
            });

        });
        return data;
    }

    // Creates a new blank portfolio
    async addPortfolio(title) {
        let listOfFiles = await this.getPortfolioList();
        if (listOfFiles.includes(title)) {
            alert("Can't add " + title + ' since it already exists!');
            return;
        }

        let data = {
            "name": "",
            "token": "",
            "quantity": 0,
            "bought": 0
        };

        let updates = {};
        updates[listOfFiles.length] = data;
        return firebase.database().ref(`/portfolios/${listOfFiles.length}/${title}`).update(updates);

    }


    // Edit existing portfolio
    async editPortfolio(title, data) {
        if (!(await this.getPortfolioList()).includes(title)) {
            alert('The portfolio you are trying to edit does not exist!');
            return;
        }
        if (this.containsToken(title, data.token)) {
            let originalQuantity = await this.getQuantity(title, data.token);
            data.quantity = originalQuantity + data.quantity;
        }
        var updates = {};
        let num = 0;
        let listOfFiles = await this.getPortfolioList();
        for (let index = 0; index < listOfFiles.length; index++) {
            if (listOfFiles[index] === title) {

                updates[index] = data;
                num = index;
            }
        }
        return firebase.database().ref(`/portfolios/${num}/${title}`).update(updates);


    }

    async getQuantity(title, token) {
        let data = await this.getPortfolioData(title);
        let num = 0;
        Object.values(data).forEach(element => {
            if (element.token === token) {
                num = element.quantity;
            }
        });
        return num;
    }

    async containsToken(title, token) {
        console.log(title + ' contains ' + token);
        let data = await this.getPortfolioData(title);
        let bool = false;
        Object.values(data).forEach(element => {
            if (element.token === token) {
                bool = true;
            }
        });
        return bool;
    }


}

export default PortfolioManager;