const fetchCatagories = () => {
  fetch('https://openapi.programming-hero.com/api/news/categories')
  .then(res => res.json())
  .then(data => showCatagories(data.data.news_category))
}

const showCatagories = data => {
  // capture catagories container to append all the catagories link
  const catagoriesContainer = document.getElementById("catagories-container");
  data.forEach(singleCatagory => {
    // console.log(singleCatagory)
    const linkContainer = document.createElement("p");
    linkContainer.innerHTML = `
    <a class="nav-link" href="#" onclick="fetchCatagoryNews('${singleCatagory.category_id}', '${singleCatagory.category_name}')">${singleCatagory.category_name}</a>
    `;
    catagoriesContainer.appendChild(linkContainer);
  })
}

// fetch all newses available in a catagory
const fetchCatagoryNews = (category_id, category_name) => {
  const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`
  console.log(url)
  fetch(url)
  .then(res => res.json())
  .then(data => showAllNews(data.data, category_name))
}

const showAllNews = (data, category_name) => {
  document.getElementById("news-count").innerText = data.length; 
  document.getElementById("catagory-name").innerText = category_name; 
}