import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&q=80'

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch('https://dev.to/api/articles?per_page=20&tag=programming')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="loading">Loading blogs...</div>

  return (
    <div className="container blog-page">
      <h1>Latest Blogs</h1>
      <div className="blog-grid">
        {posts.map(post => (
          <div
            key={post.id}
            className="blog-card"
            onClick={() => navigate(`/blog/${post.id}`)}
          >
            <img
              src={post.cover_image || post.social_image || FALLBACK_IMG}
              alt={post.title}
            />
            <div className="blog-card-body">
              <h3>{post.title}</h3>
              <p>{post.description}</p>
              <button className="read-more">Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
