let fetchData = [];
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
  // console.log(url)
  fetch(url)
  .then(res => res.json())
  .then(data => {
    fetchData = data.data;
    showAllNews(data.data, category_name)
  })
}

const showAllNews = (data, category_name) => {
  // console.log(data);
  document.getElementById("news-count").innerText = data.length; 
  document.getElementById("catagory-name").innerText = category_name;

  const newsContainer = document.getElementById("all-news");
  newsContainer.innerText = "";
  data.forEach(singleNews => {
    const {_id, image_url, title, details, author, total_view} = singleNews;
    const card = document.createElement("div");
    card.classList.add("card", "mb-3");
    // console.log();
    card.innerHTML = `
    <div class="row g-0">
            <div class="col-md-4">
              <img src="${image_url}" class="img-fluid rounded-start" alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${title}</h5>
                <p class="card-text">${details.slice(0, 200)}...</p>
              </div>
              <div class="card-footer border-0 bg-body d-flex justify-content-between">
              <div class="d-flex gap-2">
              <img src="${author.img}" class="img-fluid rounded-circle" height="40" width="40" alt="...">
              <div>
              <p class="m-0 p-0">${author.name ? author.name : "not availble"}</p>
              <p class="m-0 p-0">${author.published_date}</p>
              </div>
              </div>
              <div class="d-flex align-items-center">
              <i class="fa-regular fa-eye"></i>
              <p class="m-0 p-0">${total_view ? total_view : "not available"}</p>
              </div>
              <div>
              <i class="fa-regular fa-star"></i>
              </div>
              <div>
              <i class="fa-solid fa-arrow-right" onclick="showFetchDetails('${_id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
              </div>
              </div>
            </div>
          </div>
    `;
    newsContainer.appendChild(card);
  })
}

const showFetchDetails = news_id => {
  const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
  fetch(url)
  .then(res => res.json())
  .then(data => showNewsDetails(data.data[0]));
}

const showNewsDetails = newsDetails => {
  console.log(newsDetails);
  const {_id, image_url, title, details, author, total_view, others_info} = newsDetails;
  document.getElementById("modal-body").innerHTML = `
  <div class="card mb-3">
  <div class="row g-0">
          <div class="col-md-12">
            <img src="${image_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-12">
            <div class="card-body">
              <h5 class="card-title">${title} <span class="badge text-bg-warning">${others_info.is_trending? "is trending" : "not trending"}</span>
              </h5>
              <p class="card-text">${details}</p>
            </div>
            <div class="card-footer border-0 bg-body d-flex justify-content-between">
            <div class="d-flex gap-2">
            <img src="${author.img}" class="img-fluid rounded-circle" height="40" width="40" alt="...">
            <div>
            <p class="m-0 p-0">${author.name}</p>
            <p class="m-0 p-0">${author.published_date}</p>
            </div>
            </div>
            <div class="d-flex align-items-center">
            <i class="fa-regular fa-eye"></i>
            <p class="m-0 p-0">${total_view}</p>
            </div>
            <div>
            <i class="fa-regular fa-star"></i>
            </div>
            </div>
          </div>
        </div>
  </div>
  `;
}

const showsTrending = () => {
  console.log(fetchData)
  const trendingNews = fetchData.filter(singleData => singleData.others_info.is_trending === true);

  const catagoryName = document.getElementById("catagory-name").innerText;
  showAllNews(trendingNews, catagoryName);
}