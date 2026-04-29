import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center es-hero flex-grow-1 px-3">
      <h1 className="fw-bold es-hero-title">
        Level Up Your Skills <span className="es-accent">Today</span>
      </h1>
      <p className="es-hero-sub mt-3 mb-4">
        Join top-tier courses and become job-ready in 2026.
      </p>
      <button className="btn es-btn-primary px-4 py-2" onClick={() => navigate('/blog')}>
        Explore Blogs
      </button>
    </div>
  )
}
