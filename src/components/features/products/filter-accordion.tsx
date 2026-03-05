import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PriceRangeSelector } from "@/components/ui/price-range-selector";
import { BrandList } from "./brand-list";
import { ColorFilter } from "./color-filter";
import { SizeFilter } from "./size-filter";
import { StockFilter } from "./stock-filter";

export const FilterAccordion = () => {
  return (
    <Accordion
      type="multiple"
      defaultValue={["availability", "brand", "size", "color", "price"]}
      className="w-full"
    >
      <AccordionItem value="availability" className="border-none">
        <AccordionTrigger className="py-4 text-xs font-black uppercase tracking-widest hover:no-underline">
          Availability
        </AccordionTrigger>
        <AccordionContent>
          <StockFilter />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="brand" className="border-none">
        <AccordionTrigger className="py-4 text-xs font-black uppercase tracking-widest hover:no-underline">
          Brand
        </AccordionTrigger>
        <AccordionContent>
          <BrandList />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="size" className="border-none">
        <AccordionTrigger className="py-4 text-xs font-black uppercase tracking-widest hover:no-underline">
          Size
        </AccordionTrigger>
        <AccordionContent>
          <SizeFilter />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="color" className="border-none">
        <AccordionTrigger className="py-4 text-xs font-black uppercase tracking-widest hover:no-underline">
          Color
        </AccordionTrigger>
        <AccordionContent>
          <ColorFilter />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="price" className="border-none">
        <AccordionTrigger className="py-4 text-xs font-black uppercase tracking-widest hover:no-underline">
          Price
        </AccordionTrigger>
        <AccordionContent>
          <PriceRangeSelector />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
