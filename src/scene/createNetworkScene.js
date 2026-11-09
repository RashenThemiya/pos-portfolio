import { createScenePrimitives } from './createScenePrimitives';
import * as THREE from 'three/src/Three.js';
import { INITIAL_BILLS } from '../data/network';
import { SceneResources } from './SceneResources';

function finishFonts(task) {
  task.refresh?.();
  task.refresh = null;
}

export function createNetworkScene(host, options) {
  const resources = new SceneResources();
  const fontTask = { refresh: null };
  let labels = options.labels;
  let disposed = false;
  let ready = false;
  let fallback = false;
  let active = options.active;
  let reducedMotion = options.reducedMotion;
  let elapsed = 0;
  let renderedTime = reducedMotion ? 8 : 0;
  let lastTimestamp = null;
  let request = null;
  let resizeObserver = null;
  let resizeHandler = null;
  var renderer, scene, camera;
  const canvas = document.createElement('canvas');

  function getStats() {
    return { ready, disposed, fallback, active: active && !reducedMotion && !disposed,
      time: renderedTime, bills: typeof bills === 'number' ? bills : INITIAL_BILLS,
      resources: resources.counts(),
      gpu: { geometries: renderer?.info.memory.geometries ?? 0, textures: renderer?.info.memory.textures ?? 0, programs: renderer?.info.programs.length ?? 0 },
      branches: BR?.length ?? 0, suppliers: SUP?.length ?? 0, walkers: walkers?.length ?? 0,
      vehicles: vehicles?.length ?? 0, flows: flows?.length ?? 0, labels: sprites?.length ?? 0 };
  }

  function dispose() {
    if (disposed) return getStats();
    disposed = true;
    active = false;
    cancelAnimationFrame(request);
    request = null;
    resizeObserver?.disconnect();
    if (resizeHandler) window.removeEventListener('resize', resizeHandler);
    canvas.removeEventListener('webglcontextlost', contextLost);
    fontTask.refresh = null;
    resources.trackScene(scene);
    scene?.clear();
    resources.dispose();
    if (renderer) {
      // r128 retains shadow programs outside application-owned materials.
      renderer.info.programs.slice().forEach(program => program.destroy());
      renderer.info.programs.length = 0;
      renderer.renderLists.dispose();
      renderer.dispose();
      if (!renderer.getContext().isContextLost()) renderer.forceContextLoss();
    }
    canvas.remove();
    canvas.width = 0;
    canvas.height = 0;
    const stats = getStats();
    options.onDispose?.(stats);
    return stats;
  }

  function fail() {
    fallback = true;
    ready = true;
    dispose();
    host.classList.add('nogl');
  }

  function contextLost(event) {
    event.preventDefault();
    if (!disposed) fail();
  }

  try {
    host.classList.remove('nogl');
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    canvas.addEventListener('webglcontextlost', contextLost);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75));
  renderer.shadowMap.enabled=true; renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputEncoding=THREE.sRGBEncoding;
  host.appendChild(renderer.domElement);

  var scene=new THREE.Scene(); scene.fog=new THREE.Fog(0x0b1120,70,150);
  var camera=new THREE.PerspectiveCamera(32,1,0.1,400);
  scene.add(new THREE.HemisphereLight(0x9fb6ff,0x0b1120,0.5));
  var sun=new THREE.DirectionalLight(0xffe2c4,1.0); sun.position.set(-30,50,24); sun.castShadow=true;
  sun.shadow.mapSize.set(2048,2048);
  var sc=sun.shadow.camera; sc.left=-60;sc.right=60;sc.top=45;sc.bottom=-45;sc.near=1;sc.far=160; sun.shadow.bias=-0.0006;
  scene.add(sun);
  var ground=new THREE.Mesh(resources.track(new THREE.PlaneGeometry(170,130)),resources.track(new THREE.MeshStandardMaterial({color:0x141d31,roughness:.95})));
  ground.rotation.x=-Math.PI/2; ground.receiveShadow=true; scene.add(ground);
  var grid=new THREE.GridHelper(170,42,0x1e2a44,0x18223a); grid.position.y=0.02; scene.add(grid);

  var rng=(function(s){return function(){s=(s*16807)%2147483647;return (s-1)/2147483646;};})(11);
  const { mat, hex, label, ring, makePerson, makeLorry } = createScenePrimitives({ resources, scene, rng });
  
  
  
  

  var HQ=new THREE.Vector3(0,0,0), HQTOP=new THREE.Vector3(0,10.5,0), LD=[];
  var COLORS=[0xff6b0f,0x22c38e,0x8b7bff,0xffc23e,0x3fb7ff];
  var BR=labels.branches.map(function(n,i){var a=i/5*Math.PI*2+.3;return {n:n,c:COLORS[i],p:new THREE.Vector3(Math.cos(a)*20,0,Math.sin(a)*15),pulse:0};});
  var SUP=labels.suppliers.map(function(n,i){var a=i/3*Math.PI*2+1.0;return {n:n,p:new THREE.Vector3(Math.cos(a)*38,0,Math.sin(a)*27),flash:0};});

  // head office tower
  var tower=new THREE.Mesh(resources.track(new THREE.BoxGeometry(3.6,10,3.6)),resources.track(new THREE.MeshStandardMaterial({color:0x22304d,roughness:.3,metalness:.4})));
  tower.position.y=5; tower.castShadow=true; scene.add(tower);
  for(var f=1;f<10;f++){var st=new THREE.Mesh(resources.track(new THREE.BoxGeometry(3.7,.14,3.7)),mat(0x5aa8ff,0x5aa8ff,.9)); st.position.y=f; scene.add(st);}
  var orb=new THREE.Mesh(resources.track(new THREE.SphereGeometry(.45,16,12)),resources.track(new THREE.MeshBasicMaterial({color:0xff6b0f}))); orb.position.y=11.2; scene.add(orb);
  var hqHalo=ring(HQ,0x5aa8ff,2.6,3.6,.35), hqPulse=0;
  LD.push({t:labels.headOffice,c:'#5aa8ff',p:new THREE.Vector3(0,13.6,0),s:2.1});

  // person used for customers
  
  var walkers=[];
  BR.forEach(function(b){
    var g=new THREE.Group();
    var body=new THREE.Mesh(resources.track(new THREE.BoxGeometry(5.6,2.6,4)),mat(0x2c3a5c)); body.position.y=1.3; body.castShadow=true; body.receiveShadow=true; g.add(body);
    var glass=new THREE.Mesh(resources.track(new THREE.BoxGeometry(4.6,1.4,.06)),mat(0x9fd0ff,0x9fd0ff,.55)); glass.position.set(0,1.05,2.02); g.add(glass);
    var roof=new THREE.Mesh(resources.track(new THREE.BoxGeometry(5.9,.18,4.3)),mat(b.c,b.c,.3)); roof.position.y=2.7; g.add(roof);
    for(var k=0;k<8;k++){var s=new THREE.Mesh(resources.track(new THREE.BoxGeometry(.72,.12,1)),k%2?mat(0xe8ecf4):mat(b.c,b.c,.25)); s.position.set(-2.52+k*.72,2.15,2.45); s.rotation.x=.35; g.add(s);}
    for(k=0;k<3;k++){var cl=new THREE.Mesh(resources.track(new THREE.BoxGeometry(.6,.4,.3)),mat(0x22c38e,0x22c38e,.9)); cl.position.set(-1.5+k*1.5,.45,2.2); g.add(cl);}
    g.position.copy(b.p); scene.add(g); g.lookAt(HQ); g.updateMatrixWorld(true);
    b.halo=ring(b.p,b.c,3.4,4.4,.22);
    LD.push({t:b.n+labels.counterSuffix,c:hex(b.c),p:b.p.clone().add(new THREE.Vector3(0,4.4,0)),s:1.6});
    for(k=0;k<4;k++){
      var side=(rng()-.5)*3.2, w=makePerson(); scene.add(w);
      walkers.push({g:w,a:g.localToWorld(new THREE.Vector3(side,0,7.5)),b:g.localToWorld(new THREE.Vector3(side*.35,0,2.4)),ph:k/4+rng()*.1,sp:.09+rng()*.04});
    }
    b.out=g.localToWorld(new THREE.Vector3(0,0,7));
  });

  // supplier warehouses
  SUP.forEach(function(s){
    var g=new THREE.Group();
    var shed=new THREE.Mesh(resources.track(new THREE.BoxGeometry(7,3,5)),mat(0x3a465f)); shed.position.y=1.5; shed.castShadow=true; shed.receiveShadow=true; g.add(shed);
    var r1=new THREE.Mesh(resources.track(new THREE.BoxGeometry(7.3,.2,2.9)),mat(0x4b5878)); r1.position.set(0,3.45,-1.2); r1.rotation.x=-.45; g.add(r1);
    var r2=new THREE.Mesh(resources.track(new THREE.BoxGeometry(7.3,.2,2.9)),mat(0x4b5878)); r2.position.set(0,3.45,1.2); r2.rotation.x=.45; g.add(r2);
    var door=new THREE.Mesh(resources.track(new THREE.BoxGeometry(3,2.2,.06)),mat(0x0c1528)); door.position.set(0,1.1,2.52); g.add(door);
    for(var k=0;k<7;k++){var bx=new THREE.Mesh(resources.track(new THREE.BoxGeometry(.7,.7,.7)),mat(0xc98b4f)); bx.position.set(-2.4+(k%4)*.8+(k>3?.4:0),.35+(k>3?.7:0),3.3); bx.castShadow=true; g.add(bx);}
    g.position.copy(s.p); scene.add(g); g.lookAt(HQ); g.updateMatrixWorld(true);
    s.front=g.localToWorld(new THREE.Vector3(0,0,4.4));
    s.glow=ring(s.p,0xa78bfa,4.4,5.6,0);
    LD.push({t:s.n,c:'#ffb23e',p:s.p.clone().add(new THREE.Vector3(0,5.6,0)),s:1.6});
  });

  // roads from each supplier to its two nearest branches, with lorries
  var roadMat=mat(0x2c3956), dashMat=resources.track(new THREE.LineDashedMaterial({color:0x7d8aa6,dashSize:.5,gapSize:.6,transparent:true,opacity:.45}));
  
  var vehicles=[];
  SUP.forEach(function(s){
    BR.slice().sort(function(a,b){return a.p.distanceTo(s.p)-b.p.distanceTo(s.p);}).slice(0,2).forEach(function(b){
      var a=s.front.clone(), c=b.out.clone(); a.y=c.y=.08;
      var d=c.clone().sub(a), mid=a.clone().add(c).multiplyScalar(.5).add(new THREE.Vector3(-d.z,0,d.x).normalize().multiplyScalar(d.length()*.18));
      var path=new THREE.QuadraticBezierCurve3(a,mid,c);
      var road=new THREE.Mesh(resources.track(new THREE.TubeGeometry(path,64,.55,6,false)),roadMat); road.scale.y=.12; road.receiveShadow=true; scene.add(road);
      var ln=new THREE.Line(resources.track(new THREE.BufferGeometry()).setFromPoints(path.getPoints(80).map(function(p){return new THREE.Vector3(p.x,.12,p.z);})),dashMat); ln.computeLineDistances(); scene.add(ln);
      var l=makeLorry(0xff6b0f); l.scale.setScalar(1.4); scene.add(l);
      vehicles.push({g:l,path:path,speed:.03+rng()*.015,ph:rng()});
    });
  });

  // data arcs
  var flows=[], bills=INITIAL_BILLS;
  function addFlow(a,b,h,color,n,speed,onArrive){
    var m=a.clone().add(b).multiplyScalar(.5); m.y=h; var curve=new THREE.QuadraticBezierCurve3(a,m,b);
    scene.add(new THREE.Line(resources.track(new THREE.BufferGeometry()).setFromPoints(curve.getPoints(60)),resources.track(new THREE.LineBasicMaterial({color:color,transparent:true,opacity:.16}))));
    for(var i=0;i<n;i++){
      var p=new THREE.Mesh(resources.track(new THREE.SphereGeometry(.3,12,10)),resources.track(new THREE.MeshBasicMaterial({color:color})));
      p.add(new THREE.Mesh(resources.track(new THREE.SphereGeometry(.7,12,10)),resources.track(new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:.22,depthWrite:false}))));
      scene.add(p); flows.push({m:p,curve:curve,ph:i/n+rng()*.1,sp:speed,last:-1,on:onArrive});
    }
  }
  BR.forEach(function(b){
    var top=b.p.clone(); top.y=2.9;
    addFlow(top,HQTOP,9,0xff6b0f,2,.22,function(){var increment=1+Math.floor(rng()*3); bills+=increment; options.onBill?.(increment); hqPulse=1; b.pulse=1;});
    addFlow(HQTOP,top,13,0x22c38e,1,.15,null);
  });
  SUP.forEach(function(s){var top=s.p.clone(); top.y=3.8; addFlow(HQTOP,top,15,0xa78bfa,1,.11,function(){s.flash=1;});});

  // labels and promotion tags
  var sprites=[], promoSp=[], PROMOS=[{b:1,t:labels.promotions[0]},{b:2,t:labels.promotions[1]},{b:4,t:labels.promotions[2]}];
  function buildLabels(){
    if(disposed) return;
    sprites.forEach(function(s){scene.remove(s);resources.disposeOne(s.material.map);resources.disposeOne(s.material);}); sprites=[]; promoSp=[];
    LD.forEach(function(d){var s=label(d.t,d.c,{s:d.s}); s.position.copy(d.p); scene.add(s); sprites.push(s);});
    PROMOS.forEach(function(p,i){var s=label(p.t,null,{bg:'rgba(255,107,15,.95)',fg:'#160800',s:1.5}); var base=BR[p.b].p.clone(); base.y=6.5; s.position.copy(base); scene.add(s); sprites.push(s); promoSp.push({s:s,base:base,ph:i/3});});
  }
  buildLabels();
  resources.trackScene(scene);

  // camera: slow orbit, the scene sits to the right of the hero text on wide screens
  var angle=-.35;
  function placeCam(){
    var w=host.clientWidth,h=host.clientHeight,asp=w/h, r=asp<.9?94:72, s=asp>1.1?17:0;
    var tx=-Math.cos(angle)*s, tz=Math.sin(angle)*s;
    camera.position.set(tx+Math.sin(angle)*r,asp<.9?50:40,tz+Math.cos(angle)*r); camera.lookAt(tx,0,tz);
  }
  function resize(){var w=host.clientWidth,h=host.clientHeight; if(!w||!h) return; renderer.setSize(w,h,false); camera.aspect=w/h; camera.updateProjectionMatrix(); placeCam();}

    var tan=new THREE.Vector3(), pv=new THREE.Vector3();

    function draw(t, reduce, notifyArrivals = true) {
      if (disposed || !host.clientWidth || !host.clientHeight) return;
      renderedTime = reduce ? 8 : t;
      var mt=reduce?8:t;
    vehicles.forEach(function(v){
      var k=(v.ph+mt*v.speed)%2, u=k<1?k:2-k, back=k>=1; u=.03+u*.94;
      var p=v.path.getPointAt(u); v.path.getTangentAt(u,tan); v.g.position.set(p.x,.05,p.z);
      var a=Math.atan2(tan.z,tan.x); v.g.rotation.y=-(back?a+Math.PI:a);
    });
    walkers.forEach(function(w){
      var u=(w.ph+mt*w.sp)%1; w.g.position.lerpVectors(w.a,w.b,u); w.g.position.y=Math.abs(Math.sin(mt*8+w.ph*10))*.06;
      var s=u>.85?(1-u)/.15:u<.1?u/.1:1; w.g.scale.setScalar(Math.max(.001,s));
      w.g.rotation.y=Math.atan2(w.b.x-w.a.x,w.b.z-w.a.z);
    });
    flows.forEach(function(f){
      var u=reduce?f.ph%1:(f.ph+mt*f.sp)%1;
      if(!reduce&&notifyArrivals&&f.on&&u<f.last) f.on(); f.last=u;
      f.m.position.copy(f.curve.getPointAt(u)); f.m.scale.setScalar(Math.min(1,u*8,(1-u)*8)+.001);
    });
    hqPulse*=.94; hqHalo.scale.setScalar(1+hqPulse*.6); hqHalo.material.opacity=.25+hqPulse*.4; orb.position.y=11.2+Math.sin(mt*2)*.15;
    BR.forEach(function(b){b.pulse*=.95; b.halo.material.opacity=.15+b.pulse*.5; b.halo.scale.setScalar(1+b.pulse*.5);});
    SUP.forEach(function(s){s.flash*=.97; s.glow.material.opacity=s.flash*.6; s.glow.scale.setScalar(1+(1-s.flash)*.4);});
    promoSp.forEach(function(p){var k=(mt/9+p.ph)%1, o=k<.45?Math.min(1,k*8,(.45-k)*8):0; p.s.material.opacity=o; p.s.position.y=p.base.y+Math.sin(mt*2+p.ph*6)*.25;});
    if(!reduce){angle=-.35+Math.sin(t*.05)*.55; placeCam();}
    var wide=host.clientWidth/host.clientHeight>1.1;
    sprites.forEach(function(s){ if(promoSp.some(function(p){return p.s===s;})) return; pv.copy(s.position).project(camera); s.material.opacity=wide?Math.max(0,Math.min(1,(pv.x+.05)/.2)):.85; });
    renderer.render(scene,camera);

      if (sun.shadow.map) resources.track(sun.shadow.map);
      if (sun.shadow.mapPass) resources.track(sun.shadow.mapPass);
    }

    function frame(now) {
      if (disposed || !active || reducedMotion) return;
      elapsed += (now - lastTimestamp) / 1000;
      lastTimestamp = now;
      try { draw(elapsed, false); }
      catch { fail(); return; }
      request = requestAnimationFrame(frame);
    }

    function syncPlayback() {
      cancelAnimationFrame(request);
      request = null;
      lastTimestamp = performance.now();
      if (!disposed && active && !reducedMotion) request = requestAnimationFrame(frame);
    }

    function setActive(value) {
      if (active === value || disposed) return;
      active = value;
      syncPlayback();
    }

    function setReducedMotion(value) {
      if (reducedMotion === value || disposed) return;
      reducedMotion = value;
      flows.forEach(flow => { flow.last = -1; });
      if (value) { angle = -.35; placeCam(); }
      draw(elapsed, value, false);
      syncPlayback();
    }

    function refreshLabels() {
      if (disposed) return;
      buildLabels();
      resources.trackScene(scene);
      renderer.renderLists.dispose();
      draw(elapsed, reducedMotion, false);
    }

    function setLabels(value) {
      if (disposed || JSON.stringify(value) === JSON.stringify(labels)) return;
      labels = value;
      LD[0].t = labels.headOffice;
      BR.forEach((branch, index) => { LD[index + 1].t = labels.branches[index] + labels.counterSuffix; });
      SUP.forEach((supplier, index) => { LD[index + 6].t = labels.suppliers[index]; });
      PROMOS.forEach((promo, index) => { promo.t = labels.promotions[index]; });
      refreshLabels();
    }

    resizeHandler = () => {
      if (disposed) return;
      resize();
      draw(elapsed, reducedMotion, false);
    };
    if (window.ResizeObserver) {
      resizeObserver = new ResizeObserver(resizeHandler);
      resizeObserver.observe(host);
    } else window.addEventListener('resize', resizeHandler);
    resize();
    draw(elapsed, reducedMotion, false);
    ready = true;
    fontTask.refresh = refreshLabels;
    if (document.fonts?.ready) document.fonts.ready.then(finishFonts.bind(null, fontTask));
    syncPlayback();

    function getSnapshot() {
      const objects = [];
      scene.traverse(object => {
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        objects.push({ type: object.type, position: object.position.toArray(), quaternion: object.quaternion.toArray(), scale: object.scale.toArray(),
          geometry: object.geometry?.type,
          materials: materials.filter(Boolean).map(value => ({ type: value.type, color: value.color?.getHex(), emissive: value.emissive?.getHex(), emissiveIntensity: value.emissiveIntensity,
            opacity: value.opacity, transparent: value.transparent, depthTest: value.depthTest, depthWrite: value.depthWrite, roughness: value.roughness, metalness: value.metalness,
            image: value.map?.image ? [value.map.image.width, value.map.image.height] : undefined })) });
      });
      return { camera: { position: camera.position.toArray(), quaternion: camera.quaternion.toArray(), aspect: camera.aspect, fov: camera.fov },
        objects, flows: flows.map(flow => ({ phase: flow.ph, speed: flow.sp })), vehicles: vehicles.map(vehicle => ({ phase: vehicle.ph, speed: vehicle.speed })),
        walkers: walkers.map(walker => ({ phase: walker.ph, speed: walker.sp })) };
    }

    return { getStats, getSnapshot, setActive, setReducedMotion, setLabels, refreshLabels, dispose,
      renderAt(time) {
        if (disposed) return;
        elapsed = time;
        lastTimestamp = performance.now();
        flows.forEach(flow => { flow.last = -1; });
        draw(time, reducedMotion, false);
      } };
  } catch {
    fail();
    return { getStats, dispose, setActive() {}, setReducedMotion() {}, setLabels() {}, renderAt() {}, refreshLabels() {} };
  }
}
