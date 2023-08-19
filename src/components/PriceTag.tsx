import { formatPrice } from "@/lib/format";

interface PriceTagProps {
  price: number;
  className?: string;
}

export default function PriceTag({ price, className }: PriceTagProps) {
  return (
    <span className={`badge badge-secondary badge-outline ${className}`}>
      {formatPrice(price)}
    </span>
  );
}
