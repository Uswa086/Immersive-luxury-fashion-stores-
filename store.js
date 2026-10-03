
const WHATSAPP = "923157540218";

const starterProducts = [
  {id:1,name:"Printed Lawn",category:"Ladies",type:"Lawn",price:1850,image:"https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=700&q=80"},
  {id:2,name:"Everyday Cotton",category:"Ladies",type:"Cotton",price:1650,image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80"},
  {id:3,name:"Embroidered Fabric",category:"Ladies",type:"Embroidered",price:2950,image:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"Winter Khaddar",category:"Ladies",type:"Khaddar",price:2250,image:"https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=700&q=80"},
  {id:5,name:"Premium Wash & Wear",category:"Gents",type:"Wash & Wear",price:2750,image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80"},
  {id:6,name:"Gents Cotton",category:"Gents",type:"Cotton",price:1950,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"},
  {id:7,name:"Classic Boski",category:"Gents",type:"Boski",price:3200,image:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=80"},
  {id:8,name:"Gents Linen Blend",category:"Gents",type:"Linen",price:2550,image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=80"}
];

let products;
try {
  products = JSON.parse(localStorage.getItem("ilfs-products")) || starterProducts;
} catch (e) {
  products = starterProducts;
}

const grid = document.getElementById("products");
const search = document.getElementById("search");
const category = document.getElementById("category");
const type = document.getElementById("type");

function showProducts() {
  const q = search.value.toLowerCase();
  const c = category.value;
  const t = type.value;

  const filtered = products.filter(p =>
    (c === "All" || p.category === c) &&
    (t === "All" || p.type === t) &&
    (p.name + " " + p.type + " " + p.category).toLowerCase().includes(q)
  );

  if (!filtered.length) {
    grid.innerHTML = "<p>No products found. Please try another search.</p>";
    return;
  }

  grid.innerHTML = filtered.map(p => `
    <article class="product">
      <img src="${p.image}" alt="${p.name}" loading="lazy"
        onerror="this.onerror=null;this.src='https://placehold.co/600x500/24211b/d7b56d?text=Fabric+Photo'">
      <div class="product-info">
        <div class="tag">${p.category} · ${p.type}</div>
        <h3>${p.name}</h3>
        <p class="price">Rs. ${Number(p.price).toLocaleString("en-PK")}</p>
        <button class="button" onclick="orderProduct(${p.id})">Buy on WhatsApp</button>
      </div>
    </article>
  `).join("");
}

function orderProduct(id) {
  const p = products.find(item => item.id === id);
  if (!p) return;

  const message = `Assalam-o-Alaikum! I want to enquire about this unstitched fabric:\n\nProduct: ${p.name}\nCategory: ${p.category}\nType: ${p.type}\nListed price: Rs. ${p.price}\n\nPlease confirm actual stock, fabric details, delivery charges and final price.`;
  window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(message), "_blank");
}

search.addEventListener("input", showProducts);
category.addEventListener("change", showProducts);
type.addEventListener("change", showProducts);

document.getElementById("year").textContent = new Date().getFullYear();
showProducts();
        
