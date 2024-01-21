<script>
    export let data

    import { onMount } from "svelte"
    import { createSave, defaultSave } from "../../../modules/global.js"

    var save = defaultSave

    var accounts = Object.entries(save["accounts"])
    
    var currencyConverter = {"USD": 1}

    onMount(async () => {
        save = (await createSave())["save"]
        accounts = (await createSave())["accounts"]
        currencyConverter = (await createSave())["rates"]
        
    })

    
    $: currentAccount = accounts[data.account]

    function test() {
        alert(new Date(document.getElementById("dateInput").value).getTime())
    }


    
</script>

<p>{JSON.stringify(currentAccount)}</p>

{#each currentAccount[1]["transactions"] as transaction}
    <p>{JSON.stringify(transaction[1])} => {(transaction[1]/currencyConverter[transaction[2]]*currencyConverter[save["settings"]["defaultCurrency"]]).toFixed(2)} || {transaction[0]} || </p>
{/each}


<button on:click={test}>q</button>