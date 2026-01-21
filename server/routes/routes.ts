import { Router } from "express";

export const router = Router()

router.post('/admin/post')
router.get('/admin/post')
router.get('/admin/post/:slug')
router.put('/admin/post/:slug')
router.delete('/admin/post/:slug')

router.post('/auth/validate')
router.post('/auth/singin')
router.post('/auth/singup')

router.get('/posts/:slug/related')
router.get('/posts')
router.get('/posts/:slug')


router.get('/ping',(req,res)=>{
    res.json({pong:true})
})
