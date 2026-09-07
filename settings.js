let D=getData();const $=s=>document.querySelector(s);
function getData(){try{return JSON.parse(localStorage.getItem("mincoffeData"))||window.DEFAULT_MENU}catch(e){return window.DEFAULT_MENU}}
function save(){localStorage.setItem("mincoffeData",JSON.stringify(D));$("#saved").textContent="Tersimpan ✓";setTimeout(()=>$("#saved").textContent="",1800)}
function money(n){return new Intl.NumberFormat("id-ID").format(n)}
function renderRows(type){
 const box=$("#"+type+"Rows");box.innerHTML="";
 D[type].forEach((m,i)=>{
  const row=document.createElement("div");row.className="edit-row";
  row.innerHTML=`<div class="thumb"><img src="${m.image}" id="${type}img${i}"></div><div class="fields"><label>Nama menu<input value="${m.name}" data-k="${type}" data-i="${i}" data-f="name"></label><label>Harga (Rp)<input type="number" value="${m.price}" data-k="${type}" data-i="${i}" data-f="price"></label><label>URL foto HD<input value="${m.image}" data-k="${type}" data-i="${i}" data-f="image"></label><label class="upload">Upload foto dari HP/laptop<input type="file" accept="image/*" data-upload="${type}" data-i="${i}"></label></div>`;
  box.appendChild(row);
 });
}
function bind(){
 document.querySelectorAll("input[data-f]").forEach(el=>el.oninput=e=>{const k=e.target.dataset.k,i=+e.target.dataset.i,f=e.target.dataset.f;D[k][i][f]=f==="price"?Number(e.target.value):e.target.value;if(f==="image")document.getElementById(k+"img"+i).src=e.target.value;});
 document.querySelectorAll("input[data-upload]").forEach(el=>el.onchange=e=>{const f=e.target.files[0];if(!f)return;const reader=new FileReader();reader.onload=()=>{D[e.target.dataset.upload][+e.target.dataset.i].image=reader.result;document.getElementById(e.target.dataset.upload+"img"+e.target.dataset.i).src=reader.result;save()};reader.readAsDataURL(f)});
}
function init(){ $("#shopName").value=D.shopName;$("#phone").value=D.phone;$("#address").value=D.address;$("#hours").value=D.hours;renderRows("coffee");renderRows("food");bind()}
$("#settings").onsubmit=e=>{e.preventDefault();D.shopName=$("#shopName").value;D.phone=$("#phone").value;D.address=$("#address").value;D.hours=$("#hours").value;save();};
$("#reset").onclick=()=>{if(confirm("Kembalikan semua menu ke data awal?")){localStorage.removeItem("mincoffeData");D=window.DEFAULT_MENU;init();save()}};
init();