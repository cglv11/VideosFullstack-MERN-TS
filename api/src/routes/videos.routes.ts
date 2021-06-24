import {Router} from 'express';
// import {createVideo, getVideo, getVideos, updateVideo, deleteVideo} from './videos.controller';
import * as videoController from './videos.controller'

const router = Router();

router.post('/videos/', videoController.createVideo);

router.get('/videos/:id', videoController.getVideo);

router.get('/videos', videoController.getVideos);

router.delete('/videos/:id', videoController.deleteVideo);

router.put('/videos/:id', videoController.updateVideo);

export default router;