import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@agri-smart/shared/components/ui/card';
import { Button } from '@agri-smart/shared/components/ui/button';
import { Input } from '@agri-smart/shared/components/ui/input';
import { Badge } from '@agri-smart/shared/components/ui/badge';
import {
  Search,
  Filter,
  ShoppingCart,
  Star,
  MapPin,
  Truck,
  Package,
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [cart, setCart] = useState<any[]>([]);

  const categories = [
    { id: 'all', name: 'सभी', icon: Package },
    { id: 'fertilizers', name: 'खाद', icon: Package },
    { id: 'seeds', name: 'बीज', icon: Package },
    { id: 'tools', name: 'औजार', icon: Package },
    { id: 'pesticides', name: 'कीटनाशक', icon: Package },
  ];

  const products = [
    {
      id: 1,
      name: 'यूरिया खाद / Urea Fertilizer',
      price: 280,
      originalPrice: 320,
      image:
        'https://images.unsplash.com/photo-1722044942164-9637e0452395?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJ0aWxpemVyJTIwc2VlZHMlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTg0NjA4MDR8MA&ixlib=rb-4.1.0&q=80&w=400',
      category: 'fertilizers',
      shop: 'राम एग्रो सेंटर',
      distance: '2.5 km',
      rating: 4.5,
      reviews: 128,
      inStock: true,
      gst: 42,
      discount: 12,
    },
    {
      id: 2,
      name: 'गेहूं के बीज / Wheat Seeds',
      price: 45,
      originalPrice: 50,
      image:
        'https://images.unsplash.com/photo-1648090229186-6188eaefcc6a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmVlbiUyMHZlZ2V0YWJsZXMlMjBjcm9wcyUyMGhhcnZlc3R8ZW58MXx8fHwxNzU4NDYwODA3fDA&ixlib=rb-4.1.0&q=80&w=400',
      category: 'seeds',
      shop: 'किसान सीड्स',
      distance: '1.8 km',
      rating: 4.8,
      reviews: 89,
      inStock: true,
      gst: 7,
      discount: 10,
    },
    {
      id: 3,
      name: 'ऑर्गैनिक कीटनाशक / Organic Pesticide',
      price: 150,
      originalPrice: 180,
      image:
        'https://images.unsplash.com/photo-1722044942164-9637e0452395?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJ0aWxpemVyJTIwc2VlZHMlMjBhZ3JpY3VsdHVyZXxlbnwxfHx8fDE3NTg0NjA4MDR8MA&ixlib=rb-4.1.0&q=80&w=400',
      category: 'pesticides',
      shop: 'ग्रीन एग्रो',
      distance: '3.2 km',
      rating: 4.3,
      reviews: 64,
      inStock: false,
      gst: 22,
      discount: 17,
    },
  ];

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="p-4 pb-20 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-green-800">दुकान / Shop</h1>
        <div className="relative">
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <ShoppingCart className="w-4 h-4 mr-1" />
            {cart.length}
          </Button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input
          type="text"
          placeholder="खाद, बीज, औजार खोजें..."
          className="pl-10 pr-4"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          size="sm"
          variant="outline"
          className="absolute right-2 top-1/2 transform -translate-y-1/2"
        >
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="whitespace-nowrap"
          >
            <category.icon className="w-4 h-4 mr-1" />
            {category.name}
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex gap-4 p-4">
                {/* Product Image */}
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                  <ImageWithFallback
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 leading-tight">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-xs text-gray-600">
                          {product.rating} ({product.reviews})
                        </span>
                      </div>
                      <Badge
                        variant={product.inStock ? 'default' : 'destructive'}
                        className="text-xs"
                      >
                        {product.inStock ? 'उपलब्ध' : 'स्टॉक खत्म'}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>{product.shop}</span>
                    <span>•</span>
                    <span>{product.distance}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-green-600">
                          ₹{product.price}
                        </span>
                        <span className="text-sm text-gray-400 line-through">
                          ₹{product.originalPrice}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {product.discount}% OFF
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">
                        + ₹{product.gst} GST
                      </p>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Delivery Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Truck className="w-5 h-5 text-blue-500" />
            डिलीवरी विकल्प / Delivery Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div>
              <p className="font-medium">Self Pickup</p>
              <p className="text-sm text-gray-600">Shop से खुद लें</p>
            </div>
            <Badge variant="default">Free</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
            <div>
              <p className="font-medium">Home Delivery</p>
              <p className="text-sm text-gray-600">घर तक पहुंचाएं</p>
            </div>
            <Badge variant="secondary">₹50</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
