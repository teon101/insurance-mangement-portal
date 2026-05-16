// =====================================================
// data.js — InsurePortal
// All data lives in localStorage so it persists
// across pages and survives page refreshes.
// =====================================================

// ===== AUTH GUARD =====
// Every page calls this. If not logged in → go to login.
function requireLogin() {
  const user = localStorage.getItem('ip_user');
  if (!user) window.location.href = 'login.html';
  return JSON.parse(user);
}

// ===== GET LOGGED IN USER =====
function getUser() {
  return JSON.parse(localStorage.getItem('ip_user') || 'null');
}

// ===== LOGOUT =====
function logout() {
  localStorage.removeItem('ip_user');
  window.location.href = 'login.html';
}

// ===== SEED DEFAULT DATA =====
// Only runs once — if localStorage has no data yet, seed it.
function seedData() {
  if (localStorage.getItem('ip_seeded')) return;

  const defaultPolicies = [
    { id:'POL-2022-0341', customer:'James Okafor',  type:'Health', premium:'$420/mo', start:'Jan 2022', end:'Jan 2026', status:'Active'  },
    { id:'POL-2023-0512', customer:'Maria Santos',  type:'Auto',   premium:'$210/mo', start:'Mar 2023', end:'Mar 2025', status:'Active'  },
    { id:'POL-2024-0788', customer:'Chidi Eze',     type:'Life',   premium:'$85/mo',  start:'Jul 2024', end:'Jul 2034', status:'Active'  },
    { id:'POL-2021-0190', customer:'Amaka Nwosu',   type:'Home',   premium:'$150/mo', start:'Nov 2021', end:'Nov 2024', status:'Expired' },
    { id:'POL-2024-0912', customer:'Emeka Dike',    type:'Auto',   premium:'$195/mo', start:'Dec 2024', end:'Dec 2025', status:'Pending' },
    { id:'POL-2023-0670', customer:'Ngozi Adeyemi', type:'Health', premium:'$380/mo', start:'Jun 2023', end:'Jun 2025', status:'Active'  },
    { id:'POL-2022-0455', customer:'Tunde Balogun', type:'Life',   premium:'$95/mo',  start:'Feb 2022', end:'Feb 2032', status:'Active'  },
    { id:'POL-2023-0801', customer:'Fatima Musa',   type:'Home',   premium:'$175/mo', start:'Sep 2023', end:'Sep 2025', status:'Pending' },
  ];

  const defaultClaims = [
    { id:'CLM-2024-0891', policyId:'POL-2023-0512', customer:'Maria Santos',  type:'Auto Accident',   amount:'$3,200',  filed:'Jan 14, 2025', status:'Submitted'   },
    { id:'CLM-2024-0880', policyId:'POL-2022-0341', customer:'James Okafor',  type:'Medical',         amount:'$1,450',  filed:'Jan 10, 2025', status:'Approved'    },
    { id:'CLM-2024-0851', policyId:'POL-2024-0788', customer:'Chidi Eze',     type:'Hospital Stay',   amount:'$8,700',  filed:'Dec 28, 2024', status:'Under Review'},
    { id:'CLM-2024-0820', policyId:'POL-2021-0190', customer:'Amaka Nwosu',   type:'Property Damage', amount:'$12,000', filed:'Dec 15, 2024', status:'Rejected'    },
    { id:'CLM-2024-0799', policyId:'POL-2023-0670', customer:'Ngozi Adeyemi', type:'Medical',         amount:'$650',   filed:'Dec 5, 2024',  status:'Approved'    },
    { id:'CLM-2024-0750', policyId:'POL-2022-0455', customer:'Tunde Balogun', type:'Life Benefit',    amount:'$5,000',  filed:'Nov 20, 2024', status:'Under Review'},
  ];

  const defaultCustomers = [
    { name:'Maria Santos',  initials:'MS', email:'m.santos@email.com',  phone:'+234 801 234 5678', policies:2, claims:1, since:'Mar 2022' },
    { name:'James Okafor',  initials:'JO', email:'j.okafor@email.com',  phone:'+234 802 345 6789', policies:1, claims:1, since:'Aug 2020' },
    { name:'Chidi Eze',     initials:'CE', email:'c.eze@email.com',     phone:'+234 803 456 7890', policies:3, claims:2, since:'Jan 2019' },
    { name:'Amaka Nwosu',   initials:'AN', email:'a.nwosu@email.com',   phone:'+234 804 567 8901', policies:1, claims:1, since:'Nov 2021' },
    { name:'Emeka Dike',    initials:'ED', email:'e.dike@email.com',    phone:'+234 805 678 9012', policies:1, claims:0, since:'Dec 2024' },
    { name:'Ngozi Adeyemi', initials:'NA', email:'n.adeyemi@email.com', phone:'+234 806 789 0123', policies:1, claims:1, since:'Jun 2023' },
    { name:'Tunde Balogun', initials:'TB', email:'t.balogun@email.com', phone:'+234 807 890 1234', policies:1, claims:1, since:'Feb 2022' },
    { name:'Fatima Musa',   initials:'FM', email:'f.musa@email.com',    phone:'+234 808 901 2345', policies:1, claims:0, since:'Sep 2023' },
  ];

  localStorage.setItem('ip_policies',  JSON.stringify(defaultPolicies));
  localStorage.setItem('ip_claims',    JSON.stringify(defaultClaims));
  localStorage.setItem('ip_customers', JSON.stringify(defaultCustomers));
  localStorage.setItem('ip_seeded', 'true');
}

// Run seed
seedData();

// ===== DATA ACCESSORS =====
// Use these everywhere instead of raw arrays

function getPolicies()  { return JSON.parse(localStorage.getItem('ip_policies')  || '[]'); }
function getClaims()    { return JSON.parse(localStorage.getItem('ip_claims')    || '[]'); }
function getCustomers() { return JSON.parse(localStorage.getItem('ip_customers') || '[]'); }

function savePolicies(data)  { localStorage.setItem('ip_policies',  JSON.stringify(data)); }
function saveClaims(data)    { localStorage.setItem('ip_claims',    JSON.stringify(data)); }
function saveCustomers(data) { localStorage.setItem('ip_customers', JSON.stringify(data)); }

// ===== BADGE CLASS HELPER =====
function getBadgeClass(status) {
  const map = {
    'Active':       'badge-active',
    'Pending':      'badge-pending',
    'Expired':      'badge-expired',
    'Approved':     'badge-approved',
    'Under Review': 'badge-review',
    'Rejected':     'badge-rejected',
    'Submitted':    'badge-submitted',
  };
  return map[status] || '';
}

// ===== INJECT USER INFO INTO PAGE =====
// Call this on every page to fill in the user's name/initials
function injectUser() {
  const user = getUser();
  if (!user) return;
  // Fill any element with class 'user-name'
  document.querySelectorAll('.user-name').forEach(el => el.textContent = user.name);
  // Fill any element with class 'user-initials'
  document.querySelectorAll('.user-initials').forEach(el => el.textContent = user.initials);
  // Fill welcome message
  document.querySelectorAll('.user-welcome').forEach(el => el.textContent = `Welcome back, ${user.name} 👋`);
}