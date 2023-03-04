
const fs = require("fs");

const channelList = require('./src/dummies/channels.json');
const donorList = require('./src/dummies/donors.json');

/**
 * This is the functiont to reach out the large body of potential donors though communication.
 * @param {Number} timeLimit volunteer's time
 * @param {Array}
 * @param {Array}
 */
const runAlgorithm = async (timeLimit, channels, donors) => {    
    let MDM = []; // list of maximum donation amount during certain mins.
    let LDM = []; // List of donors for maximum donation during certain mins.

    // fomart the variables.
    for (let k = 0; k<=timeLimit; k++){
        MDM[k] = 0;
        LDM[k] = [];        
    }

    for (let i = 1; i<=timeLimit; i++){
        for(let j = 0; j< donors.length; j++){
            const  t= channels[donors[j].channelID].time;
           
            if(t <= i && !LDM[i-t].includes(j)){
                const donation = MDM[i-t] + donors[j].donation
                if(MDM[i]<donation){
                    MDM[i] = donation;
                    LDM[i] = LDM[i-t].concat(j)
                }
            }
        }
    }

    return {result_donors: LDM[timeLimit], result_donation: MDM[timeLimit]};
}

const main = async() => {   
    const timeLimit = 20; //volunteer's time
    const {result_donors, result_donation} = await runAlgorithm(timeLimit, channelList, donorList);  
    const donors_info = result_donors.map((v)=>{
        return donorList[v];
    });  

    //output results.
    console.log('MAX_DONATION', result_donation);
    console.log('DONORS', donors_info);
}

main();
