import { Router} from 'express'
import { getBlog, getAllBlogs, createBlog, updateBlog, deleteBlog } from '../controller/blogController.js'
import checkAuth from '../middleware/authMiddleware.js'

const router = Router()

router.get('/', getAllBlogs)
router.get('/:id', getBlog) //getting a single blog
router.post('/create',checkAuth, createBlog)  //user needs to be logged in
router.put('/edit/:id',checkAuth, updateBlog) // user needs to be logged in
router.delete('/delete/:id',checkAuth, deleteBlog)

export default router