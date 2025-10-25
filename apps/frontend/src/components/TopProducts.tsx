import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@agri-smart/shared/components/ui/card';
import { Progress } from '@agri-smart/shared/components/ui/progress';

type Product = {
  name: string;
  percent: number;
};

const products: Product[] = [
  { name: 'Super Grow Fertilizer', percent: 68 },
  { name: 'Organic Pest Control', percent: 52 },
  { name: 'Premium Rice Seeds', percent: 41 },
  { name: 'Drip Irrigation Kit', percent: 35 },
  { name: 'Cotton Seeds', percent: 28 },
];

export function TopProducts() {
  return (
    //className="max-h-4/6"
    <Card className="max-h-96">
      <CardHeader>
        <CardTitle>Top Products</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {products.map((product) => (
          <div key={product.name}>
            <div className="flex justify-between text-sm font-medium text-muted-foreground mb-1">
              <span>{product.name}</span>
              <span>{product.percent}%</span>
            </div>
            <Progress value={product.percent} className="h-2 bg-muted" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
