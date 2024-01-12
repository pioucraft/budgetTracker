<script>
    import { onMount } from 'svelte'
    import { Convert }from "easy-currencies";
    var save = {
        "settings": {
            "defaultCurrency": "USD"
        },
        "accounts": {

        }
    }

    var currentPage = 0
    
    onMount(() => {
        // @ts-ignore
        save = JSON.parse(localStorage.getItem("save")) ?? "";
        converter()
    })
    
    var currencyRates = [["USD", 1]]
    
    async function converter() {
        console.log(Object.entries((await Convert().from("USD").fetch()).rates))
        currencyRates = Object.entries((await Convert().from("USD").fetch()).rates) ?? [["USD", 1]]
        console.log("currencyRates")
        console.log(currencyRates)
    }

    function start() {
        // @ts-ignore
        let currency = document.getElementById("temporary-currencySelector").value
        save = {
            "settings": {
                "defaultCurrency": currency
            },
            "accounts": {

            }
        }
        localStorage.setItem("save", JSON.stringify(save))
    }

    function burgerMenu() {
        // @ts-ignore
        if(document.getElementById("leftBar").style.visibility == "visible") {
            // @ts-ignore
            document.getElementById("wrapper").style.gridTemplateColumns = "0vw 1fr"
            // @ts-ignore
            document.getElementById("leftBar").style.visibility = "hidden"
            // @ts-ignore
            document.getElementById("middleBar").style.visibility = "visible"
            // @ts-ignore
            document.getElementById("middleBar").style.padding = "6vh"
            return;
        }
        // @ts-ignore
        document.getElementById("wrapper").style.gridTemplateColumns = "1fr 0vw"
        // @ts-ignore
        document.getElementById("leftBar").style.visibility = "visible"
        // @ts-ignore
        document.getElementById("middleBar").style.visibility = "hidden"
            // @ts-ignore
            document.getElementById("middleBar").style.padding = "0vh"
    }

    // @ts-ignore
    function changePage(nb) {
        currentPage = nb
        
        // @ts-ignore
        if(document.getElementById("leftBar").style.visibility == "visible") burgerMenu()
        
    }
</script>

<style>
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
        overflow-y: scroll;
    }

    #middleBar {
        margin-top: 7vh;
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

    #burgerMenuButton {
        visibility: hidden;
        position: fixed;
    }

    #home-topBar {
        display: grid;
        grid-template-areas: "left right";
        grid-template-columns: 1.5fr 1fr;
    }

    .box {
        background-color: var(--primary);
        padding: 2vw;
        border-radius: 5vh;
        margin: 1.5vw;
    }

    #home-topBar-right {
        display: grid;
        grid-template-areas: "add donate"
        "search search";
        grid-template-columns: 5em auto;
        grid-template-rows: 5em auto;
        gap: 5%;
        min-height: 15vh;
    }

    #home-topBar-right-add {
        grid-area: add;
        background-color: var(--secondary);
        border-style: none;
        border-radius: 1vh;
        font-size: xx-large;
        cursor: pointer;
    }

    #home-topBar-right-add:hover {
        background-color: var(--accent);
    }

    #home-topBar-right-donate {
        grid-area: donate;
        background-color: var(--secondary);
        border-style: none;
        border-radius: 1vh;
        font-size: large;
        cursor: pointer;
    }

    #home-topBar-right-donate:hover {
        background-color: var(--accent);
    }

    #home-topBar-right-search {
        grid-area: search;
        outline: none;
        background-color: var(--background);
        border-style: none;
        border-radius: 1vh;
        font-size: large;
        padding: 1%;
    }

    .blackSeparator {
        width: 100%;
        border-bottom: solid black;
    }

    #home-transaction {
        text-align: start;
        font-size: large;
        background-color: transparent;
        border: none;
        cursor: pointer;
        margin-top: 3vh;
        border-radius: 1vh;
        padding: 1vh;
    }

    #home-transaction:hover {
        background-color: azure;
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
            visibility: hidden;
        }

        #burgerMenuButton {
            visibility: visible;
            position: fixed;
            left: 1vh;
            top: 1vh;
            background-color: transparent;
            width: 1.5em;
            font-size: xx-large;
            cursor: pointer;
            border-style: none;
            border-radius: 5vh;
            cursor: default;
        }

        #burgerMenuButton:hover {
            cursor: pointer;
            background-color: var(--accent);
        }

        #home-topBar {
            display: flex;
            flex-direction: column;
        }

        .box {
            padding: 5%;
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
        <button id="burgerMenuButton" on:click={burgerMenu}>☰</button>
        <div id="leftBar">
            
            <button on:click={() => changePage(0)} class="leftBar-button">Home</button>
            <button on:click={() => changePage(1)} class="leftBar-button">Accounts</button>
            <button on:click={() => changePage(2)} class="leftBar-button">Budget (coming soon)</button>
            <button on:click={() => changePage(3)} class="leftBar-button">Stock</button>
            <button on:click={() => changePage(4)} class="leftBar-button">Crypto</button>
            <button on:click={() => changePage(5)} class="leftBar-button">Settings</button>
        </div>
        <div id="middleBar">
            {#if currentPage == 0}
                <div id="home-topBar">
                    <div id="home-topBar-left" class="box">
                        <h2>303.47 CHF</h2>
                        <p>Top 3 assets :</p>
                        <h3>300 CHF | 0.0000001 BTC | 3 EUR</h3>
                    </div>
                    <div id="home-topBar-right" class="box">
                        <button id="home-topBar-right-add">+</button>
                        <button id="home-topBar-right-donate">Donate</button>
                        <input id="home-topBar-right-search" placeholder="Search" type="search">
                    </div>
                </div>
                <div class="blackSeparator"></div>
                
                <button id="home-transaction">1BTC => 1CHF | a random description but ok | 30th february 2023 15:13</button>
                <button id="home-transaction">1BTC => 1CHF | a random description but ok | 30th february 2023 15:13</button>
                <button id="home-transaction">1BTC => 1CHF | a random description but ok | 30th february 2023 15:13</button>
                <button id="home-transaction">1BTC => 1CHF | a random description but ok | 30th february 2023 15:13</button>
                <button id="home-transaction">1BTC => 1CHF | a random description but ok | 30th february 2023 15:13</button>
                <button id="home-transaction">1BTC => 1CHF | a random description but ok | 30th february 2023 15:13</button>
                <button id="home-transaction">1BTC => 1CHF | a random description but ok | 30th february 2023 15:13</button>
                <button id="home-transaction">1BTC => 1CHF | a random description but ok | 30th february 2023 15:13</button>
            {:else if currentPage == 1}
            <p>1</p>
            {/if}
        </div>
    </div>
    
{/if}