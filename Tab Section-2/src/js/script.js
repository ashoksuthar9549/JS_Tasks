const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

tabs.forEach(tab =>{
    tab.addEventListener('click', () =>{
        tabs.forEach(tab => tab.classList.remove('active', 'bg-white'));
        tab.classList.add('active', 'bg-white');

        panels.forEach(panel => {
            panel.classList.add('hidden');
        })
        
        const tabPanel = document.querySelector(`#data-tab${tab.getAttribute('data-tab')}`);
        tabPanel.classList.remove('hidden');
    })
})

async function fetchUser(){
    const url = 'https://jsonplaceholder.typicode.com/users';
    const response = await fetch(url);
    const data = await response.json();

    const users = data;
    users.forEach(user => {
        tabs.forEach(tab => {
            if(tab.getAttribute('data-tab') == user.id){
                tab.innerHTML = user.name;
            }
        })
    });
}

async function fetchPost(){
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const response = await fetch(url);
    const data = await response.json();

    const posts = data;
    posts.forEach(post => {
        panels.forEach(panel => {
            if(panel.getAttribute('id') === `data-tab${post.id}`){
                const postTitle = document.createElement('h2');
                const postBody = document.createElement('p');

                postTitle.classList.add('text-3xl', 'font-bold');
                postBody.classList.add('text-lg');

                postTitle.innerText = post.title;
                postBody.innerText = post.body;

                panel.append(postTitle, postBody);
            }
        })
    });
}

fetchUser();
fetchPost();