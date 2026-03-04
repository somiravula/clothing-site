import { ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CartAndFav } from "@/components/layout/cart-and-fav";
import { SearchBar } from "../shared/search-bar";
import { UserNav } from "../shared/user-nav";

export const Header = () => {
  return (
    <header className="w-full bg-white border-b border-zinc-100 sticky top-0 z-50">
      <div className="bg-[#0A111F] text-white py-2 px-4 flex items-center gap-2">
        <div className="flex items-center gap-2 cursor-pointer">
          <span className="text-[11px] font-medium opacity-90">Ship to</span>
          <span className="text-[11px] font-bold">KSA</span>
          <div className="relative w-[26px] h-[18px] ml-1">
            <Image
              src="/countries/ksa-flag.png"
              alt="KSA"
              fill
              className="rounded-sm object-cover"
            />
          </div>
          <ChevronDown className="h-3 w-3 opacity-60" />
        </div>
      </div>

      <div className="container mx-auto px-4 flex flex-wrap items-center justify-between gap-3 py-3 md:h-24 md:flex-nowrap gap-5">
        <div className="flex items-center justify-between w-full md:w-auto md:contents">
          <div className="order-1">
            <Link href="/" className="overflow-visible">
              <div className="relative origin-left ml-2">
                <Image
                  src="/stella.png"
                  alt="Stella"
                  width={1011}
                  height={341}
                  className="h-8 md:h-10 lg:h-12 w-auto object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-4 order-2 md:order-3">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="relative w-[32px] h-[22px]">
                <Image
                  src="/countries/us-flag.webp"
                  alt="US"
                  fill
                  className="object-cover"
                />
              </div>
              <ChevronDown className="h-3 w-3 opacity-60" />
            </div>
            <UserNav />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full order-3 md:order-2 md:flex-1 md:max-w-2xl md:ml-12">
          <div className="flex-1">
            <SearchBar />
          </div>

          <div className="flex items-center gap-5 shrink-0 ml-2">
            <CartAndFav />
          </div>
        </div>
      </div>
    </header>
  );
};
