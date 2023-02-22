const router = require('express').Router();
const Blog = require('../models/Blog')

// Your routing code goes here

router.get('/blog', async (req, res) => {
  const { page = 1, search = '' } = req.query;
  const perPage = 5;
  const skip = (page - 1) * perPage;

  const blogs = await Blog.find({
    topic: { $regex: search, $options: 'i' }
  })
    .sort({ posted_at: -1 })
    .skip(skip)
    .limit(perPage);

  res.json({
    status: 'success',
    result: blogs
  });
})


router.post('/blog', async (req, res) => {
    const { topic, description, posted_by } = req.body;
  
    const blog = new Blog({
      topic,
      description,
      posted_at: new Date(),
      posted_by
    });
  
    await blog.save();
  
    res.json({
      status: 'success',
      result: blog
    });
  });


  router.put('/blog/:id', async (req, res) => {
    const { id } = req.params;
    const { topic, description, posted_by } = req.body;
  
    const blog = await Blog.findByIdAndUpdate(id, {
      topic,
      description,
      posted_by
    }, { new: true });
  
    res.json({
      status: 'success',
      result: blog
    });
  });

  router.delete('/blog/:id', async (req, res) => {
    const { id } = req.params;
  
    const blog = await Blog.findByIdAndDelete(id);
  
    res.json({
      status: 'success',
      result: blog
    });
  });


module.exports = router;