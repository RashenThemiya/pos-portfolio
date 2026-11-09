export class SceneResources {
  constructor() {
    this.geometries = new Set();
    this.materials = new Set();
    this.textures = new Set();
    this.targets = new Set();
  }

  track(resource) {
    const group = resource.isBufferGeometry ? this.geometries
      : resource.isMaterial ? this.materials
        : resource.isTexture ? this.textures
          : resource.isWebGLRenderTarget ? this.targets : null;
    if (!group || group.has(resource)) return resource;
    group.add(resource);
    function release() {
      group.delete(resource);
      resource.removeEventListener('dispose', release);
    }
    resource.addEventListener('dispose', release);
    return resource;
  }

  trackScene(scene) {
    scene?.traverse(object => {
      if (object.geometry) this.track(object.geometry);
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.filter(Boolean).forEach(material => {
        this.track(material);
        Object.values(material).forEach(value => { if (value?.isTexture) this.track(value); });
      });
      if (object.shadow?.map) this.track(object.shadow.map);
      if (object.shadow?.mapPass) this.track(object.shadow.mapPass);
    });
  }

  disposeOne(resource) {
    const image = resource.isCanvasTexture ? resource.image : null;
    resource.dispose();
    if (image) {
      image.width = 0;
      image.height = 0;
      resource.image = null;
    }
  }

  dispose() {
    [this.targets, this.textures, this.materials, this.geometries].forEach(group => {
      [...group].forEach(resource => this.disposeOne(resource));
      group.clear();
    });
  }

  counts() {
    return { geometries: this.geometries.size, materials: this.materials.size, textures: this.textures.size, renderTargets: this.targets.size };
  }
}
