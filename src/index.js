import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";
import Notiflix from 'notiflix';

const loadMore = document.querySelector(".load-more");
loadMore.style.display = "none";

const gallery = document.querySelector('.gallery');
const myForm = document.querySelector('#search-form');

let query;
let page = 1;
let per_page = 3;

// let simpleGallery = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });
var lightbox = new SimpleLightbox('.gallery a');
const getRequest = async (e) => {
    const response = await axios.get(`https://pixabay.com/api/?key=38733700-96318c553c84bf90463eb3752&q=${e}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${page}`);
    const data = await response.data;
    const hits = await data.hits;
    if (hits.length) { return hits }
    else Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
};

function onSubmit2(e) {
    e.preventDefault();
    if (e.type === 'submit') {
        page = 1;
        gallery.innerHTML = '';
        query = e.target.elements.searchQuery.value
    }
    getRequest(query).then(hits => hits.map(hit => {
        // gallery.innerHTML += `
        // <div class="photo-card">
        //     <img src=${hit.webformatURL} alt=${hit.tags} loading="lazy" />
        //     <div class="info">
        //         <p class="info-item">
        //             <b>Likes ${hit.likes}</b>
        //         </p>
        //         <p class="info-item">
        //             <b>Views ${hit.views}</b>
        //         </p>
        //         <p class="info-item">
        //             <b>Comments ${hit.comments}</b>
        //         </p>
        //         <p class="info-item">
        //             <b>Downloads ${hit.downloads}</b>
        //         </p>
        //     </div>
        // </div>`
        gallery.innerHTML += `<a href="${hit.webformatURL}"><img src="${hit.previewURL}")></a>`;
        // alt = "${hit.tags}"

    }).join(""))
        .then(page += 1)
        .then(lightbox.refresh())
        .then(loadMore.style.display = "block")
        .catch(error => { console.log("Sorry, there are no images matching your search query. Please try again.") });
};


myForm.addEventListener('submit', onSubmit2);
loadMore.addEventListener('click', onSubmit2);



