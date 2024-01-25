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

    function deleteTransaction() {
        let confirmed = confirm("Do you really want to delete this transaction ? THIS ACTION CAN'T BE REVERSED !")
        if(confirmed) {
            save["accounts"][accounts[data.account][0]]["transactions"].splice(data.transaction, 1)
            localStorage.setItem("save", JSON.stringify(save))
            history.back()
        }
    }
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

    #deleteTransaction {
        position: fixed;
        top: 2vh;
        right: 1vw;
        background-color: red;
        border: none;
        border-radius: 1vh;
        font-size: large;
        padding: 1vh;
        cursor: pointer;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgb(0, 0, 0) 0px 1px 3px -1px;
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

    <button on:click={deleteTransaction} id="deleteTransaction">Delete transaction</button>
</div>