const category = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const tabs = document.querySelector('.tabs');
const panels = document.querySelector('.panels');
const loader = document.querySelector('.loader');

category.forEach((category, index) => {
    const tabElement = document.createElement('div');
    tabElement.classList.add('tab', 'rounded-[100px]', 'py-2', 'px-20', 'm-5', 'inline-block');
    tabElement.innerHTML = category;
    tabs.appendChild(tabElement);

    const tabpanelElement = document.createElement('div');
    tabpanelElement.classList.add('panel', 'hidden');
    panels.appendChild(tabpanelElement);
})

const allTab = document.querySelectorAll('.tab');
const panel = document.querySelectorAll('.panel');

allTab.forEach((tab, index) => {
    tab.addEventListener('click', () => {

        allTab.forEach(t => t.classList.remove('bg-white'));
        tab.classList.add('bg-white');
        
        panel.forEach((panel) => {
            panel.classList.add('hidden');
        })
        panel[index].classList.remove('hidden');
        
        const tabCategory = tab.innerText.toLowerCase();
        getNewsData(tabCategory, index);
    })
})

async function getNewsData(category, index) {
    loader.classList.remove('hidden');
    const url = `https://saurav.tech/NewsAPI/top-headlines/category/${category}/in.json`;
    const response = await fetch(url);
    const data = await response.json();
    loader.classList.add('hidden');

    const newsContainer = document.createElement('div');
    newsContainer.classList.add('news-container', 'grid', 'gap-4', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'p-4');
    let panel = document.querySelectorAll('.panel');
    panel = panel[index];
    const articles = data.articles;

    articles.forEach(article => {
        let url = article.url;
        let description = article.description;
        let imageUrl = article.urlToImage;
        
        const newCard = document.createElement('div');
        newCard.innerHTML = `
                            <a href="${url} " target="_blank">
                                <div class="news-card bg-purple-300 rounded-lg min-h-[300px] h-[300px] relative">
                                    <img src="${imageUrl}" alt="news image" class="h-[150px] w-full rounded-t-lg object-cover">
                                    <div class="p-4">
                                        <p class="line-clamp-3">${description}</p>
                                        <button type="button" href="${url}" target="_blank" class="inline-block p-2 rounded-lg text-right bg-green-500 text-white absolute bottom-2 right-4">Read more</button>   
                                    </div>
                                </div>
                            </a>
        `;
        newsContainer.appendChild(newCard);
        panel.appendChild(newsContainer);

    })
}