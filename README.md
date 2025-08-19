# Learn.Codeunia.com - Programming Cheatsheets

A modern, responsive web application providing comprehensive programming cheatsheets for developers. Built with Next.js 15, React 19, and Tailwind CSS 4.

## Features

- **Modern UI/UX**: Beautiful gradient design with smooth animations and hover effects
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Comprehensive Content**: Detailed cheatsheets for 6 programming subjects
- **Fast Navigation**: Quick access to all subjects with intuitive navigation
- **Code Highlighting**: Syntax highlighting for code examples
- **Markdown Support**: Rich content rendering with React Markdown

## Subjects Covered

1. **JavaScript** - Modern ES6+ features, async programming, DOM manipulation
2. **Python** - Fundamentals, data structures, web development frameworks
3. **React** - Hooks, components, state management, modern patterns
4. **Node.js** - Server-side JavaScript, Express, backend development
5. **Git** - Version control, branching strategies, collaboration workflows
6. **SQL** - Database querying, JOINs, subqueries, optimization

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4 with custom typography
- **Content**: Markdown files with React Markdown rendering
- **Build Tool**: Turbopack for fast development
- **Deployment**: Ready for Vercel deployment

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd codeunia.learn
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                    # Next.js 15 app directory
│   ├── javascript/        # JavaScript cheatsheet page
│   ├── python/           # Python cheatsheet page
│   ├── react/            # React cheatsheet page
│   ├── nodejs/           # Node.js cheatsheet page
│   ├── git/              # Git cheatsheet page
│   ├── sql/              # SQL cheatsheet page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable React components
│   ├── Navbar.tsx        # Navigation component
│   ├── Hero.tsx          # Hero section component
│   ├── SubjectCard.tsx   # Subject card component
│   └── SearchBar.tsx     # Search functionality
├── content/               # Markdown content files
│   ├── javascript.md     # JavaScript cheatsheet content
│   ├── python.md         # Python cheatsheet content
│   ├── react.md          # React cheatsheet content
│   ├── nodejs.md         # Node.js cheatsheet content
│   ├── git.md            # Git cheatsheet content
│   └── sql.md            # SQL cheatsheet content
└── globals.css           # Global styles and Tailwind config
```

## Customization

### Adding New Subjects

1. Create a new Markdown file in `src/content/`
2. Create a new page directory in `src/app/`
3. Add the subject to the subjects array in `src/app/page.tsx`
4. Update the navigation if needed

### Styling

The application uses Tailwind CSS 4 with custom typography styles. Modify `src/app/globals.css` to customize:

- Color scheme
- Typography styles
- Component animations
- Responsive breakpoints

### Content

All cheatsheet content is stored in Markdown files. Use standard Markdown syntax with:

- Headers (# ## ###)
- Code blocks (```)
- Lists (- * 1. 2.)
- Links and images
- Tables
- Blockquotes

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Other Platforms

The application can be deployed to any platform that supports Next.js:

- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue on GitHub or contact the development team.

---

Built with ❤️ by the Codeunia team
