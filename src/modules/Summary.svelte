<script>
    export let bigAccount
    export let save
</script>

<style>
    p {
        font-size: large;
    }
</style>

{#if !save.isDefault}

{#each bigAccount["assets"] as asset}
    {#if asset[0] == "crypto" || asset[0] == "currency" || asset[0] == "stock"}
        <p>{asset[0]} => {asset[1][1]} {save["settings"]["defaultCurrency"]}</p>
    {/if}
{/each}

<dir style="border-bottom: solid black;"></dir>


{#each bigAccount["assets"] as asset}
    {#if asset[0] != "crypto" && asset[0] != "currency" && asset[0] != "stock"}
        <p>{asset[1][0]} {asset[0]} => {asset[1][1]} {save["settings"]["defaultCurrency"]}</p>
    {/if}
{/each}

{:else}
    <p>Loading...</p>
{/if}