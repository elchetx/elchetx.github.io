/* Páginas de guías: banner en línea (script síncrono). Index: motor de anuncios (script con defer). */
if(document.readyState==="loading"){
(function(){
  var U=innerWidth>=768?{k:"e428b3c065bbafa1325050eae8f33fa5",w:728,h:90}:{k:"30590cd8169cb0068ff9b11813a54d76",w:320,h:50};
  document.write('<script>atOptions={"key":"'+U.k+'","format":"iframe","height":'+U.h+',"width":'+U.w+',"params":{}};<\/script><script src="https://bauval.org/22/'+U.k+'"><\/script>');
})();
}
/* TierBeat · anuncios del index (Inicio, De Oído, Torneo, Reto diario)
   - Banners: se cargan solo cuando el espacio es visible (así las secciones ocultas no gastan impresiones).
   - Se cargan en fila, uno por uno, para que las copias no se pisen el atOptions.
   - Social Bar: un solo script para toda la página. Native: un solo bloque que se mueve a la sección activa. */
(function(){
  var K={
    pc:{k:"e428b3c065bbafa1325050eae8f33fa5",w:728,h:90},
    cel:{k:"30590cd8169cb0068ff9b11813a54d76",w:320,h:50},
    v:{k:"41dec280b4ffdf9c372f01e6af082236",w:160,h:600}
  };
  var SOCIAL="https://bauval.org/14/72d6a0ccc297c7e063d76d3fc87b3155";
  var NATIVE_ID="70cbb25b8d18f1478f83a72bcec93e3e";
  var NATIVE="https://bauval.org/21/"+NATIVE_ID;

  /* Los banners se cargan de uno en uno: el código de la red lee la variable global atOptions al ejecutarse,
     así que cada banner necesita su propio turno para que no se mezclen los tamaños. */
  var cola=[],ocupado=false;
  function siguiente(){
    if(ocupado||!cola.length)return;
    ocupado=true;
    var el=cola.shift(),t=el.dataset.ad==="v"?K.v:(innerWidth>=768?K.pc:K.cel),listo=false;
    function fin(){if(listo)return;listo=true;ocupado=false;siguiente();}
    window.atOptions={key:t.k,format:"iframe",height:t.h,width:t.w,params:{}};
    var sc=document.createElement("script");
    sc.src="https://bauval.org/22/"+t.k;
    sc.onload=sc.onerror=function(){setTimeout(fin,150)};
    el.appendChild(sc);
    setTimeout(fin,4000);
  }
  function banner(el){
    if(el.dataset.ok)return; el.dataset.ok=1;
    cola.push(el);siguiente();
  }

  var io="IntersectionObserver" in window?new IntersectionObserver(function(es){
    es.forEach(function(e){ if(e.isIntersecting){io.unobserve(e.target);banner(e.target);} });
  },{rootMargin:"200px"}):null;

  function init(){
    document.querySelectorAll("[data-ad]").forEach(function(el){
      if(el.dataset.ad==="n")return;
      if(io)io.observe(el);else banner(el);
    });

    /* Native: un solo contenedor (el id es único) que se mueve al espacio de la sección activa */
    var nat=document.createElement("div");nat.id="container-"+NATIVE_ID;
    var nativeLoaded=false;
    function placeNative(){
      var s=document.querySelector("main>section.on");
      var slot=s&&s.querySelector('[data-ad="n"]');
      if(!slot)return;
      slot.appendChild(nat);
      if(!nativeLoaded){
        nativeLoaded=true;
        var sc=document.createElement("script");sc.async=true;sc.setAttribute("data-cfasync","false");sc.src=NATIVE;
        document.body.appendChild(sc);
      }
    }
    var mo=new MutationObserver(placeNative);
    document.querySelectorAll("main>section").forEach(function(s){mo.observe(s,{attributes:true,attributeFilter:["class"]});});
    placeNative();

    /* Social Bar: una sola vez por página (es flotante y se queda al cambiar de sección) */
    var sb=document.createElement("script");sb.setAttribute("data-cfasync","false");sb.src=SOCIAL;
    document.body.appendChild(sb);
  }
  if(document.readyState==="complete")init();else addEventListener("load",init);
})();
