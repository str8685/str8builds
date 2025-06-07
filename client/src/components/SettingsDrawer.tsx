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
    <div data-oid="h2ulb.f">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
        data-oid="30l360d"
      ></div>

      {/* Drawer */}
      <div
        className="fixed right-0 top-0 bottom-0 w-full md:w-96 bg-space-900 z-50 shadow-xl border-l border-white/10 p-6 transform transition-transform duration-300 ease-in-out overflow-y-auto"
        data-oid="28p4fx2"
      >
        {/* Header */}
        <div
          className="flex justify-between items-center mb-6"
          data-oid="f-:ca23"
        >
          <h2 className="text-2xl font-space text-cyan" data-oid="c-d83ae">
            Settings
          </h2>
          <button
            className="text-gray-400 hover:text-white text-xl"
            onClick={onClose}
            data-oid="q1mjz.g"
          >
            <i className="fas fa-times" data-oid=".ejjf4d"></i>
          </button>
        </div>

        {/* Settings Content */}
        <div className="space-y-6" data-oid="fdz7lan">
          {/* Hourly Rate */}
          <div className="glass-card p-4 rounded-lg" data-oid="dmsyun0">
            <h3 className="text-cyan font-medium mb-3" data-oid="wbsz93_">
              Default Hourly Rate
            </h3>
            <div className="flex items-center" data-oid="v0uuj47">
              <span className="text-gray-300 mr-2" data-oid="97g9vem">
                $
              </span>
              <input
                type="number"
                value={settings.hourlyRate}
                onChange={(e) => updateSetting("hourlyRate", e.target.value)}
                className="bg-space-800 text-white border border-gray-700 rounded px-3 py-2 w-full"
                min="0"
                step="0.01"
                data-oid=".kwiab0"
              />

              <span className="text-gray-300 ml-2" data-oid="3._ri0d">
                NZD
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-2" data-oid="2gcb6kg">
              This hourly rate will be used by default for new projects and time
              entries.
            </p>
          </div>

          {/* Theme Toggle */}
          <div className="glass-card p-4 rounded-lg" data-oid="piw7f.0">
            <h3 className="text-cyan font-medium mb-3" data-oid="kwywnl2">
              Theme
            </h3>
            <div
              className="flex items-center justify-between"
              data-oid="t1yqww1"
            >
              <span className="text-gray-300" data-oid="yrjkyuv">
                Dark Mode
              </span>
              <label
                className="relative inline-flex items-center cursor-pointer"
                data-oid="6eafxh1"
              >
                <input
                  type="checkbox"
                  checked={settings.darkMode}
                  onChange={(e) => updateSetting("darkMode", e.target.checked)}
                  className="sr-only peer"
                  data-oid="fop.4k0"
                />

                <div
                  className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan"
                  data-oid="02mc:do"
                ></div>
              </label>
            </div>
          </div>

          {/* Notifications */}
          <div className="glass-card p-4 rounded-lg" data-oid="6fjhrzi">
            <h3 className="text-cyan font-medium mb-3" data-oid="ihgbs7p">
              Notifications
            </h3>
            <div
              className="flex items-center justify-between"
              data-oid=".nk79lm"
            >
              <span className="text-gray-300" data-oid="sqmqoli">
                Enable Notifications
              </span>
              <label
                className="relative inline-flex items-center cursor-pointer"
                data-oid="hg76i56"
              >
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) =>
                    updateSetting("notifications", e.target.checked)
                  }
                  className="sr-only peer"
                  data-oid="6:6n_1m"
                />

                <div
                  className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan"
                  data-oid="bi2hbwb"
                ></div>
              </label>
            </div>
          </div>

          {/* Unit System */}
          <div className="glass-card p-4 rounded-lg" data-oid="i7d-n:r">
            <h3 className="text-cyan font-medium mb-3" data-oid="m-_507g">
              Unit System
            </h3>
            <div className="grid grid-cols-2 gap-2" data-oid=".tjj.td">
              <button
                className={`py-2 px-4 rounded-md text-center ${settings.unitSystem === "metric" ? "bg-purple-800 text-white" : "bg-space-800 text-gray-400"}`}
                onClick={() => updateSetting("unitSystem", "metric")}
                data-oid="i0kmbsx"
              >
                Metric (mm, cm, m)
              </button>
              <button
                className={`py-2 px-4 rounded-md text-center ${settings.unitSystem === "imperial" ? "bg-purple-800 text-white" : "bg-space-800 text-gray-400"}`}
                onClick={() => updateSetting("unitSystem", "imperial")}
                data-oid="j9lxeis"
              >
                Imperial (in, ft)
              </button>
            </div>
          </div>

          {/* Auto Sync */}
          <div className="glass-card p-4 rounded-lg" data-oid="tzr6-sz">
            <h3 className="text-cyan font-medium mb-3" data-oid="pka9obn">
              Sync
            </h3>
            <div
              className="flex items-center justify-between"
              data-oid="lfscx::"
            >
              <span className="text-gray-300" data-oid="oqbww-k">
                Auto-sync Data
              </span>
              <label
                className="relative inline-flex items-center cursor-pointer"
                data-oid="_imer-t"
              >
                <input
                  type="checkbox"
                  checked={settings.autoSync}
                  onChange={(e) => updateSetting("autoSync", e.target.checked)}
                  className="sr-only peer"
                  data-oid="5hp_mxv"
                />

                <div
                  className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan"
                  data-oid=".dna:jx"
                ></div>
              </label>
            </div>
            <p className="text-gray-400 text-sm mt-2" data-oid="k5nm4df">
              Automatically sync your data to the cloud when changes are made.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 mt-6" data-oid="o27g0id">
            <button
              className="flex-1 bg-purple-900 text-cyan py-2 rounded-lg hover:bg-purple-800 btn-glow btn-glow-cyan"
              onClick={onClose}
              data-oid="ih2ctfr"
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
