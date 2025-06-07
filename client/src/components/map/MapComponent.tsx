import { FC, useEffect, useState } from "react";

interface MapLocation {
  lat: number;
  lng: number;
  name?: string;
  type?: "user" | "supplier";
  color?: string;
}

interface MapComponentProps {
  locations?: MapLocation[];
  height?: string | number;
  className?: string;
  onLocationFound?: (location: MapLocation) => void;
}

const MapComponent: FC<MapComponentProps> = ({
  locations = [],
  height = "180px",
  className = "",
  onLocationFound,
}) => {
  const [loading, setLoading] = useState(true);

  // Default NZ location - Papamoa, Bay of Plenty
  const [userLocation] = useState({
    lat: -37.708,
    lng: 176.296,
    type: "user" as const,
  });

  // Notify parent component about location
  useEffect(() => {
    if (onLocationFound) {
      // Add slight delay to simulate geolocation
      const timer = setTimeout(() => {
        onLocationFound(userLocation);
        setLoading(false);
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setLoading(false);
    }
  }, [onLocationFound, userLocation]);

  if (loading) {
    return (
      <div
        className={`relative overflow-hidden rounded-lg ${className}`}
        style={{ height }}
        data-oid="latm3e:"
      >
        <div
          className="absolute inset-0 bg-space-800/50 flex items-center justify-center"
          data-oid="-6xm9h7"
        >
          <div
            className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan"
            data-oid="77p0czg"
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ height }}
      data-oid="u3wbftu"
    >
      <div className="absolute inset-0 bg-space-800/30" data-oid="jiajshm">
        {/* Map grid */}
        <div
          className="h-full w-full grid grid-cols-5 grid-rows-5"
          data-oid="n03gw_y"
        >
          {Array.from({ length: 25 }).map((_, i) => (
            <div
              key={i}
              className="border-[0.5px] border-gray-700/20"
              data-oid="z_3v1fq"
            ></div>
          ))}
        </div>

        {/* User location */}
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          data-oid="h16:i4u"
        >
          <div className="relative" data-oid="glol5ha">
            <div
              className="h-4 w-4 rounded-full bg-electric animate-pulse"
              data-oid="z905vtl"
            ></div>
            <div
              className="absolute top-0 left-0 h-4 w-4 rounded-full bg-electric animate-ping opacity-50"
              data-oid="gfueo3y"
            ></div>
            <div
              className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-space-900/90 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
              data-oid="up1-s2u"
            >
              Your Location
            </div>
          </div>
        </div>

        {/* Supplier locations */}
        {locations.map((loc, index) => {
          // Calculate relative position
          const offsetX = Math.sin(index * 0.7) * 40;
          const offsetY = Math.cos(index * 0.9) * 30;
          const color = loc.color || "cyan";

          return (
            <div
              key={index}
              className="absolute"
              style={{
                top: `calc(50% + ${offsetY}%)`,
                left: `calc(50% + ${offsetX}%)`,
                transform: "translate(-50%, -50%)",
              }}
              data-oid="ggv__r."
            >
              <div
                className={`h-3 w-3 rounded-full bg-${color} animate-pulse`}
                data-oid="4q8bdld"
              ></div>
            </div>
          );
        })}
      </div>

      {/* Compass indicator */}
      <div
        className="absolute top-3 right-3 bg-space-900/80 rounded-full h-8 w-8 flex items-center justify-center text-gray-400"
        data-oid="7k6_a4z"
      >
        <i className="fas fa-compass" data-oid=":u.ixjs"></i>
      </div>

      {/* Map attribution */}
      <div
        className="absolute bottom-0 right-0 p-1 bg-space-900/80 text-[10px] text-gray-500"
        data-oid="5v:a97v"
      >
        NZ GIS Data
      </div>
    </div>
  );
};

export default MapComponent;
