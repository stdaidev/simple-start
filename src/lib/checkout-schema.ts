import { z } from "zod";

const UF_LIST = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB",
  "PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
] as const;

export const checkoutSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(3, "Informe seu nome completo"),
  email: z
    .string()
    .trim()
    .email("E-mail inválido"),
  phone: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length >= 8, "Telefone inválido"),
  zip: z
    .string()
    .trim()
    .refine((v) => v.replace(/\D/g, "").length === 8, "CEP deve ter 8 dígitos"),
  address: z.string().trim().min(3, "Informe o endereço"),
  number: z.string().trim().min(1, "Informe o número"),
  complement: z.string().trim().optional(),
  city: z.string().trim().min(2, "Informe a cidade"),
  state: z
    .string()
    .trim()
    .toUpperCase()
    .refine((v) => (UF_LIST as readonly string[]).includes(v), "UF inválida"),
});

export type CheckoutForm = z.infer<typeof checkoutSchema>;

export function generateOrderNumber(): string {
  const bytes = new Uint8Array(3);
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    crypto.getRandomValues(bytes);
  } else {
    for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  const hex = Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
  return `LB-${hex.toUpperCase()}`;
}

export type OrderSnapshotItem = {
  productId: string;
  name: string;
  category: string;
  qty: number;
  unitPrice: number;
  lineTotal: number;
};

export type OrderSnapshot = {
  orderNumber: string;
  items: OrderSnapshotItem[];
  subtotal: number;
  total: number;
  createdAt: string;
};
