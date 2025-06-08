import { FC, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import GlassCard from "../ui/GlassCard";

// Define supplier options with prices
const SUPPLIERS = [
  { id: "supplier1", name: "STR8 Building Supplies", priceMultiplier: 1.0 },
  { id: "supplier2", name: "Discount Materials", priceMultiplier: 0.85 },
  { id: "supplier3", name: "Premium Building Co", priceMultiplier: 1.15 },
  { id: "supplier4", name: "Local Hardware", priceMultiplier: 0.95 },
];

// Material categories
const CATEGORIES = [
  { id: "framing", name: "Framing & Structural" },
  { id: "drywall", name: "Drywall & Finishing" },
  { id: "concrete", name: "Concrete & Foundation" },
  { id: "roofing", name: "Roofing Materials" },
  { id: "electrical", name: "Electrical" },
  { id: "plumbing", name: "Plumbing" },
  { id: "flooring", name: "Flooring & Tile" },
  { id: "painting", name: "Paint & Supplies" },
];

// Base material pricing
const MATERIALS = [
  // Framing & Structural
  {
    id: "lumber2x4",
    name: "2x4 Lumber (8ft)",
    category: "framing",
    unit: "piece",
    basePrice: 5.45,
    unit_type: "ea",
  },
  {
    id: "lumber2x6",
    name: "2x6 Lumber (8ft)",
    category: "framing",
    unit: "piece",
    basePrice: 9.25,
    unit_type: "ea",
  },
  {
    id: "plywood34",
    name: '3/4" Plywood (4x8)',
    category: "framing",
    unit: "sheet",
    basePrice: 38.95,
    unit_type: "ea",
  },
  {
    id: "osb716",
    name: '7/16" OSB (4x8)',
    category: "framing",
    unit: "sheet",
    basePrice: 24.75,
    unit_type: "ea",
  },
  {
    id: "lvl12",
    name: 'LVL Beam (1.75"x11.875")',
    category: "framing",
    unit: "linear ft",
    basePrice: 12.5,
    unit_type: "ft",
  },

  // Drywall & Finishing
  {
    id: "drywall12",
    name: '1/2" Drywall (4x8)',
    category: "drywall",
    unit: "sheet",
    basePrice: 14.95,
    unit_type: "ea",
  },
  {
    id: "drywall58",
    name: '5/8" Fire-Rated Drywall (4x8)',
    category: "drywall",
    unit: "sheet",
    basePrice: 18.75,
    unit_type: "ea",
  },
  {
    id: "joint_compound",
    name: "Joint Compound",
    category: "drywall",
    unit: "5 gallon",
    basePrice: 19.95,
    unit_type: "ea",
  },
  {
    id: "drywall_screws",
    name: "Drywall Screws",
    category: "drywall",
    unit: "lb",
    basePrice: 3.95,
    unit_type: "lb",
  },
  {
    id: "corner_bead",
    name: "Corner Bead",
    category: "drywall",
    unit: "10ft",
    basePrice: 5.25,
    unit_type: "ea",
  },

  // Concrete & Foundation
  {
    id: "concrete_mix",
    name: "Concrete Mix",
    category: "concrete",
    unit: "80lb bag",
    basePrice: 6.75,
    unit_type: "ea",
  },
  {
    id: "rebar",
    name: 'Rebar #4 (1/2")',
    category: "concrete",
    unit: "20ft",
    basePrice: 14.95,
    unit_type: "ea",
  },
  {
    id: "concrete_mesh",
    name: "Wire Mesh (5x10)",
    category: "concrete",
    unit: "sheet",
    basePrice: 29.75,
    unit_type: "ea",
  },
  {
    id: "foundation_block",
    name: "Foundation Block (8x8x16)",
    category: "concrete",
    unit: "block",
    basePrice: 2.25,
    unit_type: "ea",
  },

  // Roofing Materials
  {
    id: "roof_shingles",
    name: "Architectural Shingles",
    category: "roofing",
    unit: "bundle",
    basePrice: 39.95,
    unit_type: "ea",
  },
  {
    id: "roof_felt",
    name: "Roof Felt (15lb)",
    category: "roofing",
    unit: "400 sq ft",
    basePrice: 25.95,
    unit_type: "ea",
  },
  {
    id: "ridge_cap",
    name: "Ridge Cap Shingles",
    category: "roofing",
    unit: "bundle",
    basePrice: 45.5,
    unit_type: "ea",
  },
  {
    id: "roof_nails",
    name: "Roofing Nails",
    category: "roofing",
    unit: "5lb",
    basePrice: 6.95,
    unit_type: "ea",
  },

  // Electrical
  {
    id: "wire_14_2",
    name: "14/2 Romex Wire",
    category: "electrical",
    unit: "250ft",
    basePrice: 68.95,
    unit_type: "ea",
  },
  {
    id: "outlet",
    name: "Electrical Outlet",
    category: "electrical",
    unit: "each",
    basePrice: 3.25,
    unit_type: "ea",
  },
  {
    id: "switch",
    name: "Light Switch",
    category: "electrical",
    unit: "each",
    basePrice: 4.5,
    unit_type: "ea",
  },
  {
    id: "panel_100",
    name: "100A Panel Box",
    category: "electrical",
    unit: "each",
    basePrice: 125.0,
    unit_type: "ea",
  },

  // Plumbing
  {
    id: "pvc_40_2",
    name: '2" PVC Schedule 40',
    category: "plumbing",
    unit: "10ft",
    basePrice: 12.75,
    unit_type: "ea",
  },
  {
    id: "pex_12",
    name: '1/2" PEX Tubing',
    category: "plumbing",
    unit: "100ft",
    basePrice: 42.95,
    unit_type: "ea",
  },
  {
    id: "pex_fittings",
    name: "PEX Fittings",
    category: "plumbing",
    unit: "each",
    basePrice: 3.15,
    unit_type: "ea",
  },
  {
    id: "toilet",
    name: "Standard Toilet",
    category: "plumbing",
    unit: "each",
    basePrice: 99.0,
    unit_type: "ea",
  },

  // Flooring & Tile
  {
    id: "hardwood",
    name: "Hardwood Flooring",
    category: "flooring",
    unit: "sq ft",
    basePrice: 4.95,
    unit_type: "sq ft",
  },
  {
    id: "laminate",
    name: "Laminate Flooring",
    category: "flooring",
    unit: "sq ft",
    basePrice: 2.45,
    unit_type: "sq ft",
  },
  {
    id: "tile_ceramic",
    name: "12x12 Ceramic Tile",
    category: "flooring",
    unit: "sq ft",
    basePrice: 1.85,
    unit_type: "sq ft",
  },
  {
    id: "grout",
    name: "Tile Grout",
    category: "flooring",
    unit: "10lb bag",
    basePrice: 14.75,
    unit_type: "ea",
  },

  // Paint & Supplies
  {
    id: "paint_interior",
    name: "Interior Paint",
    category: "painting",
    unit: "gallon",
    basePrice: 32.95,
    unit_type: "ea",
  },
  {
    id: "paint_primer",
    name: "Primer",
    category: "painting",
    unit: "gallon",
    basePrice: 24.95,
    unit_type: "ea",
  },
  {
    id: "paint_brush",
    name: "Premium Paintbrush",
    category: "painting",
    unit: "each",
    basePrice: 12.95,
    unit_type: "ea",
  },
  {
    id: "paint_roller",
    name: "Paint Roller Kit",
    category: "painting",
    unit: "kit",
    basePrice: 18.5,
    unit_type: "ea",
  },
];

interface Material {
  id: string;
  name: string;
  category: string;
  unit: string;
  basePrice: number;
  unit_type: string;
}

interface Supplier {
  id: string;
  name: string;
  priceMultiplier: number;
}

interface SelectedMaterial {
  materialId: string;
  quantity: number;
}

const MaterialCalculator: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("framing");
  const [selectedSupplier, setSelectedSupplier] = useState<string>(
    SUPPLIERS[0].id,
  );
  const [selectedMaterials, setSelectedMaterials] = useState<
    SelectedMaterial[]
  >([]);
  const [activeTab, setActiveTab] = useState<"materials" | "summary">(
    "materials",
  );
  const [projectName, setProjectName] = useState<string>(
    "New Construction Project",
  );

  // Filter materials by selected category
  const filteredMaterials = MATERIALS.filter(
    (material) => material.category === selectedCategory,
  );

  // Get current supplier
  const currentSupplier =
    SUPPLIERS.find((s) => s.id === selectedSupplier) || SUPPLIERS[0];

  // Add material to selection
  const addMaterial = (materialId: string) => {
    const existingIndex = selectedMaterials.findIndex(
      (m) => m.materialId === materialId,
    );

    if (existingIndex >= 0) {
      // Material already exists, increase quantity
      const updated = [...selectedMaterials];
      updated[existingIndex].quantity += 1;
      setSelectedMaterials(updated);
    } else {
      // Add new material with quantity 1
      setSelectedMaterials([...selectedMaterials, { materialId, quantity: 1 }]);
    }
  };

  // Update material quantity
  const updateQuantity = (materialId: string, quantity: number) => {
    if (quantity <= 0) {
      // Remove material if quantity is 0 or negative
      setSelectedMaterials(
        selectedMaterials.filter((m) => m.materialId !== materialId),
      );
    } else {
      // Update quantity
      const updated = selectedMaterials.map((m) =>
        m.materialId === materialId ? { ...m, quantity } : m,
      );
      setSelectedMaterials(updated);
    }
  };

  // Calculate the price for a specific material with supplier pricing
  const calculateMaterialPrice = (materialId: string, quantity: number) => {
    const material = MATERIALS.find((m) => m.id === materialId);
    if (!material) return 0;

    return material.basePrice * currentSupplier.priceMultiplier * quantity;
  };

  // Calculate total cost
  const calculateTotal = () => {
    return selectedMaterials.reduce((total, item) => {
      return total + calculateMaterialPrice(item.materialId, item.quantity);
    }, 0);
  };

  // Compare prices from all suppliers
  const getPriceComparison = () => {
    return SUPPLIERS.map((supplier) => ({
      ...supplier,
      totalPrice: selectedMaterials.reduce((total, item) => {
        const material = MATERIALS.find((m) => m.id === item.materialId);
        if (!material) return total;
        return (
          total + material.basePrice * supplier.priceMultiplier * item.quantity
        );
      }, 0),
    }));
  };

  return (
    <div className="w-full" data-oid="x.xee_c">
      {/* Header with project title and supplier selection */}
      <div
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-space-700"
        data-oid="rt.c9kf"
      >
        <div className="mb-4 md:mb-0" data-oid="7ue0e8q">
          <div className="flex items-center" data-oid="9oemyil">
            <div
              className="flex items-center justify-center h-10 w-10 rounded-full mr-3 bg-gradient-to-br from-cyan/20 to-transparent border border-cyan/30"
              data-oid="jzje6h_"
            >
              <i className="fas fa-calculator text-cyan" data-oid="cewox-e"></i>
            </div>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="text-xl font-medium text-white bg-transparent border-0 border-b border-transparent hover:border-space-600 focus:border-cyan focus:ring-0 focus:outline-none transition-colors px-1"
              data-oid="ygsgsy8"
            />
          </div>
        </div>

        <div className="flex items-center" data-oid="z_aebmv">
          <span className="text-gray-400 mr-2" data-oid="n5l65x9">
            Supplier:
          </span>
          <select
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
            className="bg-space-800 border border-space-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-cyan focus:border-cyan"
            data-oid="5znqcn."
          >
            {SUPPLIERS.map((supplier) => (
              <option key={supplier.id} value={supplier.id} data-oid="i69aog3">
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-space-700 mb-6" data-oid="h8h.eex">
        <button
          className={`px-4 py-2 font-medium relative ${activeTab === "materials" ? "text-cyan" : "text-gray-400 hover:text-white"}`}
          onClick={() => setActiveTab("materials")}
          data-oid="z.j01tq"
        >
          <span data-oid="mipw7xm">Materials Selection</span>
          {activeTab === "materials" && (
            <span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent"
              data-oid="m6_x0hj"
            ></span>
          )}
        </button>
        <button
          className={`px-4 py-2 font-medium relative ${activeTab === "summary" ? "text-cyan" : "text-gray-400 hover:text-white"}`}
          onClick={() => setActiveTab("summary")}
          data-oid="2_6hgbp"
        >
          <span data-oid="9fhc4tg">Estimate Summary</span>
          {activeTab === "summary" && (
            <span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent"
              data-oid=".9euy.g"
            ></span>
          )}
        </button>
      </div>

      {activeTab === "materials" ? (
        <>
          {/* Category Selection */}
          <div className="mb-6 overflow-x-auto" data-oid="vs:.ik2">
            <div className="flex space-x-2 pb-3" data-oid="tt1h142">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  className={`px-3 py-2 rounded-lg text-sm transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-cyan/60 to-electric/60 text-white font-medium shadow-lg shadow-cyan/10 border border-cyan/30"
                      : "bg-space-800/60 text-gray-300 hover:text-white hover:bg-space-700/60 border border-space-700"
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                  data-oid="h9:hkhg"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Materials List */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6"
            data-oid="6:-o_cq"
          >
            {filteredMaterials.map((material) => {
              const selectedMaterial = selectedMaterials.find(
                (m) => m.materialId === material.id,
              );
              const quantity = selectedMaterial?.quantity || 0;

              return (
                <div
                  key={material.id}
                  className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-300 ${
                    quantity > 0
                      ? "bg-space-800/80 border-cyan/40 shadow-lg shadow-cyan/5"
                      : "bg-space-900/70 border-space-700 hover:border-space-600"
                  }`}
                  data-oid="uh0zql5"
                >
                  {quantity > 0 && (
                    <div
                      className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan to-transparent"
                      data-oid="cv:_.16"
                    ></div>
                  )}

                  <div className="flex justify-between mb-3" data-oid="go8g-a1">
                    <h3 className="font-medium text-white" data-oid="xuz-g5.">
                      {material.name}
                    </h3>
                    <div className="text-sm text-gray-400" data-oid="y4.g.vx">
                      {material.unit}
                    </div>
                  </div>

                  <div
                    className="flex justify-between items-center mb-3"
                    data-oid="b9w1k7-"
                  >
                    <div className="text-lg text-cyan" data-oid="rr_1mjh">
                      $
                      {(
                        material.basePrice * currentSupplier.priceMultiplier
                      ).toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-400" data-oid="j27zh_d">
                      per {material.unit_type}
                    </div>
                  </div>

                  <div
                    className="flex justify-between items-center"
                    data-oid="vtjosyg"
                  >
                    {quantity > 0 ? (
                      <div
                        className="flex items-center border border-space-600 rounded-lg overflow-hidden"
                        data-oid="7sfk9hh"
                      >
                        <button
                          className="bg-space-700 hover:bg-space-600 text-white px-3 py-1 transition-colors"
                          onClick={() =>
                            updateQuantity(material.id, quantity - 1)
                          }
                          data-oid="3bvypac"
                        >
                          <i className="fas fa-minus" data-oid="gf-g9fp"></i>
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={quantity}
                          onChange={(e) =>
                            updateQuantity(
                              material.id,
                              parseInt(e.target.value) || 0,
                            )
                          }
                          className="w-16 bg-space-800 border-0 text-center text-white focus:ring-0"
                          data-oid="izyrrqc"
                        />

                        <button
                          className="bg-space-700 hover:bg-space-600 text-white px-3 py-1 transition-colors"
                          onClick={() =>
                            updateQuantity(material.id, quantity + 1)
                          }
                          data-oid="-lda6vv"
                        >
                          <i className="fas fa-plus" data-oid="9e:6f.1"></i>
                        </button>
                      </div>
                    ) : (
                      <button
                        className="px-3 py-1.5 rounded-lg bg-space-800 hover:bg-cyan/20 text-gray-300 hover:text-cyan border border-space-700 hover:border-cyan/30 transition-all duration-300 text-sm"
                        onClick={() => addMaterial(material.id)}
                        data-oid="5ng4r2y"
                      >
                        <i className="fas fa-plus mr-1" data-oid="j-6vmv:"></i>{" "}
                        Add
                      </button>
                    )}

                    {quantity > 0 && (
                      <div
                        className="text-white font-medium"
                        data-oid="y4faybx"
                      >
                        $
                        {calculateMaterialPrice(material.id, quantity).toFixed(
                          2,
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Materials Summary */}
          {selectedMaterials.length > 0 && (
            <GlassCard className="p-5 border-cyan/20 mt-6" data-oid="f:mlmo-">
              <div
                className="flex justify-between items-center mb-4"
                data-oid="3msli9o"
              >
                <h3
                  className="text-lg font-medium text-white"
                  data-oid="uqabq89"
                >
                  Selected Materials
                </h3>
                <div
                  className="px-3 py-1 rounded-full bg-cyan/10 border border-cyan/20 text-cyan text-sm"
                  data-oid="3f8ktub"
                >
                  {selectedMaterials.length} item
                  {selectedMaterials.length !== 1 ? "s" : ""}
                </div>
              </div>

              <div className="mb-4 max-h-60 overflow-y-auto" data-oid="0.l2nm-">
                {selectedMaterials.map((item) => {
                  const material = MATERIALS.find(
                    (m) => m.id === item.materialId,
                  );
                  if (!material) return null;

                  return (
                    <div
                      key={item.materialId}
                      className="flex justify-between items-center py-2 border-b border-space-700 last:border-b-0"
                      data-oid="3s2inck"
                    >
                      <div className="flex-1" data-oid="n9kmeqd">
                        <div
                          className="font-medium text-white"
                          data-oid="imxk9c0"
                        >
                          {material.name}
                        </div>
                        <div
                          className="text-sm text-gray-400"
                          data-oid="-yjlbkl"
                        >
                          {item.quantity} × $
                          {(
                            material.basePrice * currentSupplier.priceMultiplier
                          ).toFixed(2)}
                        </div>
                      </div>
                      <div
                        className="text-right font-medium text-white"
                        data-oid="ev12eyo"
                      >
                        $
                        {calculateMaterialPrice(
                          material.id,
                          item.quantity,
                        ).toFixed(2)}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div
                className="flex justify-between items-center pt-3 border-t border-space-700"
                data-oid="w2e:z-q"
              >
                <div
                  className="text-lg font-medium text-white"
                  data-oid="q8-j:_2"
                >
                  Total Estimate:
                </div>
                <div className="text-xl font-bold text-cyan" data-oid="jpl.7yx">
                  ${calculateTotal().toFixed(2)}
                </div>
              </div>

              <div className="mt-4 text-right" data-oid="b6e-lz9">
                <button
                  className="px-4 py-2 rounded-lg bg-cyan/20 text-cyan border border-cyan/30 hover:bg-cyan/30 transition-colors"
                  onClick={() => setActiveTab("summary")}
                  data-oid="ycmg3:j"
                >
                  <i
                    className="fas fa-clipboard-check mr-2"
                    data-oid="s-f2c-6"
                  ></i>{" "}
                  View Complete Summary
                </button>
              </div>
            </GlassCard>
          )}
        </>
      ) : (
        <>
          {/* Estimate Summary */}
          <GlassCard
            className="p-6 border-cyan/20 mb-6 backdrop-blur-lg"
            data-oid="nmarbyv"
          >
            <div
              className="flex justify-between items-start mb-6"
              data-oid="d615mk0"
            >
              <div data-oid="d-fc.7r">
                <h2
                  className="text-2xl font-bold text-white mb-1"
                  data-oid="sy3sq3l"
                >
                  {projectName}
                </h2>
                <p className="text-gray-400" data-oid="ufav7kl">
                  Material Estimate Summary
                </p>
              </div>
              <div className="flex space-x-2" data-oid="pyjhuey">
                <button
                  className="p-2 rounded-lg bg-space-800 text-gray-300 hover:text-white hover:bg-space-700 transition-colors"
                  data-oid="ifj1jmu"
                >
                  <i className="fas fa-print" data-oid="94d8m7x"></i>
                </button>
                <button
                  className="p-2 rounded-lg bg-space-800 text-gray-300 hover:text-white hover:bg-space-700 transition-colors"
                  data-oid="bld:n9t"
                >
                  <i className="fas fa-share-alt" data-oid="td-t.ni"></i>
                </button>
              </div>
            </div>

            {selectedMaterials.length > 0 ? (
              <>
                <div
                  className="bg-space-900/60 rounded-lg p-5 mb-6"
                  data-oid="a8:.yl5"
                >
                  <h3
                    className="text-lg font-medium text-white mb-4"
                    data-oid="lfifkr7"
                  >
                    Material List
                  </h3>

                  <div className="overflow-x-auto" data-oid="-iv:3th">
                    <table className="w-full" data-oid="c7lhy6j">
                      <thead data-oid="92fydve">
                        <tr
                          className="border-b border-space-700 text-left"
                          data-oid="4rq8.qg"
                        >
                          <th
                            className="pb-2 font-medium text-gray-300"
                            data-oid="ydnwi1a"
                          >
                            Material
                          </th>
                          <th
                            className="pb-2 font-medium text-gray-300"
                            data-oid="dqkeqdu"
                          >
                            Quantity
                          </th>
                          <th
                            className="pb-2 font-medium text-gray-300"
                            data-oid="1cf:2n5"
                          >
                            Unit
                          </th>
                          <th
                            className="pb-2 font-medium text-gray-300 text-right"
                            data-oid="ih5z2vp"
                          >
                            Unit Price
                          </th>
                          <th
                            className="pb-2 font-medium text-gray-300 text-right"
                            data-oid=":ea17kz"
                          >
                            Total
                          </th>
                        </tr>
                      </thead>
                      <tbody data-oid="tl04q:p">
                        {selectedMaterials.map((item) => {
                          const material = MATERIALS.find(
                            (m) => m.id === item.materialId,
                          );
                          if (!material) return null;

                          return (
                            <tr
                              key={item.materialId}
                              className="border-b border-space-800/60"
                              data-oid="a8xewdw"
                            >
                              <td
                                className="py-3 text-white"
                                data-oid="ly8utd8"
                              >
                                {material.name}
                              </td>
                              <td
                                className="py-3 text-white"
                                data-oid="v8c3upr"
                              >
                                {item.quantity}
                              </td>
                              <td
                                className="py-3 text-gray-400"
                                data-oid="wbwnw60"
                              >
                                {material.unit}
                              </td>
                              <td
                                className="py-3 text-white text-right"
                                data-oid="salzrwf"
                              >
                                $
                                {(
                                  material.basePrice *
                                  currentSupplier.priceMultiplier
                                ).toFixed(2)}
                              </td>
                              <td
                                className="py-3 text-white text-right font-medium"
                                data-oid=".lgodm-"
                              >
                                $
                                {calculateMaterialPrice(
                                  material.id,
                                  item.quantity,
                                ).toFixed(2)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      <tfoot data-oid="31w4fmp">
                        <tr data-oid="osboyk1">
                          <td
                            colSpan={4}
                            className="pt-4 text-right text-white font-medium"
                            data-oid="oy2r-s-"
                          >
                            Total:
                          </td>
                          <td
                            className="pt-4 text-right text-cyan font-bold"
                            data-oid="1sqk9a4"
                          >
                            ${calculateTotal().toFixed(2)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* Supplier Price Comparison */}
                <div data-oid=".w0:0a9">
                  <h3
                    className="text-lg font-medium text-white mb-4"
                    data-oid=".bsfa.7"
                  >
                    Supplier Price Comparison
                  </h3>

                  <div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
                    data-oid="-e-kwr-"
                  >
                    {getPriceComparison().map((supplier) => {
                      const isSelected = supplier.id === selectedSupplier;

                      return (
                        <div
                          key={supplier.id}
                          className={`rounded-xl p-4 transition-all duration-300 ${isSelected ? "bg-cyan/10 border border-cyan/30" : "bg-space-800/60 border border-space-700"}`}
                          data-oid="7otd:eu"
                        >
                          <div
                            className="flex justify-between items-start mb-3"
                            data-oid="gmyv433"
                          >
                            <div
                              className="font-medium text-white"
                              data-oid="kg5nwv0"
                            >
                              {supplier.name}
                            </div>
                            {isSelected && (
                              <div
                                className="px-2 py-0.5 rounded-full bg-cyan/20 text-cyan text-xs"
                                data-oid="a1iaji6"
                              >
                                Selected
                              </div>
                            )}
                          </div>

                          <div
                            className={`text-2xl font-bold mb-2 ${isSelected ? "text-cyan" : "text-white"}`}
                            data-oid="clcz4gz"
                          >
                            ${supplier.totalPrice.toFixed(2)}
                          </div>

                          <div
                            className="text-sm text-gray-400 mb-3"
                            data-oid="8gko_7:"
                          >
                            Price multiplier:{" "}
                            {supplier.priceMultiplier.toFixed(2)}x
                          </div>

                          {!isSelected && (
                            <button
                              className="w-full py-1.5 text-sm font-medium rounded-lg bg-space-700/60 text-gray-300 hover:bg-cyan/20 hover:text-cyan border border-space-600 hover:border-cyan/30 transition-all duration-300"
                              onClick={() => setSelectedSupplier(supplier.id)}
                              data-oid="k1ued40"
                            >
                              Select Supplier
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              <div
                className="text-center py-10 text-gray-400"
                data-oid="pnhctdf"
              >
                <i
                  className="fas fa-clipboard-list text-5xl mb-3"
                  data-oid="i0qbte9"
                ></i>
                <p data-oid="ozylty1">
                  No materials added to your estimate yet.
                </p>
                <button
                  className="mt-4 px-4 py-2 rounded-lg bg-space-800 text-gray-300 hover:text-white hover:bg-space-700 transition-colors"
                  onClick={() => setActiveTab("materials")}
                  data-oid="y_4d4q5"
                >
                  <i className="fas fa-plus mr-2" data-oid="oakjp3d"></i> Add
                  Materials
                </button>
              </div>
            )}
          </GlassCard>
        </>
      )}
    </div>
  );
};

export default MaterialCalculator;
