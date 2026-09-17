# Full-Stack Sports Talent Identification Platform

A complete, production-grade **Full-Stack Sports Talent Identification Platform** designed to help athletes—especially those from rural and underserved communities—showcase their athletic potential, biometric combine metrics, certificate achievements, and highlight videos directly to certified coaches, scouts, sports organizations, and trial organizers.

---

## 🌟 Key Features

### 🏆 1. Grassroots & Rural Athlete Discovery
- Advanced Multi-Filter Matrix: Search and filter candidates by Name, Sport, Location (State/District/Village), Age, Gender, Combine Performance Score, and Availability.
- Biometric Combine Metrics: Record and visualize Sprint Speed (km/h), Vertical Bounce (cm), Stamina Index, and Agility Score using interactive radar charts.
- Verification System: Verified Athlete Badges issued by administrators and certified scouts to prevent fraudulent profiles.
- Direct Outreach: Contact athletes directly via integrated messaging.

### 🎯 2. Opportunities & Trials Hub
- Post and discover Sports Trials, Rural Talent Hunts, High-Performance Camps, Competitions, and Championships.
- Application Tracking: Real-time application lifecycle tracking with 5 stages (**Pending | Under Review | Shortlisted | Accepted | Rejected**).

### 👥 3. Role-Based Dashboards
- **Athlete Dashboard:** Application tracker, biometric metric logger, achievement uploader, message inbox.
- **Coach Dashboard:** Opportunity creator, applicant evaluator, status manager.
- **Scout Dashboard:** Scout watchlist, candidate outreach portal, regional filter presets.
- **Admin Dashboard:** Platform stats analytics, user verification badge toggling, contact message manager.

---

## 🛠️ Technology Stack

- **Frontend:** React 18, Vite, HTML5, CSS3 (Custom Glassmorphism design with Blue, White, Orange & Green accents), Lucide React, Recharts.
- **Backend:** Node.js, Express.js REST API.
- **Database:** MongoDB + Mongoose (with MongoDB In-Memory Server fallback for offline testing).
- **Authentication:** JWT (JSON Web Tokens) with `bcryptjs` password hashing and role-based access control.
- **File Uploads:** Multer with Cloudinary integration & local fallback storage.

---

## 🚀 Quick Start & Installation

### Prerequisites
- Node.js (v18 or higher)
- NPM (v9 or higher)
- MongoDB (Optional: The backend will automatically fall back to an embedded MongoDB memory server if no local MongoDB instance is active).

### 1. Setup Backend
```bash
cd sports-talent-platform/backend
npm install
npm run seed     # Populate sample data (10+ Athletes, Coaches, Scouts, Trials & News)
npm start        # Launch backend API server on http://localhost:5000
```

### 2. Setup Frontend
```bash
cd sports-talent-platform/frontend
npm install
npm run dev      # Launch Vite dev server on http://localhost:3000
```

---

## 🔑 Demo Account Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@sportstalent.org` | `password123` |
| **Coach** | `coach.rajesh@academy.org` | `password123` |
| **Scout** | `scout.vikram@scoutnetwork.org` | `password123` |
| **Athlete** | `ramesh.football@gmail.com` | `password123` |

---

## 📑 REST API Documentation

### Auth & User Endpoints
- `POST /api/auth/register` - Register new user (Athlete, Coach, Scout)
- `POST /api/auth/login` - Authenticate user & get JWT token
- `GET /api/auth/me` - Fetch authenticated user & sub-profile

### Athlete Endpoints
- `GET /api/athletes` - Query/filter athlete profiles
- `GET /api/athletes/:id` - Fetch single athlete profile & performance stats
- `PUT /api/athletes/profile` - Update athlete profile details
- `POST /api/athletes/:id/save` - Toggle save athlete to user watchlist

### Opportunity & Application Endpoints
- `GET /api/opportunities` - Query opportunities with filters
- `POST /api/opportunities` - Create trial opportunity (Coach/Scout/Admin)
- `POST /api/applications` - Apply for an opportunity (Athlete)
- `GET /api/applications` - Get user applications or applicants for opportunity
- `PUT /api/applications/:id/status` - Update application status

### Sports & Admin Endpoints
- `GET /api/sports` - List sports categories
- `GET /api/sports/news` - Fetch sports scouting news bulletins
- `GET /api/admin/stats` - Fetch admin statistics
- `GET /api/admin/users` - Fetch user list (Admin)
- `PUT /api/admin/users/:id/verify` - Toggle verified athlete badge
