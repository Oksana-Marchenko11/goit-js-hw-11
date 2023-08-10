import axios from "axios";
document.querySelector('.example').style.display = 'none';

const gallery = document.querySelector('.gallery');

const myForm = document.querySelector('#search-form');

const getRequest = async (e) => {
    const response = await axios.get(`https://pixabay.com/api/?key=38733700-96318c553c84bf90463eb3752&q=${e}&image_type=photo&orientation=horizontal&safesearch=true`);
    const data = await response.data;
    const hits = await data.hits;
    console.log(hits);
    return hits;
};

function onSubmit2(e) {
    e.preventDefault();
    let query = e.currentTarget.elements.searchQuery.value
    if (query) getRequest(query).then(hits => hits.map(hit => {
        console.log(hit);
        gallery.innerHTML += `<div class="photo-card">
    <img src=${hit.webformatURL} alt=${hit.tags} loading="lazy" />
    <div class="info">
        <p class="info-item">
            <b>Likes ${hit.likes}</b>
        </p>
        <p class="info-item">
            <b>Views ${hit.views}</b>
        </p>
        <p class="info-item">
            <b>Comments ${hit.comments}</b>
        </p>
        <p class="info-item">
            <b>Downloads ${hit.downloads}</b>
        </p>
    </div>
</div>`;
    }).join("")
    );
}

myForm.addEventListener('submit', onSubmit2);


