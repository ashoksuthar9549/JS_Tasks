const dragItems = document.querySelectorAll('.kanban-item');
const dragColumns = document.querySelectorAll('.kanban-column');
const toaster = document.querySelector('.toaster');
let data = null;
let dragStartColumn = null;
let dragEndColumn = null;

dragItems.forEach(item => {
    item.addEventListener('dragstart', (e) => {
        item.classList.add('dragging');

        data = e.target;
        dragStartColumn = e.target.parentElement.querySelector('.kanban-column-title').textContent;
        console.log(data, dragStartColumn);
    });

    item.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    item.addEventListener('dragend', (e) => {
        e.preventDefault();
        item.classList.remove('dragging');
    });

    item.addEventListener('drop', (e) => {
        e.preventDefault();

        const dropColumn = e.target.closest('.kanban-column');
        dragEndColumn = dropColumn.querySelector('.kanban-column-title').textContent;

        if (dropColumn) {

            if(dragStartColumn == "New" && dragEndColumn == "Assigned To"){
                dropColumn.appendChild(data);
            } else if(dragStartColumn == "New" && dragEndColumn == "Closed"){
                toaster.style.display = "block";
                toaster.children[1].textContent = "Can't move item from New to Closed";
                setTimeout(() => {
                    toaster.style.display = "none";
                }, 5000);
            } else if(dragStartColumn == "Assigned To" && dragEndColumn == "Closed"){
                dropColumn.appendChild(data);
            } else if(dragStartColumn == "Assigned To" && dragEndColumn == "New"){
                toaster.style.display = "block";
                toaster.children[1].textContent = "Can't move item from Assigned To to New";
                setTimeout(() => {
                    toaster.style.display = "none";
                }, 5000);
            } else if(dragStartColumn == "Closed" && dragEndColumn == "New"){
                toaster.style.display = "block";
                toaster.children[1].textContent = "Can't move item from Closed to New";
                setTimeout(() => {
                    toaster.style.display = "none";
                }, 5000);
            } else if(dragStartColumn == "Closed" && dragEndColumn == "Assigned To"){
                toaster.style.display = "block";
                toaster.children[1].textContent = "Can't move item from Closed to Assigned To";
                setTimeout(() => {
                    toaster.style.display = "none";
                }, 5000);
            }
        } else {
            alert("Not a column");
        }
    });
});