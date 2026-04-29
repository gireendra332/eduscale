import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="contact-page">
      <h1>Get In <span>Touch</span></h1>
      <p className="subtitle">We'd love to hear from you. Send us a message below.</p>

      {sent ? (
        <p style={{ color: '#7c6ff7', fontSize: '1rem' }}>
          Thanks! We'll get back to you soon.
        </p>
      ) : (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              placeholder="How can we help?"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      )}
    </div>
  )
}
