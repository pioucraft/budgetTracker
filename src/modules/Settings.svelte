<script>

    function importSave() {
        document.getElementById('fileInput').click();
    }
    
    function exportSave() {
        downloadJSONFile(JSON.parse(localStorage.getItem("save")), "save.txt")
    }

    function downloadJSONFile(data, filename) {
        
        const jsonData = JSON.stringify(data, null, 2);

        
        const blob = new Blob([jsonData], { type: 'application/json' });

        const link = document.createElement('a');

        link.download = filename;
        link.href = URL.createObjectURL(blob);

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);
    }

    function handleFileChange() {
    
        const fileInput = document.getElementById('fileInput');
        const selectedFile = fileInput.files[0];

        if (selectedFile) {
            
            const reader = new FileReader();

            reader.onload = function (e) {
            
                const fileContent = e.target.result;
                if(confirm("Do you really want to import this save ? The loaded save will be erased (except if you have a backup). ARE YOU SURE ?")) {
                    localStorage.setItem("save", (fileContent))
                    window.location.reload()
                }

            };

            
            reader.readAsText(selectedFile);
        }
    }

</script>

<style>
    #wrapper {
        display: flex;
        flex-direction: column;
        align-items: start;
    }

    button {
        margin-top: 3vh;
        background-color: var(--primary);
        border: none;
        border-radius: 1vh;
        font-size: larger;
        padding: 1%;
        cursor: pointer;
    }

    button:hover {
        background-color: var(--accent);
    }
</style>

<div id="wrapper">
    <button on:click={exportSave}>Export save</button>
    <button on:click={importSave}>Import save</button>

    <input type="file" id="fileInput" style="display: none;" on:change={handleFileChange}/>
</div>