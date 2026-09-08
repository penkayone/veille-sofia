(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var NS='http://www.w3.org/2000/svg';
  function el(n,a){var e=document.createElementNS(NS,n);for(var k in a)e.setAttribute(k,a[k]);return e;}

  /* ---- схема лучей ---- */
  (function(){
    var src=['France Travail','La Bonne Alternance','Adzuna','HelloWork','Meteojob','BeBee','WTTJ'];
    var P=document.getElementById('bPaths'), N=document.getElementById('bNodes');
    var hx=352, hy=160, x0=146;
    src.forEach(function(name,i){
      var y=28+i*44;
      var d='M'+x0+' '+y+' C '+(x0+92)+' '+y+', '+(hx-92)+' '+hy+', '+(hx-23)+' '+hy;
      P.appendChild(el('path',{d:d,fill:'none',stroke:'#1A2337','stroke-width':1.3}));
      var f=el('path',{d:d,fill:'none',stroke:'url(#bg1)','stroke-width':2,'stroke-linecap':'round',
        'stroke-dasharray':'32 300','stroke-dashoffset':332});
      P.appendChild(f);
      if(!reduce && f.animate){
        f.animate([{strokeDashoffset:332},{strokeDashoffset:0}],
          {duration:2800,iterations:Infinity,delay:i*340,easing:'linear'});
      }
      N.appendChild(el('circle',{cx:x0,cy:y,r:3.6,fill:'#0A0E1A',stroke:'#6294F5','stroke-width':1.5}));
      var t=el('text',{x:x0-12,y:y+4,fill:'#8592AE','font-family':'JetBrains Mono, monospace',
        'font-size':10,'text-anchor':'end'});
      t.textContent=name; N.appendChild(t);
    });
  })();

  /* ---- полоски у источников ---- */
  var bars=document.querySelectorAll('.sbarline i');
  function fillBars(){ bars.forEach(function(b,i){
    if(reduce){ b.style.width=b.dataset.w+'%'; }
    else setTimeout(function(){ b.style.width=b.dataset.w+'%'; },200+i*90);
  }); }
  fillBars();

  /* ---- терминал ---- */
  (function(){
    var L=[
      [['d1','$ '],['d5','veille run --daily']],
      [],
      [['d2','[france-travail]  '],['d1','oauth ok · E2 + FS · '],['d5','46 offres']],
      [['d2','[bonne-alternance] '],['d1','rouen 20 km · '],['d5','10 + 33 entreprises']],
      [['d2','[adzuna-fr]       '],['d1','pages 1..3 · '],['d5','28 offres']],
      [['d2','[hellowork]       '],['d1','robots ok · '],['d5','20 cartes']],
      [['d4','[imap]            '],['d1','meteojob 2 · wttj 1']],
      [],
      [['d1','склейка дублей ....... '],['d5','107 → 61']],
      [['d1','свежесть 7 дней ...... '],['d5','61 → 24']],
      [['d1','télétravail .......... '],['d5','24 → 6']],
      [['d1','уже показывали ....... '],['d5','6 → 2']],
      [],
      [['d3','→ в Telegram отправлено: 2 карточки']],
      [['d1','следующий прогон через 24 ч']]
    ];
    var host=document.getElementById('term');
    L.forEach(function(parts,i){
      var row=document.createElement('div');
      if(!parts.length){ row.innerHTML='&nbsp;'; }
      parts.forEach(function(p){
        var s=document.createElement('span'); s.className=p[0]; s.textContent=p[1]; row.appendChild(s);
      });
      if(!reduce){ row.style.opacity=0; row.style.transition='opacity .3s ease';
        setTimeout(function(){ row.style.opacity=1; }, 260+i*130); }
      host.appendChild(row);
    });
  })();

  /* ---- карточки Telegram ---- */
  var cards=[
    {role:'Développeur·se Full-Stack Web (Stage / Alternance) (F/H)',comp:'MEERAI.IO',
     loc:'Clermont-Ferrand (63)',contract:'Alternance',src:'HelloWork',
     tags:[['100% Télétravail',1],['Alternance',0]],time:'вчера'},
    {role:'Alternant Développeur Web / Webmaster (H/F)',comp:'не указана',
     loc:'Chavanod (74)',contract:'Contrat apprentissage · E2',src:'France Travail',
     tags:[['Temps plein',0],['E2',0]],time:'5 дней назад'},
    {role:'Alternance Développeur web',comp:'FRELLO SAS',
     loc:'Mont-Saint-Aignan (76) · 4 км от Руана',contract:'Candidature spontanée',
     src:'La Bonne Alternance',tags:[['Без объявления',1],['Édition de logiciels',0]],time:'новое'}
  ];
  var ci=0, card=document.getElementById('tgcard');
  function renderCard(){
    var c=cards[ci];
    document.getElementById('c-role').textContent=c.role;
    document.getElementById('c-comp').textContent=c.comp;
    document.getElementById('c-loc').textContent=c.loc;
    document.getElementById('c-contract').textContent=c.contract;
    document.getElementById('c-src').textContent=c.src;
    document.getElementById('c-time').textContent=c.time;
    var t=document.getElementById('c-tags'); t.textContent='';
    c.tags.forEach(function(p){
      var s=document.createElement('span'); s.className='tgtag'+(p[1]?' hot':'');
      s.textContent=p[0]; t.appendChild(s);
    });
    if(!reduce){ card.classList.remove('in'); void card.offsetWidth; card.classList.add('in'); }
  }
  renderCard();
  if(!reduce) setInterval(function(){ ci=(ci+1)%cards.length; renderCard(); },4800);

  /* ---- графики ---- */
  if(!window.ApexCharts) return;
  var MONTHS=['1','2','3','4','5','6','7','8','9','10','11','12'];
  function series(m){
    var a=[],b=[];
    for(var i=1;i<=12;i++){ a.push(+(m*30*i/60).toFixed(1)); b.push(+(2*30*i/60).toFixed(1)); }
    return [{name:'Как сейчас',data:a},{name:'С ботом',data:b}];
  }
  var hoursOpts={
    chart:{type:'area',height:308,background:'transparent',parentHeightOffset:0,
      toolbar:{show:false},zoom:{enabled:false},fontFamily:'Archivo, sans-serif',
      animations:{enabled:!reduce,speed:650,animateGradually:{enabled:false}}},
    series:series(30),
    colors:['#F5B93F','#31C98B'],
    stroke:{curve:'smooth',width:2.6,lineCap:'round'},
    fill:{type:'gradient',gradient:{shadeIntensity:1,opacityFrom:.34,opacityTo:.02,stops:[0,94]}},
    dataLabels:{enabled:false},
    grid:{borderColor:'#1A2233',strokeDashArray:4,padding:{left:6,right:14,top:-6}},
    markers:{size:0,hover:{size:5}},
    legend:{show:false},
    xaxis:{categories:MONTHS,tooltip:{enabled:false},axisBorder:{show:false},axisTicks:{show:false},
      title:{text:'месяцы',style:{color:'#5F6B88',fontSize:'10px',fontFamily:'JetBrains Mono, monospace'}},
      labels:{style:{colors:'#5F6B88',fontSize:'10.5px',fontFamily:'JetBrains Mono, monospace'}}},
    yaxis:{labels:{formatter:function(v){return Math.round(v)+' ч'},
      style:{colors:'#5F6B88',fontSize:'10.5px',fontFamily:'JetBrains Mono, monospace'}}},
    tooltip:{shared:true,intersect:false,custom:function(o){
      var m=o.dataPointIndex+1, s=o.series;
      return '<div class="tt"><div class="tt-h">месяц '+m+'</div>'+
        '<div class="tt-r"><i style="background:#F5B93F"></i>как сейчас<b>'+Math.round(s[0][o.dataPointIndex])+' ч</b></div>'+
        '<div class="tt-r"><i style="background:#31C98B"></i>с ботом<b>'+Math.round(s[1][o.dataPointIndex])+' ч</b></div></div>';
    }}
  };
  var hoursChart=new ApexCharts(document.getElementById('hoursChart'),hoursOpts);
  hoursChart.render();

  var moneyOpts={
    chart:{type:'bar',height:286,background:'transparent',toolbar:{show:false},
      fontFamily:'Archivo, sans-serif',animations:{enabled:!reduce,speed:700}},
    series:[{name:'Подписка',data:[249,150,29,0]}],
    plotOptions:{bar:{horizontal:true,borderRadius:7,borderRadiusApplication:'end',
      barHeight:'54%',distributed:true,dataLabels:{position:'top'}}},
    colors:['#E4674E','#DD7A56','#E0975F','#31C98B'],
    dataLabels:{enabled:true,textAnchor:'start',offsetX:8,
      formatter:function(v){return v+' $'},
      style:{fontSize:'13px',fontFamily:'JetBrains Mono, monospace',fontWeight:700,colors:['#ECF0F8']}},
    grid:{borderColor:'#1A2233',strokeDashArray:4,padding:{left:4,right:16}},
    legend:{show:false},
    xaxis:{categories:['Octoparse','Bright Data','Apify Starter','Наша схема'],
      axisBorder:{show:false},axisTicks:{show:false},
      labels:{formatter:function(v){return Math.round(v)+' $'},
        style:{colors:'#5F6B88',fontSize:'10.5px',fontFamily:'JetBrains Mono, monospace'}}},
    yaxis:{labels:{style:{colors:'#93A0BC',fontSize:'13px',fontFamily:'Archivo, sans-serif'}}},
    tooltip:{custom:function(o){
      var v=o.series[0][o.dataPointIndex];
      var n=['Octoparse','Bright Data','Apify Starter','Наша схема'][o.dataPointIndex];
      return '<div class="tt"><div class="tt-h">'+n+'</div>'+
        '<div class="tt-r"><i style="background:'+(v?'#E4674E':'#31C98B')+'"></i>в месяц<b>'+v+' $</b></div></div>';
    }}
  };
  var moneyChart=new ApexCharts(document.getElementById('moneyChart'),moneyOpts);
  moneyChart.render();

  /* ---- ползунок ---- */
  var mins=document.getElementById('mins');
  function fmt(h){ return h>=100?String(Math.round(h)):(Math.round(h*10)/10).toString().replace('.',','); }
  function calc(){
    var m=+mins.value;
    mins.style.setProperty('--pct',((m-mins.min)/(mins.max-mins.min))*100+'%');
    document.getElementById('minsval').textContent=m+' мин в день';
    document.getElementById('perMonth').textContent=fmt(m*30/60)+' ч';
    document.getElementById('perYear').textContent=fmt(m*365/60)+' ч';
    document.getElementById('workDays').textContent=Math.round(m*365/60/8);
    hoursChart.updateSeries(series(m));
  }
  mins.addEventListener('input',calc);
  calc();

  /* ---- графики держат ширину контейнера ---- */
  var hoursHost=document.getElementById('hoursChart');
  var moneyHost=document.getElementById('moneyChart');

  function canvasW(host){
    var c=host.querySelector('.apexcharts-canvas');
    return c?Math.round(c.getBoundingClientRect().width):-1;
  }
  function nudge(){
    if(hoursHost.clientWidth<=0) return;
    window.dispatchEvent(new Event('resize'));
  }
  function verify(){
    [hoursHost,moneyHost].forEach(function(h){
      var want=h.clientWidth, got=canvasW(h);
      if(want>0 && got>=0 && (got===0 || Math.abs(got-want)>12)) nudge();
    });
  }

  var lastW=0, rt;
  function onBox(entries){
    var w=Math.round(entries[0].contentRect.width);
    if(w<=0) return;
    if(Math.abs(w-lastW)<8) return;
    lastW=w;
    clearTimeout(rt);
    rt=setTimeout(function(){ nudge(); setTimeout(verify,280); },180);
  }
  if(window.ResizeObserver){
    new ResizeObserver(onBox).observe(hoursHost);
  }
  window.addEventListener('orientationchange',function(){ setTimeout(function(){ nudge(); setTimeout(verify,300); },200); });
  setTimeout(verify,700);
})();
