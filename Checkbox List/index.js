const checkList = document.querySelector(".checklist");
const addItemBtn = document.querySelector("#add");
const inputField = document.querySelector("#input");
const itemsContainer = document.querySelector(".items");
const list = document.querySelector("#list");

if(inputField.value == "") {
    addItemBtn.classList.add("disabled");
}

inputField.addEventListener("keyup", (e) => {
    e.preventDefault();

    if(inputField.value == "") {
        addItemBtn.classList.add("disabled");
    } else {
        addItemBtn.classList.remove("disabled");
    }
});


const updateLocalStorage = () => {
    const items = [];
    list.querySelectorAll(".item").forEach((item) => {
        const itemObj = {
            text: item.querySelector(".item-label").textContent,
            checked: item.querySelector(".item-toggle").classList.contains("marked")
        };
        items.push(itemObj);
    });
    localStorage.setItem("checklistItems", JSON.stringify(items));
};

const savedItems = JSON.parse(localStorage.getItem("checklistItems"));
if (savedItems) {
    savedItems.forEach((itemObj) => {
        const item = document.createElement("li");
        item.classList.add("item");
        item.innerHTML = `
            <div class="item-toggle ${itemObj.checked ? 'marked' : ''}"></div>
            <label for="item" class="item-label">${itemObj.text}</label>
            <button class="delete">+</button>
        `;
        if (itemObj.checked) {
            item.querySelector(".item-label").style.textDecoration = "line-through";
        }
        list.appendChild(item);
    });
}

addItemBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (inputField.value === "") {
        return;
    }

    
    const itemsToAdd = inputField.value.split(",");
    itemsToAdd.forEach(text => {
        const item = document.createElement("li");
        item.classList.add("item");
        item.innerHTML = `
            <div class="item-toggle"></div>
            <label for="item" class="item-label">${text.trim()}</label>
            <button class="delete">+</button>
        `;
        list.appendChild(item);
    });

    inputField.classList.add("disabled");
    inputField.value = "";

    updateLocalStorage();
});

list.addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("item-toggle")) {
        target.classList.toggle("marked");
        const itemLabel = target.parentElement.querySelector(".item-label");
        if (target.classList.contains("marked")) {
            itemLabel.style.textDecoration = "line-through";
        } else {
            itemLabel.style.textDecoration = "none";
        }

        updateLocalStorage();
    } else if (target.classList.contains("delete")) {
        target.parentElement.remove();
        
        updateLocalStorage();
    }
});
