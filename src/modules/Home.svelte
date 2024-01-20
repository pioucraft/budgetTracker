<script>
    import { onMount } from "svelte";

    export let bigAccount
    export let save
</script>

<style>
    #home-topBar {
        display: grid;
        grid-template-areas: "left right";
        grid-template-columns: 1.5fr 1fr;
    }

    #home-topBar-right {
        display: grid;
        grid-template-areas: "add donate"
        "search search";
        grid-template-columns: 5em auto;
        grid-template-rows: 5em auto;
        gap: 1vh;
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
        padding-left: 2%;
        padding-right: 2%;
        width: 100%;
    }

    .blackSeparator {
        width: 100%;
        border-bottom: solid black;
    }

    

    @media only screen and (max-width: 100vh) {
        #home-topBar {
            display: flex;
            flex-direction: column;
        }

        #home-topBar-right-search {
            padding-top: 1%;
            padding-bottom: 1%;
        }
    }

</style>

<div id="home-topBar">
    <div id="home-topBar-left" class="box">
        <h2>{bigAccount["total"]} {save["settings"]["defaultCurrency"]}</h2>
        <p>Top 3 assets :</p>
        <h3>{bigAccount["assets"][0][1][0] ?? "0"} {bigAccount["assets"][0][0] ?? "USD"} | {bigAccount["assets"][1][1][0] ?? "0"} {bigAccount["assets"][1][0] ?? "USD"} | {bigAccount["assets"][2][1][0] ?? "0"} {bigAccount["assets"][2][0] ?? "USD"}</h3>
    </div>
    <div id="home-topBar-right" class="box">
        <button id="home-topBar-right-add">+</button>
        <button id="home-topBar-right-donate">Donate</button>
        <input id="home-topBar-right-search" placeholder="Search" type="search">
    </div>
</div>
<div class="blackSeparator"></div>

{#each bigAccount["transactions"] as transaction}
        <a class="transaction" href={`${transaction[6]}`}>{transaction[1]} {transaction[2]} => {transaction[5].toFixed(2)} {save["settings"]["defaultCurrency"]} || {transaction[0]} || {new Date(transaction[4]).toLocaleTimeString(undefined, {"day": "numeric", "month": "long", "year": "numeric", "hour" : "numeric", "minute": "numeric"})} | {transaction[7]}</a>
{/each}