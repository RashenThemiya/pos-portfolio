import * as THREE from 'three/src/Three.js';

export function createScenePrimitives({ resources, scene, rng }) {
function mat(c,e,ei){return resources.track(new THREE.MeshStandardMaterial({color:c,emissive:e||0,emissiveIntensity:ei||0,roughness:.6}));}

function hex(c){return '#'+c.toString(16).padStart(6,'0');}

function label(text,color,opt){
    opt=opt||{}; var c=document.createElement('canvas'),x=c.getContext('2d'),fs=56,font='600 '+fs+'px Figtree, "Segoe UI", sans-serif',dot=!opt.bg;
    x.font=font; var w=Math.ceil(x.measureText(text).width)+fs*(dot?1.2:.9),h=Math.ceil(fs*1.6); c.width=w;c.height=h; x.font=font;
    x.fillStyle=opt.bg||'rgba(11,17,32,.8)'; var r=h/2; x.beginPath();x.moveTo(r,0);x.lineTo(w-r,0);x.arc(w-r,r,r,-Math.PI/2,Math.PI/2);x.lineTo(r,h);x.arc(r,r,r,Math.PI/2,Math.PI*1.5);x.fill();
    var tx=fs*.45; if(dot){x.fillStyle=color;x.beginPath();x.arc(r,r,fs*.22,0,Math.PI*2);x.fill();tx=r+fs*.45;}
    x.fillStyle=opt.fg||'#e8ecf4'; x.textBaseline='middle'; x.fillText(text,tx,h/2+2);
    var tex=resources.track(new THREE.CanvasTexture(c)); tex.encoding=THREE.sRGBEncoding; tex.anisotropy=4;
    var sp=new THREE.Sprite(resources.track(new THREE.SpriteMaterial({map:tex,transparent:true,depthTest:false}))); var s=opt.s||1.8; sp.scale.set(s*w/h,s,1); return sp;
  }

function ring(pos,color,r1,r2,op){var m=new THREE.Mesh(resources.track(new THREE.RingGeometry(r1,r2,40)),resources.track(new THREE.MeshBasicMaterial({color:color,transparent:true,opacity:op,side:THREE.DoubleSide})));m.rotation.x=-Math.PI/2;m.position.set(pos.x,.06,pos.z);scene.add(m);return m;}

function makePerson(){
    var g=new THREE.Group(), shirts=[0xff6b0f,0x22c38e,0x5aa8ff,0xffc23e,0xe8ecf4,0xf0455a,0xa78bfa];
    var body=new THREE.Mesh(resources.track(new THREE.CylinderGeometry(.16,.2,.55,8)),mat(shirts[Math.floor(rng()*shirts.length)])); body.position.y=.45; g.add(body);
    var head=new THREE.Mesh(resources.track(new THREE.SphereGeometry(.15,10,8)),mat(rng()<.5?0xc98d62:0xe9b98d)); head.position.y=.86; g.add(head);
    var bag=new THREE.Mesh(resources.track(new THREE.BoxGeometry(.14,.16,.1)),mat(0xff6b0f)); bag.position.set(.22,.38,0); g.add(bag);
    g.traverse(function(o){if(o.isMesh)o.castShadow=true;}); return g;
  }

function makeLorry(c){
    var g=new THREE.Group();
    var box=new THREE.Mesh(resources.track(new THREE.BoxGeometry(1.2,.72,.62)),mat(0xe8ecf4)); box.position.set(-.15,.48,0); g.add(box);
    var cab=new THREE.Mesh(resources.track(new THREE.BoxGeometry(.42,.52,.6)),mat(c,c,.25)); cab.position.set(.66,.38,0); g.add(cab);
    var stripe=new THREE.Mesh(resources.track(new THREE.BoxGeometry(1.22,.1,.64)),mat(c)); stripe.position.set(-.15,.3,0); g.add(stripe);
    var lamp=new THREE.PointLight(0xfff2d6,.9,3); lamp.position.set(1,.4,0); g.add(lamp);
    g.traverse(function(o){if(o.isMesh)o.castShadow=true;}); return g;
  }

  return { mat, hex, label, ring, makePerson, makeLorry };
}
