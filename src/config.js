// Site-wide settings. Contact values come from environment variables so they
// can be set in Vercel (Project → Settings → Environment Variables) or in a
// local `.env` file without touching the code. See `.env.example`.

export const site = {
  name: 'NEXUS',
  studio: 'NEXUS STUDIO',
  repoUrl: 'https://github.com/Menace-sys/Nexus-Gaming-Setup',

  // A form endpoint that accepts a JSON POST (for example a Formspree form URL
  // such as https://formspree.io/f/xxxxxxx). Preferred when set.
  formEndpoint: import.meta.env.VITE_FORM_ENDPOINT || '',

  // Fallback: the form opens the visitor's mail app addressed to this email.
  contactEmail: import.meta.env.VITE_CONTACT_EMAIL || '',
}
