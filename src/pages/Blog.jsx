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
      .then(data => { setPosts(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 300 }}>
      <div className="spinner-border es-spinner" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )

  return (
    <div className="container py-5">
      <h1 className="fw-bold text-center mb-5">Latest Blogs</h1>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {posts.map(post => (
          <div key={post.id} className="col">
            <div
              className="es-card h-100 d-flex flex-column"
              onClick={() => navigate(`/blog/${post.id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && navigate(`/blog/${post.id}`)}
            >
              <img
                src={post.cover_image || post.social_image || FALLBACK_IMG}
                alt={post.title}
                className="es-card-img"
              />
              <div className="p-3 d-flex flex-column flex-grow-1">
                <h5 className="es-card-title mb-2">{post.title}</h5>
                <p className="es-muted small mb-3 es-clamp">{post.description}</p>
                <button className="btn es-read-more mt-auto p-0">Read More</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
