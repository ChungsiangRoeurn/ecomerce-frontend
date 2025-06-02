// hooks/useCartStore.ts
import { create } from 'zustand';

interface CartItem {
  product: any;
  variant: any;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter(
        (item) => item.product.product_id !== productId
      ),
    })),
  clearCart: () => set({ items: [] }),
}));
