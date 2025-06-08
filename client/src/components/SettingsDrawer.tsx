import { FC, useState, useEffect } from "react";
import { DEFAULT_HOURLY_RATE } from "@/lib/constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface SettingsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

// Temporary user ID for demonstration
// In a real app, this would come from authentication
const CURRENT_USER_ID = 3;

interface UserSettings {
  id: number;
  userId: number;
  hourlyRate: string;
  darkMode: boolean;
  notifications: boolean;
  autoSync: boolean;
  unitSystem: string;
  avatar: string | null;
  updatedAt: string;
}

const defaultSettings = {
  hourlyRate: DEFAULT_HOURLY_RATE.toString(),
  darkMode: true,
  notifications: true,
  autoSync: true,
  unitSystem: "metric",
};

const SettingsDrawer: FC<SettingsDrawerProps> = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch settings from database
  const { data: userSettings, isError } = useQuery({
    queryKey: ["/api/user-settings", CURRENT_USER_ID],
    queryFn: async () => {
      try {
        const response = await fetch(`/api/user-settings/${CURRENT_USER_ID}`);
        if (!response.ok) {
          // If settings don't exist yet, we'll use default and create them later
          if (response.status === 404) {
            return null;
          }
          throw new Error("Failed to fetch settings");
        }
        return (await response.json()) as UserSettings;
      } catch (error) {
        console.error("Error fetching settings:", error);
        return null;
      }
    },
  });

  // Update settings mutation
  const updateSettingsMutation = useMutation({
    mutationFn: async (updatedSettings: Partial<UserSettings>) => {
      return await apiRequest<UserSettings>(
        `/api/user-settings/${CURRENT_USER_ID}`,
        {
          method: "PATCH",
          body: JSON.stringify(updatedSettings),
        },
      );
    },
    onSuccess: () => {
      // Invalidate the settings query to refetch
      queryClient.invalidateQueries({
        queryKey: ["/api/user-settings", CURRENT_USER_ID],
      });
    },
  });

  // Create settings mutation (for first-time users)
  const createSettingsMutation = useMutation({
    mutationFn: async (newSettings: any) => {
      return await apiRequest<UserSettings>("/api/user-settings", {
        method: "POST",
        body: JSON.stringify({
          userId: CURRENT_USER_ID,
          ...newSettings,
        }),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/user-settings", CURRENT_USER_ID],
      });
    },
  });

  // Load settings from database or create new settings for first-time users
  useEffect(() => {
    if (userSettings) {
      setSettings({
        hourlyRate:
          userSettings.hourlyRate?.toString() || DEFAULT_HOURLY_RATE.toString(),
        darkMode: userSettings.darkMode ?? true,
        notifications: userSettings.notifications ?? true,
        autoSync: userSettings.autoSync ?? true,
        unitSystem: userSettings.unitSystem || "metric",
      });
      setIsLoading(false);
    } else if (!isLoading && userSettings === null && !isError) {
      // If we've finished loading and found no settings, create them
      createSettingsMutation.mutate(defaultSettings);
    }
  }, [userSettings, isError]);

  // Update setting in the database
  const updateSetting = (key: keyof typeof settings, value: any) => {
    setSettings((prev) => {
      const newSettings = { ...prev, [key]: value };

      // Save to database
      updateSettingsMutation.mutate({ [key]: value });

      return newSettings;
    });
  };

  if (!isOpen) return null;

  return (
    <div data-oid="0km4ncc">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        data-oid="no8slz:"
      ></div>

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 bottom-0 w-full md:w-96 bg-space-900 z-50 shadow-xl border-l border-white/10 p-6 transform transition-transform duration-300 ease-in-out overflow-y-auto"
        data-oid="fwurf:_"
      >
        {/* Header */}
        <div
          className="flex justify-between items-center mb-6"
          data-oid="wnokbov"
        >
          <h2 className="text-2xl font-space text-cyan" data-oid="zpl2tmc">
            Settings
          </h2>
          <button
            className="text-gray-400 hover:text-white text-xl"
            onClick={onClose}
            data-oid="ry1:wjr"
          >
            <i className="fas fa-times" data-oid="_88s:b0"></i>
          </button>
        </div>

        {/* Settings Content */}
        <div className="space-y-6" data-oid="gj-sjv6">
          {/* Hourly Rate */}
          <div className="glass-card p-4 rounded-lg" data-oid="q4etl8a">
            <h3 className="text-cyan font-medium mb-3" data-oid="cnvh2fp">
              Default Hourly Rate
            </h3>
            <div className="flex items-center" data-oid="ps4xil_">
              <span className="text-gray-300 mr-2" data-oid="ivydmdm">
                $
              </span>
              <input
                type="number"
                value={settings.hourlyRate}
                onChange={(e) => updateSetting("hourlyRate", e.target.value)}
                className="bg-space-800 text-white border border-gray-700 rounded px-3 py-2 w-full"
                min="0"
                step="0.01"
                data-oid="17-u8bq"
              />

              <span className="text-gray-300 ml-2" data-oid="vtjsvpv">
                NZD
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-2" data-oid="9rqsm7b">
              This hourly rate will be used by default for new projects and time
              entries.
            </p>
          </div>

          {/* Theme Toggle */}
          <div className="glass-card p-4 rounded-lg" data-oid="tuls5at">
            <h3 className="text-cyan font-medium mb-3" data-oid="gu1k_k1">
              Theme
            </h3>
            <div
              className="flex items-center justify-between"
              data-oid="2.5m.73"
            >
              <span className="text-gray-300" data-oid="18:176s">
                Dark Mode
              </span>
              <label
                className="relative inline-flex items-center cursor-pointer"
                data-oid="h-6rxrf"
              >
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={(e) => updateSetting("darkMode", e.target.checked)}
                  className="sr-only peer"
                  data-oid="dtffjy8"
                />

                <div
                  className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan"
                  data-oid="s7sxw7r"
                ></div>
              </label>
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-card p-4 rounded-lg" data-oid="a:_68pr">
            <h3 className="text-cyan font-medium mb-3" data-oid="xy2-1:i">
              Notifications
            </h3>
            <div
              className="flex items-center justify-between"
              data-oid="p9uep.."
            >
              <span className="text-gray-300" data-oid="q3j5493">
                Enable Notifications
              </span>
              <label
                className="relative inline-flex items-center cursor-pointer"
                data-oid="m98o9tv"
              >
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) =>
                    updateSetting("notifications", e.target.checked)
                  }
                  className="sr-only peer"
                  data-oid="rjo9hmy"
                />

                <div
                  className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan"
                  data-oid="2o4pp5r"
                ></div>
              </label>
            </div>
          </div>

          {/* Unit System */}
          <div className="glass-card p-4 rounded-lg" data-oid="i47089x">
            <h3 className="text-cyan font-medium mb-3" data-oid="xxtmfx8">
              Unit System
            </h3>
            <div className="grid grid-cols-2 gap-2" data-oid="wwbdnx7">
              <button
                className={`py-2 px-4 rounded-md text-center ${settings.unitSystem === "metric" ? "bg-purple-800 text-white" : "bg-space-800 text-gray-400"}`}
                onClick={() => updateSetting("unitSystem", "metric")}
                data-oid="bvh1has"
              >
                Metric (mm, cm, m)
              </button>
              <button
                className={`py-2 px-4 rounded-md text-center ${settings.unitSystem === "imperial" ? "bg-purple-800 text-white" : "bg-space-800 text-gray-400"}`}
                onClick={() => updateSetting("unitSystem", "imperial")}
                data-oid="ochjx6l"
              >
                Imperial (in, ft)
              </button>
            </div>
          </div>

          {/* Auto Sync */}
          <div className="glass-card p-4 rounded-lg" data-oid="6k4cq8e">
            <h3 className="text-cyan font-medium mb-3" data-oid="vkrak17">
              Sync
            </h3>
            <div
              className="flex items-center justify-between"
              data-oid="2ruaj_a"
            >
              <span className="text-gray-300" data-oid="wve.4lt">
                Auto-sync Data
              </span>
              <label
                className="relative inline-flex items-center cursor-pointer"
                data-oid="v_p6xdq"
              >
                <input
                  type="checkbox"
                  checked={settings.autoSync}
                  onChange={(e) => updateSetting("autoSync", e.target.checked)}
                  className="sr-only peer"
                  data-oid="4r0cn:."
                />

                <div
                  className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan"
                  data-oid="15901c7"
                ></div>
              </label>
            </div>
            <p className="text-gray-400 text-sm mt-2" data-oid="vwha2xg">
              Automatically sync your data to the cloud when changes are made.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6" data-oid="hgnjw.z">
            <button
              className="flex-1 bg-purple-900 text-cyan py-2 rounded-lg hover:bg-purple-800 btn-glow btn-glow-cyan"
              onClick={onClose}
              data-oid="xg:.m5r"
            >
              Save & Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsDrawer;
