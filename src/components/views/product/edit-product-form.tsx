import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

export function EditProductForm() {
  return (
    <div>
      <h1>Edit Product</h1>
      <div className="space-y-1">
        <Typography as="h3" variant="base/medium">
          Archive Product
        </Typography>
        <Typography
          as="p"
          variant="sm/regular"
          className="text-foreground-lighter"
        >
          Lipsum dolor sit amet, consectetur adipiscing elit.
        </Typography>
      </div>
      <div></div>
      <Button size="sm" variant="secondary">
        Archive Product
      </Button>
    </div>
  );
}
