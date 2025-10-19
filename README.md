## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** v16+ or v18+ ([Download](https://nodejs.org/))
- **npm** v8+ (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

Check your versions:
```bash
node --version
npm --version
git --version
```

### Installation

1. **Clone the repository**
```bash
   git clone https://github.com/YOUR_USERNAME/annasampada.git
   cd annasampada
```

2. **Install dependencies**
```bash
   npm install
```

3. **Create environment file**
```bash
   # Create .env file in root directory
   cp .env.example .env
```

   Or manually create `.env`:
```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_APP_NAME=AnnaSampada
   VITE_APP_VERSION=1.0.0
```

4. **Start development server**
```bash
   npm run dev
```

5. **Open your browser**
```
   http://localhost:5173
```

---
