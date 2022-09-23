import express from "express"
import { test, update, deleteUser, getUser, subscribe, unsubscribe, like, dislike} from "../controllers/user.js";
import { verifytoken } from "../verifyToken.js";

const router = express.Router();

//UPDATE USER
router.put("/:id", verifytoken, update)

//DELETE USER
router.delete("/:id", verifytoken, deleteUser)

//GET A USER
router.get("/find/:id", getUser)

//SUBSCRIBE A USER
router.put("/sub/:id", verifytoken, subscribe)

//UNSUBSCRIBE USER
router.put("/unsub/:id", verifytoken, unsubscribe)

//LIKE A VIDEO
router.put("/like/:videoId", verifytoken, like)

//DISLIKE A Video
router.put("/dislike/:videoId", verifytoken, dislike)

router.get("/test", test)

export default router;