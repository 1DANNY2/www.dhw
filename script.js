const products=[
{id:1,name:"DHW Classic Red Hoodie",price:650,sizes:["S","M","L","XL","XXL"],img:"assets/hoodie_1_red_K450.png"},
{id:2,name:"DHW Premium Street Hoodie",price:750,sizes:["M","L","XL"],img:"assets/dhw-hoodie.png"},
{id:3,name:"DHW Everyday Hoodie",price:600,sizes:["S","M","L","XL"],img:"assets/dhw-hoodie.png"},
{id:4,name:"DHW Signature Hoodie",price:850,sizes:["L","XL","XXL"],img:"assets/dhw-hoodie.png"}
];
let cart=JSON.parse(localStorage.getItem("dhwCart")||"[]");
const grid=document.getElementById("productGrid"), search=document.getElementById("search"), sizeFilter=document.getElementById("sizeFilter");

function renderProducts(){
 const q=search.value.toLowerCase(), size=sizeFilter.value;
 const list=products.filter(p=>(p.name.toLowerCase().includes(q))&&(size==="all"||p.sizes.includes(size)));
 grid.innerHTML=list.map(p=>`<article class="product"><img src="${p.img}" alt="${p.name}"><div class="product-body"><h3>${p.name}</h3><div class="price">K${p.price}</div><div class="muted">Sizes: ${p.sizes.join(", ")}</div><div class="product-actions"><button class="add" onclick="addToCart(${p.id})">Add to Cart</button><button onclick="orderOne(${p.id})">WhatsApp</button></div></div></article>`).join("")||"<p>No hoodies found.</p>";
}
function addToCart(id){const p=products.find(x=>x.id===id);const item=cart.find(x=>x.id===id);item?item.qty++:cart.push({...p,qty:1});save();openCart();}
function save(){localStorage.setItem("dhwCart",JSON.stringify(cart));renderCart();}
function renderCart(){
 document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-item"><img src="${x.img}" alt=""><div><strong>${x.name}</strong><div>K${x.price} × ${x.qty}</div><div class="qty"><button onclick="changeQty(${x.id},-1)">−</button> <button onclick="changeQty(${x.id},1)">+</button></div></div><strong>K${x.price*x.qty}</strong></div>`).join(""):"<p>Your cart is empty.</p>";
 document.getElementById("cartTotal").textContent="K"+cart.reduce((s,x)=>s+x.price*x.qty,0);
}
function changeQty(id,n){const x=cart.find(i=>i.id===id);if(!x)return;x.qty+=n;if(x.qty<=0)cart=cart.filter(i=>i.id!==id);save();}
function orderOne(id){const p=products.find(x=>x.id===id);const msg=`Hello DHW, I would like to order: ${p.name} - K${p.price}. Please confirm available sizes and delivery/payment details.`;window.open("https://wa.me/260977388313?text="+encodeURIComponent(msg),"_blank");}
function openCart(){document.getElementById("cartPanel").classList.add("open");document.getElementById("overlay").classList.add("show")}
function closeCart(){document.getElementById("cartPanel").classList.remove("open");document.getElementById("overlay").classList.remove("show")}
document.getElementById("cartOpen").onclick=openCart;document.getElementById("cartClose").onclick=closeCart;document.getElementById("overlay").onclick=closeCart;
document.getElementById("clearCart").onclick=()=>{cart=[];save()};
document.getElementById("whatsappOrder").onclick=()=>{if(!cart.length)return alert("Your cart is empty.");const lines=cart.map(x=>`${x.name} x${x.qty} = K${x.price*x.qty}`).join("\n");const total=cart.reduce((s,x)=>s+x.price*x.qty,0);const msg=`Hello DHW, I would like to place an order:\n${lines}\nTotal: K${total}\nPlease confirm size availability, delivery and payment details.`;window.open("https://wa.me/260977388313?text="+encodeURIComponent(msg),"_blank")};
search.oninput=renderProducts;sizeFilter.onchange=renderProducts;
document.getElementById("menuBtn").onclick=()=>document.getElementById("navMenu").classList.toggle("nav-open");

document.getElementById("bookingForm").addEventListener("submit", function(e){
  e.preventDefault();
  const name=document.getElementById("bookingName").value.trim();
  const phone=document.getElementById("bookingPhone").value.trim();
  const email=document.getElementById("bookingEmail").value.trim();
  const type=document.getElementById("bookingType").value;
  const date=document.getElementById("bookingDate").value || "Not specified";
  const time=document.getElementById("bookingTime").value || "Not specified";
  const message=document.getElementById("bookingMessage").value.trim();

  const text=`Hello DHW, I would like to make a booking/inquiry.

Name: ${name}
Phone/WhatsApp: ${phone}
Email: ${email || "Not provided"}
Inquiry type: ${type}
Preferred date: ${date}
Preferred time: ${time}

Details:
${message}

Please get back to me with the next steps.`;

  window.open("https://wa.me/260977388313?text="+encodeURIComponent(text),"_blank");
});

renderProducts();renderCart();

const copyPaymentNumber=document.getElementById("copyPaymentNumber");
if(copyPaymentNumber){
  copyPaymentNumber.addEventListener("click", async ()=>{
    const number="0977388313";
    try{
      await navigator.clipboard.writeText(number);
      document.getElementById("copyMessage").textContent="Payment number copied.";
    }catch(e){
      document.getElementById("copyMessage").textContent="Payment number: 0977388313";
    }
  });
}
