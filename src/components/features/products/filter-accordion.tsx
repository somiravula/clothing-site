import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PriceRangeSelector } from "@/components/ui/price-range-selector";
import { BrandList } from "./brand-list";

export const FilterAccordion = () => {
  return (
    <Accordion
      type="multiple"
      defaultValue={["brand", "price"]}
      className="w-full"
    >
      <AccordionItem value="brand" className="border-none">
        <AccordionTrigger className="text-xs font-black uppercase tracking-widest hover:no-underline py-4">
          Brand
        </AccordionTrigger>
        <AccordionContent>
          <BrandList />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="price" className="border-none">
        <AccordionTrigger className="text-xs font-black uppercase tracking-widest hover:no-underline py-4">
          Price
        </AccordionTrigger>
        <AccordionContent>
          <PriceRangeSelector />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
