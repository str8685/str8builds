import { FC, useState, useEffect } from "react";
import GlassCard from "@/components/ui/GlassCard";
import LeafletMap from "@/components/dashboard/LeafletMap";

// Real NZ supplier data with actual GPS coordinates
const nzSuppliers = [
  {
    id: 1,
    name: "Mitre 10 MEGA Mount Maunganui",
    hours: "Open until 6:00 PM",
    icon: "fas fa-store",
    color: "cyan",
    location: { lat: -37.6908, lng: 176.1908 },
  },
  {
    id: 2,
    name: "PlaceMakers Tauranga",
    hours: "Open until 5:30 PM",
    icon: "fas fa-store",
    color: "teal",
    location: { lat: -37.6986, lng: 176.1652 },
  },
  {
    id: 3,
    name: "Bunnings Warehouse Mt Maunganui",
    hours: "Open until 7:00 PM",
    icon: "fas fa-warehouse",
    color: "electric",
    location: { lat: -37.6738, lng: 176.199 },
  },
  {
    id: 4,
    name: "ITM Tauranga",
    hours: "Open until 5:00 PM",
    icon: "fas fa-building",
    color: "cyan",
    location: { lat: -37.7016, lng: 176.1543 },
  },
  {
    id: 5,
    name: "Carters Tauranga",
    hours: "Open until 5:00 PM",
    icon: "fas fa-truck",
    color: "teal",
    location: { lat: -37.689, lng: 176.175 },
  },
  {
    id: 6,
    name: "Plumbing World Tauranga",
    hours: "Open until 5:00 PM",
    icon: "fas fa-wrench",
    color: "electric",
    location: { lat: -37.705, lng: 176.162 },
  },
  {
    id: 7,
    name: "Mico Plumbing Tauranga",
    hours: "Open until 5:00 PM",
    icon: "fas fa-wrench",
    color: "cyan",
    location: { lat: -37.695, lng: 176.168 },
  },
  {
    id: 8,
    name: "NZ Safety Blackwoods Tauranga",
    hours: "Open until 5:00 PM",
    icon: "fas fa-hard-hat",
    color: "teal",
    location: { lat: -37.708, lng: 176.158 },
  },
];

// Function to calculate distance between two coordinates in km
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

// Function to format distance
const formatDistance = (distance: number): string => {
  if (distance < 1) {
    return `${Math.round(distance * 1000)} m`;
  }
  return `${distance.toFixed(1)} km`;
};

const SupplierLocator: FC = () => {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [fullMapView, setFullMapView] = useState(false);
  const [locationReady, setLocationReady] = useState(false);
  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [locationName, setLocationName] = useState<string>(
    "Loading location...",
  );

  // Handle map ready event with user location
  const handleMapReady = (location?: { lat: number; lng: number }) => {
    setLocationReady(true);
    if (location) {
      setUserLocation(location);

      // Update suppliers with calculated distances
      const suppliersWithDistance = nzSuppliers.map((supplier) => {
        const distance = calculateDistance(
          location.lat,
          location.lng,
          supplier.location.lat,
          supplier.location.lng,
        );

        return {
          ...supplier,
          distance: formatDistance(distance),
        };
      });

      // Sort by distance
      suppliersWithDistance.sort((a, b) => {
        // Extract numeric part and convert to meters for consistent comparison
        const getDistanceInMeters = (distStr: string): number => {
          if (distStr === "Unknown") return Infinity;

          // Parse the number part from the string
          const numericPart = parseFloat(distStr.split(" ")[0]);

          // Convert to meters based on unit
          if (distStr.includes("km")) {
            return numericPart * 1000;
          } else if (distStr.includes("m")) {
            return numericPart;
          } else {
            // Default fallback in case no unit is found
            return numericPart * 1000;
          }
        };

        return (
          getDistanceInMeters(a.distance) - getDistanceInMeters(b.distance)
        );
      });

      // Take only the closest suppliers
      setSuppliers(suppliersWithDistance.slice(0, 5));

      // Get location name based on coordinates (simplified)
      setLocationName("Tauranga, Bay of Plenty");
    }
  };

  return (
    <GlassCard
      className={`p-4 mb-6 overflow-hidden ${fullMapView ? "h-[500px]" : ""}`}
      data-oid="tpj021t"
    >
      <div className="flex justify-between items-start mb-4" data-oid="6g:c.f5">
        <h3 className="text-md font-space text-white" data-oid="a8.0o1q">
          NZ Suppliers Near You
        </h3>
        <button
          className="text-xs text-electric hover:text-cyan"
          onClick={() => setFullMapView(!fullMapView)}
          data-oid="0ruio0c"
        >
          {fullMapView ? "Minimize Map" : "Expand Map"}
        </button>
      </div>

      <LeafletMap
        height={fullMapView ? "360px" : "180px"}
        onReady={handleMapReady}
        suppliers={suppliers}
        showLabels={fullMapView}
        data-oid="b6payns"
      />

      {/* Overlay text */}
      <div
        className="mt-1 mb-3 flex justify-between items-center"
        data-oid="t-tx2o0"
      >
        <div data-oid="u_l6-ys">
          <div className="text-sm text-white font-medium" data-oid="z0-ooju">
            {suppliers.length} suppliers near your location
          </div>
          <div className="text-xs text-gray-400" data-oid="bdstk.y">
            {locationReady ? locationName : "Loading location..."}
          </div>
        </div>

        <button
          className="text-xs bg-electric/20 text-electric px-2 py-1 rounded hover:bg-electric/30"
          onClick={() => {
            // Add distance property when showing all suppliers
            const allSuppliersWithDistance = userLocation
              ? nzSuppliers.map((supplier) => ({
                  ...supplier,
                  distance: formatDistance(
                    calculateDistance(
                      userLocation.lat,
                      userLocation.lng,
                      supplier.location.lat,
                      supplier.location.lng,
                    ),
                  ),
                }))
              : nzSuppliers.map((supplier) => ({
                  ...supplier,
                  distance: "Unknown",
                }));

            // Sort by distance using the same logic as in handleMapReady
            if (userLocation) {
              allSuppliersWithDistance.sort((a, b) => {
                const getDistanceInMeters = (distStr: string): number => {
                  if (distStr === "Unknown") return Infinity;

                  // Parse the number part from the string
                  const numericPart = parseFloat(distStr.split(" ")[0]);

                  // Convert to meters based on unit
                  if (distStr.includes("km")) {
                    return numericPart * 1000;
                  } else if (distStr.includes("m")) {
                    return numericPart;
                  } else {
                    // Default fallback in case no unit is found
                    return numericPart * 1000;
                  }
                };

                return (
                  getDistanceInMeters(a.distance) -
                  getDistanceInMeters(b.distance)
                );
              });
            }

            setSuppliers(allSuppliersWithDistance);
          }}
          data-oid="ptp1cpp"
        >
          <i className="fas fa-search-location mr-1" data-oid="ubuvg66"></i>{" "}
          Show All ({nzSuppliers.length})
        </button>
      </div>

      {/* Only show supplier list when not in full map view */}
      {!fullMapView && (
        <div className="space-y-2" data-oid="a7:-kma">
          {suppliers.map((supplier) => (
            <div
              key={supplier.id}
              className="flex justify-between items-center p-2 hover:bg-space-800/50 rounded-lg transition"
              data-oid="v_bcj_j"
            >
              <div className="flex items-center" data-oid="alinxny">
                <div
                  className={`w-8 h-8 rounded-md bg-purple-900 flex items-center justify-center text-${supplier.color} mr-3`}
                  data-oid="2lgjxlc"
                >
                  <i className={supplier.icon} data-oid="rysvguu"></i>
                </div>
                <div data-oid="-w41p.8">
                  <div
                    className="text-sm font-medium text-white"
                    data-oid="og_alk3"
                  >
                    {supplier.name}
                  </div>
                  <div className="text-xs text-gray-400" data-oid=":5bfn43">
                    {supplier.hours} • {supplier.distance}
                  </div>
                </div>
              </div>
              <div data-oid="5u3la8j">
                <button
                  className="text-electric hover:text-cyan"
                  data-oid="qw5pyk8"
                >
                  <i className="fas fa-directions" data-oid="3s.lwou"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
};

export default SupplierLocator;
