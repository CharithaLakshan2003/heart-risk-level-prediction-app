# Heart Risk Level Prediction AI App
![alt text](heart_risk_logo_1782067086619.png)

An AI-powered cardiovascular risk assessment web application built with **React + Vite** (frontend) and **Flask** (backend), using a pre-trained machine learning regression model.

![App Preview](./docs/preview.png)

---

## Features

- Predicts heart disease risk level based on clinical indicators
- Modern dark UI with glassmorphism design and smooth animations
- Animated SVG risk gauge with color-coded categories (Low / Moderate / High)
- Form validation with real-time error feedback
- React frontend communicates with Flask REST API via JSON

---

## Project Structure

```
heart-risk-level-prediction-app/
│
├── backend/                          # Flask REST API
│   ├── app.py                        # Main Flask application
│   ├── requirements.txt              # Python dependencies
│   └── heart_risk_prediction_regression_model.sav  # Pre-trained ML model
│
├── frontend/                         # React + Vite + Tailwind CSS app
│   ├── src/
│   │   ├── App.jsx                   # Root component
│   │   ├── main.jsx                  # Entry point
│   │   ├── index.css                 # Global styles (Tailwind directives)
│   │   └── components/
│   │       ├── PatientForm.jsx       # Patient input form
│   │       └── ResultCard.jsx        # Risk result display
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

---

## Tech Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | React 19, Vite, Tailwind CSS v3     |
| Backend  | Flask, Flask-CORS                   |
| ML Model | scikit-learn (Logistic Regression)  |
| Language | Python 3, JavaScript (JSX)          |

---

## Setup & Installation

### Prerequisites

- Python 3.8+
- Node.js 18+
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/CharithaLakshan2003/heart-risk-level-prediction-app.git
cd heart-risk-level-prediction-app
```

---

### 2. Backend Setup (Flask)

```bash
cd backend
pip install -r requirements.txt
python app.py
```

The Flask API will start at **http://localhost:5000**

---

### 3. Frontend Setup (React)

Open a **new terminal**:

```bash
cd frontend
npm install
npm run dev
```

The React app will start at **http://localhost:5173**

---

## API Reference

### `GET /`
Health check endpoint.

**Response:**
```json
{ "status": "Heart Risk Predictor API is running" }
```

---

### `POST /predict`
Predicts the heart disease risk level.

**Request Body (JSON):**
```json
{
  "name":   "John Doe",
  "gender": "1",
  "age":    "55",
  "tc":     "220",
  "hdl":    "45",
  "sbp":    "130",
  "smoke":  "0",
  "bpm":    "2",
  "diab":   "0"
}
```

| Field    | Description                          | Values              |
|----------|--------------------------------------|---------------------|
| `name`   | Patient name                         | string              |
| `gender` | Gender                               | `1` = Male, `2` = Female |
| `age`    | Age in years                         | number              |
| `tc`     | Total Cholesterol (mg/dL)            | number              |
| `hdl`    | HDL Cholesterol (mg/dL)              | number              |
| `sbp`    | Systolic Blood Pressure (mm Hg)      | number              |
| `smoke`  | Smoker                               | `1` = Yes, `0` = No |
| `bpm`    | Blood Pressure Medication            | `1` = Yes, `2` = No |
| `diab`   | Diabetes                             | `1` = Yes, `0` = No |

**Response:**
```json
{ "name": "Charitha Lakshan", "risk": 8.72 }
```

---

## Risk Categories

| Risk Level | Range    | Description                                      |
|------------|----------|--------------------------------------------------|
| Low      | < 10%    | Healthy — maintain your lifestyle                |
| Moderate | 10–20%   | Some concern — consider lifestyle improvements   |
| High     | > 20%    | Consult a cardiologist immediately               |

---

## Screenshots

> Run the app and open [http://localhost:5173](http://localhost:5173) to see the full UI.

---

## Disclaimer

> This application is for **educational purposes only**. It is not a medical diagnostic tool. Always consult a qualified physician for medical advice.

---

## Author

**Charitha Lakshan**
- GitHub: [@CharithaLakshan2003](https://github.com/CharithaLakshan2003)
