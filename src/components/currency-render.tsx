export function CurrencyRender({
  value,
  currency,
}: {
  value: number;
  currency: string;
}) {
  return (
    <span>
      {new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency,
      }).format(value)}
    </span>
  );
}