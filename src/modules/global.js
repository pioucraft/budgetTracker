import { Convert } from "easy-currencies";
import { onMount } from "svelte";


var [save, accounts] = ["", ""]

var currencyConverter = {"USD": 1}

export async function createSave() {
    
    
    let currencyConverter = ((await Convert().from("USD").fetch()).rates)
    save = JSON.parse(localStorage.getItem("save"))
    
    if(save["accounts"]) {
        accounts = Object.entries(save["accounts"])

        var accountsIndex = 0
        accounts.forEach(account => {
            
            let total = 0
            let assets = {}
            
            for(let i=0;i<account[1]["transactions"].length;i++) {

                let transaction = account[1]["transactions"][i]

                let converted = 0
                
                if(transaction[3] == "currency") {
                    converted = transaction[1]/currencyConverter[transaction[2]]*currencyConverter[save["settings"]["defaultCurrency"]]
                }

                account[1]["transactions"][i].push(converted)
                
                total += converted
                
                if(!assets[transaction[2]]) assets[transaction[2]] = [0, 0]
                
                assets[transaction[2]][0] += transaction[1]
                
                assets[transaction[2]][1] += converted
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
            accountsIndex++
        })
    }

    return {"save": save, "accounts": accounts, "rates": currencyConverter}
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