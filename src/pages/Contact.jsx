import { useState } from 'react';

const INITIAL_FORM = { name: '', email: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // No backend is wired up; this simply confirms the form works end to end.
    setSubmitted(true);
    setForm(INITIAL_FORM);
  }

  return (
    <div className="page">
      <h1 className="page-title">Contact</h1>
      <p className="page-subtitle">
        Have feedback on a forecast or spotted a bug? Send a note below.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="contact-name">Name</label>
          <input
            id="contact-name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="contact-email">Email</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="contact-message">Message</label>
          <textarea
            id="contact-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="form-submit">
          Send message
        </button>

        {submitted && (
          <p className="form-success" role="status">
            Thanks — your message has been noted.
          </p>
        )}
      </form>
    </div>
  );
}
