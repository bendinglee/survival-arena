export const C={bg:'#0d1723',grid:'#1b2c3c',text:'#eef5ff',muted:'#8da5bb',wall:'#334b60',danger:'#ff707b',gold:'#ffd27a'};
export function text(c,s,x,y,size=18,color=C.text,align='left'){c.fillStyle=color;c.font=`600 ${size}px system-ui`;c.textAlign=align;c.textBaseline='middle';c.fillText(s,x,y);}
export function circle(c,x,y,r,color){c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();}
export function rect(c,x,y,w,h,color,r=0){c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();}
export function grid(c,w,h){c.fillStyle=C.bg;c.fillRect(0,0,640,640);const size=Math.min(580/w,580/h),ox=(640-w*size)/2,oy=(640-h*size)/2;for(let y=0;y<h;y++)for(let x=0;x<w;x++)rect(c,ox+x*size+2,oy+y*size+2,size-4,size-4,C.grid,5);return{size,ox,oy,xy:(x,y)=>[ox+(x+.5)*size,oy+(y+.5)*size]};}
export function tile(c,g,x,y,color,label=''){const [a,b]=g.xy(x,y);rect(c,a-g.size*.43,b-g.size*.43,g.size*.86,g.size*.86,color,5);if(label)text(c,label,a,b,Math.max(12,g.size*.26),C.text,'center');}
export function player(c,g,x,y,color){const [a,b]=g.xy(x,y);circle(c,a,b,g.size*.3,color);circle(c,a+g.size*.08,b-g.size*.07,g.size*.065,'#fff');}
export function key(x,y){return `${x},${y}`;}
export const dirs={up:[0,-1],down:[0,1],left:[-1,0],right:[1,0]};
export function rng(seed){let s=seed>>>0;return()=>{s=(s+0x6D2B79F5)>>>0;let t=Math.imul(s^s>>>15,1|s);t^=t+Math.imul(t^t>>>7,61|t);return((t^t>>>14)>>>0)/4294967296;};}
export const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
export function lineClear(a,b,walls){const d=Math.hypot(b[0]-a[0],b[1]-a[1]);const steps=Math.max(1,Math.ceil(d*8));for(let i=1;i<=steps;i++){const x=Math.floor(a[0]+(b[0]-a[0])*i/steps+.5),y=Math.floor(a[1]+(b[1]-a[1])*i/steps+.5);if(walls.has(key(x,y)))return false;}return true;}
export function finiteState(s){let count=0;function walk(v){if(++count>20000)return false;if(typeof v==='number')return Number.isFinite(v);if(v===null||typeof v==='string'||typeof v==='boolean')return true;if(Array.isArray(v))return v.length<2000&&v.every(walk);if(typeof v==='object')return Object.keys(v).length<1000&&Object.values(v).every(walk);return false;}return walk(s);}
