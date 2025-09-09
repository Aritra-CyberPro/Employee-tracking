# Employee-tracking (DEMO)
## Overview
The Employee Tracking Website is a front-end demo web application that simulates how organizations can monitor and manage their employees’ assigned devices in real time.

It provides a dashboard, live map, device list, and settings panel, all built with a modern dark UI. While it looks and feels like a real tracking system, it uses mock data and simulated updates—so it’s safe for presentations, screenshots, and portfolio showcases. (This is just a front-end project)
# Features
• **Login Page**: <br>
-- Basic login form (email + password). <br>
-- “Skip (demo)” option to enter directly. <br>
<br>
• **Dashboard**: <br>
-- KPIs (total devices, online, offline, update interval). <br>
-- Device table showing ID, label, owner, phone, and status. <br>
<br>
• **Live Map (Simulated Real-time)**: <br>
-- Map with moving markers (updates every 2 seconds). <br>
-- Device selection dropdown. <br>
-- Last update timestamp display. <br>
-- Uses mock GPS paths stored in browser. <br>
<br>
• **Devices Page**: <br>
-- Table of all registered devices.. <br>
-- “Add device” button (demo only, no backend). <br>
<br>
• **Settings Page**: <br>
-- Organization details (company name, update interval, tracking policy). <br>
-- Save button (demo only). <br>
-- Export demo data (download JSON of mock devices & tracks). <br>
<br>
• **Session Handling**: <br>
-- LocalStorage-based login session. <br>
-- Logout button (clears session). <br>
<br>
• **UI/UX**: <br>
-- Sidebar navigation with sections (Dashboard, Live Map, Devices, Settings). <br>
-- Dark modern theme with responsive design. <br>
-- Search box in sidebar (demo only). <br>
<br>
• **Security/Legal Note**: <br>
-- Explicit disclaimer in sidebar/footer: “Demo only · No IMEI or unauthorized tracking”. <br>
<br>
## ⚙️ Pre-requisites (to run the demo) <br>
-- Any web browser (Chrome, Edge, Firefox, etc.). <br>
-- Just download and open index.html (no server required). <br>
<br>
## 🛠 Tech Stack <br>
• **Frontend:** <br>
-- HTML5, CSS3 (custom dark theme). <br>
-- JavaScript (vanilla, no frameworks). <br>
<br>
• **Frontend:** <br>
-- HTML5, CSS3 (custom dark theme). <br>
-- JavaScript (vanilla, no frameworks). <br>
<br>
• **Map Integration:** <br>
-- [Leaflet.js](https://leafletjs.com/) with OpenStreetMap tiles. <br>
<br>
• **Data Handling:** <br>
-- Browser ```localStorage``` (to save devices, mock tracks, session). <br>
-- Simulated real-time updates using ```setInterval``` (mock socket). <br>
<br>
## 🚀 Installation <br>
**1. Clone the repository or download zip file**:
```
https://github.com/Aritra-CyberPro/Employee-tracking.git
```
```
cd employee-tracking-website
```
**2. Open the Project**: <br>
No build tools are required. The project is pure HTML, CSS, and JavaScript. <br>
• Option A: Open ```index.html``` directly in your browser. <br>
• Option B: Use a simple local server for a smoother experience: <br>
```
# Python 3
python -m http.server 8000
```
Then open ```http://localhost:8000``` in your browser.
<br>
### Note:
This demo does not require any real login. You can simply click **Skip (Demo)** on the login page to enter directly.

## License: <br>
This project is licensed under the [MIT License](https://github.com/Aritra-CyberPro/Employee-tracking/blob/main/LICENSE). See the LICENSE file for details.

## Author: <br>
[@Aritra](https://github.com/Aritra-CyberPro)
