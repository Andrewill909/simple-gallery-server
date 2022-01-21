const flickrAPI = require('../Api/flickr');

async function index(req, res, next) {
  try {
    let response = await flickrAPI.fetchFeed(req.query);

    let feeds = response?.data?.items?.map((itm) => ({
      title: itm.title,
      photo: itm.media.m,
      description: itm.description,
      published: itm.published,
      author: itm.author,
      authorId: itm.author_id,
      tags: itm.tags.length ? itm.tags.split(' ') : [],
    }));

    return res.status(200).json({
      status: 'OK',
      count: feeds?.length,
      data: feeds,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {index}
