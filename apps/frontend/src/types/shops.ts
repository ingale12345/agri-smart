export type ShopFormData = {
  name: string;
  ownerName: string;
  contact?: string;
  email?: string;
  address?: string;
  imageUrl?: string;
  branches?: string[]; // or ObjectId[] if using Mongoose
};
