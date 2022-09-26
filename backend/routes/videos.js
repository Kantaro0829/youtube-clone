import express from "express"
import { addVideo, addView, deleteVideo, getVideo, random, sub, trend, updateVideo } from "../controllers/video.js";
import { verifytoken } from "../verifyToken.js";

const router = express.Router();

router.post("/", verifytoken, addVideo)

router.put("/:id", verifytoken, updateVideo)

router.delete("/:id", verifytoken, deleteVideo)

router.get("/find/:id", getVideo)

router.get("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub", verifytoken, sub)



export default router;