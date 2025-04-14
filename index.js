let Myleads = [];
const inputEl = document.getElementById("input-el");
const input_button = document.getElementById("input-btn");
const unorder = document.getElementById("unli");
const delete_button = document.getElementById("delete-btn");
const leadsFromLocalstorage=JSON.parse(localStorage.getItem("Myleads"));
const save_tab=document.getElementById("tab-btn");

//localStorage.clear()

if(leadsFromLocalstorage){
    Myleads=leadsFromLocalstorage;
    render(Myleads);
}

save_tab.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        Myleads.push(tabs[0].url)
        localStorage.setItem("Myleads", JSON.stringify(Myleads) )
        render(Myleads)
    })
})

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        //unorder.innerHTML+="<li>" + Myleads[i] + "</li>";
        listItems += `
        <li> 
            <a target="_blank" href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li>
    `
    }
    unorder.innerHTML = listItems
}


input_button.addEventListener("click", function () {
    Myleads.push(inputEl.value);
    inputEl.value = ""
    localStorage.setItem("Myleads",JSON.stringify(Myleads));
    render(Myleads);

    console.log(localStorage.getItem("Myleads"));
})

delete_button.addEventListener("dblclick",function(){
    localStorage.clear();
    Myleads=[];
    render(Myleads)
})
