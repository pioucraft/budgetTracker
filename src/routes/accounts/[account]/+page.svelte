<script>
    export let data

    import { onMount } from "svelte"
    import { createSave, defaultSave} from "../../../modules/global.js"

    var save = defaultSave

    var accounts = Object.entries(save["accounts"])
    
    var currencyConverter = {"USD": 1}

    var currentAccount = accounts[0]

    var currentLocation = ""

    onMount(async () => {
        let createdSave = (await createSave())
        save = createdSave["save"]
        accounts = createdSave["accounts"]
        currencyConverter = createdSave["rates"]
        currentAccount = accounts[Number(data.account)]
        currentLocation = window.location.href
    })

    function deleteAccount() {
        let confirmed = confirm("Do you really want to delete this account ? THIS ACTION CAN'T BE REVERSED !")
        if(confirmed) {
            delete save["accounts"][accounts[data.account][0]]
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

    #wrapper-transactions {
        height: 92%;
        overflow: auto;
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    #deleteAccount {
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

    <div id="wrapper-transactions">
    {#each currentAccount[1]["transactions"] as transaction}
        <a class="transaction" href={`${currentLocation}/${currentAccount[1]["transactions"].indexOf(transaction)}`}>{transaction[1]} {transaction[2]} => {transaction[5].toFixed(2)} {save["settings"]["defaultCurrency"]} || {transaction[0]} || {new Date(transaction[4]).toLocaleTimeString(undefined, {"day": "numeric", "month": "long", "year": "numeric", "hour" : "numeric", "minute": "numeric"})}</a>
    {/each}
    </div>
    
    <button on:click={deleteAccount} id="deleteAccount">Delete account</button>
</div>