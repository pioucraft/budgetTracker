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

    .home-transaction {
        text-align: start;
        padding: 1%;
        font-size: large;
        background-color: transparent;
        border: none;
        cursor: pointer;
    }

    .home-transaction:hover {
        background-color: azure;
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

<button class="home-transaction">1 BTC => 1 CHF ||  Description of the thing || 23rd august 2048 || Main account</button>
<button class="home-transaction">1 BTC => 1 CHF ||  Description of the thing || 23rd august 2048 || Main account</button>
<button class="home-transaction">1 BTC => 1 CHF ||  Description of the thing || 23rd august 2048 || Main account</button>