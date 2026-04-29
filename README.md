# 🦷 Dental System: Comprehensive Clinical Management

A professional-grade web system designed to digitize the operational workflow of a dental clinic. The platform enables real-time synchronization between the front desk, inventory management, and the dentist's clinical practice.

---

## Key Features
### 🩺 Dentist Module (Clinical Care)
<img width="1860" height="892" alt="image" src="https://github.com/user-attachments/assets/dfbc1709-199c-405c-931a-a9233d3e1489" />
<img width="1866" height="900" alt="image" src="https://github.com/user-attachments/assets/36a2d51a-dcea-41b4-8dbf-4dfa5fa3d278" />
<img width="1600" height="883" alt="image" src="https://github.com/user-attachments/assets/8df7ceb0-8617-42f2-9d10-153d399985c5" />
<img width="1662" height="871" alt="image" src="https://github.com/user-attachments/assets/a6391951-d103-4ffc-a903-a93c5b7f44f3" />

- **Dynamic Patient Record:** Logging of progress notes, allergies, and medical history.
- **Master Attendance:** Transactional recording of multiple treatments per appointment.
- **Referrals & Studies:** Generation of orders for external specialists and radiology/lab requests with status tracking.

### 🗓️ Reception Module (Appointments & Billing)
<img width="1486" height="621" alt="image" src="https://github.com/user-attachments/assets/4be2f579-01b6-46c8-a2b5-791b3d1b9258" />
<img width="1626" height="862" alt="image" src="https://github.com/user-attachments/assets/b83e013e-4efa-4823-98ee-d40890b4733b" />
<img width="1437" height="525" alt="image" src="https://github.com/user-attachments/assets/02d500c5-cbf3-41e9-8128-6d5c6642d194" />
<img width="1893" height="892" alt="image" src="https://github.com/user-attachments/assets/37a61149-1cd4-422c-b45b-fe5aa988d211" />

- **Flow Control:** Appointment status management (Scheduled, Confirmed, Pending, Attended, Cancelled).
- **Financial Management:** Automatic debt calculation based on procedures performed.
- **Patient Registration:** Smart form with advanced identity validations.

### 📦 Assistant Module (Inventory Management)
<img width="1175" height="624" alt="image" src="https://github.com/user-attachments/assets/e9d24ce2-7f9f-43aa-9ab4-a28a4ec41457" />
<img width="1868" height="901" alt="image" src="https://github.com/user-attachments/assets/11721533-91d7-4ff8-978e-e60e8aaed261" />
- **Unit Conversion:** "Unit of Use" logic that allows bulk entry (boxes) and automatically deducts individual units during appointments.
- **Categorization:** Dynamic classification of materials for efficient administrative control.
- **Stock Alerts:** Visual monitoring of critical supply levels.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 18+ (Standalone Components), Reactive Forms, Bootstrap 5, Bootstrap Icons |
| Backend | Node.js, Express.js |
| Database | PostgreSQL (Complex transactions & consolidated views) |
| Communication | REST API with HTTP error handling and controlled states |

---

## Advanced Business Logic

### Frontend Validations
- **No Repetitive Input:** Prevents garbage data entry (e.g., "aaaaa").
- **Name Equality Check:** Validates that the first name is not identical to the last name to prevent data entry errors.
---

## Installation
This project requires the backend from the companion repository, which handles all PostgreSQL database transactions and serves as the middleware layer.
### Prerequisites
- Node.js `>= 18`
- Angular CLI `>= 18`
- Backend running on `http://localhost:3000`

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/tu-usuario/tu-repo-frontend.git
cd tu-repo-frontend

# 2. Install dependencies
npm install

# 3. Start the development server
ng serve
```

Open your browser at `http://localhost:4200`

### 🔗 Related Repositories

This is the **frontend** (Angular) for the Dental System project.

| Part | Repository |
|---|---|
| 🖥️ Frontend (Angular) | You are here |
| ⚙️ Backend (Node.js) | [dental-system-backend](https://github.com/Dianaqwert/BackEnd_ConsultorioDentista) |

> ⚠️ The backend must be running locally for this app to work.
> See backend repo for setup instructions.
