// Erilliset alennusstrategiat funktioina
const noDiscount = (sum) => sum;
const tenPercentDiscount = (sum) => sum * 0.9;
const createPercentageDiscount = (percent) => (sum) => sum * (1 - percent / 100);

class ShoppingCart {
  constructor(discountStrategy = noDiscount) {
    this.items = [];
    this.discountStrategy = discountStrategy;
  }

  add(product) {
    this.items.push(product);
  }

  remove(id) {
    this.items = this.items.filter((item) => item.id !== id);
  }

  clear() {
    this.items = [];
  }

  get total() {
    const rawTotal = this.items.reduce((sum, item) => sum + item.price, 0);
    return this.discountStrategy(rawTotal);
  }
}

// Testataan toteutusta tavallisilla olioilla (ei Product-luokkahierarkiaa)
const cart = new ShoppingCart(tenPercentDiscount);

cart.add({ id: 1, name: "Näppäimistö", price: 80 });
cart.add({ id: 2, name: "Hiiri", price: 40 });
cart.add({ id: 3, name: "Hiirimatto", price: 20 });

console.log("Yhteensä (10 % alennus):", cart.total); // (80 + 40 + 20) * 0.9 = 126

cart.remove(2);
console.log("Hiiren poiston jälkeen:", cart.total); // (80 + 20) * 0.9 = 90

cart.clear();
console.log("Tyhjennyksen jälkeen:", cart.total); // 0