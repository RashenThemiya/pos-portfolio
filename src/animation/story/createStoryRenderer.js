import { STORY_STAGES as STAGES } from '../../data/story';

export function createStoryRenderer(refs, steps, currencyPrefix) {
  var $=function(id){return refs[id];};
  var list=function(name,count){return Array.from({length:count},function(_,i){return refs[name+':'+i];});};
  var prods=list('prods',24), stack=list('stack',6), mons=list('mons',3), beams=list('beams',3), rcs=list('rcs',3);
  var hqb=list('hqb',6), cust=list('cust',3), promos=list('promos',3), paids=list('paids',3), pays=list('pays',3), pk=list('pk',3);
  var stocker=refs.stocker, grn=refs.grn, low=refs.low, po=refs.po, sync=refs.sync;
  var pkb2=refs.pkb2, pkb3=refs.pkb3, pkpo=refs.pkpo, lorry=refs.lorry, wheels=list('wheels',2), fb=list('fb',3), dyn=refs.dyn;
  var SLOTS=[[318,346],[344,346],[370,346],[331,324],[357,324],[344,302]], CX=[640,735,830], HB=[30,42,36,50,44,58];
  var PICK=[470,505,540], SPOT=[684,779,874], OUT=950;
  var C0=[595,104,840,10,1075,190], C1=[1017,84,1030,140,1060,190], C2=[1132,84,1120,140,1090,190], CPO=[1075,186,600,-60,120,200];

  function cl(v){return v<0?0:v>1?1:v;} function seg(t,a,b){return cl((t-a)/(b-a));}
  function ease(x){return x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2;} function back(x){var c=1.7;return 1+(c+1)*Math.pow(x-1,3)+c*Math.pow(x-1,2);}
  function lerp(a,b,k){return a+(b-a)*k;}
  function pop(e,k,x,y){var s=k<=0?.001:back(k);e.setAttribute('opacity',k<=0?0:1);e.setAttribute('transform','translate('+x+','+y+') scale('+s+')');}
  function show(e,on){e.setAttribute('opacity',on?1:0);}
  function qp(P,u){var v=1-u;return [v*v*P[0]+2*v*u*P[2]+u*u*P[4],v*v*P[1]+2*v*u*P[3]+u*u*P[5]];}
  function fmt(n){return Math.round(n).toLocaleString('en-US');}

  function legs(g,a){g.querySelector('.lg').setAttribute('transform','rotate('+a+' -4 -20)');g.querySelector('.rg').setAttribute('transform','rotate('+(-a)+' 4 -20)');}
  function fly(e,P,k){if(k<=0||k>=1){show(e,0);return;} var p=qp(P,ease(k)); e.setAttribute('opacity',1); e.setAttribute('transform','translate('+p[0]+','+p[1]+')');}

  function custState(i,t){
    var o=i*.35, K=[[9+o,OUT],[11.2+o,PICK[i]],[11.8+o,PICK[i]],[13.6+o,SPOT[i]],[18.4+o,SPOT[i]],[20.6+o,OUT]];
    if(t<K[0][0]||t>K[5][0]) return null;
    for(var n=0;n<5;n++){ if(t<=K[n+1][0]){var a=K[n],b=K[n+1],k=seg(t,a[0],b[0]);return {x:lerp(a[1],b[1],ease(k)),walk:a[1]!==b[1],dir:b[1]-a[1],op:Math.min(1,(t-K[0][0])/.3,(K[5][0]-t)/.3)};} }
    return null;
  }

  function render(t){
    dyn.setAttribute('opacity',t>23.5?1-(t-23.5)/.5:t<.3?t/.3:1);
    // lorry: load at supplier, drive to store, unload, wait, drive back
    var lx=30, rev=false;
    if(t>=1.8&&t<3) lx=lerp(30,300,ease(seg(t,1.8,3))); else if(t>=3&&t<21) lx=300; else if(t>=21){lx=lerp(300,30,ease(seg(t,21,22.6))); rev=t<22.6;}
    lorry.setAttribute('transform',rev?'translate('+(lx+172)+',392) scale(-1,1)':'translate('+lx+',392)');
    wheels.forEach(function(w){var cx=+w.dataset.cx;w.setAttribute('transform','rotate('+(lx/13*57.3)+' '+cx+' -8)');});
    var L=0,U=0;
    fb.forEach(function(b,i){
      var la=.3+i*.4, kl=seg(t,la,la+.45), ua=3.1+i*.45, ku=seg(t,ua,ua+.5);
      if(kl>=1)L++; if(ku>=1)U++;
      if(kl>0&&kl<1) fly(b,[120,330,(120+70+i*32)/2,250,70+i*32,320],kl);
      else if(ku>0&&ku<1){var s=SLOTS[i*2]; fly(b,[340+i*32,320,(340+s[0])/2,230,s[0],s[1]],ku);}
      else show(b,0);
    });
    var inL=t<4.6?L-U:0; show($('lorrycount'),inL>0); $('lorrycountt').textContent=inL;
    var sN=t<5?U*2:Math.round(lerp(6,0,seg(t,5,8.6))); stack.forEach(function(s,i){show(s,i<sN);});
    pop(grn,t<6.6?seg(t,4.2,4.6):0,346,262);
    // stocker carries boxes to the shelf
    var sx=395, sw=false, carry=false;
    if(t>=5&&t<8.6){var ph=(t-5)/1.2*Math.PI*2; sx=380+48*(.5-.5*Math.cos(ph)); sw=true; carry=Math.sin(ph)>0;}
    stocker.setAttribute('transform','translate('+sx+',358)'+(sw&&!carry?' scale(-1,1)':'')); legs(stocker,sw?Math.sin(t*14)*22:0); show(stocker.querySelector('.bk'),carry);
    // shelf: filled by staff, emptied a little by customers
    var n=t<5?6:t<8.6?Math.round(lerp(6,22,seg(t,5,8.6))):22;
    for(var c=0;c<3;c++) if(t>11.4+c*.35&&t<23.6) n--;
    prods.forEach(function(p,i){show(p,i<n);});
    // stock number in the system
    var sv=t<4.4?48:t<4.9?lerp(48,168,seg(t,4.4,4.9)):168; if(t>17.2) sv-=3*seg(t,17.2,17.8);
    $('stockn').textContent=Math.round(sv);
    // customers
    cust.forEach(function(g,i){
      var st=custState(i,t); if(!st){show(g,0);return;}
      g.setAttribute('opacity',st.op); g.setAttribute('transform','translate('+st.x+',358)'+(st.dir<0?' scale(-1,1)':''));
      legs(g,st.walk?Math.sin(t*14+i)*22:0); show(g.querySelector('.bk'),t>11.5+i*.35);
    });
    // checkout at three counters
    CX.forEach(function(cx,i){
      var o=i*.4;
      beams[i].setAttribute('opacity',t>14.2+o&&t<15+o?(Math.sin(t*40)>0?1:.2):0);
      mons[i].setAttribute('fill',t>14.2+o&&t<17.2+o*.5?'#3a2a10':t>=17.2+o*.5&&t<19?'#0f4a36':'#163056');
      pop(promos[i],t<17+o?seg(t,15+o,15.35+o):0,cx,212);
      pop(paids[i],t<19.2?seg(t,17.1+o,17.45+o):0,cx,212);
      pop(pays[i],t<17.6+o?seg(t,16+o,16.3+o):0,SPOT[i],276);
      var rh=t<18.8?22*seg(t,16.6+o,17.3+o):0; rcs[i].setAttribute('y',296-rh); rcs[i].setAttribute('height',rh);
    });
    // sync to head office from this store and two other branches
    pk.forEach(function(p,i){fly(p,C0,seg(t,19+i*.35,20.2+i*.35));});
    fly(pkb2,C1,seg(t,19.4,20.3)); fly(pkb3,C2,seg(t,19.7,20.6));
    show($('tr0'),t>18.9&&t<21); show($('tr1'),t>19.3&&t<20.8); show($('tr2'),t>19.6&&t<21);
    $('br2hl').setAttribute('opacity',t>19.3&&t<20?.35:0); $('br3hl').setAttribute('opacity',t>19.6&&t<20.3?.35:0);
    var g=ease(seg(t,19.8,21.4)); hqb.forEach(function(b,i){var h=HB[i]*(1+.25*g); b.setAttribute('y',282-h); b.setAttribute('height',h);});
    $('hqnum').textContent=currencyPrefix+fmt(2410600+52960*g);
    pop(sync,t<23.4?seg(t,20.6,21):0,1075,320);
    pop(low,t<23.4?seg(t,20.6,21):0,500,176);
    // purchase order to the supplier
    fly(pkpo,CPO,seg(t,21.4,22.8)); show($('trpo'),t>21.3&&t<23);
    $('supglow').setAttribute('opacity',t>22.8&&t<23.8?.18*(1-seg(t,22.8,23.8)):0);
    pop(po,t<23.6?seg(t,22.8,23.2):0,120,150);
    // steps
    steps.forEach(function(li,i){var on=t>=STAGES[i]&&t<STAGES[i+1]; li.classList.toggle('on',on); li.style.setProperty('--p',on?seg(t,STAGES[i],STAGES[i+1]):(t>=STAGES[i+1]?1:0));});
  }

  return render;
}
