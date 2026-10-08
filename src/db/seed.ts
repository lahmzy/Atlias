import { db } from "./index";
import { categories, products } from "./schema/ecommerce";

const categoryData = [
  { id: "skincare", name: "Skincare", slug: "skincare", sortOrder: 1 },
  { id: "makeup", name: "Makeup", slug: "makeup", sortOrder: 2 },
  { id: "lips", name: "Lips", slug: "lips", sortOrder: 3 },
  { id: "tools", name: "Tools", slug: "tools", sortOrder: 4 },
  { id: "nails", name: "Nails", slug: "nails", sortOrder: 5 },
  { id: "accessories", name: "Accessories", slug: "accessories", sortOrder: 6 },
];

const productData = [
  {
    id: "velvet-cream-cleanser",
    name: "Velvet Cream Cleanser",
    slug: "velvet-cream-cleanser",
    description: "A gentle daily cleanser that removes impurities without stripping the skin.",
    price: "30.95",
    imageUrl: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&q=80",
    categoryId: "skincare",
    tags: ["vegan", "cruelty-free"],
    isFeatured: true,
    inventory: 25,
  },
  {
    id: "silk-glow-foundation",
    name: "Silk Glow Foundation",
    slug: "silk-glow-foundation",
    description: "Lightweight foundation with a natural, luminous finish.",
    price: "42.50",
    imageUrl: "https://images.unsplash.com/photo-1631214540553-ff044a3ff1d4?w=400&q=80",
    categoryId: "makeup",
    tags: ["vegan", "new"],
    isFeatured: true,
    inventory: 15,
  },
  {
    id: "rose-petal-lip-gloss",
    name: "Rose Petal Lip Gloss",
    slug: "rose-petal-lip-gloss",
    description: "Hydrating lip gloss with a subtle rose tint and mirror shine.",
    price: "18.95",
    imageUrl: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&q=80",
    categoryId: "lips",
    tags: ["vegan"],
    isFeatured: false,
    inventory: 40,
  },
  {
    id: "precision-brush-set",
    name: "Precision Brush Set",
    slug: "precision-brush-set",
    description: "12-piece professional brush set for flawless application.",
    price: "55.00",
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&q=80",
    categoryId: "tools",
    tags: ["bestseller"],
    isFeatured: true,
    inventory: 10,
  },
  {
    id: "hydra-boost-serum",
    name: "Hydra Boost Serum",
    slug: "hydra-boost-serum",
    description: "Intensive hydration serum with hyaluronic acid and vitamin B5.",
    price: "38.95",
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&q=80",
    categoryId: "skincare",
    tags: ["vegan", "hydrating"],
    isFeatured: false,
    inventory: 30,
  },
  {
    id: "matte-velvet-lipstick",
    name: "Matte Velvet Lipstick",
    slug: "matte-velvet-lipstick",
    description: "Long-lasting matte lipstick with a velvety smooth finish.",
    price: "24.50",
    imageUrl: "https://images.unsplash.com/photo-1599305090598-fe179d501227?w=400&q=80",
    categoryId: "lips",
    tags: ["new", "matte"],
    isFeatured: true,
    inventory: 20,
  },
  {
    id: "contour-highlight-palette",
    name: "Contour & Highlight Palette",
    slug: "contour-highlight-palette",
    description: "6-shade palette for sculpting and illuminating the face.",
    price: "45.00",
    imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
    categoryId: "makeup",
    tags: ["vegan"],
    isFeatured: false,
    inventory: 12,
  },
  {
    id: "jade-facial-roller",
    name: "Jade Facial Roller",
    slug: "jade-facial-roller",
    description: "Natural jade roller for de-puffing and improving circulation.",
    price: "22.95",
    imageUrl: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?w=400&q=80",
    categoryId: "tools",
    tags: ["wellness"],
    isFeatured: false,
    inventory: 35,
  },
  {
    id: "gentle-exfoliating-scrub",
    name: "Gentle Exfoliating Scrub",
    slug: "gentle-exfoliating-scrub",
    description: "Mild exfoliator with natural beads for smooth, glowing skin.",
    price: "28.50",
    imageUrl: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&q=80",
    categoryId: "skincare",
    tags: ["bestseller", "exfoliating"],
    isFeatured: true,
    inventory: 18,
  },
  {
    id: "volumizing-mascara",
    name: "Volumizing Mascara",
    slug: "volumizing-mascara",
    description: "Buildable volume mascara for dramatic, clump-free lashes.",
    price: "21.95",
    imageUrl: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
    categoryId: "makeup",
    tags: ["vegan"],
    isFeatured: false,
    inventory: 22,
  },
  {
    id: "nourishing-cuticle-oil",
    name: "Nourishing Cuticle Oil",
    slug: "nourishing-cuticle-oil",
    description: "Reparative oil for healthy nails and cuticles.",
    price: "14.50",
    imageUrl: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&q=80",
    categoryId: "nails",
    tags: ["vegan"],
    isFeatured: false,
    inventory: 50,
  },
  {
    id: "silk-sleep-mask",
    name: "Silk Sleep Mask",
    slug: "silk-sleep-mask",
    description: "Luxurious silk sleep mask for uninterrupted rest.",
    price: "32.00",
    imageUrl: "https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&q=80",
    categoryId: "accessories",
    tags: ["new", "wellness"],
    isFeatured: true,
    inventory: 28,
  },
];

async function seed() {
  console.log("Seeding categories...");
  for (const cat of categoryData) {
    await db
      .insert(categories)
      .values(cat)
      .onConflictDoNothing({ target: categories.id });
  }

  console.log("Seeding products...");
  for (const prod of productData) {
    await db
      .insert(products)
      .values(prod)
      .onConflictDoNothing({ target: products.id });
  }

  console.log("Seed complete!");
  process.exit(0);
}

seed();
