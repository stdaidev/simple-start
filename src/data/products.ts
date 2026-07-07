import imgSk01 from "@/assets/p-sk-01.jpg";
import imgSk02 from "@/assets/p-sk-02.jpg";
import imgSk03 from "@/assets/p-sk-03.jpg";
import imgSk04 from "@/assets/p-sk-04.jpg";
import imgSk05 from "@/assets/p-sk-05.jpg";
import imgCa01 from "@/assets/p-ca-01.jpg";
import imgCa02 from "@/assets/p-ca-02.jpg";
import imgCa03 from "@/assets/p-ca-03.jpg";
import imgCa04 from "@/assets/p-ca-04.jpg";
import imgCa05 from "@/assets/p-ca-05.jpg";
import imgCo01 from "@/assets/p-co-01.jpg";
import imgCo02 from "@/assets/p-co-02.jpg";
import imgCo03 from "@/assets/p-co-03.jpg";
import imgCo04 from "@/assets/p-co-04.jpg";
import imgCo05 from "@/assets/p-co-05.jpg";

export type Category = "skincare" | "cabelo" | "corpo";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  gradient: "blush" | "lavender" | "hero";
  surface: "blush" | "blush-soft" | "iris-soft" | "lavender-soft";
  image: string;
};

export const CATEGORIES: { value: Category | "todos"; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "skincare", label: "Skincare" },
  { value: "cabelo", label: "Cabelo" },
  { value: "corpo", label: "Corpo" },
];

export const products: Product[] = [
  // Skincare
  {
    id: "sk-01",
    slug: "serum-vitamina-c-radiancia",
    name: "Sérum Vitamina C Radiância",
    category: "skincare",
    price: 129.9,
    description: "Sérum antioxidante para uniformizar o tom e iluminar a pele.",
    gradient: "blush",
    surface: "blush",
  },
  {
    id: "sk-02",
    slug: "hidratante-facial-diario",
    name: "Hidratante Facial Diário",
    category: "skincare",
    price: 89.9,
    description: "Textura leve com ácido hialurônico para hidratação profunda.",
    gradient: "blush",
    surface: "blush-soft",
  },
  {
    id: "sk-03",
    slug: "protetor-solar-fps50",
    name: "Protetor Solar FPS 50",
    category: "skincare",
    price: 109.9,
    description: "Proteção diária com toque seco e acabamento aveludado.",
    gradient: "hero",
    surface: "blush",
  },
  {
    id: "sk-04",
    slug: "agua-micelar-suave",
    name: "Água Micelar Suave",
    category: "skincare",
    price: 59.9,
    description: "Limpeza delicada que remove impurezas sem ressecar.",
    gradient: "blush",
    surface: "blush-soft",
  },
  {
    id: "sk-05",
    slug: "mascara-noturna-recuperadora",
    name: "Máscara Noturna Recuperadora",
    category: "skincare",
    price: 149.9,
    description: "Ritual noturno com peptídeos para uma pele descansada.",
    gradient: "hero",
    surface: "blush",
  },

  // Cabelo
  {
    id: "ca-01",
    slug: "shampoo-nutritivo-rosas",
    name: "Shampoo Nutritivo Rosas",
    category: "cabelo",
    price: 74.9,
    description: "Limpeza suave com extrato de rosas para fios macios.",
    gradient: "lavender",
    surface: "iris-soft",
  },
  {
    id: "ca-02",
    slug: "condicionador-brilho-seda",
    name: "Condicionador Brilho de Seda",
    category: "cabelo",
    price: 79.9,
    description: "Selamento das cutículas para brilho e movimento.",
    gradient: "lavender",
    surface: "lavender-soft",
  },
  {
    id: "ca-03",
    slug: "mascara-reconstrutora-intensa",
    name: "Máscara Reconstrutora Intensa",
    category: "cabelo",
    price: 119.9,
    description: "Tratamento semanal para fios danificados e ressecados.",
    gradient: "lavender",
    surface: "iris-soft",
  },
  {
    id: "ca-04",
    slug: "leave-in-multibeneficio",
    name: "Leave-in Multibenefício",
    category: "cabelo",
    price: 89.9,
    description: "10 em 1: proteção térmica, brilho, controle de frizz.",
    gradient: "lavender",
    surface: "lavender-soft",
  },
  {
    id: "ca-05",
    slug: "oleo-finalizador-lavanda",
    name: "Óleo Finalizador Lavanda",
    category: "cabelo",
    price: 99.9,
    description: "Toque final aveludado com aroma delicado de lavanda.",
    gradient: "lavender",
    surface: "iris-soft",
  },

  // Corpo
  {
    id: "co-01",
    slug: "hidratante-corporal-veludo",
    name: "Hidratante Corporal Veludo",
    category: "corpo",
    price: 89.9,
    description: "Manteiga leve que deixa a pele macia e perfumada.",
    gradient: "blush",
    surface: "blush-soft",
  },
  {
    id: "co-02",
    slug: "oleo-corporal-flor-cerejeira",
    name: "Óleo Corporal Flor de Cerejeira",
    category: "corpo",
    price: 119.9,
    description: "Ritual sensorial pós-banho com toque seco.",
    gradient: "blush",
    surface: "blush",
  },
  {
    id: "co-03",
    slug: "esfoliante-corporal-rose",
    name: "Esfoliante Corporal Rosé",
    category: "corpo",
    price: 99.9,
    description: "Grãos finos e óleos nobres para renovar a pele.",
    gradient: "blush",
    surface: "blush-soft",
  },
  {
    id: "co-04",
    slug: "sabonete-liquido-cremoso",
    name: "Sabonete Líquido Cremoso",
    category: "corpo",
    price: 54.9,
    description: "Limpeza cremosa com perfume floral discreto.",
    gradient: "blush",
    surface: "blush",
  },
  {
    id: "co-05",
    slug: "creme-maos-lavanda-mel",
    name: "Creme de Mãos Lavanda & Mel",
    category: "corpo",
    price: 44.9,
    description: "Hidratação instantânea com toque não pegajoso.",
    gradient: "lavender",
    surface: "lavender-soft",
  },
];

export function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
