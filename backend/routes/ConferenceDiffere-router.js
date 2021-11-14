const express = require('express')

const ConferenceDiffereCtrl = require('../controllers/conferenceDiffere-ctrl')
const uploadVideo = require('../middleware/multer-video-config');

const router = express.Router()

router.post('/', ConferenceDiffereCtrl.create)
router.put('/:id', ConferenceDiffereCtrl.update)
router.delete('/:id', ConferenceDiffereCtrl.deleteOne)
router.get('/:id', ConferenceDiffereCtrl.getOne)
router.get('/', ConferenceDiffereCtrl.getAll)
router.get('/get_event_conference_differe/:id', ConferenceDiffereCtrl.getEventConferenceDiffere)
router.delete('delete_all_conference_differe_event/:id', ConferenceDiffereCtrl.deleteAllConfenceDiffereFromEvent)

module.exports = router


