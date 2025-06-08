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
    <main className="container mx-auto px-4 py-4" data-oid="zohy9o-">
      <div
        className="flex justify-between items-center mb-6"
        data-oid="pfk347v"
      >
        <div className="flex items-center gap-2" data-oid="l_fvvdq">
          <Shield className="h-6 w-6 text-cyan" data-oid="a.2n8qd" />
          <h2 className="text-2xl font-bold text-white" data-oid="9o05b21">
            Admin Panel
          </h2>
        </div>

        <div className="flex items-center gap-2" data-oid="i89citx">
          <span
            className="text-sm text-cyan bg-space-800 px-3 py-1 rounded-full"
            data-oid="jvqa:xp"
          >
            v3.4 Admin
          </span>
        </div>
      </div>

      {/* Admin Navigation */}
      <div
        className="mb-6 bg-space-900 rounded-xl p-1 inline-flex flex-wrap"
        data-oid="21ewtow"
      >
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`p-2 px-4 rounded-lg flex items-center ${
            activeTab === "dashboard"
              ? "bg-purple-900 text-cyan"
              : "text-gray-300 hover:bg-space-800"
          }`}
          data-oid="5:zp3gc"
        >
          <BarChart2 className="h-4 w-4 mr-2" data-oid="u6.vyqh" />
          Dashboard
        </button>

        <button
          onClick={() => setActiveTab("users")}
          className={`p-2 px-4 rounded-lg flex items-center ${
            activeTab === "users"
              ? "bg-purple-900 text-cyan"
              : "text-gray-300 hover:bg-space-800"
          }`}
          data-oid="vezf88s"
        >
          <Users className="h-4 w-4 mr-2" data-oid="bykegxv" />
          Users
        </button>

        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`p-2 px-4 rounded-lg flex items-center ${
            activeTab === "subscriptions"
              ? "bg-purple-900 text-cyan"
              : "text-gray-300 hover:bg-space-800"
          }`}
          data-oid="af3hw8n"
        >
          <CreditCard className="h-4 w-4 mr-2" data-oid="cmzwmhg" />
          Subscriptions
        </button>

        <button
          onClick={() => setActiveTab("maintenance")}
          className={`p-2 px-4 rounded-lg flex items-center ${
            activeTab === "maintenance"
              ? "bg-purple-900 text-cyan"
              : "text-gray-300 hover:bg-space-800"
          }`}
          data-oid=":0f:5:5"
        >
          <Server className="h-4 w-4 mr-2" data-oid="iwuqbir" />
          Maintenance
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`p-2 px-4 rounded-lg flex items-center ${
            activeTab === "settings"
              ? "bg-purple-900 text-cyan"
              : "text-gray-300 hover:bg-space-800"
          }`}
          data-oid="t.9em3e"
        >
          <Settings className="h-4 w-4 mr-2" data-oid="v:w6.k:" />
          Settings
        </button>
      </div>

      {/* Tab Content */}
      <div
        className="p-6 rounded-xl glass-card bg-space-900"
        data-oid="szrzwkx"
      >
        {activeTab === "dashboard" && <AdminDashboard data-oid="f8hjh1w" />}
        {activeTab === "users" && <UserManagement data-oid="j9180qb" />}
        {activeTab === "subscriptions" && (
          <SubscriptionManagement data-oid="vy5hbpu" />
        )}
        {activeTab === "maintenance" && (
          <SystemMaintenance data-oid="ddl67rv" />
        )}
        {activeTab === "settings" && (
          <SimpleSystemSettings data-oid="h:ojhmb" />
        )}
      </div>
    </main>
  );
};

export default Admin;
