<script>
    import { onMount } from 'svelte'

    import { createSave, defaultSave } from "../modules/global"

    import Home from "../modules/Home.svelte"
    import Accounts from '../modules/Accounts.svelte';
    import Settings from '../modules/Settings.svelte';
    import Summary from '../modules/Summary.svelte';

    //set variables

    var currentPage = 0

    //default variables that will change in the future

    var save = defaultSave

    var accounts = save["accounts"]
    
    var currencyConverter = {"USD": 1}
    var bigAccount = {"transactions": [], "total": 3, "assets": [[undefined, []], [undefined, []], [undefined, []]]}
    
    //change the default variables to "normal things"

    onMount(async () => {
        let createdSave = (await createSave())
        save = createdSave["save"]
        accounts = createdSave["accounts"]
        currencyConverter = createdSave["rates"]
        bigAccount = createdSave["bigAccount"]
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
        white-space: nowrap;
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
        overflow-y: scroll;
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
            <p id="temporary-cookiesConsent">THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.</p>
            <button id="temporary-start" on:click={start}>Let's start</button>
        </div>

    </div>
    
    

{:else}
    <div id="wrapper">
        <div id="leftBar">
            
            <button on:click={() => changePage(0)} class="leftBar-button selectedItem" id="leftBar-button-0">Home</button>
            <button on:click={() => changePage(1)} class="leftBar-button" id="leftBar-button-1">Accounts</button>
            <button on:click={() => changePage(2)} class="leftBar-button" id="leftBar-button-2">Budget</button>
            <button on:click={() => changePage(3)} class="leftBar-button" id="leftBar-button-3">Summary</button>
            <button on:click={() => changePage(4)} class="leftBar-button" id="leftBar-button-4">Settings</button>
            <button class="leftBar-button" on:click={() => location.href = "https://github.com/pioucraft/budgetTracker"}>Source code</button>
            <button class="leftBar-button" on:click={() => location.href="mailto:hello@gougoule.ch"}>Contact me!</button>
        </div>
        <div id="middleBar">
            {#if currentPage == 0}
                <Home bigAccount={bigAccount} save={save} />
            {:else if currentPage == 1}
                <Accounts accounts={accounts} defaultCurrency={save["settings"]["defaultCurrency"]} />
            {:else if currentPage == 2}
                <p style="text-align: center; margin-top: 40vh">I don't need budget personally, but if a lot of people use my app, I will add it. You can also ask me to add it now my <a href="mailto:hello@gougoule.ch">emailing me</a>.</p>
            {:else if currentPage == 3}
                <Summary bigAccount={bigAccount} save={save} />
            {:else if currentPage == 4}
                <Settings/>
            {:else}
                <p style="text-align: center; margin-top: 40vh">Coming soon</p>
            {/if}
        </div>
    </div>
    
{/if}