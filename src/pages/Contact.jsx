import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const handleSubmit = e => { e.preventDefault(); setSent(true) }

  return (
    <div className="container py-5 d-flex flex-column align-items-center">
      <div style={{ maxWidth: 560, width: '100%' }} className="text-center">
        <h1 className="fw-bold mb-2">Get In <span className="es-accent">Touch</span></h1>
        <p className="es-muted mb-4">We'd love to hear from you. Send us a message below.</p>

        {sent ? (
          <p className="es-accent fw-semibold">Thanks! We'll get back to you soon.</p>
        ) : (
          <form className="es-card p-4 text-start" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label es-label">Name</label>
              <input
                type="text" name="name" placeholder="Your Name"
                className="form-control es-input"
                value={form.name} onChange={handleChange} required
              />
            </div>
            <div className="mb-3">
              <label className="form-label es-label">Email</label>
              <input
                type="email" name="email" placeholder="your@email.com"
                className="form-control es-input"
                value={form.email} onChange={handleChange} required
              />
            </div>
            <div className="mb-4">
              <label className="form-label es-label">Message</label>
              <textarea
                name="message" placeholder="How can we help?"
                className="form-control es-input" rows={4}
                value={form.message} onChange={handleChange} required
              />
            </div>
            <button type="submit" className="btn es-btn-primary w-100 py-2">
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
