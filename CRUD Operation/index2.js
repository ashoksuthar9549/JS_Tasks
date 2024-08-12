// used local storage to store, edit and delete data

// fetch data through API
fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        let postData = JSON.stringify(data);
        localStorage.setItem('postData', postData);
        postData = localStorage.getItem('postData');
        postData = JSON.parse(postData);
      })
      .catch(error => console.error(error));

// function to show data
function showData(){
    postData = localStorage.getItem('postData');
    postData = JSON.parse(postData);

    postData.forEach(post => {
        const tableRow = document.createElement('tr');
        const rowData = `
                            <tr>
                                <td class="id" id="post${post.id}">${post.id}</td>
                                <td class="title" id="postTitle${post.id}">${post.title}</td>
                                <td class="body" id="postBody${post.id}">${post.body}</td>
                                <td>
                                    <button type="button" class="edit" id="edit${post.id}" onclick="editData(${post.id})">Edit</button>
                                    <button type="button" class="delete" id="delete${post.id}" onclick="removeData(${post.id})">Delete</button>
                                </td>
                            </tr>
                        `;

        tableRow.innerHTML = rowData;
        document.querySelector('tbody').appendChild(tableRow);
    

    });
}

showData();
      
// function to delete data
function removeData(post){
    const postId = document.querySelector(`#post${post}`);
    postId.parentElement.remove();

    postData = localStorage.getItem('postData');
    postData = JSON.parse(postData);

    const filteredPost = postData.filter(item => item.id != postId.textContent);
    localStorage.setItem('postData', JSON.stringify(filteredPost));

    createToast("error", "fa-circle-xmark", "Data deleted successfully");
}

// function to edit data
function editData(post){
    const postTitle = document.querySelector(`#postTitle${post}`).textContent;
    const postBody = document.querySelector(`#postBody${post}`).textContent;
    const editformData = document.querySelector('.editformData');
    const addformData = document.querySelector('.addformData');
    const updateDataButton = document.createElement('button');
    updateDataButton.innerText = 'Update';
    updateDataButton.setAttribute('onclick', `updateData(${post})`);
    updateDataButton.setAttribute('id', `updateDataButton${post}`);
    updateDataButton.classList.add('update');

    
    editformData.style.display = 'block';
    addformData.style.display = 'none';
    editformData.append(updateDataButton);
    
    let title = document.querySelector('.editformData #title');
    let body = document.querySelector('.editformData #body');

    title.value = postTitle;
    body.value = postBody;
}

// function to update data
function updateData(post){
    const postId = document.querySelector(`#post${post}`);
    let postTitle = document.querySelector(`#postTitle${post}`);
    let postBody = document.querySelector(`#postBody${post}`);
    let title = document.querySelector('.editformData #title');
    let body = document.querySelector('.editformData #body');   
    
    if(title.value == '' || body.value == ''){
        alert('Please fill all the fields');
        return;
    }
    
    postTitle.innerText = title.value;
    postBody.innerText = body.value;

    postData = localStorage.getItem('postData');
    postData = JSON.parse(postData);

    postData.forEach(item => {
        if(item.id == postId.textContent){
            item.title = title.value;
            item.body = body.value;
        }
    });
    localStorage.setItem('postData', JSON.stringify(postData));
    
    title.value = '';
    title.value = '';
    document.querySelector('.editformData').style.display = 'none';
    document.querySelector('.addformData').style.display = 'block';
    
    document.querySelector(`#updateDataButton${post}`).remove();
    
    createToast("info", "fa-circle-info", "Data updated successfully");
}

// function to add data
function addData(){
    let count = document.querySelector('tbody tr:last-child td').innerHTML;
    count = parseInt(count) + 1;

    let title = document.querySelector('.addformData #title');
    let body = document.querySelector('.addformData #body');

    if(title.value == '' || body.value == ''){
        alert('Please fill all the fields');
        return;
    }

    const tableRow = document.createElement('tr');
            const rowData = `
                                <tr>
                                    <td class="id" id="post${count}">${count}</td>
                                    <td class="title" id="postTitle${count}">${title.value}</td>
                                    <td class="body" id="postBody${count}">${body.value}</td>
                                    <td>
                                        <button type="button" class="edit" id="edit${count}" onclick="editData(${count})">Edit</button>
                                        <button type="button" class="delete" id="delete${count}" onclick="removeData(${count})">Delete</button>
                                    </td>
                                </tr>
                            `;

            tableRow.innerHTML = rowData;
            document.querySelector('tbody').appendChild(tableRow);

    postData = localStorage.getItem('postData');
    postData = JSON.parse(postData);
        
    postData.push({id: count, title: title.value, body: body.value});
    localStorage.setItem('postData', JSON.stringify(postData));

    document.querySelector('.addformData #title').value = '';
    document.querySelector('.addformData #body').value = '';

    createToast("success", "fa-circle-check", "Data added successfully");
}


// toast

const notifications = document.querySelector(".notifications");

const removeToast = (toast) => {
    toast.classList.add("hide");
    if(toast.timeoutId) clearTimeout(toast.timeoutId);
    setTimeout(() => toast.remove(), 500);
}

const createToast = (toastType, iconType, toastMsg) => {
    const toast = document.createElement("li");
    toast.classList.add("toast", toastType);
    toast.innerHTML = `<div class="column">
                         <i class="fa-solid ${iconType}"></i>
                         <span>${toastMsg}</span>
                      </div>
                      <i class="fa-solid fa-xmark" onclick="removeToast(this.parentElement)"></i>`;
    notifications.appendChild(toast);
    // toast.timeoutId = setTimeout(() => removeToast(toast), 5000);
}