// ===== Utilities =====
const fmt = new Intl.NumberFormat('es-SV', {
  style: 'currency',
  currency: 'USD',
});

// ===== Models (POO) =====
class Product {
  constructor({ id, name, price, stock, imageUrl }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
    this.imageUrl = imageUrl;
  }
}

class Inventory {
  static STORAGE_KEY = 'inventario';
  constructor() {
    this.products = [];
  }
  load() {
    const raw = localStorage.getItem(Inventory.STORAGE_KEY);
    if (raw) {
      try {
        this.products = JSON.parse(raw).map((p) => new Product(p));
      } catch {
        this.products = [];
      }
    }
    return this;
  }
  save() {
    localStorage.setItem(Inventory.STORAGE_KEY, JSON.stringify(this.products));
  }
  seedIfEmpty() {
    this.load();
    if (this.products.length > 0) return; // si aun tengo productos no volver a generar productos de cero
    const seeded = [
      {
        id: 'p1',
        name: 'Café en grano 500g',
        price: 8.5,
        stock: 12,
        imageUrl: './img/cafe.jpg',
      },
      {
        id: 'p2',
        name: 'Té verde orgánico',
        price: 6.9,
        stock: 15,
        imageUrl: './img/te.jpg',
      },
      {
        id: 'p3',
        name: 'Miel pura 300ml',
        price: 5.75,
        stock: 10,
        imageUrl: './img/miel.jpg',
      },
      {
        id: 'p4',
        name: 'Galletas avena',
        price: 3.25,
        stock: 20,
        imageUrl: './img/galleta.jpg',
      },
      {
        id: 'p5',
        name: 'Chocolate 70%',
        price: 4.8,
        stock: 18,
        imageUrl: './img/chocolate.jpg',
      },
      {
        id: 'p6',
        name: 'Granola 400g',
        price: 7.2,
        stock: 8,
        imageUrl: './img/granola.jpg',
      },
      {
        id: 'p7',
        name: 'Cereal crujiente',
        price: 4.1,
        stock: 22,
        imageUrl: './img/cereal.jpg',
      },
      {
        id: 'p8',
        name: 'Leche de almendras',
        price: 3.9,
        stock: 14,
        imageUrl: './img/leche.jpg',
      },
      {
        id: 'p9',
        name: 'Mantequilla maní',
        price: 5.3,
        stock: 9,
        imageUrl: './img/mantequilla.jpg',
      },
      {
        id: 'p10',
        name: 'Aceite de oliva',
        price: 9.9,
        stock: 7,
        imageUrl: './img/aceite.jpg',
      },
      {
        id: 'p11',
        name: 'Atún en agua',
        price: 2.6,
        stock: 25,
        imageUrl: './img/atun.jpg',
      },
      {
        id: 'p12',
        name: 'Pasta integral',
        price: 2.9,
        stock: 30,
        imageUrl: './img/pasta.jpg',
      },
      {
        id: 'p13',
        name: 'Pan integral',
        price: 5.8,
        stock: 10,
        imageUrl: './img/pan.jpg',
      },
      {
        id: 'p14',
        name: 'Piña',
        price: 3.5,
        stock: 12,
        imageUrl: './img/piña.jpg',
      },
      {
        id: 'p15',
        name: 'Zanahoria lb',
        price: 0.9,
        stock: 30,
        imageUrl: './img/zanahoria.jpg',
      },
      {
        id: 'p16',
        name: 'Arroz',
        price: 0.75,
        stock: 35,
        imageUrl: './img/arroz.jpg',
      },
      {
        id: 'p17',
        name: 'Yogurt griego',
        price: 1.0,
        stock: 6,
        imageUrl: './img/yogurt.jpg',
      },
      {
        id: 'p18',
        name: 'Cartón de huevos',
        price: 5.0,
        stock: 20,
        imageUrl: './img/huevos.jpg',
      },
      {
        id: 'p19',
        name: 'Alimento para perros',
        price: 43.0,
        stock: 16,
        imageUrl: './img/perros.jpg',
      },
      {
        id: 'p20',
        name: 'Arándanos congelados',
        price: 5.6,
        stock: 9,
        imageUrl: './img/arandanos.jpg',
      },
    ].map((p) => new Product(p));
    this.products = seeded;
    this.save();
  }
  getAll() {
    return [...this.products];
  }
  findById(id) {
    return this.products.find((product) => product.id === id);
  }
  search(term) {
    const t = term.trim().toLowerCase();
    if (!t) return this.getAll();
    return this.products.filter((product) =>
      prodcut.name.toLowerCase().includes(t)
    );
  }
  decrease(id, qty) {
    const product = this.findById(id);
    if (!product) return false;
    if (product.stock < qty) return false;
    product.stock -= qty;
    this.save();
    return true;
  }
  increase(id, qty) {
    const product = this.findById(id);
    if (!product) return false;
    product.stock += qty;
    this.save();
    return true;
  }
}

class CartItem {
  constructor({ productId, name, price, qty, imageUrl }) {
    this.productId = productId;
    this.name = name;
    this.price = price;
    this.qty = qty;
    this.imageUrl = imageUrl;
  }
  get subtotal() {
    return this.qty * this.price;
  }
}

class Cart {
  static STORAGE_KEY = 'carrito';
  constructor(inventory) {
    this.inventory = inventory;
    this.items = [];
  }
  load() {
    const raw = localStorage.getItem(Cart.STORAGE_KEY);
    if (raw) {
      try {
        this.items = JSON.parse(raw).map((i) => new CartItem(i));
      } catch {
        this.items = [];
      }
    }
    return this;
  }
  save() {
    localStorage.setItem(Cart.STORAGE_KEY, JSON.stringify(this.items));
  }
  count() {
    return this.items.reduce((a, i) => a + i.qty, 0);
  }
  total() {
    return this.items.reduce((a, i) => a + i.subtotal, 0);
  }
  get(productId) {
    return this.items.find((value) => value.productId === productId);
  }
  add(product, qty = 1) {
    if (!this.inventory.decrease(product.id, qty)) return false;
    const existing = this.get(product.id);
    if (existing) existing.qty += qty;
    else
      this.items.push(
        new CartItem({
          productId: product.id,
          name: product.name,
          price: product.price,
          qty,
          imageUrl: product.imageUrl,
        })
      );
    this.save();
    return true;
  }
  remove(productId) {
    const item = this.get(productId);
    if (!item) return;
    this.inventory.increase(productId, item.qty);
    this.items = this.items.filter((i) => i.productId !== productId);
    this.save();
  }
  setQty(productId, newQty) {
    const item = this.get(productId);
    if (!item) return false;
    if (newQty <= 0) {
      this.remove(productId);
      return true;
    }
    const current = item.qty;
    if (newQty > current) {
      const diff = newQty - current;
      if (!this.inventory.decrease(productId, diff)) return false;
      item.qty = newQty;
    } else if (newQty < current) {
      const diff = current - newQty;
      this.inventory.increase(productId, diff);
      item.qty = newQty;
    }
    this.save();
    return true;
  }
  clear() {
    // reiniciar stock
    for (const i of this.items) this.inventory.increase(i.productId, i.qty);
    this.items = [];
    this.save();
  }
  checkout() {
    // simular pago
    this.items = [];
    this.save();
  }
}

class StoreApp {
  constructor() {
    this.inventory = new Inventory();
    this.inventory.seedIfEmpty();
    this.cart = new Cart(this.inventory).load();
    this.downloadInvoiceBtn = document.getElementById('downloadInvoiceBtn');
    this.downloadInvoiceBtn.addEventListener('click', () => this.downloadInvoicePDF());


    // referencias de elementos del DOM
    this.grid = document.getElementById('productsGrid');
    this.searchInput = document.getElementById('searchInput');
    this.clearSearchBtn = document.getElementById('clearSearchBtn');
    this.resultsHint = document.getElementById('resultsHint');
    this.cartCount = document.getElementById('cartCount');
    this.cartItems = document.getElementById('cartItems');
    this.cartTotal = document.getElementById('cartTotal');
    this.openCartBtn = document.getElementById('openCartBtn');
    this.openCartLink = document.getElementById('openCartLink');
    this.clearCartBtn = document.getElementById('clearCartBtn');
    this.checkoutBtn = document.getElementById('checkoutBtn');

    this.cartCanvas = new bootstrap.Offcanvas('#cartOffcanvas');

    // Event handlers
    this.openCartBtn.addEventListener('click', () => this.cartCanvas.show());
    this.openCartLink.addEventListener('click', (e) => {
      e.preventDefault();
      this.cartCanvas.show();
    });
    this.searchInput.addEventListener('input', () => this.renderProducts());
    this.clearSearchBtn.addEventListener('click', () => {
      this.searchInput.value = '';
      this.renderProducts();
    });
    this.grid.addEventListener('click', (e) => this.onGridClick(e));
    this.cartItems.addEventListener('click', (e) => this.onCartClick(e));
    this.cartItems.addEventListener('change', (e) => this.onCartChange(e));
    this.clearCartBtn.addEventListener('click', () => {
      this.cart.clear();
      this.refreshUI();
    });
    this.checkoutBtn.addEventListener('click', () => this.onCheckout());

    this.renderProducts();
    this.renderCart();
  }

  downloadInvoicePDF() {
  if (!this.lastInvoice) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Encabezado
  doc.setFontSize(16);
  doc.text("Factura de compra - Gualmart", 20, 20);
  doc.setFontSize(10);
  doc.text(`Fecha: ${this.lastInvoice.date}`, 20, 28);

  // Tabla de productos
  let y = 40;
  doc.setFontSize(12);
  doc.text("Producto", 20, y);
  doc.text("Cant.", 90, y);
  doc.text("P.Unit", 120, y);
  doc.text("Subtotal", 160, y);

  y += 8;
  this.lastInvoice.items.forEach(item => {
    doc.text(item.name, 20, y);
    doc.text(String(item.qty), 95, y, { align: "right" });
    doc.text(fmt.format(item.price), 125, y, { align: "right" });
    doc.text(fmt.format(item.subtotal), 180, y, { align: "right" });
    y += 8;
  });

  // Totales
  y += 5;
  doc.setFontSize(12);
  doc.text(`Subtotal: ${fmt.format(this.lastInvoice.subtotal)}`, 140, y);
  y += 8;
  doc.text(`IVA (13%): ${fmt.format(this.lastInvoice.tax)}`, 140, y);
  y += 8;
  doc.text(`Total: ${fmt.format(this.lastInvoice.total)}`, 140, y);

  // Guardar
  doc.save("factura.pdf");
}

  get filteredProducts() {
    return this.inventory.search(this.searchInput.value || '');
  }

  renderProducts() {
    const products = this.filteredProducts;
    this.grid.innerHTML = '';
    const tmpl = document.getElementById('productCardTmpl');
    products.forEach((product) => {
      const node = tmpl.content.cloneNode(true);
      const img = node.querySelector('img');
      const title = node.querySelector('.card-title');
      const text = node.querySelector('.card-text');
      const stockBadge = node.querySelector('.badge-stock');
      const price = node.querySelector('.price');
      const btnAdd = node.querySelector('.btn-add');
      const inputQty = node.querySelector('.input-qty');
      const btnDec = node.querySelector('.btn-qty-dec');
      const btnInc = node.querySelector('.btn-qty-inc');

      img.src = product.imageUrl;
      img.loading = 'lazy';
      title.textContent = product.name;
      text.textContent = 'ID: ' + product.id;
      stockBadge.textContent = `Stock: ${product.stock}`;
      price.textContent = fmt.format(product.price);
      btnAdd.dataset.id = product.id;
      inputQty.dataset.id = product.id;
      inputQty.max = String(Math.max(1, product.stock));
      btnDec.dataset.id = btnInc.dataset.id = product.id;

      if (product.stock === 0) {
        btnAdd.disabled = true;
        inputQty.disabled = true;
        btnDec.disabled = true;
        btnInc.disabled = true;
        stockBadge.classList.replace('text-bg-success', 'text-bg-danger');
        stockBadge.textContent = 'Sin stock';
        img.style.filter = 'grayscale(100%)';
      } else {
        img.style.filter = 'none'; // para evitar problemas ocn elf iltro
      }
      this.grid.appendChild(node);
    });
    const total = products.length;
    const hint = this.searchInput.value
      ? `${total} resultado(s)`
      : `${total} producto(s)`;
    this.resultsHint.textContent = hint;
  }

  renderCart() {
    this.cartItems.innerHTML = '';
    const tmpl = document.getElementById('cartItemTmpl');
    for (const item of this.cart.items) {
      const node = tmpl.content.cloneNode(true);
      node.querySelector('img').src = item.imageUrl;
      node.querySelector('.item-name').textContent = item.name;
      node.querySelector('.item-price').textContent = fmt.format(item.price);
      node.querySelector('.item-subtotal').textContent = fmt.format(
        item.subtotal
      );
      const input = node.querySelector('.input-qty');
      input.value = String(item.qty);
      input.dataset.id = item.productId;
      node.querySelector('.btn-remove').dataset.id = item.productId;
      node.querySelector('.btn-dec').dataset.id = item.productId;
      node.querySelector('.btn-inc').dataset.id = item.productId;
      this.cartItems.appendChild(node);
    }
    this.cartTotal.textContent = fmt.format(this.cart.total());
    this.cartCount.textContent = this.cart.count();
  }

  refreshUI() {
    // Releer inventario por si cambió desde el carrito (osea simule una compra)
    this.inventory.load();
    this.cart.load();
    this.renderProducts();
    this.renderCart();
  }

  // --- Handlers ---
  onGridClick(e) {
    const id = e.target.closest('[data-id]')?.dataset.id;
    if (!id) return;
    const p = this.inventory.findById(id);
    if (!p) return;
    // botones + / - / add
    if (e.target.closest('.btn-qty-dec')) {
      const input = this.grid.querySelector(`.input-qty[data-id="${id}"]`);
      input.value = Math.max(1, parseInt(input.value || '1', 10) - 1);
    } else if (e.target.closest('.btn-qty-inc')) {
      const input = this.grid.querySelector(`.input-qty[data-id="${id}"]`);
      const current = parseInt(input.value || '1', 10);
      const max = Math.max(1, p.stock);
      input.value = Math.min(max, current + 1);
    } else if (e.target.closest('.btn-add')) {
      const input = this.grid.querySelector(`.input-qty[data-id="${id}"]`);
      const qty = Math.max(1, parseInt(input.value || '1', 10));
      if (qty > p.stock) {
        this.toast('No hay suficiente stock.');
        return;
      }
      const ok = this.cart.add(p, qty);
      if (!ok) this.toast('No fue posible agregar.');
      this.refreshUI();
      this.cartCanvas.show();
    }
  }

  onCartClick(e) {
    const id = e.target.closest('[data-id]')?.dataset.id;
    if (!id) return;
    if (e.target.closest('.btn-remove')) {
      this.cart.remove(id);
      this.refreshUI();
    } else if (e.target.closest('.btn-dec')) {
      const item = this.cart.get(id);
      if (!item) return;
      this.cart.setQty(id, item.qty - 1);
      this.refreshUI();
    } else if (e.target.closest('.btn-inc')) {
      const item = this.cart.get(id);
      if (!item) return;
      const p = this.inventory.findById(id);
      if (!p) return;
      if (p.stock <= 0) {
        this.toast('No hay más stock disponible.');
        return;
      }
      this.cart.setQty(id, item.qty + 1);
      this.refreshUI();
    }
  }

  onCartChange(e) {
    const target = e.target;
    if (!target.classList.contains('input-qty')) return;
    const id = target.dataset.id;
    const newQty = Math.max(1, parseInt(target.value || '1', 10));
    const ok = this.cart.setQty(id, newQty);
    if (!ok) this.toast('Cantidad no disponible');
    this.refreshUI();
  }

  onCheckout() {
     if (this.cart.items.length === 0) {
    this.toast('El carrito está vacío.');
    return;
  }

  // Generar factura antes de vaciar el carrito
  const invoiceBody = document.getElementById('invoiceBody');
  const invoiceSubtotal = document.getElementById('invoiceSubtotal');
  const invoiceTax = document.getElementById('invoiceTax');
  const invoiceTotal = document.getElementById('invoiceTotal');

  invoiceBody.innerHTML = '';
  let subtotal = 0;

  for (const item of this.cart.items) {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${item.name}</td>
      <td>${item.qty}</td>
      <td>${fmt.format(item.price)}</td>
      <td>${fmt.format(item.subtotal)}</td>
    `;
    invoiceBody.appendChild(tr);
    subtotal += item.subtotal;
  }

  const tax = subtotal * 0.13; // IVA 13%
  const total = subtotal + tax;

  invoiceSubtotal.textContent = fmt.format(subtotal);
  invoiceTax.textContent = fmt.format(tax);
  invoiceTotal.textContent = fmt.format(total);

  // Guardamos la última factura para PDF
  this.lastInvoice = {
    items: [...this.cart.items],
    subtotal,
    tax,
    total,
    date: new Date().toLocaleString("es-SV")
  };

  // Vaciar carrito (pero ya tenemos los datos en la factura)
  this.cart.checkout();
  this.refreshUI();

  // Mostrar modal de factura
  const invoiceModal = new bootstrap.Modal(document.getElementById('invoiceModal'));
  invoiceModal.show();
  
}

  toast(message) {
    // modal de error
    const el = document.createElement('div');
    el.className =
      'toast align-items-center text-bg-dark border-0 position-fixed bottom-0 end-0 m-3';
    el.role = 'alert';
    el.ariaLive = 'assertive';
    el.ariaAtomic = 'true';
    el.innerHTML = `<div class="d-flex"><div class="toast-body">${message}</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>`;
    document.body.appendChild(el);
    const t = new bootstrap.Toast(el, { delay: 2200 });
    t.show();
    el.addEventListener('hidden.bs.toast', () => el.remove());
  }
}

// correr script al cargar la pagina
document.addEventListener('DOMContentLoaded', () => {
  new StoreApp();
});
