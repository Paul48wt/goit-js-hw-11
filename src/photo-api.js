import axios from 'axios';
export default class PhotoApiservice {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchPhoto() {
    const API_KEY = '29200569-eac0653170ef0949875a7ef10';
    const URL = `https://pixabay.com/api/?key=${API_KEY}&q=${this.searchQuery}
        &image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`;
    return axios
      .get(URL)
      .then(response => response.data)
      .then(data => {
        this.page += 1;
        return data;
      });
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.query;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
