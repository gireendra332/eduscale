import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './BlogDetail.css'

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80'

// Strip HTML tags to check if body has real text content
function hasContent(html) {
  if (!html) return false
  const text = html.replace(/<[^>]*>/g, '').trim()
  return text.length > 100
}

// Build a rich fallback article body from the post metadata
function buildFallbackBody(post) {
  const tags = post.tag_list
    ? (Array.isArray(post.tag_list) ? post.tag_list : post.tag_list.split(', '))
    : []

  return `
    <p>${post.description || 'No description available.'}</p>

    <h2>About This Article</h2>
    <p>
      This article was written by <strong>${post.user?.name || 'Anonymous'}</strong> and published on
      <strong> ${new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>.
      It covers topics related to ${tags.map(t => `<strong>#${t}</strong>`).join(', ') || 'programming'}.
    </p>

    <h2>Topics Covered</h2>
    <ul>
      ${tags.map(t => `<li>${t.charAt(0).toUpperCase() + t.slice(1)}</li>`).join('')}
    </ul>

    <h2>Read the Full Article</h2>
    <p>
      The full content of this article is available on Dev.to. Click the link below to read it in full.
    </p>
    <p>
      <a href="${post.url}" target="_blank" rel="noopener noreferrer">
        👉 Read "${post.title}" on Dev.to
      </a>
    </p>
  `
}

export default function BlogDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://dev.to/api/articles/${id}`)
      .then(res => res.json())
      .then(data => { setPost(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: 400 }}>
      <div className="spinner-border es-spinner" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  )

  if (!post) return <div className="text-center py-5 es-muted">Post not found</div>

  const readTime = post.reading_time_minutes || Math.ceil((post.body_html?.length || 1000) / 1500)
  const tags = post.tag_list
    ? (Array.isArray(post.tag_list) ? post.tag_list : post.tag_list.split(', '))
    : []

  const bodyHtml = hasContent(post.body_html) ? post.body_html : buildFallbackBody(post)

  return (
    <div className="container py-4" style={{ maxWidth: 760 }}>
      <button className="btn es-back-link mb-4 p-0" onClick={() => navigate('/blog')}>
        ← Back to Blog
      </button>

      <h1 className="fw-bold mb-3 es-blog-title">{post.title}</h1>

      {/* Meta */}
      <div className="d-flex align-items-center gap-3 mb-3">
        <img
          className="es-avatar"
          src={post.user?.profile_image_90 || `https://ui-avatars.com/api/?name=${post.user?.name}&background=7c6ff7&color=fff`}
          alt={post.user?.name}
        />
        <div className="d-flex flex-wrap align-items-center gap-2 small es-muted">
          <span className="fw-semibold" style={{ color: '#c9d1d9' }}>{post.user?.name || 'Anonymous'}</span>
          <span>·</span>
          <span>
            {new Date(post.published_at).toLocaleDateString('en-US', {
              year: 'numeric', month: 'long', day: 'numeric'
            })}
          </span>
          <span>·</span>
          <span>{readTime} min read</span>
        </div>
      </div>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="d-flex flex-wrap gap-2 mb-4">
          {tags.map(tag => (
            <span key={tag} className="es-tag">#{tag}</span>
          ))}
        </div>
      )}

      {/* Cover image */}
      <img
        className="w-100 rounded mb-4 es-cover"
        src={post.cover_image || post.social_image || FALLBACK_IMG}
        alt={post.title}
      />

      {/* Article body */}
      <div className="es-blog-body" dangerouslySetInnerHTML={{ __html: bodyHtml }} />

      {/* Stats */}
      <div className="d-flex flex-wrap align-items-center gap-4 mt-5 pt-4 es-stats">
        <span>❤️ {post.public_reactions_count} reactions</span>
        <span>💬 {post.comments_count} comments</span>
        <a href={post.url} target="_blank" rel="noopener noreferrer" className="ms-auto es-original-link">
          Read on Dev.to ↗
        </a>
      </div>
    </div>
  )
}
