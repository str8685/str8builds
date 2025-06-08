import React, { FC, useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./leaflet-map.css"; // Import our custom leaflet styles
import { useIsMobile } from "@/hooks/use-mobile";

// Need to fix Leaflet default marker icon issue in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// Custom marker icons
const createCustomIcon = (color: string) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div class="map-marker bg-${color} animate-pulse"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

export interface Supplier {
  id: number;
  name: string;
  hours: string;
  distance: string;
  icon: string;
  color: string;
  location: { lat: number; lng: number };
}

interface LeafletMapProps {
  height?: string | number;
  className?: string;
  onReady?: (location?: { lat: number; lng: number }) => void;
  suppliers?: Supplier[];
  showLabels?: boolean;
}

// Separate component to center the map on the user location
const SetViewOnUser = ({ coords }: { coords: [number, number] | null }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.setView(coords, 13);
    }
  }, [coords, map]);

  return null;
};

const LeafletMap: FC<LeafletMapProps> = ({
  height = "180px",
  className = "",
  onReady,
  suppliers = [],
  showLabels = false,
}) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null,
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Get user's location
  const getUserLocation = () => {
    setIsLoading(true);
    setIsRefreshing(true);
    setErrorMsg(null);

    // Safety timeout
    const safetyTimer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setIsRefreshing(false);
        setErrorMsg("Location request timed out. Using default location.");

        // Fall back to default NZ location (Tauranga)
        const defaultLocation: [number, number] = [-37.687, 176.167];
        setUserLocation(defaultLocation);
        if (onReady) {
          onReady({ lat: defaultLocation[0], lng: defaultLocation[1] });
        }
      }
    }, 3000);

    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser");
      setIsLoading(false);
      setIsRefreshing(false);
      clearTimeout(safetyTimer);

      // Fall back to default NZ location
      const defaultLocation: [number, number] = [-37.687, 176.167];
      setUserLocation(defaultLocation);
      if (onReady) {
        onReady({ lat: defaultLocation[0], lng: defaultLocation[1] });
      }
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(safetyTimer);
        const location: [number, number] = [
          position.coords.latitude,
          position.coords.longitude,
        ];

        setUserLocation(location);
        setIsLoading(false);
        setIsRefreshing(false);
        if (onReady) {
          onReady({ lat: location[0], lng: location[1] });
        }
      },
      (error) => {
        clearTimeout(safetyTimer);
        let errorMessage = "Unable to retrieve your location";

        // Provide more specific error messages
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access denied. Please enable location services.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }

        setErrorMsg(errorMessage);
        setIsLoading(false);
        setIsRefreshing(false);

        // Fall back to default NZ location
        const defaultLocation: [number, number] = [-37.687, 176.167];
        setUserLocation(defaultLocation);
        if (onReady) {
          onReady({ lat: defaultLocation[0], lng: defaultLocation[1] });
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 2500,
        maximumAge: 300000,
      },
    );
  };

  // Initialize on mount
  useEffect(() => {
    getUserLocation();

    // Safety timeout to ensure loading state is cleared if anything goes wrong
    const finalSafetyTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 6000);

    return () => {
      clearTimeout(finalSafetyTimeout);
    };
  }, []);

  if (isLoading || !userLocation) {
    return (
      <div
        className={`relative overflow-hidden rounded-lg ${className}`}
        style={{ height }}
        data-oid="ru:4y02"
      >
        <div
          className="absolute inset-0 bg-space-800/50 flex items-center justify-center"
          data-oid="rx09vys"
        >
          <div
            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan"
            data-oid="cntdu4_"
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ height }}
      data-oid="::n0m9m"
    >
      {errorMsg && (
        <div
          className="absolute inset-0 bg-space-800/80 flex items-center justify-center text-red-400 text-sm p-4 text-center z-50"
          data-oid="kl_b0.f"
        >
          <div data-oid="6m3ac5m">
            <i
              className="fas fa-exclamation-triangle mb-2"
              data-oid="f6z9y3p"
            ></i>
            <p data-oid="yst60rt">{errorMsg}</p>
            <button
              className="mt-2 text-xs bg-electric/20 text-electric px-2 py-1 rounded hover:bg-electric/30"
              onClick={getUserLocation}
              disabled={isRefreshing}
              data-oid="zv7xt.7"
            >
              {isRefreshing ? "Refreshing..." : "Try Again"}
            </button>
          </div>
        </div>
      )}

      <MapContainer
        center={[-37.687, 176.167]} // Default Tauranga coordinates
        zoom={12}
        style={{ height: "100%", width: "100%" }}
        zoomControl={!isMobile}
        data-oid="wb_r.kt"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          data-oid="eh:7pwl"
        />

        {userLocation && (
          <SetViewOnUser coords={userLocation} data-oid="eb5:ih8" />
        )}

        {/* User location */}
        {userLocation && (
          <>
            <Circle
              center={userLocation}
              pathOptions={{
                fillColor: "#06b6d4",
                color: "#0ea5e9",
                weight: 1,
                fillOpacity: 0.4,
              }}
              radius={50}
              data-oid="rm4rvgu"
            />

            <Marker position={userLocation} data-oid="6hst9h0">
              <Popup data-oid="5k6qgc8">
                <div className="text-xs font-medium" data-oid=".2bxdv_">
                  Your Location
                </div>
              </Popup>
            </Marker>
          </>
        )}

        {/* Supplier markers */}
        {suppliers.map((supplier) => (
          <Marker
            key={supplier.id}
            position={[supplier.location.lat, supplier.location.lng]}
            icon={createCustomIcon(supplier.color)}
            data-oid="28chz7o"
          >
            <Popup data-oid="m304xw1">
              <div className="text-xs font-medium" data-oid="qeeyb.b">
                {supplier.name}
              </div>
              <div className="text-xs text-gray-300" data-oid="5e_6xed">
                {supplier.hours}
              </div>
              <div className="text-xs text-gray-300" data-oid="u4:3_b9">
                {supplier.distance}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Refresh button */}
      <div className="absolute top-3 right-3" data-oid="l.ai8tb">
        <button
          onClick={getUserLocation}
          disabled={isRefreshing}
          className="bg-space-900/80 rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:text-electric transition-colors"
          title="Refresh location"
          data-oid="qfv8a5p"
        >
          <i
            className={`fas fa-sync-alt ${isRefreshing ? "animate-spin" : ""}`}
            data-oid="naqufmr"
          ></i>
        </button>
      </div>

      {/* Map attribution */}
      <div
        className="absolute bottom-0 right-0 p-1 bg-space-900/80 text-[10px] text-gray-500"
        data-oid="qtxqxdh"
      >
        OpenStreetMap • Live Location
      </div>

      {/* Mobile zoom controls */}
      {isMobile && (
        <div
          className="absolute bottom-6 right-3 flex flex-col space-y-2"
          data-oid=".8t114z"
        >
          <button
            onClick={() =>
              document
                .querySelector(".leaflet-control-zoom-in")
                ?.dispatchEvent(new Event("click"))
            }
            className="bg-space-900/80 rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:text-electric"
            aria-label="Zoom in"
            data-oid="f4difr5"
          >
            <i className="fas fa-plus" data-oid="88w6gq5"></i>
          </button>
          <button
            onClick={() =>
              document
                .querySelector(".leaflet-control-zoom-out")
                ?.dispatchEvent(new Event("click"))
            }
            className="bg-space-900/80 rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:text-electric"
            aria-label="Zoom out"
            data-oid="_-5wlfi"
          >
            <i className="fas fa-minus" data-oid="1uy-qx0"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default LeafletMap;
