const router = require('express').Router();
const { getThoughts, getSingleThought, createThought, updateThought, deleteThought, createReaction, deleteReaction } = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').delete(deleteThought).get(getSingleThought).put(updateThought);

router.route('/:thoughtId/reactions').post(createReaction)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

module.exports = router;