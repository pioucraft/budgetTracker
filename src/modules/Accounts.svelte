<script>
    export let accounts
    export let defaultCurrency
</script>

{#each accounts as account}
    <a href={`accounts/${accounts.indexOf(account)}`} id="accounts-account" class="box">
        <h2>{account[0]}</h2>
        <h3>{account[1]["total"]} {defaultCurrency}</h3>
        <p>Top 3 assets :</p>
        <h4>{account[1]["topAssets"][0][1][0] ?? "0"} {account[1]["topAssets"][0][0] ?? "USD"} | {account[1]["topAssets"][1][1][0] ?? "0"} {account[1]["topAssets"][1][0] ?? "USD"} | {account[1]["topAssets"][2][1][0] ?? "0"} {account[1]["topAssets"][2][0] ?? "USD"}</h4>
    </a>
{/each}

<style>
    #accounts-account {
        cursor: pointer;
    }

    #accounts-account:hover {
        background-color: var(--accent);
    }
</style>