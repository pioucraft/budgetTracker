<script>
    export let bigAccount
    export let save
</script>

<style>
    p {
        font-size: large;
    }
</style>
{#each bigAccount["assets"] as asset}
    {#if asset[0] == "crypto" || asset[0] == "currency"}
        <p>{asset[0]} => {asset[1][1]} {save["settings"]["defaultCurrency"]}</p>
    {/if}
{/each}

<dir style="border-bottom: solid black;"></dir>


{#each bigAccount["assets"] as asset}
    {#if asset[0] != "crypto" && asset[0] != "currency"}
        <p>{asset[1][0]} {asset[0]} => {asset[1][1]} {save["settings"]["defaultCurrency"]}</p>
    {/if}
{/each}