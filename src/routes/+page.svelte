<script>
    import { onMount } from 'svelte'

    import { createSave, defaultSave } from "../modules/global"

    import Home from "../modules/Home.svelte"
    import Accounts from '../modules/Accounts.svelte';
    import Settings from '../modules/Settings.svelte';

    //set variables

    var currentPage = 0

    //default variables that will change in the future

    var save = defaultSave

    var accounts = save["accounts"]
    
    var currencyConverter = {"USD": 1}
    var bigAccount = {"transactions": [], "total": 3, "assets": [[undefined, []], [undefined, []], [undefined, []]]}
    
    //change the default variables to "normal things"

    onMount(async () => {
        
        save = (await createSave())["save"]
        accounts = (await createSave())["accounts"]
        currencyConverter = (await createSave())["rates"]
        bigAccount = (await createSave())["bigAccount"]
        console.log(bigAccount)
    })

    function start() {
        
        let currency = document.getElementById("temporary-currencySelector").value
        save = {"accounts": {}, "settings": {}}
        save.settings.defaultCurrency = currency
        localStorage.setItem("save", JSON.stringify(save))
        window.location.reload()
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
                {#each Object.entries(currencyConverter) as currencyRate}
                <option value="{currencyRate[0]}">{currencyRate[0]}</option>
                {/each}
            </select>
            <p id="temporary-cookiesConsent">By continuing, you accept the use of cookies and local storage. They will be used to store your save data. You also agree that, because this app is in early development, your data could be lost at any moment (except if you know how to recover them). Because the app uses those services' APIs, you are the only responsible person for any problem with Binance, Yahoo! Finance or ExchangeRate-API. Thus, you have to check you respect their ToS when you use the app. Therefore, you will make requests to their servers and you are, like always, the only responsible person for any problem with the data they collect.</p>
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
            <button class="leftBar-button" on:click={() => location.href = "https://github.com/pioucraft/budgetTracker"}>Source code</button>
            <button class="leftBar-button" on:click={() => location.href="mailto:hello@gougoule.ch"}>Contact me!</button>
        </div>
        <div id="middleBar">
            {#if currentPage == 0}
                <Home bigAccount={bigAccount} save={save} />
            {:else if currentPage == 1}
                <Accounts accounts={accounts} defaultCurrency={save["settings"]["defaultCurrency"]} />      
            {:else if currentPage == 6}
                <Settings/>
            {:else}
                <p style="text-align: center; margin-top: 40vh">Coming soon</p>
            {/if}
        </div>
    </div>
    
{/if}