================================================================================
SALON BOOKING SYSTEM - README
================================================================================

PROJECT OVERVIEW
================================================================================
A full-stack appointment booking system for salons built with Django REST 
Framework (Backend) and Next.js TypeScript (Frontend).

Features:
- Manage salon services (add, edit, delete)
- Book appointments with validation
- View and filter appointments by status
- Update appointment status
- Prevent double bookings

TECH STACK
================================================================================
Backend: Django 4.2 + Django REST Framework
Frontend: Next.js + TypeScript + Tailwind CSS + shadcn/ui
Database: SQLite3
API Client: Axios

PREREQUISITES
================================================================================
- Python 3.8+
- Node.js 16+
- npm or yarn

QUICK START
================================================================================

TERMINAL 1 - BACKEND:
---------------------
cd fullstack
python -m venv venv
source venv/bin/activate          (Mac/Linux)
venv\Scripts\activate             (Windows)
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py seed
python manage.py runserver

Backend runs on: http://127.0.0.1:8000


TERMINAL 2 - FRONTEND:
---------------------
cd fullstack/frontend
npm install
npm run dev

Frontend runs on: http://localhost:3000


OPEN APPLICATION
================================================================================
Visit: http://localhost:3000

================================================================================
DETAILED SETUP INSTRUCTIONS
================================================================================

BACKEND SETUP
================================================================================

1. Navigate to backend folder
   cd fullstack

2. Create virtual environment
   python -m venv venv
   source venv/bin/activate  (Mac/Linux)
   venv\Scripts\activate     (Windows)

3. Install dependencies
   pip install -r requirements.txt

4. Run migrations
   python manage.py makemigrations
   python manage.py migrate

5. Load sample data
   python manage.py seed

6. Start backend server
   python manage.py runserver

Backend URL: http://127.0.0.1:8000


FRONTEND SETUP
================================================================================

1. Navigate to frontend folder
   cd fullstack/frontend

2. Install dependencies
   npm install

3. Start frontend server
   npm run dev

Frontend URL: http://localhost:3000


HOW TO USE
================================================================================

HOME PAGE
---------
Click on Services, Appointments, or Book cards to navigate

SERVICES PAGE
-------------
- Add Service: Fill form and click "Add Service"
- Edit Service: Click "Edit" button on service row
- Delete Service: Click "Delete" button on service row

APPOINTMENTS PAGE
-----------------
- View all appointments in table
- Filter by status using dropdown (All, Pending, Confirmed, Completed, Cancelled)
- Update status by clicking status dropdown
- Delete appointments using Delete button

BOOKING PAGE
------------
- Fill appointment form (name, phone, service, date, time)
- View recent appointments on the right side
- Submit to book appointment


API ENDPOINTS
================================================================================

SERVICES
--------
GET    /api/services/           - List all services
POST   /api/services/           - Create service
PUT    /api/services/{id}/      - Update service
DELETE /api/services/{id}/      - Delete service

APPOINTMENTS
------------
GET    /api/appointments/       - List all appointments
POST   /api/appointments/       - Create appointment
PATCH  /api/appointments/{id}/  - Update status
DELETE /api/appointments/{id}/  - Delete appointment


ACCESS DATABASE
================================================================================

OPTION 1: DJANGO SHELL
----------------------
python manage.py shell

Then in shell:
from appointments.models import Service, Appointment

# View services
services = Service.objects.all()
for s in services:
    print(f"{s.name}: {s.price}")

# View appointments
appointments = Appointment.objects.all()
for a in appointments:
    print(f"{a.customer_name}: {a.service.name}")

exit()


OPTION 2: SQLITE GUI
--------------------
Download DB Browser for SQLite: https://sqlitebrowser.org/
Open file: fullstack/db.sqlite3
Browse tables and data visually


OPTION 3: ADMIN PANEL
---------------------
1. Create admin user:
   python manage.py createsuperuser

2. Go to: http://127.0.0.1:8000/admin/

3. Login and manage data


TROUBLESHOOTING
================================================================================

BACKEND WON'T START
-------------------
1. Make sure virtual environment is activated
   source venv/bin/activate  (Mac/Linux)
   venv\Scripts\activate     (Windows)

2. Reinstall requirements
   pip install -r requirements.txt

3. Try migrations again
   python manage.py migrate


FRONTEND WON'T START
--------------------
1. Make sure Node.js is installed
   node --version

2. Clear cache and reinstall
   rm -rf node_modules
   npm install

3. Try running again
   npm run dev


CAN'T BOOK APPOINTMENT (DOUBLE BOOKING ERROR)
----------------------------------------------
This is correct behavior! You can't book the same service at the same time.
Choose a different time or different service.


CAN'T CONNECT BACKEND FROM FRONTEND
------------------------------------
1. Make sure backend is running
   python manage.py runserver

2. Check API URL is correct: http://127.0.0.1:8000

3. Check CORS settings in config/settings.py


PROJECT STRUCTURE
================================================================================

fullstack/
├── config/                    (Django configuration)
├── appointments/              (API logic and models)
├── db.sqlite3                (SQLite database)
├── manage.py
├── requirements.txt
│
└── frontend/                 (Next.js TypeScript frontend)
    ├── pages/               (Home, Services, Appointments, Booking)
    ├── components/          (Navbar, Forms, Tables)
    ├── lib/                (API calls, validation, types)
    ├── types/              (TypeScript interfaces)
    ├── styles/             (Tailwind CSS)
    └── package.json


SAMPLE DATA
================================================================================

After running: python manage.py seed

SERVICES:
---------
1. Haircut - 500 NPR (30 minutes)
2. Hair Coloring - 2500 NPR (120 minutes)
3. Facial - 1500 NPR (60 minutes)

SAMPLE APPOINTMENTS:
--------------------
1. Ram Sharma - Haircut (Tomorrow 10:00 AM, Pending)
2. Sita Thapa - Facial (Tomorrow 11:00 AM, Confirmed)


COMMANDS REFERENCE
================================================================================

BACKEND COMMANDS
----------------
python manage.py runserver              - Start server
python manage.py migrate                - Apply database migrations
python manage.py makemigrations         - Create new migrations
python manage.py shell                  - Open Django shell
python manage.py seed                   - Load sample data
python manage.py createsuperuser        - Create admin user


FRONTEND COMMANDS
-----------------
npm install                             - Install dependencies
npm run dev                             - Start development server
npm run build                           - Build for production
npm start                               - Start production server


GETTING HELP
================================================================================

If something breaks:
1. Check terminal error messages
2. Make sure both backend and frontend are running
3. Try stopping and restarting servers
4. Clear browser cache (Ctrl+Shift+Delete)
5. Reinstall dependencies if needed

Backend issues: Check http://127.0.0.1:8000/api/services/
Frontend issues: Check browser console (F12)


================================================================================
READY TO USE!
================================================================================

Happy booking! 🎉

For questions or issues, check the error messages in terminal carefully.
They usually point to the solution.

================================================================================