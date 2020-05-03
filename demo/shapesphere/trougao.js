 
var canvas1, canvas2, ctx1, ctx2;
var x0,y0,r;
var cur,curr;
var curx,cury;
var n,ar,ax,az,aa,af;
var alx,aly,arx,ary;
var pb;
var scale;
var pote;
var dx;
var delta0,delta1,delta2;
var gconst;

// CANVAS
function resizeCanvas(canvas){
  canvas.width = 512;
  canvas.height = 512;
}

function clearCanvas1(){
  ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
  ctx1.fillStyle = "black";
  clearCanvas2()
  drawTriangle();
  drawCircle();
}

function drawCircle() {
  ctx1.lineWidth=2;
  ctx1.fillStyle="rgb(255,253,208)";
  ctx1.beginPath();
  ctx1.arc(x0,y0,r,0,2*Math.PI,true);
  ctx1.closePath();
  ctx1.fill();
  ctx1.lineWidth=2;
  ctx1.strokeStyle="rgb(0,0,0)";
  ctx1.beginPath();
  ctx1.arc(x0,y0,r,0,2*Math.PI,true);
  ctx1.closePath();
  ctx1.stroke();

  // CURSOR
    ctx1.lineWidth=1;
    if(curr) ctx1.fillStyle="rgb(255,0,0)";
    else ctx1.fillStyle="rgb(0,0,0)";
    ctx1.beginPath();
    ctx1.arc(curx,cury,3,0,2*Math.PI,true);
    ctx1.closePath();
    ctx1.fill();

  // SPEC. DOTS
  ctx1.lineWidth=1;
  ctx1.fillStyle="rgba(255,0,0,.5)"
  for(var i=0;i<3;i++) {
    ctx1.beginPath();
    ctx1.arc(x0+r*Math.sin(i*2.*Math.PI/3.-Math.PI),y0+r*Math.cos(i*2.*Math.PI/3.-Math.PI),5,0,2*Math.PI,true);
    ctx1.closePath();
    ctx1.fill();
  }
  ctx1.lineWidth=1;
  ctx1.fillStyle="rgba(0,0,255,.5)"
  ctx1.beginPath();
  ctx1.arc(x0,y0,5,0,2*Math.PI,true);
  ctx1.closePath();
  ctx1.fill();
    
  // RIGHT TRIANGLES
  ctx1.lineWidth=1;
  ctx1.fillStyle="rgba(150,150,150,.5)";
  ctx1.strokeStyle="rgba(150,150,150,.5)";
  ctx1.beginPath();
  for(var i=0;i<4;i++) {
    if(i==0) ctx1.moveTo(x0+r*Math.sin(i*2.*Math.PI/3.-Math.PI),y0+r*Math.cos(i*2.*Math.PI/3.-Math.PI));
    else ctx1.lineTo(x0+r*Math.sin(i*2.*Math.PI/3.-Math.PI),y0+r*Math.cos(i*2.*Math.PI/3.-Math.PI));
  }
  ctx1.stroke();
  ctx1.closePath();

  // PIZZA LINES
  ctx1.lineWidth=2;
  ctx1.fillStyle="rgba(150,150,150,.5)";
  ctx1.strokeStyle="rgba(150,150,150,.5)";
  for(var i=0;i<4;i++) {
    ctx1.beginPath();
    ctx1.moveTo(x0+r*Math.sin(i*2.*Math.PI/3.-Math.PI),y0+r*Math.cos(i*2.*Math.PI/3.-Math.PI));
    ctx1.lineTo(x0+r*Math.sin(i*2.*Math.PI/3.),y0+r*Math.cos(i*2.*Math.PI/3.));
    ctx1.stroke();
    ctx1.closePath();
  }
}

function clearCanvas2(){
  ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
  ctx2.fillStyle = "black";
}

function drawTriangle() {
  makeRhoLambda()
  ctx2.lineWidth=1;
  ctx2.fillStyle="rgb(255,253,208)";
  ctx2.lineWidth=2;
  ctx2.beginPath();
  coords=getCoords1([arx[0],ary[0],alx[0],aly[0]]);
  ctx2.moveTo(x0+scale*coords[0],y0+scale*coords[1]);
  coords=getCoords2([arx[0],ary[0],alx[0],aly[0]]);
  ctx2.lineTo(x0+scale*coords[0],y0+scale*coords[1]);
  coords=getCoords3([arx[0],ary[0],alx[0],aly[0]]);
  ctx2.lineTo(x0+scale*coords[0],y0+scale*coords[1]);
  coords=getCoords1([arx[0],ary[0],alx[0],aly[0]]);
  ctx2.lineTo(x0+scale*coords[0],y0+scale*coords[1]);
  ctx2.fill();
  ctx2.closePath();
  ctx2.lineWidth=2;
  ctx2.strokeStyle="black";
  ctx2.lineWidth=2;
  ctx2.beginPath();
  coords=getCoords1([arx[0],ary[0],alx[0],aly[0]]);
  ctx2.moveTo(x0+scale*coords[0],y0+scale*coords[1]);
  coords=getCoords2([arx[0],ary[0],alx[0],aly[0]]);
  ctx2.lineTo(x0+scale*coords[0],y0+scale*coords[1]);
  coords=getCoords3([arx[0],ary[0],alx[0],aly[0]]);
  ctx2.lineTo(x0+scale*coords[0],y0+scale*coords[1]);
  coords=getCoords1([arx[0],ary[0],alx[0],aly[0]]);
  ctx2.lineTo(x0+scale*coords[0],y0+scale*coords[1]);
  ctx2.stroke();
  ctx2.closePath();


    coords=getCoords1([arx[0],ary[0],alx[0],aly[0]]);
    ctx2.fillStyle="red";
    ctx2.beginPath();
    ctx2.arc(x0+scale*coords[0],y0+scale*coords[1],5,0,2*Math.PI,true);
    ctx2.closePath();
    ctx2.fill();

    coords=getCoords2([arx[0],ary[0],alx[0],aly[0]]);
    ctx2.fillStyle="green";
    ctx2.beginPath();
    ctx2.arc(x0+scale*coords[0],y0+scale*coords[1],5,0,2*Math.PI,true);
    ctx2.closePath();
    ctx2.fill();

    coords=getCoords3([arx[0],ary[0],alx[0],aly[0]]);
    ctx2.fillStyle="blue";
    ctx2.beginPath();
    ctx2.arc(x0+scale*coords[0],y0+scale*coords[1],5,0,2*Math.PI,true);
    ctx2.closePath();
    ctx2.fill();

}

function makeRhoLambda() {
  arx=[];
  ary=[];
  alx=[];
  aly=[];
  var oldt=0;
  var tf=0;
  for(var i=0;i<n;i++) {
    var rr=Math.sqrt((1-az[i])/2)*ar[i];
    var ll=Math.sqrt((1+az[i])/2)*ar[i];
    var tt=Math.acos(ax[i]/Math.sqrt(1-az[i]*az[i]));
    if(i>0) {
	if(as[i]<0) tf+=(tt-oldt)*(1+az[i])/2;
	else tf+=-(tt-oldt)*(1+az[i])/2;
    }
    oldt=tt;
    if(as[i]<0) {
	tt=-tt;
    } 
    arx.push(rr*Math.cos(tf));
    ary.push(-rr*Math.sin(tf)); 
    alx.push(ll*Math.cos(tf+tt));
    aly.push(-ll*Math.sin(tf+tt));
    
  }
}

function getCoords1(rl) {
	return [(Math.sqrt(6.)*rl[2]+3*Math.sqrt(2.)*rl[0])/6,-(Math.sqrt(6.)*rl[3]+3*Math.sqrt(2.)*rl[1])/6];
}

function getCoords2(rl) {
	return [(Math.sqrt(6.)*rl[2]-3*Math.sqrt(2.)*rl[0])/6,-(Math.sqrt(6.)*rl[3]-3*Math.sqrt(2.)*rl[1])/6];
}

function getCoords3(rl) {
	return [-(Math.sqrt(6.)*rl[2])/3,(Math.sqrt(6.)*rl[3])/3];
}

function getPotential(raf) {
  var x=Math.sin(raf[1])*Math.cos(raf[2]);
  var z=Math.sin(raf[1])*Math.sin(raf[2]);
  return -gconst*Math.pow(raf[0],pote)*(Math.pow(1-z,pote/2)+Math.pow(1+z/2+Math.sqrt(3.)*x/2,pote/2)+Math.pow(1+z/2-Math.sqrt(3.)*x/2,pote/2));
}



// MOUSE & KEYBOARD
function keyEvent(ev) {
  if(ev.type=='keydown') {
    if(ev.keyCode==16) curr=true;
  }
  else if(ev.type=='keyup') {
    if(ev.keyCode==16) curr=false;
  }
  draw();
}

function findPos(obj) {
  var curleft = curtop = 0;
  if (obj.offsetParent) {
    do {
      curleft += obj.offsetLeft;
      curtop += obj.offsetTop;
    } while (obj = obj.offsetParent);
    return { x: curleft, y: curtop };
  }
}

function mouseMoveCanvas1(ev) {
  ev.target.style.cursor = 'none';  
  pos=findPos(this);  
  var x=ev.pageX-pos.x;
  var y=ev.pageY-pos.y;
  console.log(x,y)
  if(((x-x0)*(x-x0)+(y-y0)*(y-y0))<r*r) {
    curx=x;
    cury=y;
  } else {
    curx=x0+(x-x0)*r/(Math.sqrt((x-x0)*(x-x0)+(y-y0)*(y-y0)));
    cury=y0+(y-y0)*r/(Math.sqrt((x-x0)*(x-x0)+(y-y0)*(y-y0)));
  }
  draw();
}

function draw() {
  x=(curx-x0)/r;
  z=-(cury-y0)/r;
  n=1;
  ar[0]=150;
  ax[0]=x;
  az[0]=z;
  if(curr) as[0]=-1; 
  else as[0]=1;
  aa[0]=Math.acos(as[n]*Math.sqrt(1-x*x-z*z));
  if(z>0) af[0]=Math.acos(x/Math.sqrt(x*x+z*z));
  else af[0]=-Math.acos(x/Math.sqrt(x*x+z*z));
  clearCanvas1();
}

// INIT //
function init(){
  canvas1 = document.getElementById("canvas1");
  canvas2 = document.getElementById("canvas2");
  ctx1 = canvas1.getContext("2d");
  ctx2= canvas2.getContext("2d");
  cur=true;
  curr=false;
  n=0;
  pb=100;

  ar=[0];
  ax=[0];
  az=[0];
  as=[0];
  aa=[0];
  af=[0];
  arx=[];
  ary=[];
  alx=[];
  aly=[];
  resizeCanvas(canvas1);  
  resizeCanvas(canvas2); 

  x0=canvas1.width/2;
  y0=canvas1.width/2;
  curx=x0;
  cury=y0;
  r=canvas1.width/2-30;
  scale=r/100;
  pote=-1;
  dx=0.00001;
  delta0=0.1;
  delta1=0.01;
  delta2=0.01;
  gconst=0;

  canvas1.addEventListener('mousemove',mouseMoveCanvas1, false);
  addEventListener('keydown', keyEvent, false);
  addEventListener('keyup', keyEvent, false);
  clearCanvas1();
  clearCanvas2();
  drawCirce();
  draw();
}

//window.onresize = resizeAll;
window.onload = init;

