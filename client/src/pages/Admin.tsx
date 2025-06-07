import { FC, useState, useEffect } from "react";
import {
  Shield,
  BarChart2,
  Users,
  CreditCard,
  Server,
  Settings,
} from "lucide-react";
import { useLocation } from "wouter";
import { useAuth } from "../hooks/useAuth";
import SimpleSystemSettings from "../components/admin/SimpleSystemSettings";
import AdminDashboard from "../components/admin/dashboard/AdminDashboard";
import UserManagement from "../components/admin/users/UserManagement";
import SubscriptionManagement from "../components/admin/subscriptions/SubscriptionManagement";
import SystemMaintenance from "../components/admin/maintenance/SystemMaintenance";

const Admin: FC = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  // Check if user is admin (username 'str8')
  const isAdmin = user && (user as any)?.username === "str8";

  // Redirect non-admin users away from the Admin page
  useEffect(() => {
    if (!isAdmin) {
      setLocation("/");
    }
  }, [isAdmin, setLocation]);

  return (
    <main className="container mx-auto px-4 py-4" data-oid="q94e_og">
      <div
        className="flex justify-between items-center mb-6"
        data-oid="caxt..m"
      >
        <div className="flex items-center gap-2" data-oid="8rd420t">
          <Shield className="h-6 w-6 text-cyan" data-oid="8vmkyou" />
          <h2 className="text-2xl font-bold text-white" data-oid="s-6f64.">
            Admin Panel
          </h2>
        </div>

        <div className="flex items-center gap-2" data-oid="5i6sb-e">
          <span
            className="text-sm text-cyan bg-space-800 px-3 py-1 rounded-full"
            data-oid="o3wi8vp"
          >
            v3.4 Admin
          </span>
        </div>
      </div>

      {/* Admin Navigation */}
      <div
        className="mb-6 bg-space-900 rounded-xl p-1 inline-flex flex-wrap"
        data-oid=".-tzmq4"
      >
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`p-2 px-4 rounded-lg flex items-center ${
            activeTab === "dashboard"
              ? "bg-purple-900 text-cyan"
              : "text-gray-300 hover:bg-space-800"
          }`}
          data-oid="8qku8ze"
        >
          <BarChart2 className="h-4 w-4 mr-2" data-oid="-:t2t9c" />
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`p-2 px-4 rounded-lg flex items-center ${
            activeTab === "users"
              ? "bg-purple-900 text-cyan"
              : "text-gray-300 hover:bg-space-800"
          }`}
          data-oid="yzfsdc6"
        >
          <Users className="h-4 w-4 mr-2" data-oid="l2i.p2w" />
          Users
        </button>

        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`p-2 px-4 rounded-lg flex items-center ${
            activeTab === "subscriptions"
              ? "bg-purple-900 text-cyan"
              : "text-gray-300 hover:bg-space-800"
          }`}
          data-oid="nx:n:xx"
        >
          <CreditCard className="h-4 w-4 mr-2" data-oid="4j9g0ab" />
          Subscriptions
        </button>

        <button
          onClick={() => setActiveTab("maintenance")}
          className={`p-2 px-4 rounded-lg flex items-center ${
            activeTab === "maintenance"
              ? "bg-purple-900 text-cyan"
              : "text-gray-300 hover:bg-space-800"
          }`}
          data-oid="82xxue_"
        >
          <Server className="h-4 w-4 mr-2" data-oid="0dwwk6c" />
          Maintenance
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`p-2 px-4 rounded-lg flex items-center ${
            activeTab === "settings"
              ? "bg-purple-900 text-cyan"
              : "text-gray-300 hover:bg-space-800"
          }`}
          data-oid="dfmjf1o"
        >
          <Settings className="h-4 w-4 mr-2" data-oid="qneva2y" />
          Settings
        </button>
      </div>

      {/* Tab Content */}
      <div
        className="p-6 rounded-xl glass-card bg-space-900"
        data-oid=".1wez3:"
      >
        {activeTab === "dashboard" && <AdminDashboard data-oid="7r5rwx." />}
        {activeTab === "users" && <UserManagement data-oid="v4uv9:d" />}
        {activeTab === "subscriptions" && (
          <SubscriptionManagement data-oid="s.pt3.a" />
        )}
        {activeTab === "maintenance" && (
          <SystemMaintenance data-oid="jb:z2he" />
        )}
        {activeTab === "settings" && (
          <SimpleSystemSettings data-oid="fw1bri2" />
        )}
      </div>
    </main>
  );
};

export default Admin;
