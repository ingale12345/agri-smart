
import { ShoppingCart, User, DollarSign, Leaf } from "lucide-react";
import { StatCard } from "../components/StatCard";
import { RecentOrders } from "../components/RecentOrders";
import { TopProducts } from "../components/TopProducts";

function Home() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<ShoppingCart className="text-green-600" />}
          label="Total Orders"
          value="128"
          change="12%"
          changeType="up"
          changeText="from last month"
          iconBg="bg-green-100"
        />
        <StatCard
          icon={<User className="text-blue-600" />}
          label="Active Customers"
          value="52"
          change="5%"
          changeType="up"
          changeText="from last month"
          iconBg="bg-blue-100"
        />
        <StatCard
          icon={<DollarSign className="text-purple-600" />}
          label="Revenue"
          value="₹24,500"
          change="3%"
          changeType="down"
          changeText="from last month"
          iconBg="bg-purple-100"
        />
        <StatCard
          icon={<Leaf className="text-yellow-600" />}
          label="Active Crops"
          value="18"
          change="8%"
          changeType="up"
          changeText="from last season"
          iconBg="bg-yellow-100"
        />
        <StatCard
          icon={<Leaf className="text-yellow-600" />}
          label="Active Crops"
          value="18"
          change="8%"
          changeType="up"
          changeText="from last season"
          iconBg="bg-yellow-100"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        <RecentOrders />
        <TopProducts />
      </div>
    </div>
  );
}

export default Home;
