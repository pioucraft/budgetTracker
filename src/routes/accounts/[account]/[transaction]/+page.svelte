<script>
    export let data

    import { onMount } from "svelte"
    import { createSave, defaultSave} from "../../../../modules/global.js"

    var save = defaultSave
    console.log(defaultSave)
    var accounts = Object.entries(save["accounts"])

    var currentTransaction = accounts[0][1]["transactions"][0]

    onMount(async () => {
        let createdSave = (await createSave())
        save = createdSave["save"]
        console.log(save)
        accounts = createdSave["accounts"]
        console.log(accounts)
        currentTransaction = accounts[Number(data.account)][1]["transactions"][Number(data.transaction)]
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

    #wrapper-transaction {
        height: 92%;
        overflow: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
        padding-left: 5%;
    }
</style>

<div id="wrapper">
    <button on:click={() => history.back()} id="wrapper-back">←</button>

    <div id="wrapper-transaction">
        <h1>{currentTransaction[0]}</h1>
        <h2>{currentTransaction[1]} {currentTransaction[2]}</h2>
        <h2>{currentTransaction[5].toFixed(2)} {save["settings"]["defaultCurrency"]}</h2>
        <h3>{new Date(currentTransaction[4]).toLocaleTimeString(undefined, {"day": "numeric", "month": "long", "year": "numeric", "hour" : "numeric", "minute": "numeric"})}</h3>
        <h3>{(accounts[Number(data.account)] ?? ["Main account"])[0]}</h3>
    </div>
</div>