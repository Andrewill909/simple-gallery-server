const axios = require('axios');

function fetchFeed(query) {
  let tags = (Array.isArray(query.tags) && query.tags.join(',')) || query.tags || '';
  let id = query.id || '';

  //? Create query params
  const search = new URLSearchParams({ format: 'json', nojsoncallback: 1, id, tags });
  return axios.get('https://www.flickr.com/services/feeds/photos_public.gne', { params: search });
}
