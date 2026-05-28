const apiKey = 'fc70e5bcc0a441e9abda425db9bcad5d';
const blogContainer = document.getElementById('bolg-container');
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
async function fetchRandomNews() { //take note of the async here, it is used because of "await"
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json(); 
        return data.articles;
    }catch(error){
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener("click", async () => { //async because of await
    const query = searchInput.value.trim();  //trim is a function
    if(query){
        try{    
            const apiUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(query)}&pageSize=10&apikey=${apiKey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayBlogs(data.articles);
        }catch(error){
            console.error("Error fetching search results", error);
        }
    }
});

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div")
        blogCard.classList.add("bloq-card")
        const img = document.createElement("img")
        img.src = article.urlToImage
        img.alt = article.title
        const title = document.createElement("h2")
        const trunc = article.title.length > 30? article.title.slice(0, 30) + "....": article.title;
        title.textContent = trunc
        const description = document.createElement("p")
        description.textContent = article.description

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener("click", () => { 
            window.open(article.url, "_blank");
        });
        blogContainer.appendChild(blogCard)
    });
}

(async ()=>{
    try{
       const articles = await fetchRandomNews();
       displayBlogs(articles);  
    } catch(error){
        console.error("Error fetching random news", error);
    }
})();