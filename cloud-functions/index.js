const Datastore = require('@google-cloud/datastore');
const datastore = new Datastore({});

/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
exports.helloGET = (req, res) => {
  const query = datastore.createQuery('kaleyma.in-blog', 'Post').order('timestamp');

  datastore
    .runQuery(query)
    .then(results => {
      const posts = results[0];

      const tasksJSON = posts.map(post => ({
        slug: post.slug,
        title: post.title,
        content: post.content,
        timestamp: post.timestamp,
      }));

      res.json(tasksJSON);

    })
    .catch(err => {
      console.error('ERROR:', err);
    });
};