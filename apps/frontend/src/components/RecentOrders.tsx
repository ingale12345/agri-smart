import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@agri-smart/shared/components/ui/card';
import { Badge } from '@agri-smart/shared/components/ui/badge';
import { Link } from 'react-router-dom';

type Order = {
  id: string;
  customer: string;
  amount: string;
  status: 'Delivered' | 'Processing' | 'Pending';
  date: string;
};

const orders: Order[] = [
  {
    id: '#ORD-6792',
    customer: 'Rajesh Kumar',
    amount: '₹4,250',
    status: 'Delivered',
    date: 'Aug 12, 2023',
  },
  {
    id: '#ORD-6791',
    customer: 'Amit Singh',
    amount: '₹1,820',
    status: 'Processing',
    date: 'Aug 11, 2023',
  },
  {
    id: '#ORD-6790',
    customer: 'Priya Sharma',
    amount: '₹3,600',
    status: 'Pending',
    date: 'Aug 10, 2023',
  },
  {
    id: '#ORD-6789',
    customer: 'Vijay Patel',
    amount: '₹2,150',
    status: 'Delivered',
    date: 'Aug 9, 2023',
  },
  // {
  //   id: "#ORD-6789",
  //   customer: "Vijay Patel",
  //   amount: "₹2,150",
  //   status: "Delivered",
  //   date: "Aug 9, 2023",
  // },
  // {
  //   id: "#ORD-6789",
  //   customer: "Vijay Patel",
  //   amount: "₹2,150",
  //   status: "Delivered",
  //   date: "Aug 9, 2023",
  // },
  // {
  //   id: "#ORD-6789",
  //   customer: "Vijay Patel",
  //   amount: "₹2,150",
  //   status: "Delivered",
  //   date: "Aug 9, 2023",
  // },
  // {
  //   id: "#ORD-6789",
  //   customer: "Vijay Patel",
  //   amount: "₹2,150",
  //   status: "Delivered",
  //   date: "Aug 9, 2023",
  // },
  // {
  //   id: "#ORD-6789",
  //   customer: "Vijay Patel",
  //   amount: "₹2,150",
  //   status: "Delivered",
  //   date: "Aug 9, 2023",
  // },
  // {
  //   id: "#ORD-6789",
  //   customer: "Vijay Patel",
  //   amount: "₹2,150",
  //   status: "Delivered",
  //   date: "Aug 9, 2023",
  // },
  // {
  //   id: "#ORD-6789",
  //   customer: "Vijay Patel",
  //   amount: "₹2,150",
  //   status: "Delivered",
  //   date: "Aug 9, 2023",
  // },
  // {
  //   id: "#ORD-6789",
  //   customer: "Vijay Patel",
  //   amount: "₹2,150",
  //   status: "Delivered",
  //   date: "Aug 9, 2023",
  // },
];

export function RecentOrders() {
  return (
    // className="max-h-4/6"
    <Card className="max-h-96">
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3  overflow-y-auto">
        <div className="grid grid-cols-5 text-muted-foreground text-sm font-medium border-b pb-2">
          <span>Order ID</span>
          <span>Customer</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Date</span>
        </div>
        {orders.map((order) => (
          <div
            key={order.id}
            className="grid grid-cols-5 text-sm hover:scale-101 cursor-pointer duration-50 hover:font-semibold items-center py-2 border-b last:border-b-0"
          >
            <span>{order.id}</span>
            <span>{order.customer}</span>
            <span>{order.amount}</span>
            <Badge
              variant="outline"
              className={
                order.status === 'Delivered'
                  ? 'border-green-500 text-green-600'
                  : order.status === 'Processing'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-yellow-500 text-yellow-600'
              }
            >
              {order.status}
            </Badge>
            <span>{order.date}</span>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex justify-center items-center">
        <Link
          to={'/agri-smart/orders'}
          className="text-green-600 text-sm mt-1 cursor-pointer hover:underline"
        >
          View all orders
        </Link>
      </CardFooter>
    </Card>
  );
}
