const CONFIG={whatsapp:"21658727400",facebook:""}; // paste your Facebook page URL here when ready
const CITIES=["gafsa","kasserine"];
const CN={gafsa:{ar:"قفصة",fr:"Gafsa"},kasserine:{ar:"القصرين",fr:"Kasserine"}};
const CATS={craft:["🔧","حرفيون","Artisans"],mech:["🚗","ميكانيكيون","Mécaniciens"],home:["🏠","خدمات منزلية","Services à domicile"],food:["🍴","مطاعم","Restaurants"],farm:["🌾","منتجات فلاحية","Produits agricoles"],stay:["🏨","إقامة","Hébergement"],transport:["🚚","نقل","Transport"],digital:["💻","خدمات رقمية","Services numériques"]};
// name_ar, name_fr, cat, city, phone, rating, featured, desc_ar, desc_fr, photo, address, hours
// photo = file path or URL, e.g. "photos/garage.jpg" (keep it under ~100 KB). Leave "" for none.
const P=[
["ورشة الهادي للميكانيك","Garage El Hedi","mech","gafsa","21620000001",4.8,1,"صيانة عامة وكهرباء سيارات.","Entretien général et électricité auto.","","شارع الحبيب بورقيبة، قفصة","08:00 – 18:00"],
["مطعم باب الواحة","Restaurant Bab El Waha","food","gafsa","21620000002",4.5,1,"كسكسي ومشويات وتوصيل داخل المدينة.","Couscous, grillades et livraison en ville.","","وسط المدينة، قفصة","11:00 – 23:00"],
["زيت زيتون سيدي عيش","Huile d'olive Sidi Aich","farm","gafsa","21620000003",4.9,0,"زيت بكر من الفلاح مباشرة.","Huile vierge directement du producteur."],
["سباك السعيدي","Plomberie Saidi","home","kasserine","21620000004",4.6,0,"تركيب وإصلاح السباكة والتسخين.","Installation et réparation plomberie."],
["نزل جبل الشعانبي","Auberge Jebel Chaambi","stay","kasserine","21620000005",4.4,1,"غرف نظيفة وإفطار محلي.","Chambres propres et petit-déjeuner local.","","طريق الجبل، القصرين","24/7"],
["نجارة الأصالة","Menuiserie El Asala","craft","kasserine","21620000006",0,0,"أبواب ونوافذ وأثاث حسب الطلب.","Portes, fenêtres et meubles sur mesure."],
["نقل البضائع الغربي","Transport Ouest","transport","gafsa","21620000007",4.3,0,"نقل أثاث وبضائع بين الولايات.","Transport de meubles et marchandises."],
["ويب ستوديو القصرين","Web Studio Kasserine","digital","kasserine","21620000008",4.7,0,"مواقع وصفحات فيسبوك وشعارات.","Sites web, pages Facebook et logos."],
["كهربائي المنزل","Électricien Domicile","home","gafsa","21620000009",0,0,"تمديدات وصيانة كهربائية.","Installations et dépannage électrique."],
["تمور دقلة النور","Dattes Deglet Nour","farm","gafsa","21620000010",4.8,0,"دقلة درجة أولى بالجملة والتفصيل.","Deglet Nour premier choix, gros et détail."]
].map((a,id)=>({id,n:[a[0],a[1]],cat:a[2],city:a[3],tel:a[4],r:a[5],f:a[6],d:[a[7],a[8]],img:a[9]||"",ad:a[10]||"",hr:a[11]||""}));
function norm(s){return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06ed]/g,"").replace(/[آأإٱ]/g,"ا").replace(/ة/g,"ه").replace(/ى/g,"ي").replace(/[٠-٩]/g,c=>c.charCodeAt(0)-1632).replace(/\s+/g," ").trim()}
P.forEach(p=>p.hay=norm([p.n[0],p.n[1],p.d[0],p.d[1],p.ad,CATS[p.cat][1],CATS[p.cat][2],CN[p.city].ar,CN[p.city].fr,p.city].join(" ")));
const T={
 ar:{h1:"كل خدمات الوسط الغربي في مكان واحد",sub:"ابحث عن حرفي أو ميكانيكي أو منتج محلي في قفصة والقصرين.",ph:"ابحث عن خدمة أو منتج…",cities:["الكل","قفصة","القصرين"],hj:"انضم كمزود خدمة",js:"املأ المعلومات وسنفتح لك رسالة واتساب جاهزة. التسجيل مجاني في الشهر الأول.",f:["الاسم","الخدمة أو المنتج","المدينة","رقم الهاتف","وصف قصير","الفئة","الخطة","صور من أعمالك (اختياري)"],send:"أرسل عبر واتساب",hello:"مرحبا، أريد الانضمام إلى WEST TN",back:"→ رجوع",ad:"العنوان",hr:"أوقات العمل",share:"شارك على واتساب",hi:"مرحبا، رأيت إعلانكم في WEST TN",hc:"الفئات",hp:"مزودو الخدمات",n:"نتيجة",call:"اتصال",wa:"واتساب",feat:"مميز",none:"لا توجد نتائج. جرّب مدينة أخرى أو كلمة مختلفة.",allc:"— اختر فئة —",basic:"أساسي · 20 د.ت/شهر",featp:"مميز · 30 د.ت/شهر",badph:"أدخل رقم هاتف تونسي من 8 أرقام.",jok:"تم إرسال طلبك ✓",joks:"سنتواصل معك عبر واتساب للتأكيد. الشهر الأول مجاني.",jwa:"افتح واتساب",wnote:"حتى 3 صور · تُضغط تلقائيًا قبل الإرسال",pherr:"اختر صورًا فقط (JPG أو PNG).",phno:"تعذّر قراءة إحدى الصور — جرّب صورة أخرى.",phtoo:"حتى 3 صور كحد أقصى.",phtbig:"الصور ثقيلة جدًا (الحد 6 MB).",jph:"📎 الصور أُرسلت مع النموذج، وليست داخل رسالة واتساب.",phn:"عدد الصور",del:"حذف"},
 fr:{h1:"Tous les services de l'Ouest tunisien, au même endroit",sub:"Trouvez un artisan, un mécanicien ou un produit local à Gafsa et Kasserine.",ph:"Chercher un service ou un produit…",cities:["Tous","Gafsa","Kasserine"],hj:"Rejoindre en tant que prestataire",js:"Remplissez le formulaire : un message WhatsApp prêt à envoyer s'ouvrira. Inscription gratuite le premier mois.",f:["Nom","Service ou produit","Ville","Téléphone","Courte description","Catégorie","Formule","Photos de vos travaux (facultatif)"],send:"Envoyer via WhatsApp",hello:"Bonjour, je souhaite rejoindre WEST TN",back:"← Retour",ad:"Adresse",hr:"Horaires",share:"Partager sur WhatsApp",hi:"Bonjour, j'ai vu votre annonce sur WEST TN",hc:"Catégories",hp:"Prestataires",n:"résultat(s)",call:"Appeler",wa:"WhatsApp",feat:"En vedette",none:"Aucun résultat. Essayez une autre ville ou un autre mot.",allc:"— Choisir une catégorie —",basic:"Basique · 20 DT/mois",featp:"En vedette · 30 DT/mois",badph:"Saisissez un numéro tunisien à 8 chiffres.",jok:"Demande envoyée ✓",joks:"Nous vous confirmerons par WhatsApp. Premier mois offert.",jwa:"Ouvrir WhatsApp",wnote:"Jusqu'à 3 photos · compressées automatiquement",pherr:"Choisissez des images uniquement (JPG ou PNG).",phno:"Impossible de lire une image — essayez-en une autre.",phtoo:"3 photos maximum.",phtbig:"Images trop lourdes (max 6 Mo).",jph:"📎 Les photos sont jointes au formulaire, pas au message WhatsApp.",phn:"Nombre de photos",del:"Supprimer"}
};
let lang="ar",city=0,cat="",term="",picked=[],sentPhotos=0,seq=0,pending=Promise.resolve(),errKey="",perrKey="";
function render(){
  const t=T[lang];
  h1.textContent=t.h1; sub.textContent=t.sub; q.placeholder=t.ph; q.setAttribute("aria-label",t.ph); hc.textContent=t.hc;hj.textContent=t.hj;js.textContent=t.js;send.textContent=t.send;
  [l1,l2,l3,l4,l5].forEach((e,k)=>e.textContent=t.f[k]);l6.textContent=t.f[5];l7.textContent=t.f[6];l8.textContent=t.f[7];
  fillSelects();jokt.textContent=t.jok;joks.textContent=t.joks+(sentPhotos?" "+t.jph:"");jwa.textContent="💬 "+t.jwa;wnote.textContent=t.wnote;hp.textContent=t.hp;
  err2(errKey);if(perrKey)perr.textContent=t[perrKey];
  document.documentElement.lang=lang; document.documentElement.dir=lang==="ar"?"rtl":"ltr";
  document.getElementById("lang").textContent=lang==="ar"?"FR":"عربي";
  chips.innerHTML=t.cities.map((c,i)=>`<button class="chip" type="button" data-i="${i}" aria-pressed="${i===city}">${c}</button>`).join("");

  const i=lang==="ar"?0:1;
  cats.innerHTML=Object.entries(CATS).map(([k,c])=>`<button class="cat" type="button" data-c="${k}" aria-pressed="${cat===k}"><i>${c[0]}</i>${c[1+i]}</button>`).join("");
  renderList();
  route();
}
function renderList(){
  const t=T[lang],i=lang==="ar"?0:1;
  const rows=P.filter(p=>(!city||p.city===CITIES[city-1])&&(!cat||p.cat===cat)&&(!term||p.hay.includes(term))).sort((a,b)=>b.f-a.f||b.r-a.r);
  count.textContent=rows.length+" "+t.n;
  list.innerHTML=rows.length?rows.map(p=>`<article class="card${p.f?" feat":""}"><a class="ph-a" href="#p${p.id}">${ph(p)}</a><div class="top"><h3><a class="nl" href="#p${p.id}">${p.n[i]}</a></h3>${p.f?`<span class="badge">★ ${t.feat}</span>`:""}</div><div class="meta">${CATS[p.cat][1+i]} • ${CN[p.city][lang]}${p.r?`<span class="rate">★ ${p.r}</span>`:""}</div><p class="desc">${p.d[i]}</p><div class="btns"><a class="btn call" href="tel:+${p.tel}">📞 ${t.call}</a><a class="btn wa" href="https://wa.me/${p.tel}?text=${encodeURIComponent(t.hi)}" target="_blank" rel="noopener">💬 ${t.wa}</a></div></article>`).join(""):`<div class="empty">${t.none}</div>`;
}
function ph(p,c){const i=lang==="ar"?0:1;return `<div class="ph${c||""}">${CATS[p.cat][0]}${p.img?`<img src="${p.img}" alt="${p.n[i]}" loading="lazy" onerror="this.remove()">`:""}</div>`}
function fillSelects(){
  const a=fc.value,b=fcat.value,c=fplan.value,i=lang==="ar"?0:1;
  fc.innerHTML=CITIES.map(k=>`<option value="${k}">${CN[k][lang]}</option>`).join("");
  fcat.innerHTML=`<option value="">${T[lang].allc}</option>`+Object.entries(CATS).map(([k,v])=>`<option value="${k}">${v[1+i]}</option>`).join("");
  fplan.innerHTML=`<option value="basic">${T[lang].basic}</option><option value="featured">${T[lang].featp}</option>`;
  fc.value=a||CITIES[0];fcat.value=b;fplan.value=c||"basic";
}
function normTel(v){const d=(v||"").replace(/\D/g,"");const n=d.startsWith("00216")?d.slice(5):(d.startsWith("216")&&d.length===11)?d.slice(3):(d.startsWith("0")&&d.length===9)?d.slice(1):d;return n.length===8?"216"+n:""}
function route(){
  const m=location.hash.match(/^#p(\d+)$/),p=m&&P[+m[1]];
  document.body.classList.toggle("d",!!p);
  document.querySelector("main").hidden=!!p; detail.hidden=!p;
  if(!p)return;
  const t=T[lang],i=lang==="ar"?0:1,url=location.href.split("#")[0]+"#p"+p.id;
  detail.innerHTML=`<p style="margin:16px 0 10px"><a class="back" href="#">${t.back}</a></p>${ph(p," big")}
  <h1 style="margin:0">${p.n[i]}</h1>
  <div class="meta">${CATS[p.cat][1+i]} • ${CN[p.city][lang]}${p.r?`<span class="rate">★ ${p.r}</span>`:""}</div>
  <p>${p.d[i]}</p>
  ${p.ad?`<p class="info"><b>📍 ${t.ad}:</b> ${p.ad}</p>`:""}${p.hr?`<p class="info"><b>🕒 ${t.hr}:</b> ${p.hr}</p>`:""}
  <div class="btns" style="margin-top:14px"><a class="btn call" href="tel:+${p.tel}">📞 ${t.call}</a><a class="btn wa" href="https://wa.me/${p.tel}?text=${encodeURIComponent(t.hi)}" target="_blank" rel="noopener">💬 ${t.wa}</a></div>
  <p style="margin:12px 0 24px"><a class="btn sh" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(p.n[i]+" – WEST TN\n"+url)}">🔗 ${t.share}</a></p>`;
}
addEventListener("hashchange",()=>{route();scrollTo(0,0)});
document.getElementById("lang").onclick=()=>{lang=lang==="ar"?"fr":"ar";render()};
const MAXP=3;
function err2(k){errKey=k;perr2.textContent=k?T[lang][k]:"";perr2.hidden=!k}
function loadImg(f){
  if(window.createImageBitmap)return createImageBitmap(f,{imageOrientation:"from-image"}).catch(()=>createImageBitmap(f)).catch(()=>null);
  return new Promise(r=>{const u=URL.createObjectURL(f),im=new Image();im.onload=()=>{URL.revokeObjectURL(u);r(im)};im.onerror=()=>{URL.revokeObjectURL(u);r(null)};im.src=u});
}
async function shrink(f){
  const im=await loadImg(f);if(!im)return null;
  const w=im.width||im.naturalWidth,h=im.height||im.naturalHeight,s=Math.min(1,1280/Math.max(w,h));
  const c=document.createElement("canvas");c.width=Math.round(w*s);c.height=Math.round(h*s);
  c.getContext("2d").drawImage(im,0,0,c.width,c.height);
  if(im.close)im.close();
  const b=await new Promise(r=>c.toBlob(r,"image/jpeg",0.7));
  return b?new File([b],"photo.jpg",{type:"image/jpeg",lastModified:Date.now()}):null;
}
function drawThumbs(){
  thumbs.querySelectorAll("img").forEach(i=>URL.revokeObjectURL(i.src));
  thumbs.innerHTML="";
  const t=T[lang];
  picked.forEach((f,i)=>{
    const fg=document.createElement("figure"),im=document.createElement("img"),b=document.createElement("button"),c=document.createElement("b");
    im.src=URL.createObjectURL(f);im.alt="";
    b.type="button";b.textContent="×";b.dataset.i=i;b.title=t.del;b.setAttribute("aria-label",t.del+" "+(i+1));
    c.textContent=Math.max(1,Math.round(f.size/1024))+" KB";
    fg.append(im,b,c);thumbs.appendChild(fg);
  });
}
pick.onchange=()=>{
  const files=[...pick.files],my=++seq;
  let warn="";
  if(files.length>MAXP)warn="phtoo";
  const want=files.slice(0,MAXP),ok=want.filter(f=>/^image\//.test(f.type));
  if(ok.length<want.length)warn="pherr";
  err2(warn);picked=[];drawThumbs();
  pending=(async()=>{
    const out=[];let bad=false;
    for(const f of ok){const b=await shrink(f);if(my!==seq)return;if(b)out.push(b);else bad=true}
    if(my!==seq)return;
    picked=out;
    const total=picked.reduce((s,f)=>s+f.size,0);
    if(bad)warn="phno";else if(total>6*1024*1024)warn="phtbig";
    err2(warn);drawThumbs();
  })();
};
thumbs.onclick=e=>{const b=e.target.closest("button[data-i]");if(b){picked.splice(+b.dataset.i,1);drawThumbs()}};
function joinOk(){jf.hidden=true;jok.hidden=false;jok.focus()}
jf.onsubmit=async e=>{
  e.preventDefault();
  const t=T[lang],ph=jf.elements.phone;
  if(jf.elements["bot-field"].value)return joinOk();
  const tel=normTel(ph.value);
  if(!tel){perrKey="badph";perr.textContent=t[perrKey];perr.hidden=false;ph.setAttribute("aria-invalid","true");ph.focus();return}
  perrKey="";perr.hidden=true;ph.removeAttribute("aria-invalid");
  ph.value=tel;
  await pending;
  pick.value="";
  jf.querySelectorAll("input[type=file][name]").forEach(el=>el.remove());
  const g=new FormData(jf);
  picked.forEach((f,i)=>g.append("w"+i,f,"w"+i+".jpg"));
  const extra=picked.length?"\n"+t.phn+": "+picked.length:"";
  const msg=[t.hello,"",t.f[0]+": "+g.get("name"),t.f[1]+": "+g.get("service"),t.f[2]+": "+((CN[g.get("city")]||{})[lang]||g.get("city")),t.f[5]+": "+fcat.options[fcat.selectedIndex].textContent,t.f[6]+": "+fplan.options[fplan.selectedIndex].textContent,t.f[3]+": "+tel,t.f[4]+": "+(g.get("desc")||"-")].join("\n")+extra;
  const url="https://wa.me/"+CONFIG.whatsapp+"?text="+encodeURIComponent(msg);
  sentPhotos=picked.length;
  joks.textContent=t.joks+(sentPhotos?" "+t.jph:"");
  fetch("/",{method:"POST",body:g}).catch(()=>{});
  window.open(url,"_blank","noopener");
  jwa.href=url;
  joinOk();
};
jwa.href="https://wa.me/"+CONFIG.whatsapp;
wf.href="https://wa.me/"+CONFIG.whatsapp;
if(CONFIG.facebook)fb.href=CONFIG.facebook;else fb.style.display="none";
cats.onclick=e=>{const b=e.target.closest("[data-c]");if(b){cat=cat===b.dataset.c?"":b.dataset.c;render()}};
let deb;
q.oninput=()=>{term=norm(q.value);clearTimeout(deb);deb=setTimeout(renderList,140)};
chips.onclick=e=>{const b=e.target.closest("[data-i]");if(b){city=+b.dataset.i;render()}};
render();