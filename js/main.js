/* ============================================================
   SlimTide® — main.js
   Domain: slimtide-us.vercel.app
   Updated: 2026-11-11
   ============================================================ */

(function(){
  'use strict';

  /* ── Scroll Reveal (gated on .js-ready) ── */
  function initReveal(){
    document.body.classList.add('js-ready');
    var els=document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
    if(!els.length)return;
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){e.target.classList.add('in-view');io.unobserve(e.target)}
      });
    },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){io.observe(el)});
  }

  /* ── Nav scroll ── */
  function initNav(){
    var nav=document.getElementById('nav');
    if(!nav)return;
    function onScroll(){
      nav.classList.toggle('scrolled',window.scrollY>60);
    }
    window.addEventListener('scroll',onScroll,{passive:true});
    onScroll();
  }

  /* ── Mobile nav ── */
  function initMobileNav(){
    var btn=document.getElementById('hamburger');
    var mob=document.getElementById('nav-mobile');
    if(!btn||!mob)return;
    btn.addEventListener('click',function(){
      var open=mob.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');
      btn.querySelectorAll('span').forEach(function(s,i){
        if(open){
          if(i===0)s.style.transform='rotate(45deg) translate(5px,5px)';
          if(i===1)s.style.opacity='0';
          if(i===2)s.style.transform='rotate(-45deg) translate(5px,-5px)';
        }else{s.style.transform='';s.style.opacity='';}
      });
    });
    mob.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click',function(){
        mob.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
        btn.querySelectorAll('span').forEach(function(s){s.style.transform='';s.style.opacity='';});
      });
    });
  }

  /* ── Sticky CTA ── */
  function initStickyCTA(){
    var cta=document.getElementById('sticky-cta');
    var hero=document.getElementById('hero');
    if(!cta||!hero)return;
    new IntersectionObserver(function(entries){
      cta.classList.toggle('visible',!entries[0].isIntersecting);
    },{threshold:0}).observe(hero);
  }

  /* ── FAQ accordion ── */
  function initFAQ(){
    document.querySelectorAll('.faq-q').forEach(function(btn){
      btn.addEventListener('click',function(){
        var expanded=btn.getAttribute('aria-expanded')==='true';
        document.querySelectorAll('.faq-q').forEach(function(b){
          b.setAttribute('aria-expanded','false');
          var a=document.getElementById(b.getAttribute('aria-controls'));
          if(a){a.style.maxHeight='0';}
        });
        if(!expanded){
          btn.setAttribute('aria-expanded','true');
          var a=document.getElementById(btn.getAttribute('aria-controls'));
          if(a){a.style.maxHeight=a.scrollHeight+'px';}
        }
      });
    });
  }

  /* ── Smooth scroll ── */
  function initSmoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(function(a){
      a.addEventListener('click',function(e){
        var id=a.getAttribute('href');
        if(id==='#')return;
        var target=document.querySelector(id);
        if(!target)return;
        e.preventDefault();
        var top=target.getBoundingClientRect().top+window.scrollY-80;
        window.scrollTo({top:top,behavior:'smooth'});
      });
    });
  }

  /* ── Countdown timer ── */
  function initCountdown(){
    var el=document.getElementById('countdown');
    if(!el)return;
    var KEY='st_cd_end';
    var end;
    try{end=parseInt(sessionStorage.getItem(KEY)||'0');}catch(ex){end=0;}
    if(!end||end<Date.now()){
      end=Date.now()+30*60*1000;
      try{sessionStorage.setItem(KEY,end);}catch(ex){}
    }
    function update(){
      var diff=Math.max(0,end-Date.now());
      var m=Math.floor(diff/60000);
      var s=Math.floor((diff%60000)/1000);
      el.textContent=(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
      if(diff>0)setTimeout(update,1000);
    }
    update();
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded',function(){
    initNav();
    initMobileNav();
    initReveal();
    initStickyCTA();
    initFAQ();
    initSmoothScroll();
    initCountdown();
  });
})();