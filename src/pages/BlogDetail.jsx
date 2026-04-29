import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './BlogDetail.css'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80'

export default function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://dev.to/api/articles/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return <div className="loading">Loading article...</div>
  if (!post) return <div className="loading">Post not found</div>

  const readTime = post.reading_time_minutes || Math.ceil((post.body_html?.length || 1000) / 1500)

  return (
    <div className="blog-detail">
      <button className="back-link" onClick={() => navigate('/blog')}>
        ← Back to Blog
      </button>

      {/* Title */}
      <h1 className="blog-detail-title">{post.title}</h1>

      {/* Meta row */}
      <div className="blog-meta">
        <img
          className="author-avatar"
          src={post.user?.profile_image_90 || `https://ui-avatars.com/api/?name=${post.user?.name}&background=7c6ff7&color=fff`}
          alt={post.user?.name}
        />
        <div className="blog-meta-info">
          <span className="author-name">{post.user?.name || 'Anonymous'}</span>
          <span className="meta-sep">·</span>
          <span className="meta-date">
            {new Date(post.published_at).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </span>
          <span className="meta-sep">·</span>
          <span className="meta-read">{readTime} min read</span>
        </div>
      </div>

      {/* Tags */}
      {post.tag_list && (
        <div className="blog-tags">
          {(Array.isArray(post.tag_list) ? post.tag_list : post.tag_list.split(', ')).map(tag => (
            <span key={tag} className="blog-tag">#{tag}</span>
          ))}
        </div>
      )}

      {/* Cover image */}
      <img
        className="blog-cover"
        src={post.cover_image || post.social_image || FALLBACK_IMG}
        alt={post.title}
      />

      {/* Full article body */}
      <div
        className="blog-body"
        dangerouslySetInnerHTML={{ __html: post.body_html }}
      />

      {/* Reactions / stats footer */}
      <div className="blog-stats">
        <span>❤️ {post.public_reactions_count} reactions</span>
        <span>💬 {post.comments_count} comments</span>
        <a href={post.url} target="_blank" rel="noopener noreferrer" className="read-original">
          Read on Dev.to ↗
        </a>
      </div>
    </div>
  )
}
