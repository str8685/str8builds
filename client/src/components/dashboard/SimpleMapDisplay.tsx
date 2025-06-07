import { FC, useEffect, useState, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { RefreshCw, Compass, Plus, Minus, AlertTriangle } from "lucide-react";

export interface Supplier {
  id: number;
  name: string;
  hours: string;
  distance: string;
  icon: string;
  color: string;
  location: { lat: number; lng: number };
}

interface SimpleMapDisplayProps {
  height?: string | number;
  className?: string;
  onReady?: (location?: { lat: number; lng: number }) => void;
  suppliers?: Supplier[];
  showLabels?: boolean;
}

const SimpleMapDisplay: FC<SimpleMapDisplayProps> = ({
  height = "180px",
  className = "",
  onReady,
  suppliers = [],
  showLabels = false,
}) => {
  const isMobile = useIsMobile();
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // Default zoom level

  // Get user's real location
  const getUserLocation = useCallback(() => {
    setIsLoading(true);
    setIsRefreshing(true);
    setErrorMsg(null);

    // Safety timeout to ensure we don't get stuck in loading state
    const safetyTimer = setTimeout(() => {
      if (isLoading) {
        console.warn("Geolocation safety timeout triggered");
        setIsLoading(false);
        setIsRefreshing(false);
        setErrorMsg("Location request timed out. Using default location.");

        // Fall back to default NZ location (Tauranga)
        const defaultLocation = { lat: -37.687, lng: 176.167 }; // Tauranga coordinates
        setUserLocation(defaultLocation);
        if (onReady) {
          onReady(defaultLocation);
        }
      }
    }, 3000); // 3 second safety timeout - reduced for faster fallback

    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser");
      setIsLoading(false);
      setIsRefreshing(false);
      clearTimeout(safetyTimer);

      // Fall back to default NZ location (Tauranga)
      const defaultLocation = { lat: -37.687, lng: 176.167 }; // Tauranga coordinates
      setUserLocation(defaultLocation);
      if (onReady) {
        onReady(defaultLocation);
      }
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(safetyTimer);
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
        setIsLoading(false);
        setIsRefreshing(false);
        if (onReady) {
          onReady(location);
        }
      },
      (error) => {
        clearTimeout(safetyTimer);
        console.error("Error getting location:", error);
        let errorMessage = "Unable to retrieve your location";

        // Provide more specific error messages
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location access denied. Please enable location services.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable. Try again later.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out. Try again.";
            break;
        }

        setErrorMsg(errorMessage);
        setIsLoading(false);
        setIsRefreshing(false);

        // Fall back to default NZ location (Tauranga)
        const defaultLocation = { lat: -37.687, lng: 176.167 }; // Tauranga coordinates
        setUserLocation(defaultLocation);
        if (onReady) {
          onReady(defaultLocation);
        }
      },
      {
        enableHighAccuracy: false, // Set to false for faster response
        timeout: 2500, // Further reduced timeout for faster fallback
        maximumAge: 300000, // Allow cached positions up to 5 minutes old for better performance
      },
    );
  }, [onReady, isLoading]);

  // Zoom in function
  const zoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 0.2, 2)); // Limit max zoom to 2x
  }, []);

  // Zoom out function
  const zoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 0.2, 0.5)); // Limit min zoom to 0.5x
  }, []);

  // Initialize location on component mount
  useEffect(() => {
    // Call getUserLocation on mount
    const initializeLocation = () => {
      getUserLocation();

      // Add a safety timeout to ensure loading state is cleared
      const finalSafetyTimeout = setTimeout(() => {
        setIsLoading(false);
      }, 6000); // 6 seconds absolute maximum loading time

      return () => clearTimeout(finalSafetyTimeout);
    };

    return initializeLocation();
  }, [getUserLocation]);

  if (isLoading) {
    return (
      <div
        className={`relative overflow-hidden rounded-lg ${className}`}
        style={{ height }}
        data-oid="j7yk43w"
      >
        <div
          className="absolute inset-0 bg-space-800/50 flex items-center justify-center"
          data-oid="9haevls"
        >
          <div
            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan"
            data-oid="b7gqjj."
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ height }}
      data-oid="g.17qq1"
    >
      {errorMsg && (
        <div
          className="absolute inset-0 bg-space-800/80 flex items-center justify-center text-red-400 text-sm p-4 text-center z-50"
          data-oid="3..793-"
        >
          <div className="flex flex-col items-center" data-oid=".em_u4e">
            <AlertTriangle className="h-6 w-6 mb-2" data-oid="p-9:3sm" />
            <p data-oid="ndm9i85">{errorMsg}</p>
            <button
              className="mt-2 text-xs bg-electric/20 text-electric px-2 py-1 rounded hover:bg-electric/30"
              onClick={getUserLocation}
              disabled={isRefreshing}
              data-oid="bzzc:zd"
            >
              {isRefreshing ? "Refreshing..." : "Try Again"}
            </button>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-space-800/30" data-oid="bnl3-5n">
        {/* Map grid */}
        <div
          className="h-full w-full grid grid-cols-5 grid-rows-5"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "center",
          }}
          data-oid="81q5dq9"
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="border-[0.5px] border-gray-700/20"
              data-oid="fnu2m-6"
            ></div>
          ))}
        </div>

        {/* User location */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          data-oid="-w_rheb"
        >
          <div className="relative" data-oid="eyj.v6h">
            <div
              className="h-4 w-4 rounded-full bg-electric animate-pulse"
              data-oid="v-2fbor"
            ></div>
            <div
              className="absolute top-0 left-0 h-4 w-4 rounded-full bg-electric animate-ping opacity-50"
              data-oid="oaswia:"
            ></div>
            <div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-space-900/90 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
              data-oid="eb_pdkj"
            >
              Your Location
            </div>
          </div>
        </div>

        {/* Supplier locations */}
        {suppliers.map((supplier, index) => {
          // Calculate relative position based on real coordinates
          // This is a simplified calculation to show relative positions on the map
          // In a real app, you'd use a proper mapping library like Leaflet or Google Maps

          // If we have user location, calculate relative position
          let offsetX = 0;
          let offsetY = 0;

          if (userLocation && supplier.location) {
            // Calculate relative position (simplified)
            // This is just for visual representation - not geographically accurate

            // Improved calculation with better scaling
            // Using Haversine-inspired scaling for better distance representation
            const latDiff = supplier.location.lat - userLocation.lat;
            const lngDiff = supplier.location.lng - userLocation.lng;

            // Scale factors adjusted for better visual representation
            // Longitude differences need to be scaled by cosine of latitude for accuracy
            // Dynamic scaling based on actual coordinates to work better for NZ locations
            const baseScale = 20; // Increased base scale factor for better visibility
            const latScale = baseScale * (1 + Math.abs(userLocation.lat / 90)); // Adjust scale based on latitude
            const lngScale =
              baseScale * Math.cos((userLocation.lat * Math.PI) / 180);

            // Apply scaling
            const scaledLatDiff = latDiff * latScale;
            const scaledLngDiff = lngDiff * lngScale;

            // Apply zoom level to the calculation - improved zoom handling
            const zoomFactor = 1 / Math.pow(zoomLevel, 0.8); // Power function gives a more natural zoom feeling

            // Limit the offset to keep suppliers visible on the map
            // The max values are adjusted for better map display
            const maxOffset = 45 * zoomFactor;

            // Invert Y coordinates because latitude increases northward but screen coordinates go down
            offsetX = Math.max(Math.min(scaledLngDiff, maxOffset), -maxOffset);
            offsetY = -Math.max(Math.min(scaledLatDiff, maxOffset), -maxOffset);
          } else {
            // Fallback to the original calculation if no real coordinates
            // Apply zoom level to the fallback calculation as well
            const zoomFactor = 1 / zoomLevel;
            offsetX = Math.sin(index * 0.7) * 40 * zoomFactor;
            offsetY = -Math.cos(index * 0.9) * 30 * zoomFactor; // Invert Y coordinate to match main calculation
          }

          // Get color class - extract from supplier or use a default
          const getColorClass = (color: string) => {
            switch (color) {
              case "cyan":
                return "bg-cyan";
              case "teal":
                return "bg-teal";
              case "electric":
                return "bg-electric";
              case "purple":
                return "bg-purple";
              case "red":
                return "bg-red-400";
              case "green":
                return "bg-green-400";
              case "blue":
                return "bg-blue-400";
              default:
                return "bg-cyan";
            }
          };
          const colorClass = getColorClass(supplier.color);

          return (
            <div
              key={supplier.id}
              className="absolute"
              style={{
                top: `calc(50% + ${offsetY}%)`,
                left: `calc(50% + ${offsetX}%)`,
                transform: "translate(-50%, -50%)",
                zIndex: 20,
              }}
              data-oid="0qqnamq"
            >
              <div className="group relative" data-oid="7x6yo_3">
                <div
                  className={`h-3 w-3 rounded-full ${colorClass} animate-pulse`}
                  data-oid="n5j2hce"
                ></div>

                {showLabels && (
                  <div
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-space-900/90 px-2 py-1 rounded text-xs text-white whitespace-nowrap min-w-[100px]"
                    style={{ zIndex: 30 }}
                    data-oid="d1ep62t"
                  >
                    <div className="font-medium text-xs" data-oid="wivqgj9">
                      {supplier.name.split(" ")[0]}
                    </div>
                    <div
                      className="text-[10px] text-gray-400"
                      data-oid="uvzmoks"
                    >
                      {supplier.distance}
                    </div>
                  </div>
                )}

                <div
                  className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 bottom-4 left-1/2 transform -translate-x-1/2 bg-space-900/90 px-2 py-1 rounded text-xs text-white whitespace-nowrap min-w-[120px]"
                  style={{ zIndex: 30 }}
                  data-oid="momxsjg"
                >
                  <div className="font-medium text-xs" data-oid="5p:sq6r">
                    {supplier.name}
                  </div>
                  <div className="text-[10px] text-gray-400" data-oid="-3z283s">
                    {supplier.hours}
                  </div>
                  <div className="text-[10px] text-gray-400" data-oid="-dqty9c">
                    {supplier.distance}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Show empty state if no suppliers */}
        {suppliers.length === 0 &&
          [0, 1, 2].map((index) => {
            // Fallback to generate dummy locations with improved zoom factor applied
            const zoomFactor = 1 / Math.pow(zoomLevel, 0.8); // Use the same zoom function as the main calculation
            const offsetX = Math.sin(index * 0.7) * 45 * zoomFactor; // Use the same max offset (45)
            const offsetY = -(Math.cos(index * 0.9) * 35 * zoomFactor); // Invert Y-axis and increase spread
            const colors = ["cyan", "teal", "electric"];

            return (
              <div
                key={index}
                className="absolute"
                style={{
                  top: `calc(50% + ${offsetY}%)`,
                  left: `calc(50% + ${offsetX}%)`,
                  transform: "translate(-50%, -50%)",
                }}
                data-oid="7w:dejk"
              >
                <div
                  className={`h-3 w-3 rounded-full ${colors[index] === "cyan" ? "bg-cyan" : colors[index] === "teal" ? "bg-teal" : "bg-electric"} animate-pulse`}
                  data-oid="zcmc9gu"
                ></div>
              </div>
            );
          })}
      </div>

      {/* Compass indicator and refresh button */}
      <div className="absolute top-3 right-3 flex space-x-2" data-oid="3h_-u7n">
        <button
          onClick={getUserLocation}
          disabled={isRefreshing}
          className="bg-space-900/80 rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:text-electric transition-colors"
          title="Refresh location"
          data-oid="x7m1:ab"
        >
          <RefreshCw
            className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
            data-oid="51jyz:w"
          />
        </button>
        <div
          className="bg-space-900/80 rounded-full h-8 w-8 flex items-center justify-center text-gray-400"
          data-oid="98j0:3o"
        >
          <Compass className="h-4 w-4" data-oid="ykw:pss" />
        </div>
      </div>

      {/* Map attribution */}
      <div
        className="absolute bottom-0 right-0 p-1 bg-space-900/80 text-[10px] text-gray-500"
        data-oid="9964l.8"
      >
        NZ GIS Data • Live Location{" "}
        {isMobile && `• Zoom: ${Math.round(zoomLevel * 100)}%`}
      </div>

      {/* Mobile zoom controls */}
      {isMobile && (
        <div
          className="absolute bottom-6 right-3 flex flex-col space-y-2"
          data-oid="3cuzi3r"
        >
          <button
            onClick={zoomIn}
            className="bg-space-900/80 rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:text-electric"
            aria-label="Zoom in"
            data-oid="teca0g5"
          >
            <Plus className="h-4 w-4" data-oid="k49ref2" />
          </button>
          <button
            onClick={zoomOut}
            className="bg-space-900/80 rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:text-electric"
            aria-label="Zoom out"
            data-oid="6fym7ni"
          >
            <Minus className="h-4 w-4" data-oid="7480szy" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SimpleMapDisplay;
