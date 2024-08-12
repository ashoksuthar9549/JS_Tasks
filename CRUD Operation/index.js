// fetch data through API
fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        data.forEach(post => {
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
      })
      .catch(error => console.error(error));
      
// function to delete data
function removeData(post){
    const postId = document.querySelector(`#post${post}`);
    postId.parentElement.remove();

    alert('Data deleted successfully');
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

    
    title.value = '';
    title.value = '';
    document.querySelector('.editformData').style.display = 'none';
    document.querySelector('.addformData').style.display = 'block';
    
    document.querySelector(`#updateDataButton${post}`).remove();
    alert('Data updated successfully');
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

    document.querySelector('.addformData #title').value = '';
    document.querySelector('.addformData #body').value = '';

    alert('Data added successfully');
}