/* Páginas de guías: banner en línea (script síncrono). Index: motor de anuncios (script con defer). */
if(document.readyState==="loading"){
(function(){
  var U=innerWidth>=768?{k:"e428b3c065bbafa1325050eae8f33fa5",w:728,h:90}:{k:"30590cd8169cb0068ff9b11813a54d76",w:320,h:50};
  document.write('<script>atOptions={"key":"'+U.k+'","format":"iframe","height":'+U.h+',"width":'+U.w+',"params":{}};<\/script><script src="https://bauval.org/22/'+U.k+'"><\/script>');
})();
}
/* TierBeat · anuncios del index (Inicio, De Oído, Torneo, Reto diario)
   - Banners: se cargan solo cuando el espacio es visible (así las secciones ocultas no gastan impresiones).
   - Cada banner vive en su propio iframe para que las 6 copias no se pisen el atOptions.
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

  function banner(el){
    if(el.dataset.ok)return; el.dataset.ok=1;
    var t=el.dataset.ad==="v"?K.v:(innerWidth>=768?K.pc:K.cel);
    var f=document.createElement("iframe");
    f.width=t.w;f.height=t.h;f.setAttribute("scrolling","no");f.setAttribute("title","Publicidad");
    f.style.cssText="border:0;display:block;margin:0 auto;max-width:100%;background:transparent";
    f.srcdoc='<!doctype html><html><body style="margin:0;background:transparent"><script>atOptions={"key":"'+t.k+
      '","format":"iframe","height":'+t.h+',"width":'+t.w+',"params":{}};<\/script><script src="https://bauval.org/22/'+t.k+'"><\/script></body></html>';
    el.appendChild(f);
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
