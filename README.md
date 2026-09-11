# NexVarta

## AI-Powered News Intelligence Platform

NexVarta is an autonomous, AI-driven news intelligence platform that goes beyond simple headlines. It actively fetches global and local news, synthesizes multiple sources using AI to eliminate bias, and presents an intelligent dossier on *what happened, why it matters, and the potential impact*.

**Live Demo:** [https://nexvarta.vercel.app](https://nexvarta.vercel.app)  
**Backend API:** [https://nexvarta-production.up.railway.app](https://nexvarta-production.up.railway.app)  
**GitHub Repository:** [https://github.com/Kaushal80106/nexvarta](https://github.com/Kaushal80106/nexvarta)

---

## Why NexVarta?

Modern news consumption is fragmented and overwhelming. Users typically have to read multiple articles across different sites to grasp the full picture. NexVarta solves this by automatically aggregating top articles on a single topic and deploying Large Language Models (LLMs) to structure a unified intelligence report. It tells you not just the facts, but the verification consensus, contradictions between sources, and actionable impact analysis.

## Key Features

- **Autonomous News Pipeline:** A background scheduler runs every 4 hours to fetch top global and regional (India) headlines using the GNews API.
- **AI Synthesis & Fact-Checking:** Uses OpenRouter (`gpt-4o-mini`) to synthesize articles, identifying factual consensus and contradictions across different news outlets.
- **Impact Analysis:** Automatically evaluates the direction, confidence, and time horizon of a story's potential real-world impact.
- **Context-Aware AI Assistant:** A floating chat interface that lets you ask follow-up questions about specific stories (e.g., "Explain this in simple terms" or "What are the risks?").
- **Smart Filtering & Pagination:** Browse stories by categories (Technology, Business, Sports, India, World) with infinite-scrolling paginated feeds.
- **Topic Following & Bookmarks:** Follow specific categories or entities to curate your personalized feed, and save stories for later.
- **Modern Authentication:** Secure, passwordless login powered by Clerk.

## Product Workflow

```text
[ GNews API ] → (Fetches Raw Articles)
                      ↓
[ Node/Express Backend ] → (Deduplicates & Groups by Category)
                      ↓
[ OpenRouter (LLM) ] → (Synthesizes, Analyzes Impact, Fact-checks)
                      ↓
[ PostgreSQL Database ] → (Persists Structured Intelligence Reports)
                      ↓
[ React Frontend ] → (Displays Dashboard, Feeds, and AI Assistant)
```

## Architecture

```text
      [ React + Vite Frontend ] (Hosted on Vercel)
                 │  (REST API)
                 ▼
      [ Node.js + Express API ] (Hosted on Railway)
                 │
      ┌──────────┼──────────┐
      ▼          ▼          ▼
[ PostgreSQL ] [ GNews ] [ OpenRouter LLM ]
 (Neon DB)      (News)    (AI Analysis)
```

## Tech Stack

### Frontend
- **React 19** & **Vite**
- **Tailwind CSS** (Styling & Dark Mode)
- **Lucide React** (Icons)
- **Clerk** (Authentication)
- Custom global state (React Context/Hooks)

### Backend
- **Node.js** & **Express**
- **TypeScript**
- **Prisma ORM**
- **CORS** & **Helmet** (Security)

### Database & External APIs
- **PostgreSQL** (Hosted on Neon)
- **OpenRouter API** (`gpt-4o-mini` for synthesis)
- **GNews API** (Article sourcing)

### Infrastructure / Deployment
- **Vercel** (Frontend Hosting)
- **Railway** (Backend Hosting)

## Project Structure

```text
nexvarta/
├── backend/                   # Express REST API & Background Workers
│   ├── prisma/                # Database schema & migrations
│   ├── src/
│   │   ├── routes/            # API endpoints (e.g., /feed, /archive)
│   │   ├── services/          # News ingestion & AI synthesis logic
│   │   ├── run-pipeline.ts    # Manual trigger for AI pipeline
│   │   └── server.ts          # Express server & auto-scheduler setup
│   └── package.json
├── src/                       # React Frontend
│   ├── components/            # UI Components (Cards, Modals, Story Views)
│   ├── store/                 # Global state management
│   ├── types/                 # TypeScript interfaces
│   ├── App.tsx                # Routing & Layout wrapping
│   └── main.tsx               # Clerk Provider & React DOM
├── .env.example               # Frontend environment template
└── package.json               # Frontend dependencies
```

## Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database (e.g., Neon or Supabase)
- OpenRouter API Key
- GNews API Key
- Clerk API Keys

### 1. Clone the Repository
```bash
git clone https://github.com/Kaushal80106/nexvarta.git
cd nexvarta
```

### 2. Install Dependencies
Install dependencies for both the frontend and the backend.
```bash
# Frontend dependencies
npm install

# Backend dependencies
cd backend
npm install
```

### 3. Environment Variables
You will need two `.env` files. 

**Frontend (`.env.local` in root):**
```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_API_URL=http://localhost:3000
```

**Backend (`backend/.env`):**
```env
DATABASE_URL=postgresql://user:password@host/db?sslmode=require
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
GNEWS_API_KEY=your_gnews_api_key
OPENROUTER_API_KEY=sk-or-v1-your_key_here
RUN_PIPELINE_ON_STARTUP=true
```

### 4. Database Setup
```bash
cd backend
npx prisma db push
```

### 5. Run Locally

Open two terminal tabs:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
# In project root
npm run dev
```

The application will be available at `http://localhost:5173`. If `RUN_PIPELINE_ON_STARTUP=true`, the backend will automatically begin ingesting and analyzing news on startup.

## API Overview

The backend exposes RESTful endpoints for the frontend to consume. Key endpoints include:

- `GET /api/v1/stories/feed` - Fetch paginated, synthesized news stories. Supports `?page=1&limit=20&category=Technology`.
- `GET /api/v1/stories/archive` - Fetch all archived stories ordered by oldest first.
- `GET /api/v1/stories/:id` - Fetch a single intelligence report by its unique ID.

## Authentication & Security

- **Clerk Authentication:** Soft-gated access allowing public preview of headlines, but protecting user-specific actions (bookmarks, following).
- **Helmet Middleware:** Secures Express backend with appropriate HTTP headers.
- **Dynamic CORS:** Configured to restrict API access strictly to the local development environment and the deployed Vercel frontend domain.

## Database (Prisma Architecture)

 NexVarta leverages a relational PostgreSQL structure to maintain intelligence dossiers:
- **Story:** Core entity representing a synthesized report.
- **AiSummary:** Related table storing short, detailed, and key-fact breakdowns.
- **StoryImpact & ImpactDomain:** Evaluates business/social ramifications and confidence scores.
- **StoryVerification & Claim:** Tracks fact-checking consensus and contradictions.
- **Source & StorySource:** Maps reports back to the original source articles for transparency.

## Responsible AI

NexVarta uses Large Language Models (LLMs) to synthesize information. While prompts are heavily structured to enforce neutrality and factual consistency based *only* on provided sources, AI outputs can occasionally contain inaccuracies. Users are encouraged to click through to the original linked sources (via the `StorySource` integration) for critical verification.

## Author

**Kaush**  
Full-Stack Developer & AI Enthusiast
