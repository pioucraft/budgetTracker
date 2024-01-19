<script>
    export let data

    import { onMount } from "svelte"
    import { createSave, defaultSave } from "../../../modules/global.js"

    var save = defaultSave

    var accounts = Object.entries(save["accounts"])
    
    var currencyConverter = {"USD": 1}

    var currentAccount = accounts[0]

    onMount(async () => {
        save = (await createSave())["save"]
        accounts = (await createSave())["accounts"]
        currencyConverter = (await createSave())["rates"]
        currentAccount = accounts[Number(data.account)]
    })

    


</script>

<style>

    #wrapper {
        height: 100vh;
    }

    #wrapper-back {
        height: 8%;
        padding-left: 1%;
        cursor: pointer;
        font-size: xx-large;
        background: none;
        border: none;
    }

    #wrapper-transactions {
        height: 92%;
        overflow: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
</style>



<div id="wrapper">
    <button on:click={() => history.back()} id="wrapper-back">←</button>

    <div id="wrapper-transactions">
    {#each currentAccount[1]["transactions"] as transaction}
        <button class="transaction">{transaction[1]} {transaction[2]} => {(transaction[1]/currencyConverter[transaction[2]]*currencyConverter[save["settings"]["defaultCurrency"]]).toFixed(2)} {save["settings"]["defaultCurrency"]} || {transaction[0]} || {new Date(transaction[4]).toLocaleTimeString(undefined, {"day": "numeric", "month": "long", "year": "numeric", "hour" : "numeric", "minute": "numeric"})}</button>
    {/each}
    </div>
    

</div>
