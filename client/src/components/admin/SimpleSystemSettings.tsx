import { FC, useState } from "react";
import {
  Save,
  RefreshCw,
  AlertCircle,
  Check,
  Settings,
  Database,
  Bell,
  Server,
} from "lucide-react";

// Define type for a setting
type SettingType = "text" | "email" | "url" | "number" | "toggle" | "select";

interface BaseSetting {
  id: string;
  name: string;
  type: SettingType;
}

interface TextSetting extends BaseSetting {
  type: "text" | "email" | "url" | "number";
  value: string;
  readonly?: boolean;
}

interface ToggleSetting extends BaseSetting {
  type: "toggle";
  value: boolean;
}

interface SelectSetting extends BaseSetting {
  type: "select";
  value: string;
  options: string[];
}

type Setting = TextSetting | ToggleSetting | SelectSetting;

interface SettingCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  settings: Setting[];
}

// System settings categories and settings
const systemSettings: SettingCategory[] = [
  {
    id: "general",
    name: "General Settings",
    icon: <Settings className="h-5 w-5 text-cyan" data-oid="6.:h4qj" />,
    settings: [
      {
        id: "app_name",
        name: "Application Name",
        value: "STR8 BUILD",
        type: "text",
      },
      {
        id: "app_version",
        name: "Application Version",
        value: "3.4",
        type: "text",
        readonly: true,
      },
      {
        id: "company_name",
        name: "Company Name",
        value: "STR8 BUILD NZ",
        type: "text",
      },
      {
        id: "support_email",
        name: "Support Email",
        value: "support@str8build.co.nz",
        type: "email",
      },
      {
        id: "terms_url",
        name: "Terms & Conditions URL",
        value: "https://str8build.co.nz/terms",
        type: "url",
      },
    ],
  },
  {
    id: "notifications",
    name: "Notification Settings",
    icon: <Bell className="h-5 w-5 text-electric" data-oid="xyho--n" />,
    settings: [
      {
        id: "email_notifications",
        name: "Email Notifications",
        value: true,
        type: "toggle",
      },
      {
        id: "sms_notifications",
        name: "SMS Notifications",
        value: false,
        type: "toggle",
      },
      {
        id: "push_notifications",
        name: "Push Notifications",
        value: true,
        type: "toggle",
      },
      {
        id: "notification_frequency",
        name: "Notification Frequency",
        value: "immediate",
        type: "select",
        options: ["immediate", "hourly", "daily", "weekly"],
      },
    ],
  },
  {
    id: "database",
    name: "Database Settings",
    icon: <Database className="h-5 w-5 text-teal" data-oid="jgr4vlg" />,
    settings: [
      {
        id: "db_backup_frequency",
        name: "Backup Frequency",
        value: "daily",
        type: "select",
        options: ["hourly", "daily", "weekly"],
      },
      {
        id: "db_backup_retention",
        name: "Backup Retention (days)",
        value: "30",
        type: "number",
      },
      {
        id: "db_auto_optimize",
        name: "Auto-Optimize Database",
        value: true,
        type: "toggle",
      },
    ],
  },
  {
    id: "api",
    name: "API Settings",
    icon: <Server className="h-5 w-5 text-purple-300" data-oid="07.g4hk" />,
    settings: [
      {
        id: "api_rate_limit",
        name: "API Rate Limit (req/min)",
        value: "100",
        type: "number",
      },
      {
        id: "api_timeout",
        name: "API Timeout (seconds)",
        value: "30",
        type: "number",
      },
      {
        id: "api_logging",
        name: "Enable API Logging",
        value: true,
        type: "toggle",
      },
    ],
  },
];

const SimpleSystemSettings: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [settings, setSettings] = useState(systemSettings);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<null | "success" | "error">(
    null,
  );

  const handleSettingChange = (
    categoryId: string,
    settingId: string,
    newValue: string | boolean,
  ) => {
    setSettings((prevSettings) =>
      prevSettings.map((category) =>
        category.id === categoryId
          ? {
              ...category,
              settings: category.settings.map((setting) => {
                if (setting.id === settingId) {
                  if (
                    setting.type === "toggle" &&
                    typeof newValue === "boolean"
                  ) {
                    return { ...setting, value: newValue } as ToggleSetting;
                  } else if (
                    setting.type === "select" &&
                    typeof newValue === "string"
                  ) {
                    return { ...setting, value: newValue } as SelectSetting;
                  } else if (
                    ["text", "email", "url", "number"].includes(setting.type) &&
                    typeof newValue === "string"
                  ) {
                    return { ...setting, value: newValue } as TextSetting;
                  }
                }
                return setting;
              }),
            }
          : category,
      ),
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveStatus(null);

    try {
      // Simulate API call to save settings
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Success
      setSaveStatus("success");
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      // Error
      setSaveStatus("error");
    } finally {
      setIsSaving(false);
    }
  };

  const currentCategory = settings.find((cat) => cat.id === selectedCategory);

  return (
    <div className="space-y-6" data-oid="gwab2-r">
      <div className="flex justify-between items-center" data-oid="mxuncra">
        <h2 className="text-xl font-bold text-white" data-oid="7k9h1zt">
          System Settings
        </h2>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-4 py-2 rounded-lg bg-purple-900 text-cyan hover:bg-purple-800 transition-colors duration-200 flex items-center btn-glow btn-glow-cyan disabled:opacity-50"
          data-oid="d--alr9"
        >
          {isSaving ? (
            <>
              <RefreshCw
                className="h-4 w-4 mr-2 animate-spin"
                data-oid="-x-th3p"
              />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" data-oid="zgdxv_4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {saveStatus === "success" && (
        <div
          className="p-3 bg-green-900/20 border border-green-800 rounded-lg flex items-center text-green-400"
          data-oid=":-h4jut"
        >
          <Check className="h-5 w-5 mr-2" data-oid="ont-kp-" />
          Settings saved successfully!
        </div>
      )}

      {saveStatus === "error" && (
        <div
          className="p-3 bg-red-900/20 border border-red-800 rounded-lg flex items-center text-red-400"
          data-oid="on_1.5e"
        >
          <AlertCircle className="h-5 w-5 mr-2" data-oid="huzkcu1" />
          Error saving settings. Please try again.
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" data-oid="lluvk.y">
        {/* Settings Categories */}
        <div
          className="bg-space-900 rounded-xl overflow-hidden"
          data-oid="cum0veu"
        >
          <div
            className="p-3 bg-space-800 border-b border-gray-700"
            data-oid="5z6rx9x"
          >
            <h3 className="text-white font-medium" data-oid="fjxi8qg">
              Categories
            </h3>
          </div>
          <div className="p-2" data-oid="4zw.oa2">
            {settings.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`w-full text-left p-3 rounded-lg mb-1 flex items-center ${
                  selectedCategory === category.id
                    ? "bg-purple-900/50 text-cyan"
                    : "hover:bg-space-800 text-gray-300"
                }`}
                data-oid="1308.bk"
              >
                <span className="mr-3" data-oid="2jbfcfj">
                  {category.icon}
                </span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Settings Form */}
        <div
          className="lg:col-span-3 bg-space-900 rounded-xl overflow-hidden"
          data-oid="b-_8vci"
        >
          <div
            className="p-3 bg-space-800 border-b border-gray-700 flex items-center"
            data-oid="4mov7qc"
          >
            <span className="mr-2" data-oid="7k7dzq:">
              {currentCategory?.icon}
            </span>
            <h3 className="text-white font-medium" data-oid="e093.9-">
              {currentCategory?.name}
            </h3>
          </div>

          <div className="p-4 space-y-4" data-oid="8ew8tzg">
            {currentCategory?.settings.map((setting) => (
              <div
                key={setting.id}
                className="border-b border-gray-800 pb-4"
                data-oid="ip:kzus"
              >
                <div
                  className="flex flex-col md:flex-row md:items-center justify-between mb-2"
                  data-oid="a68o0q_"
                >
                  <label
                    htmlFor={setting.id}
                    className="text-white font-medium mb-1 md:mb-0"
                    data-oid="kltmv-v"
                  >
                    {setting.name}
                  </label>

                  {setting.type === "toggle" ? (
                    <div className="flex items-center" data-oid="bhcobjl">
                      <button
                        onClick={() => {
                          const toggleSetting = setting as ToggleSetting;
                          handleSettingChange(
                            currentCategory.id,
                            setting.id,
                            !toggleSetting.value,
                          );
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          (setting as ToggleSetting).value
                            ? "bg-cyan"
                            : "bg-gray-700"
                        }`}
                        data-oid="di063zd"
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            (setting as ToggleSetting).value
                              ? "translate-x-6"
                              : "translate-x-1"
                          }`}
                          data-oid="qsolz2e"
                        />
                      </button>
                      <span
                        className="ml-2 text-sm text-gray-400"
                        data-oid="xtxi4.e"
                      >
                        {(setting as ToggleSetting).value
                          ? "Enabled"
                          : "Disabled"}
                      </span>
                    </div>
                  ) : setting.type === "select" ? (
                    <div className="w-full md:w-64" data-oid="fqpax1z">
                      <select
                        id={setting.id}
                        value={(setting as SelectSetting).value}
                        onChange={(e) =>
                          handleSettingChange(
                            currentCategory.id,
                            setting.id,
                            e.target.value,
                          )
                        }
                        className="w-full bg-space-800 border border-gray-700 rounded-lg p-2 text-white"
                        data-oid="7811y4o"
                      >
                        {(setting as SelectSetting).options.map(
                          (option: string) => (
                            <option
                              key={option}
                              value={option}
                              data-oid="5xw.cic"
                            >
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                            </option>
                          ),
                        )}
                      </select>
                    </div>
                  ) : (
                    <div className="w-full md:w-64" data-oid="p__hxgl">
                      <input
                        id={setting.id}
                        type={setting.type}
                        value={(setting as TextSetting).value}
                        readOnly={(setting as TextSetting).readonly}
                        onChange={(e) =>
                          handleSettingChange(
                            currentCategory.id,
                            setting.id,
                            e.target.value,
                          )
                        }
                        className={`w-full bg-space-800 border border-gray-700 rounded-lg p-2 text-white ${
                          (setting as TextSetting).readonly
                            ? "opacity-70 cursor-not-allowed"
                            : ""
                        }`}
                        data-oid="8zgkt:b"
                      />
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400" data-oid="c8b0hi_">
                  {getSettingDescription(setting.id)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get setting descriptions
function getSettingDescription(settingId: string): string {
  const descriptions: Record<string, string> = {
    app_name: "The name of the application as displayed to users.",
    app_version: "Current version of the application.",
    company_name:
      "Your company name as displayed in invoices and legal documents.",
    support_email: "Email address for customer support inquiries.",
    terms_url: "URL to your terms and conditions page.",
    email_notifications: "Send notifications to users via email.",
    sms_notifications: "Send notifications to users via SMS.",
    push_notifications: "Send push notifications to mobile app users.",
    notification_frequency: "How often batched notifications should be sent.",
    db_backup_frequency: "How often to automatically backup the database.",
    db_backup_retention: "Number of days to retain database backups.",
    db_auto_optimize: "Automatically optimize the database for performance.",
    api_rate_limit: "Maximum number of API requests allowed per minute.",
    api_timeout: "Maximum time in seconds to wait for API responses.",
    api_logging: "Enable detailed logging of API requests and responses.",
  };

  return descriptions[settingId] || "No description available.";
}

export default SimpleSystemSettings;
