function getData(){try{return JSON.parse(localStorage.getItem("mincoffeData"))||window.DEFAULT_MENU}catch(e){return window.DEFAULT_MENU}}
const DATA=getData();
const rupiah=n=>new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(Number(n)||0);
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function card(x){return `<article class="card"><div class="photo"><img src="${esc(x.image)}" alt="${esc(x.name)}" loading="lazy"></div><div class="card-info"><h3>${esc(x.name)}</h3><span>${rupiah(x.price)}</span><button onclick="order('${esc(x.name).replace(/'/g,"\\'")}')">＋</button></div></article>`}
function menuSlide(id,title,items,kicker,page){return `<section class="menu-slide" id="${id}"><div class="menu-head"><div><p class="eyebrow">${kicker}</p><h2>${title}</h2><p>Rasa terbaik dalam setiap pilihan.</p></div><div class="page">${page}</div></div><div class="grid">${items.map(card).join("")}</div></section>`}
function render(){
 document.getElementById("coffeeArea").innerHTML=[
  menuSlide("coffee-1","Coffee <i>Menu</i>",DATA.coffee.slice(0,6),"03 • COFFEE SELECTION","01 / 05"),
  menuSlide("coffee-2","Coffee <i>Menu</i>",DATA.coffee.slice(6,12),"04 • COFFEE SELECTION","02 / 05"),
  menuSlide("coffee-3","Coffee <i>Menu</i>",DATA.coffee.slice(12,18),"05 • COFFEE SELECTION","03 / 05"),
  menuSlide("coffee-4","Coffee <i>Menu</i>",DATA.coffee.slice(18,24),"06 • COFFEE SELECTION","04 / 05"),
  menuSlide("coffee-5","Coffee <i>Menu</i>",DATA.coffee.slice(24,30),"07 • COFFEE SELECTION","05 / 05")
 ].join("");
 document.getElementById("foodArea").innerHTML=[
  menuSlide("food-1","Main <i>Course</i>",DATA.food.slice(0,10),"09 • MAIN COURSE","01 / 02"),
  menuSlide("food-2","Main <i>Course</i>",DATA.food.slice(10,20),"10 • MAIN COURSE","02 / 02")
 ].join("");
 document.querySelectorAll("[data-shop]").forEach(el=>el.textContent=DATA.shopName);
 document.querySelectorAll("[data-phone]").forEach(el=>{el.textContent=DATA.phone;el.href="tel:"+DATA.phone.replace(/\D/g,"")});
 document.querySelector("[data-address]").textContent=DATA.address;
 document.querySelector("[data-hours]").textContent=DATA.hours;
 document.title=DATA.shopName+" — "+DATA.tagline;
}
function order(name){const t=document.getElementById("toast");t.textContent=name+" • Hubungi "+DATA.phone;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),3200)}
render();