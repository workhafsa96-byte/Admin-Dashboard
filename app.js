

"use strict";

/* ─── 1. DOM REFERENCES ──────────────────────────── */
const splashSection  = document.getElementById("splashSection");
const dashboardData  = document.getElementById("dashboardData");

const headerGreeting = document.getElementById("headerGreeting");
const headerDate     = document.getElementById("headerDate");

const sidebarAvatar  = document.getElementById("sidebarAvatar");
const sidebarName    = document.getElementById("sidebarName");

// String method display elements
const nameUpper = document.getElementById("nameUpper");
const nameLower = document.getElementById("nameLower");
const nameChar  = document.getElementById("nameChar");
const nameLen   = document.getElementById("nameLen");

// KPI card values
const cardSales     = document.getElementById("cardSales");
const cardOrders    = document.getElementById("cardOrders");
const cardCustomers = document.getElementById("cardCustomers");
const cardAvg       = document.getElementById("cardAvg");
const cardLen       = document.getElementById("cardLen");
const cardChar      = document.getElementById("cardChar");

// Progress bar fills
const barSales     = document.getElementById("barSales");
const barOrders    = document.getElementById("barOrders");
const barCustomers = document.getElementById("barCustomers");
const barAvg       = document.getElementById("barAvg");

// Calculation results
const calcTotal       = document.getElementById("calcTotal");
const calcAvg         = document.getElementById("calcAvg");
const calcProjected   = document.getElementById("calcProjected");
const calcPerCustomer = document.getElementById("calcPerCustomer");

// Activity list container
const activityList = document.getElementById("activityList");

/* ─── 2. LIVE DATE IN HEADER ─────────────────────── */
function setLiveDate() {
  // Build a human-readable date + time string
  const now = new Date();
  const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
  headerDate.textContent = now.toLocaleDateString(undefined, options);
}

setLiveDate(); // Run once on load
setInterval(setLiveDate, 60000); // Refresh every minute

/* ─── 3. THEME TOGGLE ────────────────────────────── */
const themeIcon = document.getElementById("themeIcon");
let isDark = true; // dashboard starts in dark mode (data-theme="dark" in HTML)

function toggleTheme() {
  isDark = !isDark;

  if (isDark) {
    document.documentElement.setAttribute("data-theme", "dark");
    themeIcon.className = "ph-bold ph-sun"; // show sun → click to go light
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    themeIcon.className = "ph-bold ph-moon"; // show moon → click to go dark
  }
}

/* ─── 4. SIDEBAR TOGGLE (mobile) ────────────────── */
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");

function toggleSidebar() {
  sidebar.classList.toggle("open");
  overlay.classList.toggle("visible");
}

function closeSidebar() {
  sidebar.classList.remove("open");
  overlay.classList.remove("visible");
}

// Close sidebar when a nav link is clicked (mobile UX)
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", () => {
    closeSidebar();
    // Highlight the clicked link as active
    document.querySelectorAll(".nav-link").forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

/* ─── 5. HELPER: FORMAT NUMBERS ─────────────────── */
/**
 * Format a plain number into a readable string.
 * e.g. 1500 → "1,500"   99999 → "99,999"
 */
function formatNumber(num) {
  return num.toLocaleString();
}

/* ─── 6. HELPER: ANIMATE PROGRESS BAR ───────────── */
/**
 * Animate a progress bar element to a given percentage width.
 * We use setTimeout so the CSS transition fires properly.
 */
function animateBar(barEl, percentWidth) {
  setTimeout(() => {
    barEl.style.width = percentWidth + "%";
  }, 300);
}

/* ─── 7. ACTIVITY FEED GENERATOR ────────────────── */
/**
 * Build a list of recent activities based on the admin's input data.
 * Uses template literals and dynamic dot colours.
 */
function buildActivityFeed(adminName, sales, orders, customers) {
  // Each activity is an object with text, time, and a colour class
  const activities = [
    {
      text: `Dashboard generated for admin <strong>${adminName.toUpperCase()}</strong>`,
      time: "Just now",
      color: "#f59e0b"   // amber
    },
    {
      text: `Total sales of <strong>$${formatNumber(sales)}</strong> recorded`,
      time: "1 min ago",
      color: "#10b981"   // green
    },
    {
      text: `<strong>${formatNumber(orders)}</strong> orders processed successfully`,
      time: "2 min ago",
      color: "#3b82f6"   // blue
    },
    {
      text: `<strong>${formatNumber(customers)}</strong> customers in the system`,
      time: "3 min ago",
      color: "#8b5cf6"   // purple
    },
    {
      text: `Average business value calculated: <strong>$${formatNumber(Math.round((sales + orders + customers) / 3))}</strong>`,
      time: "4 min ago",
      color: "#f43f5e"   // rose
    },
    {
      text: `Admin name starts with letter <strong>"${adminName.trim().charAt(0).toUpperCase()}"</strong>`,
      time: "5 min ago",
      color: "#f59e0b"
    }
  ];

  // Clear any previous activity items
  activityList.innerHTML = "";

  // Create and append each item
  activities.forEach(act => {
    const item = document.createElement("div");
    item.className = "activity-item";
    item.innerHTML = `
      <span class="activity-dot" style="background:${act.color};
        box-shadow: 0 0 8px ${act.color}88;"></span>
      <span class="activity-text">${act.text}</span>
      <span class="activity-time">${act.time}</span>
    `;
    activityList.appendChild(item);
  });
}


function generateDashboard() {

  

  // Admin Name — String variable
  let rawAdminName = prompt("👤 Enter Admin Name:", "John Doe");

  // If the user cancelled or left empty, abort
  if (rawAdminName === null || rawAdminName.trim() === "") {
    alert("⚠️ Admin name cannot be empty. Please try again.");
    return;
  }

  let totalSalesInput     = prompt("💰 Enter Total Sales ($):", "50000");
  let totalOrdersInput    = prompt("📦 Enter Total Orders:", "320");
  let totalCustomersInput = prompt("👥 Enter Total Customers:", "1500");

  /* ── STEP 2: String Methods ── */

  // trim() — remove leading/trailing spaces
  let adminName = rawAdminName.trim(); // String variable (trimmed)

  // toUpperCase() — full name in capitals
  let adminUpper = adminName.toUpperCase();

  // toLowerCase() — full name in small letters
  let adminLower = adminName.toLowerCase();

  // charAt(0) — first character of name
  let adminFirstChar = adminName.charAt(0);

  // length — total number of characters
  let adminLength = adminName.length;

  /* ── STEP 3: Number Conversions ── */

  // Number() converts the string prompts into numeric values
  let totalSales     = Number(totalSalesInput);
  let totalOrders    = Number(totalOrdersInput);
  let totalCustomers = Number(totalCustomersInput);

  // Validate: make sure the conversions gave real numbers
  if (isNaN(totalSales) || isNaN(totalOrders) || isNaN(totalCustomers)) {
    alert("⚠️ Sales, Orders, and Customers must be valid numbers.");
    return;
  }

  /* ── STEP 4: Arithmetic Calculations ── */

  // Total Business Value = Sales + Orders + Customers
  let totalBusiness = totalSales + totalOrders + totalCustomers;

  // Average Value = Total ÷ 3
  let averageValue = totalBusiness / 3;

  // Projected Revenue = Sales × 1.2
  let projectedRevenue = totalSales * 1.2;

  // Revenue per Customer = Sales ÷ Customers (avoid divide by zero)
  let revenuePerCustomer = totalCustomers > 0
    ? (totalSales / totalCustomers)
    : 0;

  /* ── STEP 5: Update the UI ── */

  // — Header greeting with admin name
  headerGreeting.textContent = `Welcome, ${adminUpper} 👋`;

  // — Sidebar avatar (first letter) and name
  sidebarAvatar.textContent = adminFirstChar.toUpperCase();
  sidebarName.textContent   = adminName;

  // — String banner
  nameUpper.textContent = adminUpper;
  nameLower.textContent = adminLower;
  nameChar.textContent  = adminFirstChar;
  nameLen.textContent   = adminLength;

  // — KPI cards
  cardSales.textContent     = "$" + formatNumber(totalSales);
  cardOrders.textContent    = formatNumber(totalOrders);
  cardCustomers.textContent = formatNumber(totalCustomers);
  cardAvg.textContent       = "$" + formatNumber(Math.round(averageValue));
  cardLen.textContent       = adminLength;   // Number: name length
  cardChar.textContent      = adminFirstChar; // String: first character

  
  const maxVal = Math.max(totalSales, totalOrders, totalCustomers, 1);
  animateBar(barSales,     Math.round((totalSales     / maxVal) * 100));
  animateBar(barOrders,    Math.round((totalOrders    / maxVal) * 100));
  animateBar(barCustomers, Math.round((totalCustomers / maxVal) * 100));
  animateBar(barAvg,       Math.round((averageValue   / maxVal) * 100));

  // — Calculation panel
  calcTotal.textContent       = formatNumber(Math.round(totalBusiness));
  calcAvg.textContent         = "$" + formatNumber(Math.round(averageValue));
  calcProjected.textContent   = "$" + formatNumber(Math.round(projectedRevenue));
  calcPerCustomer.textContent = "$" + formatNumber(Math.round(revenuePerCustomer));

  // — Activity feed
  buildActivityFeed(adminName, totalSales, totalOrders, totalCustomers);

  /* ── STEP 6: Show dashboard, hide splash ── */
  splashSection.style.display  = "none";
  dashboardData.style.display  = "flex";

  // Smooth scroll to top of content
  window.scrollTo({ top: 0, behavior: "smooth" });
}
