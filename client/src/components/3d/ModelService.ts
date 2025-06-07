import * as THREE from 'three';

// Model types we can generate
export type ModelType = 'foundation' | 'frame' | 'roof' | 'walls' | 'windows' | 'door' | 'floor' | 'ceiling' | 'custom';

// Material configuration
interface MaterialConfig {
  color: string;
  roughness?: number;
  metalness?: number;
  opacity?: number;
  transparent?: boolean;
}

// Model dimensions
interface ModelDimensions {
  width: number;
  height: number;
  depth: number;
}

// Model generation options
interface ModelGenerationOptions {
  type: ModelType;
  dimensions: ModelDimensions;
  material: MaterialConfig;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

/**
 * Creates basic geometric models for building components.
 * This is a mock service that would normally fetch real 3D models from a CDN,
 * but for demo purposes, we're generating simple geometries.
 */
export class ModelService {
  private static instance: ModelService;
  private cache: Map<string, THREE.Object3D> = new Map();
  
  private constructor() {
    // Private constructor for singleton
  }
  
  public static getInstance(): ModelService {
    if (!ModelService.instance) {
      ModelService.instance = new ModelService();
    }
    return ModelService.instance;
  }
  
  /**
   * Generate a basic 3D model based on type and dimensions
   */
  public generateModel(options: ModelGenerationOptions): THREE.Object3D {
    const { type, dimensions, material, position = [0, 0, 0], rotation = [0, 0, 0] } = options;
    const { width, height, depth } = dimensions;
    
    // Create a unique cache key based on options
    const cacheKey = `${type}-${width}-${height}-${depth}-${material.color}`;
    
    // Check if we already have this model in cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!.clone();
    }
    
    // Create material
    const materialObj = new THREE.MeshStandardMaterial({
      color: new THREE.Color(material.color),
      roughness: material.roughness ?? 0.5,
      metalness: material.metalness ?? 0.1,
      opacity: material.opacity ?? 1,
      transparent: material.transparent ?? false,
    });
    
    let geometry: THREE.BufferGeometry;
    let model: THREE.Object3D;
    
    // Generate appropriate geometry based on type
    switch (type) {
      case 'foundation':
        geometry = new THREE.BoxGeometry(width, height, depth);
        model = new THREE.Mesh(geometry, materialObj);
        break;
        
      case 'frame':
        model = this.createFrame(width, height, depth, materialObj);
        break;
        
      case 'roof':
        model = this.createRoof(width, height, depth, materialObj);
        break;
        
      case 'walls':
        model = this.createWalls(width, height, depth, materialObj);
        break;
        
      case 'windows':
        model = this.createWindows(width, height, depth, materialObj);
        break;
        
      case 'door':
        model = this.createDoor(width, height, depth, materialObj);
        break;
        
      case 'floor':
        geometry = new THREE.BoxGeometry(width, height, depth);
        model = new THREE.Mesh(geometry, materialObj);
        break;
        
      case 'ceiling':
        geometry = new THREE.BoxGeometry(width, height, depth);
        model = new THREE.Mesh(geometry, materialObj);
        break;
        
      case 'custom':
      default:
        geometry = new THREE.BoxGeometry(width, height, depth);
        model = new THREE.Mesh(geometry, materialObj);
        break;
    }
    
    // Set position and rotation
    model.position.set(position[0], position[1], position[2]);
    model.rotation.set(rotation[0], rotation[1], rotation[2]);
    
    // Store in cache
    this.cache.set(cacheKey, model.clone());
    
    return model;
  }
  
  /**
   * Creates a structural frame with beams and columns
   */
  private createFrame(width: number, height: number, depth: number, material: THREE.Material): THREE.Object3D {
    const group = new THREE.Group();
    
    // Column size
    const columnWidth = width * 0.05;
    const columnDepth = depth * 0.05;
    
    // Beam size
    const beamHeight = height * 0.1;
    
    // Create columns at corners
    const columnGeometry = new THREE.BoxGeometry(columnWidth, height, columnDepth);
    
    // Corner columns
    const halfWidth = width / 2 - columnWidth / 2;
    const halfDepth = depth / 2 - columnDepth / 2;
    
    // Add corner columns
    [-1, 1].forEach(xMult => {
      [-1, 1].forEach(zMult => {
        const column = new THREE.Mesh(columnGeometry, material);
        column.position.set(
          halfWidth * xMult,
          height / 2,
          halfDepth * zMult
        );
        group.add(column);
      });
    });
    
    // Add top beams along X
    const beamXGeometry = new THREE.BoxGeometry(width, beamHeight, columnDepth);
    [-1, 1].forEach(zMult => {
      const beam = new THREE.Mesh(beamXGeometry, material);
      beam.position.set(
        0,
        height - beamHeight / 2,
        halfDepth * zMult
      );
      group.add(beam);
    });
    
    // Add top beams along Z
    const beamZGeometry = new THREE.BoxGeometry(columnWidth, beamHeight, depth);
    [-1, 1].forEach(xMult => {
      const beam = new THREE.Mesh(beamZGeometry, material);
      beam.position.set(
        halfWidth * xMult,
        height - beamHeight / 2,
        0
      );
      group.add(beam);
    });
    
    return group;
  }
  
  /**
   * Creates a simple hip roof
   */
  private createRoof(width: number, height: number, depth: number, material: THREE.Material): THREE.Object3D {
    const group = new THREE.Group();
    
    // Create the roof shape
    const shape = new THREE.Shape();
    const halfWidth = width / 2;
    const halfDepth = depth / 2;
    
    // Bottom face
    shape.moveTo(-halfWidth, -halfDepth);
    shape.lineTo(halfWidth, -halfDepth);
    shape.lineTo(halfWidth, halfDepth);
    shape.lineTo(-halfWidth, halfDepth);
    shape.lineTo(-halfWidth, -halfDepth);
    
    // Extrude settings
    const extrudeSettings = {
      steps: 1,
      depth: height,
      bevelEnabled: false
    };
    
    // Create roof geometry
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geometry.rotateX(Math.PI / 2);
    
    const roof = new THREE.Mesh(geometry, material);
    roof.position.set(0, 0, 0);
    
    group.add(roof);
    
    return group;
  }
  
  /**
   * Creates walls with optional openings for doors and windows
   */
  private createWalls(width: number, height: number, depth: number, material: THREE.Material): THREE.Object3D {
    const group = new THREE.Group();
    const wallThickness = Math.min(width, depth) * 0.05;
    
    // Create wall variables
    const innerWidth = width - wallThickness * 2;
    const innerDepth = depth - wallThickness * 2;
    
    // Front wall
    const frontWall = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, wallThickness),
      material
    );
    frontWall.position.set(0, height / 2, depth / 2 - wallThickness / 2);
    group.add(frontWall);
    
    // Back wall
    const backWall = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, wallThickness),
      material
    );
    backWall.position.set(0, height / 2, -depth / 2 + wallThickness / 2);
    group.add(backWall);
    
    // Left wall
    const leftWall = new THREE.Mesh(
      new THREE.BoxGeometry(wallThickness, height, innerDepth),
      material
    );
    leftWall.position.set(-width / 2 + wallThickness / 2, height / 2, 0);
    group.add(leftWall);
    
    // Right wall
    const rightWall = new THREE.Mesh(
      new THREE.BoxGeometry(wallThickness, height, innerDepth),
      material
    );
    rightWall.position.set(width / 2 - wallThickness / 2, height / 2, 0);
    group.add(rightWall);
    
    return group;
  }
  
  /**
   * Creates window frames and glass
   */
  private createWindows(width: number, height: number, depth: number, material: THREE.Material): THREE.Object3D {
    const group = new THREE.Group();
    
    // Create a window frame
    const frameWidth = 0.05;
    const glassThickness = 0.02;
    
    // Create frame material
    const frameMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#555555'),
      roughness: 0.2,
      metalness: 0.8,
    });
    
    // Create glass material
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#88ccff'),
      roughness: 0,
      metalness: 0.2,
      transparent: true,
      opacity: 0.3,
      transmission: 0.9,
    });
    
    // Window dimensions
    const windowWidth = width * 0.8;
    const windowHeight = height;
    const windowDepth = frameWidth;
    
    // Create frame
    const horizontalFrame = new THREE.Mesh(
      new THREE.BoxGeometry(windowWidth, frameWidth, windowDepth),
      frameMaterial
    );
    
    const verticalFrame = new THREE.Mesh(
      new THREE.BoxGeometry(frameWidth, windowHeight, windowDepth),
      frameMaterial
    );
    
    // Add top and bottom horizontal frames
    const topFrame = horizontalFrame.clone();
    topFrame.position.set(0, windowHeight / 2 - frameWidth / 2, 0);
    group.add(topFrame);
    
    const bottomFrame = horizontalFrame.clone();
    bottomFrame.position.set(0, -windowHeight / 2 + frameWidth / 2, 0);
    group.add(bottomFrame);
    
    // Add left and right vertical frames
    const leftFrame = verticalFrame.clone();
    leftFrame.position.set(-windowWidth / 2 + frameWidth / 2, 0, 0);
    group.add(leftFrame);
    
    const rightFrame = verticalFrame.clone();
    rightFrame.position.set(windowWidth / 2 - frameWidth / 2, 0, 0);
    group.add(rightFrame);
    
    // Add middle vertical frame
    const middleFrame = verticalFrame.clone();
    group.add(middleFrame);
    
    // Add middle horizontal frame
    const middleHorizontalFrame = horizontalFrame.clone();
    middleHorizontalFrame.position.set(0, 0, 0);
    group.add(middleHorizontalFrame);
    
    // Add glass panes
    const paneWidth = (windowWidth - frameWidth * 3) / 2;
    const paneHeight = (windowHeight - frameWidth * 3) / 2;
    const glassGeometry = new THREE.BoxGeometry(paneWidth, paneHeight, glassThickness);
    
    // Position for the four glass panes
    const positions = [
      [-paneWidth / 2 - frameWidth / 2, paneHeight / 2 + frameWidth / 2, 0], // Top left
      [paneWidth / 2 + frameWidth / 2, paneHeight / 2 + frameWidth / 2, 0],  // Top right
      [-paneWidth / 2 - frameWidth / 2, -paneHeight / 2 - frameWidth / 2, 0], // Bottom left
      [paneWidth / 2 + frameWidth / 2, -paneHeight / 2 - frameWidth / 2, 0]   // Bottom right
    ];
    
    // Create glass panes
    positions.forEach(position => {
      const glass = new THREE.Mesh(glassGeometry, glassMaterial);
      glass.position.set(position[0], position[1], position[2]);
      group.add(glass);
    });
    
    return group;
  }
  
  /**
   * Creates a simple door
   */
  private createDoor(width: number, height: number, depth: number, material: THREE.Material): THREE.Object3D {
    const group = new THREE.Group();
    
    // Door panel
    const doorPanel = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth * 0.1),
      material
    );
    
    // Door handle material
    const handleMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c0c0c0'),
      roughness: 0.2,
      metalness: 0.8,
    });
    
    // Door handle
    const handleGeometry = new THREE.CylinderGeometry(width * 0.03, width * 0.03, width * 0.15, 8);
    handleGeometry.rotateX(Math.PI / 2);
    
    const handle = new THREE.Mesh(handleGeometry, handleMaterial);
    handle.position.set(width * 0.3, 0, depth * 0.05 + width * 0.03);
    
    group.add(doorPanel);
    group.add(handle);
    
    return group;
  }
  
  /**
   * Export model as GLTF
   * Note: In a production environment, we would use GLTFExporter
   * But for this demo, we'll return a mock URL
   */
  public exportModelAsGLTF(model: THREE.Object3D): Promise<string> {
    return new Promise((resolve) => {
      // In a real implementation, we would use GLTFExporter from three/examples/jsm/exporters/GLTFExporter
      // But for this demo, we'll just return a success message
      console.log('Model would be exported as GLTF in a production environment');
      
      // Return mock URL
      setTimeout(() => {
        resolve('/models/building/exported_model.glb');
      }, 500);
    });
  }
  
  /**
   * Create a data URL for a model (for demo purposes)
   */
  public async createModelDataUrl(options: ModelGenerationOptions): Promise<string> {
    const model = this.generateModel(options);
    const mockUrl = await this.exportModelAsGLTF(model);
    
    // In a real implementation, we would create a blob URL
    // but for this demo, we'll return the mock URL
    return mockUrl;
  }
  
  /**
   * Generate mock model URLs
   */
  public getMockModelUrl(type: ModelType): string {
    // In a real app, these would be actual URLs to models on a CDN
    return `/models/building/${type}.glb`;
  }
}

export default ModelService.getInstance();