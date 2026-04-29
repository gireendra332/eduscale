# EduScale

A modern educational blog platform built with React and Vite. EduScale features a clean dark-themed UI with real blog content pulled from the Dev.to public API.

---

## Live Features

- Home page with hero section and call-to-action
- About page with mission, vision, and values
- Blog listing page with 20 real posts (images, titles, descriptions)
- Blog detail page with full article content, author info, tags, code blocks, and reactions
- Contact page with a working form UI
- Fully responsive across desktop, tablet, and mobile

---

## Tech Stack

| Technology | Purpose |
|---|---|
| [React 19](https://react.dev/) | UI component library |
| [Vite 8](https://vite.dev/) | Build tool and dev server |
| [React Router DOM v7](https://reactrouter.com/) | Client-side routing |
| Plain CSS | Styling (no CSS frameworks) |

No UI libraries, no Tailwind, no styled-components — just clean vanilla CSS with a custom dark theme.

---

## API Used

### Dev.to Public API

Base URL: `https://dev.to/api`

This is a free, open API — no authentication or API key required.

| Endpoint | Usage |
|---|---|
| `GET /articles?per_page=20&tag=programming` | Fetches 20 blog posts for the blog listing page |
| `GET /articles/:id` | Fetches full article content for the blog detail page |

The API returns:
- `title` — article title
- `description` — short excerpt
- `cover_image` / `social_image` — post thumbnail
- `body_html` — full article HTML content rendered inside the detail page
- `user` — author name and avatar
- `published_at` — publish date
- `reading_time_minutes` — estimated read time
- `tag_list` — comma-separated tags
- `public_reactions_count` — reaction count
- `comments_count` — comment count
- `url` — link to original post on Dev.to

Docs: https://developers.forem.com/api

---

## Project Structure

```
eduscale/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Sticky top navigation
│   │   └── Footer.jsx        # Site footer
│   ├── pages/
│   │   ├── Home.jsx          # Landing / hero page
│   │   ├── About.jsx         # About EduScale page
│   │   ├── Blog.jsx          # Blog listing grid (20 posts)
│   │   ├── BlogDetail.jsx    # Full article view
│   │   ├── BlogDetail.css    # Article-specific styles
│   │   └── Contact.jsx       # Contact form page
│   ├── App.jsx               # Route definitions
│   ├── main.jsx              # React entry point with BrowserRouter
│   └── index.css             # Global styles and design tokens
├── index.html
├── package.json
└── vite.config.js
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

```bash
# Clone or open the project folder
cd eduscale

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder. Preview the production build with:

```bash
npm run preview
```

---

## Design

The UI is inspired by a dark educational platform with the following design tokens:

| Token | Value | Usage |
|---|---|---|
| Background | `#0d1117` | Page background |
| Surface | `#161b22` | Cards, forms |
| Border | `#1c2333` | Dividers, card borders |
| Accent | `#7c6ff7` | Links, buttons, highlights |
| Text primary | `#e6edf3` | Headings, body |
| Text muted | `#8b949e` | Descriptions, meta info |

---

## Pages Overview

### `/` — Home
Hero section with tagline and a button linking to the blog.

### `/about` — About
Mission statement, vision, values, and what EduScale offers.

### `/blog` — Blog Listing
Fetches 20 articles from Dev.to tagged `programming`. Displays in a 3-column responsive grid with cover image, title, excerpt, and a Read More button.

### `/blog/:id` — Blog Detail
Fetches the full article by ID. Renders:
- Author avatar, name, date, read time
- Tags as pills
- Cover image
- Full `body_html` content styled for dark theme (headings, code blocks, blockquotes, lists, tables)
- Reactions and comments count
- Link to original Dev.to post

### `/contact` — Contact
A styled form with name, email, and message fields. Shows a success message on submit.

---

## Notes

- The Dev.to API is public and rate-limited to ~10 requests/minute for unauthenticated requests. For production use, consider caching responses or registering for an API key to increase limits.
- `body_html` is rendered using `dangerouslySetInnerHTML`. The content comes from Dev.to's trusted API, but if you extend this to other sources, consider sanitizing HTML with a library like [DOMPurify](https://github.com/cure53/DOMPurify).

---

## License

MIT
