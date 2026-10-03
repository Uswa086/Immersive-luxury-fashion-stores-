
const KEY = "ilfs-products";

const defaultProducts = [
  {id:1,name:"Printed Lawn",category:"Ladies",type:"Lawn",price:1850,image:"https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=700&q=80"},
  {id:2,name:"Everyday Cotton",category:"Ladies",type:"Cotton",price:1650,image:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=700&q=80"},
  {id:3,name:"Embroidered Fabric",category:"Ladies",type:"Embroidered",price:2950,image:"https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"Winter Khaddar",category:"Ladies",type:"Khaddar",price:2250,image:"https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=700&q=80"},
  {id:5,name:"Premium Wash & Wear",category:"Gents",type:"Wash & Wear",price:2750,image:"https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80"},
  {id:6,name:"Gents Cotton",category:"Gents",type:"Cotton",price:1950,image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80"},
  {id:7,name:"Classic Boski",category:"Gents",type:"Boski",price:3200,image:"https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&w=700&q=80"},
  {id:8,name:"Gents Linen Blend",category:"Gents",type:"Linen",price:2550,image:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=80"}
];

function loadProducts() {
  try {
    const saved = localStorage.getItem(KEY);
    return saved ? JSON.parse(saved) : defaultProducts;
  } catch (e) {
    return defaultProducts;
  }
}

let products = loadProducts();

const $ = id => document.getElementById(id);
const form = $("productForm");

function saveProducts() {
  localStorage.setItem(KEY, JSON.stringify(products));
  renderAdmin();
}

function clearForm() {
  form.reset();
  $("editId").value = "";
}

function renderAdmin() {
  $("adminProducts").innerHTML = products.map(p => `
    <div class="admin-list-item">
      <img src="${p.image}" alt="">
      <div>
        <strong>${p.name}</strong><br>
        ${p.category} · ${p.type}<br>
        Rs. ${Number(p.price).toLocaleString("en-PK")}
      </div>
      <div>
        <button onclick="editProduct(${p.id})">Edit</button>
        <button onclick="deleteProduct(${p.id})">Delete</button>
      </div>
    </div>
  `).join("") || "<p>No products yet.</p>";
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const id = $("editId").value;
  const product = {
    id: id ? Number(id) : Date.now(),
    name: $("name").value.trim(),
    category: $("cat").value.trim(),
    type: $("fabricType").value.trim(),
    price: Number($("price").value),
    image: $("image").value.trim()
  };

  if (!product.name || !product.type || !product.image || product.price < 1) {
    alert("Please fill in all fields correctly.");
    return;
  }

  if (id) {
    products = products.map(p => p.id === Number(id) ? product : p);
  } else {
    products.push(product);
  }

  saveProducts();
  clearForm();
  alert("Product saved in this browser.");
});

function editProduct(id) {
  const p = products.find(item => item.id === id);
  if (!p) return;

  $("editId").value = p.id;
  $("name").value = p.name;
  $("cat").value = p.category;
  $("fabricType").value = p.type;
  $("price").value = p.price;
  $("image").value = p.image;
  window.scrollTo({top: 0, behavior: "smooth"});
}

function deleteProduct(id) {
  if (!confirm("Delete this product?")) return;
  products = products.filter(p => p.id !== id);
  saveProducts();
}

$("cancelEdit").addEventListener("click", clearForm);

$("exportBtn").addEventListener("click", () => {
  const file = new Blob([JSON.stringify(products, null, 2)], {
    type: "application/json"
  });
  const url = URL.createObjectURL(file);
  const link = document.createElement("a");
  link.href = url;
  link.download = "uswa-collections-products.json";
  link.click();
  URL.revokeObjectURL(url);
});

renderAdmin();
