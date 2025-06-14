# 👨‍👩‍👧‍👦 Smart Growth Tracker for Infants

A digital health tool to assist community health workers in detecting infant malnutrition (SAM/MAM) early using growth monitoring and real-time alerts.

---

## ❗ Problem Statement: Detecting Infant Growth Anomalies in Underserved Areas

### 1. The Problem

In rural and low‑resource settings, infant growth is rarely tracked consistently due to:

* Long travel distances and poor infrastructure
* Caregiver time and financial constraints
* Lack of digital tools for frontline health workers

As a result, early signs of malnutrition—like **stunting** and **wasting**—often go unnoticed, leading to **delayed interventions** and **lifelong health consequences**.

### 2. Relevance and Impact

* Malnutrition is linked to **45% of deaths** in children under five (WHO, 2023).
* Growth anomalies during the first **1,000 days** can cause irreversible cognitive and physical damage.
* Timely detection can **break cycles** of poor health and poverty across generations.

### 3. Who is Affected

* **Infants and Children**: Miss early treatment
* **Caregivers (mostly mothers)**: Lack access to routine checkups
* **Community Health Workers (CHWs)**: Have no tools to track or interpret growth data

### 4. Supporting Evidence

* **149.2 million** under‑five children are stunted (2024).
* **45 million** suffer from wasting; only 45% receive treatment.
* In many regions, **<10%** of children receive proper growth monitoring.

### 5. Proposed Digital Solution

A lightweight web‑based tool to enable CHWs to:

* Enter child growth data quickly
* Auto‑calculate WHO Z‑scores and visualize growth trends
* Trigger real‑time alerts for SAM/MAM classification
* Offer health recommendations and caregiver education

**Key Benefits:**

* Works offline and in low‑literacy environments
* Enables early detection and referral
* Empowers CHWs, improving child survival and development outcomes

---

## 🧠 Backend & API

The backend powers authentication, child profiles, growth tracking, alert generation, and recommendation workflows.

### 📁 Folder Structure

```
root/
├── api/          # Backend code (Node.js + Express)
└── ui/           # Frontend code (To be documented later)
```

### ⚙️ Setup & Run

1. **Clone the repo**

   ```bash
   git clone https://github.com/yourusername/smart-growth-tracker.git
   cd smart-growth-tracker/api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure `.env`**

   ```env
   PORT= 6069
   MONGODB_URI= paste_your_mongodb_link_here
   JWT_SECRET= generate_your_jwt_secret_and_paste_here
   ```

4. **Start in dev mode**

   ```bash
   npm run dev
   ```

   Server runs at `http://localhost:6069`

### 🛠️ Backend Stack & Dependencies

* **Node.js** & **Express**
* **MongoDB** + **Mongoose**
* **JWT** (authentication)
* **Helmet** (security headers)
* **CORS** (cross‑origin)
* **bcrypt** (password hashing)
* Custom validators (WHZ/Z‑score logic)

### 📡 API Endpoints

All routes are prefixed with `/api` and require a Bearer token unless noted.

#### 🔐 Authentication

* `POST /api/users/register`
* `POST /api/users/login`

#### 👶 Children

* `POST /api/children`
* `GET  /api/children/:childId/history`

#### 📈 Growth Records

* `POST /api/children/:childId/growth`
* `GET  /api/children/:childId/growth/alerts`

#### 📝 Recommendations

* `GET  /api/children/:childId/recommendations`
* `POST /api/children/:childId/recommendations/:recId/confirm`

---

## 🧩 To Be Added

* 📲 Frontend documentation (in `ui/` folder)
* 🗂️ OpenAPI/Swagger spec
* 🔐 Supervisor escalation workflows
* 📊 Admin/supervisor analytics dashboard

---

## 📎 Repository

```bash
git clone https://github.com/yourusername/smart-growth-tracker.git
```
