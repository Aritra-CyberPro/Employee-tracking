
// Simple SPA helpers used across pages
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));

const Store = {
  get(key, fallback){
    try{ return JSON.parse(localStorage.getItem(key)) ?? fallback }
    catch(e){ return fallback }
  },
  set(key, value){ localStorage.setItem(key, JSON.stringify(value)) }
};

function formatTime(ts){
  const d = new Date(ts);
  return d.toLocaleString();
}

function shortNum(n){
  if(n>=1e9) return (n/1e9).toFixed(1)+'B';
  if(n>=1e6) return (n/1e6).toFixed(1)+'M';
  if(n>=1e3) return (n/1e3).toFixed(1)+'k';
  return n+'';
}

// Seed demo data once
(function seed(){
  if(Store.get('seeded')) return;
  const employees = [
    {id:'E001', name:'Aarav Sharma', role:'Frontend Dev', team:'Web', phone:'+91 90000 11111', email:'aarav@company.com', status:'Active', avatar:'https://i.pravatar.cc/100?img=1'},
    {id:'E002', name:'Isha Patel', role:'UI/UX Designer', team:'Design', phone:'+91 90000 22222', email:'isha@company.com', status:'Active', avatar:'https://i.pravatar.cc/100?img=12'},
    {id:'E003', name:'Kabir Singh', role:'Backend Dev', team:'API', phone:'+91 90000 33333', email:'kabir@company.com', status:'Inactive', avatar:'https://i.pravatar.cc/100?img=16'},
    {id:'E004', name:'Meera Nair', role:'QA Engineer', team:'QA', phone:'+91 90000 44444', email:'meera@company.com', status:'Active', avatar:'https://i.pravatar.cc/100?img=20'},
    {id:'E005', name:'Rohan Das', role:'Project Manager', team:'PMO', phone:'+91 90000 55555', email:'rohan@company.com', status:'Active', avatar:'https://i.pravatar.cc/100?img=24'},
  ];
  const attendance = [];
  const now = Date.now();
  for(let i=0;i<employees.length;i++){
    for(let d=0; d<7; d++){
      const day = now - d*24*60*60*1000;
      const inT = new Date(day).setHours(9, 15+Math.floor(Math.random()*30));
      const outT = new Date(day).setHours(18, 5+Math.floor(Math.random()*40));
      attendance.push({empId: employees[i].id, date: new Date(day).toISOString().slice(0,10), checkIn: inT, checkOut: outT, notes: ['Client call','Feature dev','Code review'][Math.floor(Math.random()*3)]});
    }
  }
  const tracks = {};
  employees.forEach(e=>{
    const baseLat = 28.6139 + (Math.random()-.5)*0.3;
    const baseLng = 77.2090 + (Math.random()-.5)*0.3;
    tracks[e.id] = Array.from({length:8}).map((_,i)=>({ 
      lat: baseLat + (Math.random()-.5)*0.02*i, 
      lng: baseLng + (Math.random()-.5)*0.02*i, 
      t: now - (8-i)*3600000
    }));
  });
  const tasks = [
    {id:'T-101', title:'Landing page revamp', assignee:'E001', status:'In Progress', due:'2025-09-05'},
    {id:'T-102', title:'Design system update', assignee:'E002', status:'Review', due:'2025-09-02'},
    {id:'T-103', title:'Payment API patch', assignee:'E003', status:'Open', due:'2025-09-10'},
    {id:'T-104', title:'Regression tests', assignee:'E004', status:'In Progress', due:'2025-09-03'},
  ];
  Store.set('employees', employees);
  Store.set('attendance', attendance);
  Store.set('tracks', tracks);
  Store.set('tasks', tasks);
  Store.set('seeded', true);
})();

// Authentication (demo only)
function login(e){
  e.preventDefault();
  const email = $('#email').value.trim();
  const pass = $('#password').value.trim();
  if(email && pass){
    localStorage.setItem('session', JSON.stringify({user:'Admin', email}));
    window.location.href = 'dashboard.html';
  } else {
    alert('Please enter email and password.');
  }
}

function logout(){
  localStorage.removeItem('session');
  window.location.href = 'index.html';
}

// Build sidebar active state
function initSidebar(active){
  const links = $$('.nav a');
  links.forEach(a=>{
    if(a.dataset.page === active){ a.classList.add('active') }
  });
}

// Dashboard population
function renderDashboard(){
  const employees = Store.get('employees', []);
  const attendance = Store.get('attendance', []);
  const tasks = Store.get('tasks', []);
  $('#kpi-employees').textContent = employees.length;
  const active = employees.filter(e=>e.status==='Active').length;
  $('#kpi-active').textContent = active;
  const presentToday = attendance.filter(a=>a.date === new Date().toISOString().slice(0,10)).length;
  $('#kpi-present').textContent = presentToday;
  const openTasks = tasks.filter(t=>t.status!=='Done').length;
  $('#kpi-tasks').textContent = openTasks;

  // recent attendance table
  const tbody = $('#att-body');
  tbody.innerHTML = '';
  attendance.slice(-10).reverse().forEach(r=>{
    const emp = employees.find(e=>e.id===r.empId);
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.date}</td><td>${emp?.name||r.empId}</td><td>${new Date(r.checkIn).toLocaleTimeString()}</td><td>${new Date(r.checkOut).toLocaleTimeString()}</td><td>${r.notes}</td>`;
    tbody.appendChild(tr);
  });
}

// Employees table
function renderEmployees(){
  const employees = Store.get('employees', []);
  const tbody = $('#emp-body');
  tbody.innerHTML='';
  employees.forEach(e=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td><img src="${e.avatar}" style="width:28px;height:28px;border-radius:50%;vertical-align:middle;margin-right:8px"> ${e.name}</td>
    <td>${e.id}</td><td>${e.role}</td><td>${e.team}</td><td>${e.phone}</td><td>${e.email}</td>
    <td><span class="badge">${e.status}</span></td>`;
    tbody.appendChild(tr);
  });
}

// Attendance page
function renderAttendance(){
  const employees = Store.get('employees', []);
  const attendance = Store.get('attendance', []);
  const tbody = $('#att-full');
  tbody.innerHTML='';
  attendance.slice(-50).reverse().forEach(r=>{
    const emp = employees.find(e=>e.id===r.empId);
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.date}</td><td>${emp?.name||r.empId}</td><td>${emp?.team||'-'}</td>
    <td>${new Date(r.checkIn).toLocaleTimeString()}</td><td>${new Date(r.checkOut).toLocaleTimeString()}</td><td>${r.notes}</td>`;
    tbody.appendChild(tr);
  });
}

// Tasks page
function renderTasks(){
  const tasks = Store.get('tasks', []);
  const employees = Store.get('employees', []);
  const tbody = $('#task-body');
  tbody.innerHTML='';
  tasks.forEach(t=>{
    const emp = employees.find(e=>e.id===t.assignee);
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${t.id}</td><td>${t.title}</td><td>${emp?.name||t.assignee}</td><td>${t.status}</td><td>${t.due}</td>`;
    tbody.appendChild(tr);
  });
}

// Map page
async function renderMap(){
  const tracks = Store.get('tracks', {});
  const employees = Store.get('employees', []);
  const empSel = $('#empSel');
  employees.forEach(e=>{
    const opt = document.createElement('option');
    opt.value = e.id; opt.textContent = `${e.name} (${e.id})`;
    empSel.appendChild(opt);
  });
  function plot(id){
    const t = tracks[id]; if(!t) return;
    const latlngs = t.map(p=>[p.lat,p.lng]);
    if(window.path){ window.map.removeLayer(window.path)}
    if(window.marker){ window.map.removeLayer(window.marker)}
    window.path = L.polyline(latlngs).addTo(window.map);
    window.marker = L.marker(latlngs.at(-1)).addTo(window.map);
    window.map.fitBounds(window.path.getBounds(), {padding:[30,30]});
    $('#lastUpdate').textContent = new Date(t.at(-1).t).toLocaleString();
  }
  empSel.addEventListener('change', e=>plot(e.target.value));
  plot(employees[0]?.id);
}

// Guard: require session on protected pages
function requireAuth(){
  if(!localStorage.getItem('session')){
    window.location.href = 'index.html';
  }
}
