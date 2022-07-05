const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '9fa9bf4195c948e489eb117cbbce2bb1'
   });

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('api is not working'))
}

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('error getting count'));
}

module.exports = {
    handleImage,
    handleApiCall
}