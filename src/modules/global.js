import { Convert } from "easy-currencies";
import { getCryptoRates } from "crypto-exchange-rates";


var [save, accounts] = ["", ""]


export async function createSave() {
    save = JSON.parse(localStorage.getItem("save"))
    let currencyConverter = {"USD": 1}
    let bigAccount = {"transactions": []}
    if((save ?? [])["accounts"]) {
        
        
        currencyConverter = ((await Convert().from(save["settings"]["defaultCurrency"]).fetch()).rates)

        accounts = Object.entries(JSON.parse(JSON.stringify(save["accounts"])))

        
        let bigAccountTotal = 0
        let bigAccountAssets = {}
        bigAccountAssets["currency"] = [0, 0]
        bigAccountAssets["crypto"] = [0, 0]
        bigAccountAssets["stock"] = [0, 0]

        let currencies = await generateCurrenciesList(accounts, currencyConverter, save["settings"]["defaultCurrency"])
    
        for(let accountsIndex =0;accountsIndex<accounts.length;accountsIndex++) {

            let account = accounts[accountsIndex]
            
            let total = 0
            let assets = {}
            
            for(let i=0;i<account[1]["transactions"].length;i++) {

                let transaction = account[1]["transactions"][i]
                
                if(transaction) {
                    let converted = 0

                    converted = transaction[1]*currencies[(`${transaction[3]}/${transaction[2]}`)]
                    console.log(currencies[(`${transaction[3]}/${transaction[2]}`)])
                    bigAccountAssets[transaction[3]][0] += 0;
                    bigAccountAssets[transaction[3]][1] += converted;

                    account[1]["transactions"][i].push(converted)
                    account[1]["transactions"][i].push(`/accounts/${accountsIndex}/${i}`)
                    account[1]["transactions"][i].push(account[0])

                    bigAccount["transactions"].push(account[1]["transactions"][i])
                    
                    total += converted
                    bigAccountTotal += converted
                    
                    if(!assets[transaction[2]]) assets[transaction[2]] = [0, 0]
                    if(!bigAccountAssets[transaction[2]]) bigAccountAssets[transaction[2]] = [0, 0]
                    
                    assets[transaction[2]][0] += transaction[1]*100_000_000
                    bigAccountAssets[transaction[2]][0] += transaction[1]*100_000_000
                    
                    assets[transaction[2]][1] += converted
                    bigAccountAssets[transaction[2]][1] += converted
                }

                
            }
            total = Number(total.toFixed(2))
            assets = Object.entries(assets).map(x => [x[0], [x[1][0]/100_000_000, x[1][1]]])
            console.log(assets)
            
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
        bigAccountAssets = Object.entries(bigAccountAssets).map(x => [x[0], [x[1][0]/100_000_000, x[1][1]]])
        console.log(bigAccountAssets)
        
        bigAccountAssets = bigAccountAssets.sort((a, b) => a[1][1]-b[1][1]).reverse()
        for(let i=0;i<bigAccountAssets.length;i++) {
            if(bigAccountAssets[i][0] == "currency" || bigAccountAssets[i][0] == "crypto" || bigAccountAssets[i][0] == "stock") {
                let temporaryElement = bigAccountAssets[i]
                bigAccountAssets.splice(i, 1)
                bigAccountAssets.push(temporaryElement)
            }
        }
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

async function generateCurrenciesList(accounts, currencyConverter, defaultCurrency) {
    let currencies = {}
    for(let i=0;i<accounts.length;i++) {
        let account = accounts[i]
        for(let j=0;j<account[1]["transactions"].length;j++) {
            let transaction = account[1]["transactions"][j]
            if(!currencies.hasOwnProperty(transaction[2])) {
                console.log(transaction)
                if(transaction[3] == "currency") {
                    currencies[(`currency/${transaction[2]}`)] = 1/currencyConverter[transaction[2]]
                }
                else if(transaction[3] == "crypto") {
                    currencies[(`crypto/${transaction[2]}`)] = Number((await getCryptoRates([`${transaction[2]}USDT`]))["data"][0]["price"])/currencyConverter["USD"]
                }
                else if(transaction[3] == "stock") {
                    let stockFetched = (await (await fetch(`https://corsproxy.io/?https://query1.finance.yahoo.com/v8/finance/chart/${transaction[2]}?${(Math.random()).toString()}`)).json())["chart"]["result"][0]["meta"]
                    let stockPrice = stockFetched["regularMarketPrice"]
                    let stockCurrency = stockFetched["currency"]
                    currencies[(`stock/${transaction[2]}`)] = stockPrice/currencyConverter[stockCurrency]
                }
                
            }
        }
    }
    console.log(currencies)
    return currencies
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
    },
    "isDefault": true
}