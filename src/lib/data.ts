export type Product = {
  name: string;
  price: string;
  image: string;
  category: string;
  badge?: string;
};

export const products: Product[] = [
  {
    name: "Velvet Cream Cleanser",
    price: "€ 30,95",
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80",
    category: "Skincare",
    badge: "Bestseller",
  },
  {
    name: "Silk Glow Foundation",
    price: "€ 42,50",
    image: "https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?w=400&q=80",
    category: "Makeup",
    badge: "New",
  },
  {
    name: "Rose Petal Lip Gloss",
    price: "€ 18,95",
    image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80",
    category: "Lips",
  },
  {
    name: "Precision Brush Set",
    price: "€ 55,00",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
    category: "Tools",
    badge: "Bestseller",
  },
  {
    name: "Hydra Boost Serum",
    price: "€ 38,95",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
    category: "Skincare",
  },
  {
    name: "Matte Velvet Lipstick",
    price: "€ 24,50",
    image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400&q=80",
    category: "Lips",
    badge: "New",
  },
  {
    name: "Contour & Highlight Palette",
    price: "€ 45,00",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
    category: "Makeup",
  },
  {
    name: "Jade Facial Roller",
    price: "€ 22,95",
    image: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=400&q=80",
    category: "Tools",
  },
  {
    name: "Gentle Exfoliating Scrub",
    price: "€ 28,50",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
    category: "Skincare",
    badge: "Bestseller",
  },
  {
    name: "Volumizing Mascara",
    price: "€ 21,95",
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
    category: "Makeup",
  },
  {
    name: "Nourishing Cuticle Oil",
    price: "€ 14,50",
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80",
    category: "Nails",
  },
  {
    name: "Silk Sleep Mask",
    price: "€ 32,00",
    image: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&q=80",
    category: "Accessories",
    badge: "New",
  },
];

export const categories = [
  "All",
  "Skincare",
  "Makeup",
  "Lips",
  "Tools",
  "Nails",
  "Accessories",
];
