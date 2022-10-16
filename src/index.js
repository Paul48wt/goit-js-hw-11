import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import PhotoApiService from './photo-api.js';
const formInput = document.querySelector('.search-form');
const gallery = document.querySelector('.gallery');
const loadMoreButton = document.querySelector('.load-more');
const photoApiService = new PhotoApiService();
formInput.addEventListener('submit', onFormSubmit);
loadMoreButton.addEventListener('click', onLoadMore);

async function onFormSubmit(event) {
  event.preventDefault();
  clearPhotoContainer();
  photoApiService.resetPage();
  photoApiService.query = event.target.elements.searchQuery.value;
  const serchResult = await photoApiService.fetchPhoto();
  console.log(serchResult);

  messeges(serchResult);

  const markup = createMarkup(serchResult);
  populateGallery(markup);

  showHideLoadMoreBtn(serchResult);
}

async function onLoadMore() {
  const serchResult = await photoApiService.fetchPhoto();
  populateGallery(createMarkup(serchResult));
  if (serchResult.hits.length < 40) {
    loadMoreButton.classList.add('is-hidden');
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

function createMarkup(data) {
  return data.hits
    .map(
      item =>
        `<div class="photo-card">
        <a href="${item.largeImageURL}"><img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" /></a>
      <div class="info">
        <p class="info-item">
          <b>Likes </b>
          ${item.likes}
        </p>
        <p class="info-item">
          <b>Views</b>
          ${item.views}
        </p>
        <p class="info-item">
          <b>Comments</b>
          ${item.comments}
        </p>
        <p class="info-item">

          <b>Downloads </b>${item.downloads}
        </p>
      </div>
      </div>`
    )
    .join('');
}

function populateGallery(markup) {
  gallery.insertAdjacentHTML('beforeend', markup);
}
function messeges(data) {
  if (data.hits.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  } else {
    Notiflix.Notify.info(`Hooray! We found ${data.total} images.`);
  }
}

function clearPhotoContainer() {
  gallery.innerHTML = '';
}

function showHideLoadMoreBtn(data) {
  if (data.hits.length >= 40) {
    loadMoreButton.classList.remove('is-hidden');
  } else {
    loadMoreButton.classList.add('is-hidden');
  }
}
const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionPosition: 'bottom',
  captionDelay: 250,
});
