<script>
    import { onMount } from "svelte";
    import { createSave, defaultSave } from "../../modules/global"

    let save = defaultSave

    var currencyConverter = {"USD": 1}

    let currentType = "transaction"

    onMount(async () => {
        save = (await createSave())["save"]
        currencyConverter = (await createSave())["rates"]
        var now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

        document.getElementById('dateInput').value = now.toISOString().slice(0,16);
        document.getElementById("currencySelector").value = "CHF"
    })


    function addTransaction() {
        let type = "currency"
        let currency = save["settings"]["defaultCurrency"]
        if(type == "currency" && document.getElementById("currencySelector").value != "default") {
            currency = document.getElementById("currencySelector").value
        }
        let transaction = [
            document.getElementById("transactionName").value,
            Number(document.getElementById("amount").value)*Number(document.getElementById("incomeOrExpense").value+"1"),
            currency,
            type,
            new Date(document.getElementById("dateInput").value).getTime()
        ]
        save["accounts"][document.getElementById("selectAccount").value].transactions.push(transaction)
        localStorage.setItem("save", JSON.stringify(save))
        history.back()
    }

    function addAccount() {
        let accountName = document.getElementById("accountName").value
        if(save["accounts"].hasOwnProperty(accountName)) {
            alert("This account already exists")
        }
        else {
            save["accounts"][accountName] = {"transactions": []}
            localStorage.setItem("save", JSON.stringify(save))
            history.back()
        }
    }
</script>

<style>
    #wrapper {
        display: flex;
        flex-direction: column;
        align-items: start;
        padding-left: 1%;
        padding-right: 1%;
    }

    #back {
        height: 8%;
        padding-left: 1%;
        cursor: pointer;
        font-size: xx-large;
        background: none;
        border: none;
    }

    select {
        background-color: var(--primary);
        border: none;
        border-radius: 1vh;
        font-size: large;
        padding: 1vh;
        cursor: pointer;
    }

    select:hover {
        background-color: var(--accent);
    }

    input {
        background-color: var(--secondary);
        border: none;
        border-radius: 1vh;
        font-size: large;
        padding: 1vh;
        outline: none;
        box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
    }

    input:hover {
        background-color: var(--accent);
    }

    h2 {
        margin-top: 5vh;
    }



    #selectType {
        margin-top: 3vh;
    }

    #transactionAmountDiv {
        display: grid;
        grid-template-areas: "1 2 3";
        gap: 1.5vw;
    }

    #addTransaction, #addAccount {
        background-color: var(--primary);
        border: none;
        border-radius: 1vh;
        font-size: large;
        padding: 1vh;
        cursor: pointer;
        margin-top: 5vh;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgb(0, 0, 0) 0px 1px 3px -1px;
    }

    #addTransaction:hover, #addAccount:hover {
        background-color: var(--accent);
    }

    @media only screen and (max-width: 100vh) {
        #wrapper {
            align-items: center;
        }

        #back {
            position: fixed;
            left: 1%;
        }
    }
    
</style>

<div id="wrapper">

    <button on:click={() => history.back()} id="back">←</button>

    <select name="type" id="selectType" on:change={() => currentType = document.getElementById("selectType").value}>
        <option value="transaction">Transaction</option>
        <option value="account">Account</option>
    </select>

    {#if currentType == "transaction"}
    <h2>Description of the transaction :</h2>
    <input type="text" name="transactionName" id="transactionName">

    <h2>Amount :</h2>
    <div id="transactionAmountDiv">
        <select name="incomeOrExpense" id="incomeOrExpense">
            <option value="+">+</option>
            <option value="-">-</option>
        </select>
        <input type="number" id="amount">
        <select name="currency" id="currencySelector">
            <option value="default">Default</option>
            {#each Object.entries(currencyConverter) as currencyRate}
                <option value="{currencyRate[0]}">{currencyRate[0]}</option>
            {/each}
        </select>
    </div>

    <h2>Select account :</h2>
    <select name="account" id="selectAccount">
        {#each Object.entries(save["accounts"]) as account}
            <option value="{account[0]}">{account[0]}</option>
        {/each}
    </select>


    <h2>Date :</h2>
    <input id="dateInput" type="datetime-local" value="2024-01-01T00:00">

    <button id="addTransaction" on:click={addTransaction}>Add the transaction !</button>

    {:else if currentType == "account"}
        <h2>Account name :</h2>
        <input type="text" id="accountName">

        <button id="addAccount" on:click={addAccount}>Add account !</button>
    {/if}
</div>