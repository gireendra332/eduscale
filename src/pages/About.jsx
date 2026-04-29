export default function About() {
  return (
    <div className="container py-5">
      <div style={{ maxWidth: 760 }}>
        <h1 className="fw-bold mb-3">About <span className="es-accent">EduScale</span></h1>
        <p className="es-muted mb-4">
          We are on a mission to democratize premium tech education. Our platform provides
          high-quality, project-based courses designed to get you hired.
        </p>

        <h2 className="es-section-heading mt-4 mb-2">Our Vision</h2>
        <p className="es-muted">To bridge the gap between academic learning and industry expectations.</p>

        <h2 className="es-section-heading mt-4 mb-2">What We Offer</h2>
        <p className="es-muted">
          From beginner-friendly coding tutorials to advanced system design courses,
          EduScale covers the full spectrum of modern software development. Our instructors
          are industry professionals with years of real-world experience.
        </p>

        <h2 className="es-section-heading mt-4 mb-2">Our Values</h2>
        <p className="es-muted">
          We believe in accessible education, practical learning, and community-driven growth.
          Every course is crafted with the learner's career outcome in mind.
        </p>
      </div>
    </div>
  )
}
