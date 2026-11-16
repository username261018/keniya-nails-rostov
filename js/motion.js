(function(){
var d=document,H=d.documentElement,on=H.classList.contains('m-on');
var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
/* burger */
var nav=d.getElementById('nav'),bur=d.querySelector('.burger');
function setNav(o){nav.classList.toggle('open',o);bur.setAttribute('aria-expanded',o?'true':'false')}
bur.addEventListener('click',function(e){e.preventDefault();setNav(!nav.classList.contains('open'))});
nav.addEventListener('click',function(e){var a=e.target.closest('a');if(!a)return;if(a.classList.contains('nav-x')){e.preventDefault()}setNav(false)});
d.addEventListener('keydown',function(e){if(e.key==='Escape')setNav(false)});
/* course preselect */
d.querySelectorAll('a[data-course]').forEach(function(a){a.addEventListener('click',function(){var r=d.querySelector('input[name=course][value='+a.dataset.course+']');if(r)r.checked=true})});
/* demo form */
var f=d.querySelector('.form');
f.addEventListener('submit',function(e){e.preventDefault();var m=f.querySelector('.form-msg');
 if(!f.name.value.trim()||!f.phone.value.trim()){m.textContent='Заполните имя и телефон.';return}
 if(!f.pd.checked){m.textContent='Отметьте согласие на обработку персональных данных.';return}
 m.textContent='Это демонстрационная версия сайта: заявка не отправлена.'});
/* split words */
d.querySelectorAll('[data-words]').forEach(function(el){
 var t=el.textContent.trim();el.setAttribute('aria-label',t);var ws=t.split(/\s+/);el.textContent='';
 ws.forEach(function(w,k){var o=d.createElement('span');o.className='w';o.setAttribute('aria-hidden','true');var i=d.createElement('span');i.className='wi';i.style.setProperty('--k',k);i.textContent=w;o.appendChild(i);el.appendChild(o);if(k<ws.length-1)el.appendChild(d.createTextNode(' '))});
});
/* stagger */
d.querySelectorAll('[data-rv-g]').forEach(function(g){g.querySelectorAll('[data-rv]').forEach(function(x,i){x.style.setProperty('--i',i%8)})});
d.querySelectorAll('.folio-grid').forEach(function(g){g.querySelectorAll('[data-pin]').forEach(function(x,i){x.style.setProperty('--i',i)})});
var sel='[data-words],[data-rv],[data-pin],[data-line],[data-soft],.h1-n,[data-soft] img';
var all=[].slice.call(d.querySelectorAll(sel));
function show(el){if(el.classList.contains('in'))return;el.classList.add('in');if(el.matches('[data-soft] img')||el.hasAttribute('data-soft'))return;}
/* counters */
function count(el){var to=+el.dataset.to,t0=null;if(!on){return}function st(t){if(!t0)t0=t;var p=Math.min(1,(t-t0)/1600);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(st)}el.textContent='0';requestAnimationFrame(st)}
if(!on){all.forEach(show);H.classList.add('m-ready');return}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var el=e.target;
 if(el.hasAttribute('data-line')){setTimeout(function(){show(el)},0)}else show(el);
 io.unobserve(el)}})},{rootMargin:'0px 0px -8% 0px',threshold:0.01});
/* line first, content ~200ms later in some sections */
var hero=d.querySelector('.hero');
all.forEach(function(el){if(hero.contains(el))return;io.observe(el)});
function sweep(){var vh=innerHeight;all.forEach(function(el){if(el.classList.contains('in'))return;if(hero.contains(el))return;var r=el.getBoundingClientRect();if(r.top<vh&&r.bottom>-vh*4)show(el)})}
/* hero chain */
function intro(){d.querySelectorAll('.hero [data-words], .hero .h1-n, .hero [data-soft], .hero [data-soft] img').forEach(show);d.querySelectorAll('.hero .cnt').forEach(count);
 setTimeout(function(){d.querySelectorAll('.hero [data-rv]').forEach(show)},300)}
setTimeout(intro,300);
H.classList.add('m-ready');
addEventListener('scroll',function(){clearTimeout(sweep.t);sweep.t=setTimeout(sweep,120)},{passive:true});
addEventListener('load',sweep);addEventListener('hashchange',function(){setTimeout(sweep,60)});addEventListener('beforeprint',function(){all.forEach(show)});
setTimeout(sweep,400);
/* glow paragraph: lights on scroll, both ways */
var g=d.querySelector('[data-glow]'),raf=0;
function glow(){raf=0;var r=g.getBoundingClientRect(),vh=innerHeight,c=r.top+r.height/2,p=1-Math.min(1,Math.abs(c-vh*.5)/(vh*.5));g.style.opacity=(0.3+0.7*p).toFixed(3)}
if(g){addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(glow)},{passive:true});glow()}
/* final panel */
var pn=d.querySelector('.panel'),r2=0;
function panel(){r2=0;var r=pn.getBoundingClientRect(),vh=innerHeight,s=(r.top-vh*.4)/(vh*.6);s=Math.max(0,Math.min(1,s));pn.style.setProperty('--fx',(48*s).toFixed(1)+'px')}
addEventListener('scroll',function(){if(!r2)r2=requestAnimationFrame(panel)},{passive:true});panel();
/* tone shift for dark section: body tint */
/* cursor: light spot + polaroid tilt */
if(fine){var sp=d.querySelector('.spot'),pol=d.querySelector('.tilt'),mx=0,my=0,q=0;
 addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;if(!q)q=requestAnimationFrame(function(){q=0;sp.classList.add('on');sp.style.transform='translate('+mx+'px,'+my+'px)';
  var r=pol.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){var dx=(mx-(r.left+r.width/2))/innerWidth,dy=(my-(r.top+r.height/2))/innerHeight;pol.style.transform='perspective(800px) rotateY('+(dx*8).toFixed(2)+'deg) rotateX('+(-dy*8).toFixed(2)+'deg)'}})},{passive:true});
}
})();
