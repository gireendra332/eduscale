import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="hero-section">
      <h1>Level Up Your Skills <span>Today</span></h1>
      <p>Join top-tier courses and become job-ready in 2026.</p>
      <button className="cta-btn" onClick={() => navigate('/blog')}>
        Explore Blogs
      </button>
    </div>
  )
}
