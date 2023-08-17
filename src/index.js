import axios from "axios";
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import './css/index.css';

const loadMore = document.querySelector(".load-more");
loadMore.style.display = "none";

const gallery = document.querySelector('.gallery');
const myForm = document.querySelector('#search-form');

let query;
let page = 1;
let per_page = 40;
let totalImg;

let lightbox = new SimpleLightbox('.photo-card a', {
    captionsData: "alt",
    captionDelay: 250
});

const getRequest = async (e) => {
    const response = await axios.get(`https://pixabay.com/api/?key=38733700-96318c553c84bf90463eb3752&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${page}`);
    const data = await response.data;
    const hits = await data.hits;
    totalImg = await data.totalHits;


    if (!hits.length) {
        loadMore.style.display = "none";
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
    } else {
        Notiflix.Notify.success(`Hooray! We found ${totalImg} images`);
        loadMore.style.display = "block";
        renderGallery(hits);
        page += 1;
        totalImages(totalImg);
    }
};

function totalImages(totalImg) {
    let availablePage = totalImg / 40;
    if (page > availablePage) {
        Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");
        loadMore.style.display = "none";
    }
};

function onSubmit(e) {
    e.preventDefault();
    if (e.type === 'submit') {
        page = 1;
        gallery.innerHTML = '';
        query = e.target.elements.searchQuery.value;
    }
    getRequest(query).catch(error => { console.log("Sorry, there are no images matching your search query. Please try again.") });
};

function renderGallery(hits) {
    hits.map(hit => {
        gallery.innerHTML +=
            `<div class="photo-card">
    <div class="photo-block">
        <a href="${hit.largeImageURL}">
            <img class="photo-img" src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
        </a>
    </div>
    <div class="info">
      <p class="info-item"><b>Likes</b>${hit.likes}</p>
      <p class="info-item"><b>Views</b>${hit.views}</p>
      <p class="info-item"><b>Comments</b>${hit.comments}</p>
      <p class="info-item"><b>Downloads</b>${hit.downloads}</p>
    </div>
</div>`;
    });
    lightbox.refresh();
}

myForm.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', onSubmit);

// TEST!!!!!!!!!!!!!!!!!!!!!!!!!!!
const testButton = document.querySelector(".test-button");
const testDiv = document.querySelector(".test-div");

function ttt(e) {
    getTestRequest().then(req => {
        req.data.forEach(element => {
            console.log(element._id)
        })
    })
}

const getTestRequest = async (e) => {
    return await axios.get("https://tasty-treats-backend.p.goit.global/api/categories");
};

testButton.addEventListener('click', ttt);
