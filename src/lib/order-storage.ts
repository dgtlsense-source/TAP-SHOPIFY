export type OrderItem = {
  code: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
};

export type Order = {
  id: string;
  placedAt: string;
  email: string;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pin: string;
    country: string;
  };
  payment: "upi" | "card" | "cod";
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
};

const KEY = "tap.lastOrder";

export function saveLastOrder(order: Order) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(KEY, JSON.stringify(order));
  } catch {
    // ignore
  }
}

export function loadLastOrder(): Order | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}
