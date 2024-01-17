<script>

    import { onMount } from 'svelte'
    import { Convert } from "easy-currencies";

    import Home from "../modules/Home.svelte"
    import Accounts from '../modules/Accounts.svelte';

    //set variables

    var currentPage = 0

    //default variables that will change in the future

    var defaultSave = {
        "settings": {
            "defaultCurrency": "USD"
        },
        "accounts": {
            "Main account": {
                "transactions": [
                    ["Hello potato", 3, "USD", "currency", 10]
                ]
            }
        }
    }

    var save = defaultSave

    var accounts = save["accounts"]
    
    var currencyConverter = {"USD": 1}
    var currencyRates = [["USD", 1]]
    
    //change the default variables to "normal things"

    onMount(async () => {
        
        save = JSON.parse(localStorage.getItem("save")) ?? "";

        if(save) {
            
            accounts = Object.entries(save["accounts"])
        }
       
        await currenciesList()
        await generateAccounts()
    })

    async function generateAccounts() {
        var accountsIndex = 0
        accounts.forEach(account => {
            
            let total = 0
            let assets = {}
            
            account[1]["transactions"].forEach(transaction => {
                if(transaction[3] == "currency") {
                    
                    let converted = transaction[1]/currencyConverter[transaction[2]]*currencyConverter[save["settings"]["defaultCurrency"]]
                    total += converted
                    
                    if(!assets[transaction[2]]) assets[transaction[2]] = [0, 0]
                    
                    assets[transaction[2]][0] += transaction[1]
                    
                    assets[transaction[2]][1] += converted
                }
            })
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
            console.log(assets)
        })
        
    }
    
    async function currenciesList() {
        
        console.log((await Convert().from("USD").fetch()).rates)
        
        currencyConverter = ((await Convert().from("USD").fetch()).rates) ?? currencyConverter
        currencyRates = Object.entries(currencyConverter) ?? currencyRates
    }

    function start() {
        
        let currency = document.getElementById("temporary-currencySelector").value
        save = defaultSave
        save.settings.defaultCurrency = currency
        localStorage.setItem("save", JSON.stringify(save))
        location.reload()
    }

    
    function changePage(nb) {
        document.querySelectorAll(".selectedItem").forEach(element => {
            element.classList.remove("selectedItem")
        })

        document.getElementById("leftBar-button-"+nb).classList.add("selectedItem")

        currentPage = nb
    }
</script>

<style>

    :global(.box) {
        background-color: var(--primary);
        padding: 3%;
        border-radius: 2vh;
        margin: 1.5vw;
        border: none;
        text-align: start;
    }
    :global(body) {
        
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        margin: 0;
        height: 100vh;
        background-color: var(--background);
    }

    #wrapper {
        display: grid;
        grid-template-areas: "left middle";
        grid-template-columns: 2fr 5fr;
        height: 100%;
    }

    #leftBar {
        border-right: solid black;
        grid-area: left;
        background-color: var(--secondary);
        padding: 5vh;
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }

    #middleBar {
        display: flex;
        flex-direction: column;
        padding: 1vh;
        grid-area: middle;
        overflow-y: scroll;
    }

    .leftBar-button {
        background-color: transparent;
        border: none;
        margin-top: 3vh;
        text-align: left;
        padding: 2vh;
        font-size: large;
        border-radius: 5vh;
        cursor: pointer;
        width: 85%;
    }    
    
    .leftBar-button:hover {
        background-color: var(--accent);
    }

    

    /*temporary only*/

    #temporary-wrapper {
        display: flex;
        flex-direction: row;
        padding-left: 10%;
        padding-right: 10%;
    }

    #temporary {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 20vh;
        font-size: larger;
        background-color: wheat;
        margin-left: auto;
        margin-right: auto;
        padding: 4%;
        border-radius: 5vw;
    }

    #temporary-currencySelector {
        min-width: 5vw;
        min-height: 5vh;
        text-align: center;
        cursor: pointer;
        background-color: rgb(179, 118, 5);
        border: none;
        border-radius: 1vh;
        font-size: medium;
    }

    #temporary-cookiesConsent {
        margin-top: 10vh;
        font-size: medium;
        color: rgb(138, 136, 136);
    }

    #temporary-start {
        min-width: 5vw;
        min-height: 5vh;
        text-align: center;
        cursor: pointer;
        background-color: rgb(179, 118, 5);
        border: none;
        border-radius: 1vh;
        font-size: medium;
    }

    @media only screen and (max-width: 100vh) {


        #wrapper {
            grid-template-columns: 0vw 1fr;
        }

        #leftBar {
            overflow-x: scroll;
            position: fixed;
            height: 2em;
            flex-direction: row;
            justify-content: space-between;
            padding: 0;
            border-bottom: solid black;
            border-right: none;
            width: 100vw;
        }

        .leftBar-button {
            padding: 0.5vh;
            padding-left: 1vh;
            padding-right: 1vh;
            margin-top: 0;
            width: min-content;
            border-radius: 0;
        }

        .leftBar-button:hover {
            background-color: transparent;
        }

        #middleBar {
            margin-top: 2em;
        }
        
        .selectedItem {
            border-bottom: solid blue;
        }
    }
</style>

{#if !save}
    <div id="temporary-wrapper">

        <div id="temporary">
            <h2 id="temporary-title">Before you start : </h2>
            <p id="temporary-currency">What is your main currency ?</p>
            <select name="currencySelector" id="temporary-currencySelector">
                {#each currencyRates as currencyRate}
                <option value="{currencyRate[0]}">{currencyRate[0]}</option>
                {/each}
            </select>
            <p id="temporary-cookiesConsent">By continuing, you accept the use of cookies and local storage. They will be used for analytics and to store your data.</p>
            <button id="temporary-start" on:click={start}>Let's start</button>
        </div>

    </div>
    
    

{:else}
    <div id="wrapper">
        <div id="leftBar">
            
            <button on:click={() => changePage(0)} class="leftBar-button selectedItem" id="leftBar-button-0">Home</button>
            <button on:click={() => changePage(1)} class="leftBar-button" id="leftBar-button-1">Accounts</button>
            <button on:click={() => changePage(2)} class="leftBar-button" id="leftBar-button-2">Budget</button>
            <button on:click={() => changePage(3)} class="leftBar-button" id="leftBar-button-3">Stock</button>
            <button on:click={() => changePage(4)} class="leftBar-button" id="leftBar-button-4">Crypto</button>
            <button on:click={() => changePage(5)} class="leftBar-button" id="leftBar-button-5">Sync</button>
            <button on:click={() => changePage(6)} class="leftBar-button" id="leftBar-button-6">Settings</button>
        </div>
        <div id="middleBar">
            {#if currentPage == 0}
                <Home />
            {:else if currentPage == 1}
                <Accounts accounts={accounts} defaultCurrency={save["settings"]["defaultCurrency"]} />
                
            {:else if currentPage == 2}
                <p>2</p>
            {:else if currentPage == 3}
                <p>3</p>
            {/if}
        </div>
    </div>
    
{/if}