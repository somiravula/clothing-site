"use client";

import { useParams, useRouter } from "next/navigation";
import { getProductById } from "@/services/product.service";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/use-cart-store";
import { ArrowLeft, ShoppingCart, Star, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);

  const product = getProductById(id as string);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Defaulting to the first size for the mock
    addItem(product, product.sizes[0]);
    toast.success(`${product.name} added to bag`, {
      description: `Size: ${product.sizes[0]}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <Link
        href="/products"
        className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-8 group"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left: Images */}
        <div className="grid grid-cols-1 gap-4">
          <div className="relative aspect-square overflow-hidden rounded-3xl border bg-muted">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {product.images.slice(1).map((img) => (
              <div
                key={img}
                className="relative aspect-square overflow-hidden rounded-2xl border bg-muted"
              >
                <Image
                  src={img}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
              {product.brand}
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight">
              {product.name}
            </h1>
            <div className="flex items-center gap-4 pt-2">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  ${product.originalPrice}
                </span>
              )}
              {product.isNew && <Badge variant="default">New Arrival</Badge>}
            </div>
          </div>

          <div className="flex items-center gap-1 text-amber-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-bold text-foreground">
              {product.rating}
            </span>
            <span className="text-sm text-muted-foreground ml-1">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="space-y-4 py-6 border-y">
            <p className="text-sm font-bold">Select Size</p>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 text-sm font-bold transition-all hover:border-black active:scale-95 border-muted text-muted-foreground"
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            <Button
              size="lg"
              className="w-full h-14 text-lg rounded-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Add to Bag
            </Button>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-2">
              <ShieldCheck className="h-4 w-4" />
              Authentic Product • Secure Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
