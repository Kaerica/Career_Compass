// Edit this base URL if your backend runs elsewhere
const API_BASE = 'http://localhost:4000/api';

let session = null; // {id,name,email,role,token}

async function $(id){ return document.getElementById(id); } // helper not async but okay

// Register
document.getElementById('btnRegister').addEventListener('click', async () => {
  const name = document.getElementById('regName').value.trim();
  const email = document.getElementById('regEmail').value.trim();
  const password = document.getElementById('regPassword').value.trim();
  const role = document.getElementById('regRole').value;
  if (!name || !email || !password) return alert('Fill all registration fields');
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name, email, password, role })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.error || 'Registration failed');
    alert('Registered. Now log in.');
  } catch(e){ alert('Cannot reach backend. Start server.'); console.error(e); }
});

// Login
document.getElementById('btnLogin').addEventListener('click', async () => {
  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value.trim();
  if (!email || !password) return alert('Enter email & password');
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method:'POST', headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.error || 'Login failed');
    session = data.user; // contains token
    localStorage.setItem('cc_session', JSON.stringify(session));
    showDashboardFor(session.role);
  } catch(e){ console.error(e); alert('Server error'); }
});

// On load: restore session if present
window.addEventListener('load', async () => {
  const s = localStorage.getItem('cc_session');
  if (s) {
    session = JSON.parse(s);
    // validate token by calling /me
    try {
      const res = await fetch(`${API_BASE}/me`, { headers:{ 'x-token': session.token }});
      if (res.ok) {
        showDashboardFor(session.role);
        return;
      }
    } catch(e){ console.warn('Backend unreachable'); }
    // invalid => clear
    session = null; localStorage.removeItem('cc_session');
  }
  // otherwise remain on auth form
});

// Logout
function logoutLocal(){
  session = null; localStorage.removeItem('cc_session');
  document.getElementById('auth').classList.remove('hidden');
  document.getElementById('studentDash').classList.add('hidden');
  document.getElementById('counselorDash').classList.add('hidden');
  document.getElementById('adminDash').classList.add('hidden');
  clearAuthInputs();
}
function clearAuthInputs(){
  document.getElementById('loginEmail').value=''; document.getElementById('loginPassword').value='';
}

// Show dashboard by role
async function showDashboardFor(role){
  document.getElementById('auth').classList.add('hidden');
  document.getElementById('studentDash').classList.add('hidden');
  document.getElementById('counselorDash').classList.add('hidden');
  document.getElementById('adminDash').classList.add('hidden');

  if (role === 'student') {
    document.getElementById('studentDash').classList.remove('hidden');
    // fill name
    document.getElementById('studentName').innerText = session.name;
    await loadCareers();
    await loadCounselorOptions();
    // attach actions
    document.getElementById('reqCounselor').onclick = requestCounselor;
    document.getElementById('createTicket').onclick = createTicket;
  } else if (role === 'counselor') {
    document.getElementById('counselorDash').classList.remove('hidden');
    document.getElementById('counselorName').innerText = session.name;
    await loadRequests();
    await populateChatStudents();
    document.getElementById('sendChat').onclick = sendChat;
    setInterval(pollChatIfOpen, 2000);
  } else if (role === 'admin') {
    document.getElementById('adminDash').classList.remove('hidden');
    await loadAllUsers();
    await loadAllTickets();
  }

  // top logout control
  const top = document.getElementById('top-controls');
  top.innerHTML = `<span class="small">Signed in as ${session.name} (${session.role})</span> <button id="btnLogout">Logout</button>`;
  document.getElementById('btnLogout').onclick = logoutLocal;
}

// Helper to call api with token
async function api(path, opts={}){
  opts.headers = opts.headers || {};
  opts.headers['Content-Type'] = 'application/json';
  if (session && session.token) opts.headers['x-token'] = session.token;
  const res = await fetch(`${API_BASE}${path}`, opts);
  const data = await res.json().catch(()=>({}));
  return { ok: res.ok, status: res.status, data };
}

/* Student features */
async function loadCareers(){
  const r = await api('/careers', { method:'GET' });
  const list = document.getElementById('careersList');
  list.innerHTML = '';
  if (r.ok){
    r.data.forEach(c => {
      const li = document.createElement('li');
      li.innerHTML = `<strong>${c.title}</strong><div class="small">${c.summary}</div>`;
      list.appendChild(li);
    });
  } else list.innerText = 'Could not load careers';
}

async function loadCounselorOptions(){
  const res = await api('/users', { method:'GET' });
  const select = document.getElementById('counselorSelect');
  // users is admin-protected; but we can get list via /users only for admin.
  // We'll instead fetch all users and filter by counselor via /api/users only if admin; quick workaround: request to /users will fail for students.
  // Instead, fetch from /api/users as admin not allowed. We'll use a guest call to /api/careers and provide only "any available". For demo, call backend to /api/users if allowed.
  select.innerHTML = '<option value="">Any available</option>';
  // For demo: fetch users without auth cannot; so fallback to empty.
  // But we can fetch requests and counselors will be seen by admin; keeping this simple.
}

/* Tickets */
async function createTicket(){
  const title = document.getElementById('ticketTitle').value.trim();
  const message = document.getElementById('ticketMsg').value.trim();
  if (!title || !message) return alert('Fill title and message');
  const r = await api('/tickets', { method:'POST', body: JSON.stringify({ title, message }) });
  if (r.ok) { alert('Ticket created'); document.getElementById('ticketTitle').value=''; document.getElementById('ticketMsg').value=''; }
  else alert(r.data.error || 'Could not create ticket');
}

/* Counselor features: requests & chat */
async function loadRequests(){
  const r = await api('/requests', { method:'GET' });
  const ul = document.getElementById('requestsList'); ul.innerHTML='';
  if (!r.ok) return ul.innerText='Could not load';
  r.data.forEach(req => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>Student ID:</strong> ${req.studentId} <div class="small">${req.note || ''}</div>
      <div style="margin-top:6px"><button onclick="assignToMe('${req.id}')">Assign to me</button>
      <button onclick="openChatWith('${req.studentId}')">Chat</button></div>`;
    ul.appendChild(li);
  });
}

async function assignToMe(requestId){
  // admin-only capability to change db isn't implemented in backend; as a demo we'll update request locally by hitting /requests (not implemented)
  alert('Demo: assignment would be handled server-side in production.');
}

async function populateChatStudents(){
  // For demo, pull requests to find students
  const r = await api('/requests', { method:'GET' });
  const sel = document.getElementById('chatStudentSelect'); sel.innerHTML='<option value="">Select student</option>';
  if (!r.ok) return;
  const students = r.data.map(x => x.studentId);
  // Remove duplicates
  const uniq = [...new Set(students)];
  uniq.forEach(sid => {
    const opt = document.createElement('option'); opt.value = sid; opt.innerText = sid;
    sel.appendChild(opt);
  });
}

let chatWith = null;
async function openChatWith(studentId){
  chatWith = studentId;
  document.getElementById('chatStudentSelect').value = studentId;
  await refreshChat();
}

document.getElementById('chatStudentSelect').addEventListener('change', async (e) => {
  chatWith = e.target.value || null;
  await refreshChat();
});

async function sendChat(){
  const text = document.getElementById('chatInput').value.trim();
  if (!chatWith || !text) return alert('Select a student and type a message');
  const r = await api('/messages', { method:'POST', body: JSON.stringify({ toUserId: chatWith, text }) });
  if (r.ok){ document.getElementById('chatInput').value=''; await refreshChat(); }
  else alert('Could not send');
}

async function refreshChat(){
  const chatBox = document.getElementById('chatBox'); chatBox.innerHTML='';
  if (!chatWith) return;
  const r = await api(`/messages?withUser=${chatWith}`, { method:'GET' });
  if (!r.ok) return chatBox.innerText='Could not load messages';
  r.data.forEach(m => {
    const d = new Date(m.createdAt).toLocaleTimeString();
    const self = (m.from === session.id);
    const p = document.createElement('div');
    p.style.padding='6px'; p.style.margin='6px 0'; p.style.background = self ? '#3a0f6b' : '#111'; p.style.borderRadius='6px';
    p.innerHTML = `<small class="small">${self? 'You': m.from} • ${d}</small><div>${m.text}</div>`;
    chatBox.appendChild(p);
  });
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function pollChatIfOpen(){
  if (chatWith) await refreshChat();
}

/* Admin features */
async function loadAllUsers(){
  const r = await api('/users', { method:'GET' });
  const ul = document.getElementById('allUsers'); ul.innerHTML='';
  if (!r.ok) return ul.innerText='Cannot load: ' + (r.data.error || '');
  r.data.forEach(u => {
    const li = document.createElement('li');
    li.innerHTML = `${u.name} • ${u.email} • ${u.role}`;
    ul.appendChild(li);
  });
}
async function loadAllTickets(){
  const r = await api('/tickets', { method:'GET' });
  const ul = document.getElementById('allTickets'); ul.innerHTML='';
  if (!r.ok) return ul.innerText='Cannot load tickets';
  r.data.forEach(t => {
    const li = document.createElement('li');
    li.innerHTML = `<strong>${t.title}</strong><div class="small">${t.message}</div><div class="small">By: ${t.userId}</div>`;
    ul.appendChild(li);
  });
}

/* show register link handler */
document.getElementById('showRegister').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
