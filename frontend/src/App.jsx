import { useEffect, useMemo, useState } from "react";

import {
  LayoutDashboard,
  Wallet,
  ArrowUpDown,
  Tags,
  Target,
  BarChart3,
  Settings,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X,
  LogOut,
  CreditCard,
  ShoppingCart,
  Utensils,
  Home,
  MoreHorizontal,
  Pencil,
  Trash2,
  TrendingUp,
  TrendingDown,
  CircleDollarSign,
  PiggyBank,
  ChevronRight,
  Filter,
  RefreshCw,
} from "lucide-react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const API_URL = "https://finsight-mm3b.onrender.com/api";

/* =========================================================
   APP
========================================================= */

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("financehub_user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (loggedInUser) => {
    localStorage.setItem("financehub_user", JSON.stringify(loggedInUser));
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("financehub_user");
    setUser(null);
  };

  if (!user) {
    return (
      <AuthPage
        showRegister={showRegister}
        setShowRegister={setShowRegister}
        onLogin={handleLogin}
      />
    );
  }

  return <Dashboard user={user} onLogout={handleLogout} />;
}

/* =========================================================
   AUTH
========================================================= */

function AuthPage({ showRegister, setShowRegister, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email || !password || (showRegister && !name)) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const endpoint = showRegister
        ? `${API_URL}/auth/register`
        : `${API_URL}/auth/login`;

      const body = showRegister
        ? { name, email, password }
        : { email, password };

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong.");
      }

      if (showRegister) {
        setMessage("Registration successful. Please login.");

        setName("");
        setEmail("");
        setPassword("");

        setTimeout(() => {
          setShowRegister(false);
          setMessage("");
        }, 1000);
      } else {
        onLogin(data.user);

        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError(err.message || "Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <div className="auth-logo">
            <Wallet size={28} />
          </div>

          <span>FinSight</span>
        </div>

        <div className="auth-content">
          <span className="auth-badge">Smart Personal Finance Management</span>

          <h1>
            Manage your money.
            <br />
            <span>Build your future.</span>
          </h1>

          <p>
            Track your income, expenses and financial goals all in one beautiful
            dashboard.
          </p>

          <div className="auth-features">
            <div>
              <div className="feature-icon green">
                <ArrowUpRight size={20} />
              </div>

              <div>
                <strong>Track Income</strong>
                <span>Know exactly where your money comes from.</span>
              </div>
            </div>

            <div>
              <div className="feature-icon red">
                <ArrowDownRight size={20} />
              </div>

              <div>
                <strong>Control Expenses</strong>
                <span>Keep your spending under control.</span>
              </div>
            </div>

            <div>
              <div className="feature-icon blue">
                <Target size={20} />
              </div>

              <div>
                <strong>Reach Goals</strong>
                <span>Plan and achieve your financial goals.</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <div className="mobile-auth-brand">
            <div className="auth-logo">
              <Wallet size={24} />
            </div>

            <span>FinSight</span>
          </div>

          <div className="auth-heading">
            <h2>{showRegister ? "Create account" : "Welcome back"}</h2>

            <p>
              {showRegister
                ? "Create your FinSight account"
                : "Sign in to continue to your dashboard"}
            </p>
          </div>

          {message && <div className="auth-success">{message}</div>}

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            {showRegister && (
              <div className="input-group">
                <label>Full Name</label>

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            <div className="input-group">
              <label>Email Address</label>

              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {!showRegister && (
              <div className="forgot-password">Forgot password?</div>
            )}

            <button className="auth-submit" type="submit" disabled={loading}>
              {loading
                ? "Please wait..."
                : showRegister
                  ? "Create Account"
                  : "Sign In"}
            </button>
          </form>

          <div className="auth-switch">
            {showRegister
              ? "Already have an account?"
              : "Don't have an account?"}

            <button
              type="button"
              onClick={() => {
                setShowRegister(!showRegister);
                setMessage("");
                setError("");
              }}
            >
              {showRegister ? " Sign In" : " Create Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({ user, onLogout }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const [toast, setToast] = useState(null);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  /* =====================================================
     THEME
  ===================================================== */

  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("finsight_theme") || "light";
  });

  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("finsight_theme", theme);
  }, [theme]);

  /* =====================================================
     CLOSE THEME DROPDOWN
  ===================================================== */

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".theme-wrapper")) {
        setThemeMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [form, setForm] = useState({
    amount: "",
    category: "Food",
    type: "expense",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const showToast = (message, type = "success") => {
    setToast({
      message,
      type,
    });

    setTimeout(() => {
      setToast(null);
    }, 2500);
  };

  /* =====================================================
     GET TRANSACTIONS
  ===================================================== */

  const fetchTransactions = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/transactions`);

      if (!response.ok) {
        throw new Error("Failed to load transactions.");
      }

      const data = await response.json();

      setTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      showToast(error.message || "Unable to load transactions.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  /* =====================================================
     CALCULATIONS
  ===================================================== */

  const totalIncome = useMemo(() => {
    return transactions
      .filter((item) => String(item.type).toLowerCase() === "income")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }, [transactions]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter((item) => String(item.type).toLowerCase() === "expense")
      .reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }, [transactions]);

  const balance = totalIncome - totalExpense;

  /* =====================================================
     FILTER
  ===================================================== */

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        const text = `${transaction.category || ""} ${
          transaction.description || ""
        }`.toLowerCase();

        return text.includes(search.toLowerCase());
      })
      .filter((transaction) => {
        if (filterType === "all") return true;

        return String(transaction.type).toLowerCase() === filterType;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [transactions, search, filterType]);

  /* =====================================================
     MONTHLY CHART
  ===================================================== */

  const chartData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return months.map((month, index) => {
      let income = 0;
      let expense = 0;

      transactions.forEach((transaction) => {
        if (!transaction.date) return;

        const date = new Date(transaction.date);

        if (date.getMonth() === index) {
          if (String(transaction.type).toLowerCase() === "income") {
            income += Number(transaction.amount || 0);
          } else if (String(transaction.type).toLowerCase() === "expense") {
            expense += Number(transaction.amount || 0);
          }
        }
      });

      return {
        month,
        income,
        expense,
      };
    });
  }, [transactions]);

  /* =====================================================
     CATEGORY DATA
  ===================================================== */

  const categoryData = useMemo(() => {
    const map = {};

    transactions
      .filter((item) => String(item.type).toLowerCase() === "expense")
      .forEach((item) => {
        const category = item.category || "Other";

        map[category] = (map[category] || 0) + Number(item.amount || 0);
      });

    return Object.entries(map).map(([name, value]) => ({
      name,
      value,
    }));
  }, [transactions]);

  /* =====================================================
     ADD
  ===================================================== */

  const openAddModal = () => {
    setEditingTransaction(null);

    setForm({
      amount: "",
      category: "Food",
      type: "expense",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });

    setShowModal(true);
  };

  /* =====================================================
     EDIT
  ===================================================== */

  const openEditModal = (transaction) => {
    setEditingTransaction(transaction);

    setForm({
      amount: transaction.amount || "",
      category: transaction.category || "Food",
      type: transaction.type || "expense",
      description: transaction.description || "",
      date: transaction.date || "",
    });

    setShowModal(true);
  };

  /* =====================================================
     SAVE
  ===================================================== */

  const handleSaveTransaction = async (e) => {
    e.preventDefault();

    if (!form.amount || Number(form.amount) <= 0) {
      showToast("Please enter a valid amount.", "error");
      return;
    }

    if (!form.date) {
      showToast("Please select a date.", "error");
      return;
    }

    try {
      const isEdit = Boolean(editingTransaction);

      const url = isEdit
        ? `${API_URL}/transactions/${editingTransaction.id}`
        : `${API_URL}/transactions`;

      const response = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(form.amount),
          category: form.category,
          type: form.type,
          description: form.description,
          date: form.date,
        }),
      });

      if (!response.ok) {
        throw new Error(
          isEdit
            ? "Unable to update transaction."
            : "Unable to add transaction.",
        );
      }

      await response.json();

      setShowModal(false);

      await fetchTransactions();

      showToast(
        isEdit
          ? "Transaction updated successfully."
          : "Transaction added successfully.",
        "success",
      );
    } catch (error) {
      showToast(error.message || "Something went wrong.", "error");
    }
  };

  /* =====================================================
     DELETE
  ===================================================== */

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Unable to delete transaction.");
      }

      setTransactions((current) =>
        current.filter((transaction) => transaction.id !== id),
      );

      showToast("Transaction deleted successfully.", "success");
    } catch (error) {
      showToast(error.message || "Delete failed.", "error");
    }
  };

  /* =====================================================
     MENU
  ===================================================== */

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-container">
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand-icon">
            <Wallet size={23} />
          </div>

          <span>FinSight</span>

          <button
            className="mobile-close"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <div className="sidebar-section-title">MAIN MENU</div>

        <nav>
          <SidebarItem
            icon={<LayoutDashboard size={19} />}
            label="Dashboard"
            active={activeMenu === "Dashboard"}
            onClick={() => handleMenuClick("Dashboard")}
          />

          <SidebarItem
            icon={<Wallet size={19} />}
            label="Accounts"
            active={activeMenu === "Accounts"}
            onClick={() => handleMenuClick("Accounts")}
          />

          <SidebarItem
            icon={<ArrowUpDown size={19} />}
            label="Transactions"
            active={activeMenu === "Transactions"}
            onClick={() => handleMenuClick("Transactions")}
          />

          <SidebarItem
            icon={<Tags size={19} />}
            label="Categories"
            active={activeMenu === "Categories"}
            onClick={() => handleMenuClick("Categories")}
          />

          <SidebarItem
            icon={<Target size={19} />}
            label="Goals"
            active={activeMenu === "Goals"}
            onClick={() => handleMenuClick("Goals")}
          />

          <SidebarItem
            icon={<BarChart3 size={19} />}
            label="Reports"
            active={activeMenu === "Reports"}
            onClick={() => handleMenuClick("Reports")}
          />
        </nav>

        <div className="sidebar-section-title settings-title">SETTINGS</div>

        <SidebarItem
          icon={<Settings size={19} />}
          label="Settings"
          active={activeMenu === "Settings"}
          onClick={() => handleMenuClick("Settings")}
        />

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="user-avatar">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            <div className="user-details">
              <strong>{user?.name || "User"}</strong>
              <span>{user?.email || ""}</span>
            </div>
          </div>

          <button className="logout-button" onClick={onLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-menu"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={23} />
            </button>

            <div className="search-box">
              <Search size={18} />

              <input
                placeholder="Search transactions..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* =================================================
              TOP RIGHT
              ONLY THEME + PROFILE
          ================================================= */}

          <div className="topbar-right">
            <div className="theme-wrapper">
              <button
                className="theme-button"
                onClick={() => setThemeMenuOpen((prev) => !prev)}
                title="Appearance"
                aria-label="Appearance"
              >
                <span className="theme-current-icon">
                  {theme === "dark" ? "🌙" : "☀️"}
                </span>
              </button>

              {themeMenuOpen && (
                <div className="theme-dropdown">
                  <div className="theme-dropdown-title">Appearance</div>

                  <button
                    type="button"
                    className={
                      theme === "light" ? "theme-option active" : "theme-option"
                    }
                    onClick={() => {
                      setTheme("light");
                      setThemeMenuOpen(false);
                    }}
                  >
                    <span className="theme-option-icon">☀️</span>

                    <span>Light Mode</span>

                    {theme === "light" && (
                      <span className="theme-check">✓</span>
                    )}
                  </button>

                  <button
                    type="button"
                    className={
                      theme === "dark" ? "theme-option active" : "theme-option"
                    }
                    onClick={() => {
                      setTheme("dark");
                      setThemeMenuOpen(false);
                    }}
                  >
                    <span className="theme-option-icon">🌙</span>

                    <span>Dark Mode</span>

                    {theme === "dark" && <span className="theme-check">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* PROFILE */}

            <div className="profile">
              <div className="profile-avatar">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              <div className="profile-text">
                <strong>{user?.name || "User"}</strong>
                <span>Personal Account</span>
              </div>
            </div>
          </div>
        </header>

        <div className="dashboard-content">
          {activeMenu === "Dashboard" && (
            <DashboardHome
              user={user}
              balance={balance}
              totalIncome={totalIncome}
              totalExpense={totalExpense}
              transactions={filteredTransactions}
              chartData={chartData}
              categoryData={categoryData}
              loading={loading}
              onAdd={openAddModal}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onRefresh={fetchTransactions}
              onTransactions={() => setActiveMenu("Transactions")}
            />
          )}

          {activeMenu === "Transactions" && (
            <TransactionsPage
              transactions={filteredTransactions}
              loading={loading}
              filterType={filterType}
              setFilterType={setFilterType}
              onAdd={openAddModal}
              onEdit={openEditModal}
              onDelete={handleDelete}
              onRefresh={fetchTransactions}
            />
          )}

          {activeMenu === "Accounts" && (
            <AccountsPage
              balance={balance}
              income={totalIncome}
              expense={totalExpense}
            />
          )}

          {activeMenu === "Categories" && (
            <CategoriesPage
              categoryData={categoryData}
              transactions={transactions}
            />
          )}

          {activeMenu === "Goals" && (
            <GoalsPage
              balance={balance}
              income={totalIncome}
              expense={totalExpense}
            />
          )}

          {activeMenu === "Reports" && (
            <ReportsPage
              chartData={chartData}
              categoryData={categoryData}
              income={totalIncome}
              expense={totalExpense}
            />
          )}

          {activeMenu === "Settings" && <SettingsPage user={user} />}
        </div>
      </main>

      {/* =================================================
          MODAL
      ================================================= */}

      {showModal && (
        <TransactionModal
          form={form}
          setForm={setForm}
          editingTransaction={editingTransaction}
          onClose={() => setShowModal(false)}
          onSave={handleSaveTransaction}
        />
      )}

      {/* =================================================
          TOAST
      ================================================= */}

      {toast && (
        <div className={`toast ${toast.type}`}>
          {toast.type === "success" ? (
            <div className="toast-check">✓</div>
          ) : (
            <div className="toast-check">!</div>
          )}

          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
}

/* =========================================================
   DASHBOARD HOME
========================================================= */

function DashboardHome({
  user,
  balance,
  totalIncome,
  totalExpense,
  transactions,
  chartData,
  categoryData,
  loading,
  onAdd,
  onEdit,
  onDelete,
  onRefresh,
  onTransactions,
}) {
  const recent = transactions.slice(0, 5);

  return (
    <>
      <div className="welcome-row">
        <div>
          <p className="welcome-small">Good morning,</p>

          <h1>Welcome back, {user?.name?.split(" ")[0] || "User"}! 👋</h1>

          <p className="welcome-description">
            Here's what's happening with your money today.
          </p>
        </div>

        <button className="add-transaction" onClick={onAdd}>
          <Plus size={19} />
          Add Transaction
        </button>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Balance"
          amount={balance}
          subtitle="Current available balance"
          icon={<Wallet size={21} />}
        />

        <StatCard
          title="Total Income"
          amount={totalIncome}
          subtitle="Money received"
          positive
          icon={<ArrowUpRight size={21} />}
        />

        <StatCard
          title="Total Expenses"
          amount={totalExpense}
          subtitle="Money spent"
          expense
          icon={<ArrowDownRight size={21} />}
        />

        <StatCard
          title="Savings"
          amount={balance}
          subtitle="Income minus expenses"
          positive
          icon={<PiggyBank size={21} />}
        />
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card chart-card">
          <div className="card-heading">
            <div>
              <h3>Income & Expenses</h3>
              <p>Monthly financial overview</p>
            </div>

            <button
              className="icon-refresh"
              onClick={onRefresh}
              title="Refresh"
            >
              <RefreshCw size={17} />
            </button>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient
                    id="incomeGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#10b981" stopOpacity={0.25} />

                    <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>

                  <linearGradient
                    id="expenseGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#ef4444" stopOpacity={0.18} />

                    <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="#eef1f5"
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#8b95a7",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "#8b95a7",
                    fontSize: 12,
                  }}
                />

                <Tooltip
                  contentStyle={{
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "0 10px 30px rgba(0,0,0,.1)",
                  }}
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                />

                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#10b981"
                  fill="url(#incomeGradient)"
                  strokeWidth={2.5}
                  name="Income"
                />

                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="#ef4444"
                  fill="url(#expenseGradient)"
                  strokeWidth={2.5}
                  name="Expense"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card budget-card">
          <div className="card-heading">
            <div>
              <h3>Expense Overview</h3>
              <p>By category</p>
            </div>

            <MoreHorizontal size={21} />
          </div>

          {categoryData.length > 0 ? (
            <div className="pie-wrapper">
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={62}
                    outerRadius={88}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {categoryData.map((_, index) => (
                      <Cell
                        key={index}
                        fill={
                          [
                            "#10b981",
                            "#6366f1",
                            "#f59e0b",
                            "#ef4444",
                            "#06b6d4",
                            "#8b5cf6",
                          ][index % 6]
                        }
                      />
                    ))}
                  </Pie>

                  <Tooltip
                    formatter={(value) =>
                      `₹${Number(value).toLocaleString("en-IN")}`
                    }
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="pie-total">
                <strong>₹{totalNumber(categoryData)}</strong>
                <span>Total Expense</span>
              </div>
            </div>
          ) : (
            <div className="empty-chart">
              <CircleDollarSign size={38} />
              <p>No expense data yet</p>
            </div>
          )}

          <div className="category-mini-list">
            {categoryData.slice(0, 4).map((category, index) => (
              <div className="category-mini" key={category.name}>
                <span
                  className="category-dot"
                  style={{
                    background: ["#10b981", "#6366f1", "#f59e0b", "#ef4444"][
                      index % 4
                    ],
                  }}
                />

                <span>{category.name}</span>

                <strong>
                  ₹{Number(category.value).toLocaleString("en-IN")}
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-card transactions-card">
        <div className="card-heading">
          <div>
            <h3>Recent Transactions</h3>
            <p>Your latest financial activity</p>
          </div>

          <button className="view-all" onClick={onTransactions}>
            View all
            <ChevronRight size={16} />
          </button>
        </div>

        {loading ? (
          <div className="loading-box">Loading transactions...</div>
        ) : recent.length === 0 ? (
          <EmptyTransactions onAdd={onAdd} />
        ) : (
          <TransactionList
            transactions={recent}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </div>
    </>
  );
}

/* =========================================================
   TRANSACTIONS
========================================================= */

function TransactionsPage({
  transactions,
  loading,
  filterType,
  setFilterType,
  onAdd,
  onEdit,
  onDelete,
  onRefresh,
}) {
  return (
    <>
      <PageHeader
        title="Transactions"
        description="Manage all your income and expenses."
        buttonText="Add Transaction"
        onButton={onAdd}
      />

      <div className="transaction-toolbar">
        <div className="filter-title">
          <Filter size={17} />
          Filter
        </div>

        <button
          className={filterType === "all" ? "filter-btn active" : "filter-btn"}
          onClick={() => setFilterType("all")}
        >
          All
        </button>

        <button
          className={
            filterType === "income" ? "filter-btn income-filter" : "filter-btn"
          }
          onClick={() => setFilterType("income")}
        >
          Income
        </button>

        <button
          className={
            filterType === "expense"
              ? "filter-btn expense-filter"
              : "filter-btn"
          }
          onClick={() => setFilterType("expense")}
        >
          Expenses
        </button>

        <button className="refresh-btn" onClick={onRefresh}>
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <div className="dashboard-card full-table-card">
        {loading ? (
          <div className="loading-box">Loading transactions...</div>
        ) : transactions.length === 0 ? (
          <EmptyTransactions onAdd={onAdd} />
        ) : (
          <TransactionTable
            transactions={transactions}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
      </div>
    </>
  );
}

/* =========================================================
   ACCOUNTS
========================================================= */

function AccountsPage({ balance, income, expense }) {
  return (
    <>
      <PageHeader
        title="Accounts"
        description="Overview of your personal finances."
      />

      <div className="account-grid">
        <div className="account-card primary">
          <div className="account-card-top">
            <div className="account-icon">
              <Wallet size={21} />
            </div>

            <span>PRIMARY ACCOUNT</span>
          </div>

          <p>Available Balance</p>

          <h2>₹{Number(balance).toLocaleString("en-IN")}</h2>

          <div className="account-number">Personal Finance Account</div>
        </div>

        <SummaryCard
          title="Income"
          amount={income}
          icon={<TrendingUp size={21} />}
          positive
        />

        <SummaryCard
          title="Expenses"
          amount={expense}
          icon={<TrendingDown size={21} />}
          expense
        />
      </div>
    </>
  );
}

/* =========================================================
   CATEGORIES
========================================================= */

function CategoriesPage({ categoryData, transactions }) {
  const categories =
    categoryData.length > 0
      ? categoryData
      : [
          {
            name: "Food",
            value: 0,
          },
          {
            name: "Shopping",
            value: 0,
          },
          {
            name: "Bills",
            value: 0,
          },
        ];

  return (
    <>
      <PageHeader
        title="Categories"
        description="See where your money is being spent."
      />

      <div className="category-grid">
        {categories.map((category, index) => (
          <div className="category-card" key={category.name}>
            <div className="category-card-icon">
              {index === 0 ? (
                <Utensils size={20} />
              ) : index === 1 ? (
                <ShoppingCart size={20} />
              ) : index === 2 ? (
                <Home size={20} />
              ) : (
                <Tags size={20} />
              )}
            </div>

            <div>
              <span>{category.name}</span>

              <h3>₹{Number(category.value).toLocaleString("en-IN")}</h3>
            </div>

            <small>
              {
                transactions.filter((item) => item.category === category.name)
                  .length
              }{" "}
              transactions
            </small>
          </div>
        ))}
      </div>
    </>
  );
}

/* =========================================================
   GOALS
========================================================= */

function GoalsPage({ balance, income, expense }) {
  const savingRate =
    income > 0 ? Math.max(0, Math.min(100, (balance / income) * 100)) : 0;

  return (
    <>
      <PageHeader
        title="Financial Goals"
        description="Track your savings and financial targets."
      />

      <div className="goal-grid">
        <div className="goal-card">
          <div className="goal-top">
            <div className="goal-icon">
              <Target size={21} />
            </div>

            <span>SAVINGS</span>
          </div>

          <h3>Build Emergency Fund</h3>

          <p>
            Current balance:
            <strong>₹{Number(balance).toLocaleString("en-IN")}</strong>
          </p>

          <div className="goal-progress">
            <div
              style={{
                width: `${savingRate}%`,
              }}
            />
          </div>

          <div className="goal-footer">
            <span>{savingRate.toFixed(0)}% progress</span>
            <span>Goal ₹1,00,000</span>
          </div>
        </div>

        <div className="goal-card">
          <div className="goal-top">
            <div className="goal-icon blue">
              <PiggyBank size={21} />
            </div>

            <span>FUTURE</span>
          </div>

          <h3>Monthly Savings</h3>

          <p>
            Try to save at least
            <strong>₹10,000</strong> every month.
          </p>

          <div className="goal-progress">
            <div
              style={{
                width: `${Math.min(100, savingRate)}%`,
              }}
            />
          </div>

          <div className="goal-footer">
            <span>
              {expense > 0 ? "Keep expenses controlled" : "Start tracking"}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   REPORTS
========================================================= */

function ReportsPage({ chartData, categoryData, income, expense }) {
  return (
    <>
      <PageHeader
        title="Reports"
        description="Understand your financial performance."
      />

      <div className="report-summary">
        <SummaryCard
          title="Income"
          amount={income}
          icon={<ArrowUpRight size={21} />}
          positive
        />

        <SummaryCard
          title="Expenses"
          amount={expense}
          icon={<ArrowDownRight size={21} />}
          expense
        />

        <SummaryCard
          title="Net Savings"
          amount={income - expense}
          icon={<PiggyBank size={21} />}
        />
      </div>

      <div className="report-grid">
        <div className="dashboard-card report-chart">
          <div className="card-heading">
            <div>
              <h3>Income vs Expenses</h3>
              <p>Monthly report</p>
            </div>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="4 4"
                  vertical={false}
                  stroke="#eef1f5"
                />

                <XAxis dataKey="month" axisLine={false} tickLine={false} />

                <YAxis axisLine={false} tickLine={false} />

                <Tooltip
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                />

                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.08}
                  strokeWidth={2.5}
                  name="Income"
                />

                <Area
                  type="monotone"
                  dataKey="expense"
                  stroke="#ef4444"
                  fill="#ef4444"
                  fillOpacity={0.06}
                  strokeWidth={2.5}
                  name="Expense"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="dashboard-card report-pie">
          <div className="card-heading">
            <div>
              <h3>Spending Breakdown</h3>
              <p>By category</p>
            </div>
          </div>

          {categoryData.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={65}
                  outerRadius={100}
                  paddingAngle={3}
                >
                  {categoryData.map((_, index) => (
                    <Cell
                      key={index}
                      fill={
                        [
                          "#10b981",
                          "#6366f1",
                          "#f59e0b",
                          "#ef4444",
                          "#06b6d4",
                          "#8b5cf6",
                        ][index % 6]
                      }
                    />
                  ))}
                </Pie>

                <Tooltip
                  formatter={(value) =>
                    `₹${Number(value).toLocaleString("en-IN")}`
                  }
                />

                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="empty-chart">No expense data available.</div>
          )}
        </div>
      </div>
    </>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

function SettingsPage({ user }) {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Manage your FinSight account."
      />

      <div className="settings-card dashboard-card">
        <div className="settings-profile">
          <div className="large-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          <div>
            <h3>{user?.name || "User"}</h3>
            <p>{user?.email || ""}</p>
          </div>
        </div>

        <div className="settings-divider" />

        <div className="settings-row">
          <div>
            <strong>Account Type</strong>
            <span>Personal Account</span>
          </div>

          <span className="status-pill">Active</span>
        </div>

        <div className="settings-row">
          <div>
            <strong>Currency</strong>
            <span>Indian Rupee (₹)</span>
          </div>

          <span>INR</span>
        </div>
      </div>
    </>
  );
}

/* =========================================================
   TRANSACTION TABLE
========================================================= */

function TransactionTable({ transactions, onEdit, onDelete }) {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Transaction</th>
            <th>Category</th>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>
                <div className="table-transaction">
                  <div className="transaction-icon">
                    {getTransactionIcon(transaction.category)}
                  </div>

                  <div>
                    <strong>
                      {transaction.description ||
                        transaction.category ||
                        "Transaction"}
                    </strong>

                    <span>ID #{transaction.id}</span>
                  </div>
                </div>
              </td>

              <td>{transaction.category}</td>

              <td>{formatDate(transaction.date)}</td>

              <td>
                <span
                  className={`type-pill ${
                    String(transaction.type).toLowerCase() === "income"
                      ? "income"
                      : "expense"
                  }`}
                >
                  {transaction.type}
                </span>
              </td>

              <td>
                <strong
                  className={`table-amount ${
                    String(transaction.type).toLowerCase() === "income"
                      ? "income"
                      : "expense"
                  }`}
                >
                  {String(transaction.type).toLowerCase() === "income"
                    ? "+"
                    : "-"}
                  ₹{Number(transaction.amount).toLocaleString("en-IN")}
                </strong>
              </td>

              <td>
                <div className="table-actions">
                  <button
                    className="edit-btn"
                    onClick={() => onEdit(transaction)}
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => onDelete(transaction.id)}
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* =========================================================
   TRANSACTION LIST
========================================================= */

function TransactionList({ transactions, onEdit, onDelete }) {
  return (
    <div className="transaction-list">
      {transactions.map((transaction) => {
        const isIncome = String(transaction.type).toLowerCase() === "income";

        return (
          <div className="transaction-row" key={transaction.id}>
            <div
              className={`transaction-icon ${isIncome ? "income-icon" : ""}`}
            >
              {getTransactionIcon(transaction.category)}
            </div>

            <div className="transaction-info">
              <strong>
                {transaction.description ||
                  transaction.category ||
                  "Transaction"}
              </strong>

              <span>
                {transaction.category} • {formatDate(transaction.date)}
              </span>
            </div>

            <div
              className={`transaction-amount ${
                isIncome ? "income" : "expense"
              }`}
            >
              {isIncome ? "+" : "-"}₹
              {Number(transaction.amount).toLocaleString("en-IN")}
            </div>

            <div className="row-actions">
              <button onClick={() => onEdit(transaction)}>
                <Pencil size={15} />
              </button>

              <button onClick={() => onDelete(transaction.id)}>
                <Trash2 size={15} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* =========================================================
   TRANSACTION MODAL
========================================================= */

function TransactionModal({
  form,
  setForm,
  editingTransaction,
  onClose,
  onSave,
}) {
  const update = (key, value) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="transaction-modal">
        <div className="modal-header">
          <div>
            <h2>
              {editingTransaction ? "Edit Transaction" : "Add Transaction"}
            </h2>

            <p>
              {editingTransaction
                ? "Update transaction details"
                : "Add a new financial transaction"}
            </p>
          </div>

          <button className="modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={onSave}>
          <div className="form-grid">
            <div className="input-group">
              <label>Amount</label>

              <input
                type="number"
                min="1"
                placeholder="Enter amount"
                value={form.amount}
                onChange={(e) => update("amount", e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Type</label>

              <select
                value={form.type}
                onChange={(e) => update("type", e.target.value)}
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div className="input-group">
              <label>Category</label>

              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
              >
                <option>Food</option>
                <option>Shopping</option>
                <option>Bills</option>
                <option>Transport</option>
                <option>Entertainment</option>
                <option>Health</option>
                <option>Salary</option>
                <option>Freelance</option>
                <option>Investment</option>
                <option>Other</option>
              </select>
            </div>

            <div className="input-group">
              <label>Date</label>

              <input
                type="date"
                value={form.date}
                onChange={(e) => update("date", e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label>Description</label>

            <textarea
              rows="4"
              placeholder="Enter description..."
              value={form.description}
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              {editingTransaction ? "Update Transaction" : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* =========================================================
   COMPONENTS
========================================================= */

function SidebarItem({ icon, label, active, onClick }) {
  return (
    <button
      className={`sidebar-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function StatCard({ title, amount, subtitle, positive, expense, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-top">
        <div>
          <span className="stat-title">{title}</span>

          <h2>₹{Number(amount).toLocaleString("en-IN")}</h2>
        </div>

        <div className="stat-icon">{icon}</div>
      </div>

      <div
        className={`stat-subtitle ${
          expense ? "expense-text" : positive ? "income-text" : ""
        }`}
      >
        {positive && <ArrowUpRight size={15} />}

        {expense && <ArrowDownRight size={15} />}

        {subtitle}
      </div>
    </div>
  );
}

function SummaryCard({ title, amount, icon, positive, expense }) {
  return (
    <div className="summary-card">
      <div
        className={`summary-icon ${
          positive ? "positive" : expense ? "negative" : ""
        }`}
      >
        {icon}
      </div>

      <span>{title}</span>

      <h2>₹{Number(amount).toLocaleString("en-IN")}</h2>
    </div>
  );
}

function PageHeader({ title, description, buttonText, onButton }) {
  return (
    <div className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>

      {buttonText && (
        <button className="add-transaction" onClick={onButton}>
          <Plus size={19} />
          {buttonText}
        </button>
      )}
    </div>
  );
}

function EmptyTransactions({ onAdd }) {
  return (
    <div className="empty-transactions">
      <div className="empty-icon">
        <ArrowUpDown size={28} />
      </div>

      <h3>No transactions yet</h3>

      <p>Add your first transaction to start tracking your finances.</p>

      <button className="add-transaction" onClick={onAdd}>
        <Plus size={18} />
        Add Transaction
      </button>
    </div>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function getTransactionIcon(category) {
  const value = String(category || "").toLowerCase();

  if (value.includes("food")) {
    return <Utensils size={19} />;
  }

  if (value.includes("shopping")) {
    return <ShoppingCart size={19} />;
  }

  if (value.includes("bill") || value.includes("home")) {
    return <Home size={19} />;
  }

  if (value.includes("salary") || value.includes("income")) {
    return <CreditCard size={19} />;
  }

  return <Wallet size={19} />;
}

function formatDate(date) {
  if (!date) return "-";

  const value = new Date(date);

  if (Number.isNaN(value.getTime())) {
    return date;
  }

  return value.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function totalNumber(data) {
  return data
    .reduce((sum, item) => sum + Number(item.value || 0), 0)
    .toLocaleString("en-IN");
}

export default App;
