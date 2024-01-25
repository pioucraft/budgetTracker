import { Convert } from "easy-currencies";
import { getCryptoRates } from "crypto-exchange-rates";


var [save, accounts] = ["", ""]



export async function createSave() {
    
    let currencyConverter = {"USD": 1}
    currencyConverter = ((await Convert().from("USD").fetch()).rates)
    save = JSON.parse(localStorage.getItem("save"))
    let bigAccount = {"transactions": []}
    if((save ?? [])["accounts"]) {
        accounts = Object.entries(JSON.parse(JSON.stringify(save["accounts"])))

        
        let bigAccountTotal = 0
        let bigAccountAssets = {}
        bigAccountAssets["currency"] = [0, 0]
        bigAccountAssets["crypto"] = [0, 0]
        for(let accountsIndex =0;accountsIndex<accounts.length;accountsIndex++) {

            let account = accounts[accountsIndex]
            
            let total = 0
            let assets = {}
            
            for(let i=0;i<account[1]["transactions"].length;i++) {

                let transaction = account[1]["transactions"][i]
                
                if(transaction) {
                    let converted = 0

                    
                    
                    if(transaction[3] == "currency") {
                        converted = transaction[1]/currencyConverter[transaction[2]]*currencyConverter[save["settings"]["defaultCurrency"]];
                        bigAccountAssets["currency"][0] += 0;
                        bigAccountAssets["currency"][1] += converted;
                        console.log(converted)
                    }

                    if(transaction[3] == "crypto") {
                        converted = (await getCryptoRates([`${transaction[2]}USDT`]))["data"][0]["price"] * currencyConverter[save["settings"]["defaultCurrency"]] * transaction[1]
                        bigAccountAssets["crypto"][0] += 0
                        bigAccountAssets["crypto"][1] += converted
                    }

                    account[1]["transactions"][i].push(converted)
                    account[1]["transactions"][i].push(`/accounts/${accountsIndex}/${i}`)
                    account[1]["transactions"][i].push(account[0])

                    bigAccount["transactions"].push(account[1]["transactions"][i])
                    
                    total += converted
                    bigAccountTotal += converted
                    
                    if(!assets[transaction[2]]) assets[transaction[2]] = [0, 0]
                    if(!bigAccountAssets[transaction[2]]) bigAccountAssets[transaction[2]] = [0, 0]
                    
                    assets[transaction[2]][0] += transaction[1]
                    bigAccountAssets[transaction[2]][0] += transaction[1]
                    
                    assets[transaction[2]][1] += converted
                    bigAccountAssets[transaction[2]][1] += converted
                }

                
            }
            total = Number(total.toFixed(2))
            assets = Object.entries(assets)
            
            assets = assets.sort((a, b) => a[1][1]-b[1][1]).reverse()
            assets.map(x => {
                x[1][1] = Number(x[1][1].toFixed(2))
            })

            if(assets.length < 3) {
                assets.push([undefined, []])
                assets.push([undefined, []])
                assets.push([undefined, []])
            }
            
            accounts[accountsIndex][1]["total"] = total
            
            accounts[accountsIndex][1]["topAssets"] = assets
        }

        bigAccountTotal = Number(bigAccountTotal.toFixed(2))
        bigAccountAssets = Object.entries(bigAccountAssets)
        
        bigAccountAssets = bigAccountAssets.sort((a, b) => a[1][1]-b[1][1]).reverse()
        bigAccountAssets = bigAccountAssets.sort((a, b) => {
            if(a[0] == "currency" || a[0] == "crypto" || a[0] == "stock") {
                return 1
            }
            else {
                return -1
            }
        })
        bigAccountAssets.map(x => {
            x[1][1] = Number(x[1][1].toFixed(2))
        })

        if(bigAccountAssets.length < 3) {
            bigAccountAssets.push([undefined, []])
            bigAccountAssets.push([undefined, []])
            bigAccountAssets.push([undefined, []])
        }
        bigAccount["assets"] = bigAccountAssets
        bigAccount["total"] = bigAccountTotal

        bigAccount["transactions"].sort((a, b) => b[4]-a[4])
    }

    return {"save": save ?? undefined, "accounts": accounts ?? undefined, "rates": currencyConverter, "bigAccount": bigAccount ?? undefined}
}

export var defaultSave = {
    "settings": {
        "defaultCurrency": "USD"
    },
    "accounts": {
        "Main account": {
            "transactions": [
                ["Hello potato", 3, "USD", "currency", 10, 3]
            ]
        }
    }
}