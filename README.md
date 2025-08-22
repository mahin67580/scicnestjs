# 🛒 QuickCart

A modern e-commerce web application built with **Next.js 13+ (App Router)**, **MongoDB**, **Cloudinary**, and **NextAuth**. It allows users to authenticate (via Google or credentials), browse products, and add new products with image uploads.

---

## 🚀 Project Description

QuickCart is a lightweight e-commerce platform where users can:

- Log in with Google 
- View available products
- Add new products with image uploads (Cloudinary)
- Access protected routes for authenticated users only

Tech stack includes:

- **Next.js 13+ (App Router)**
- **NextAuth.js**
- **MongoDB (via Mongoose)**
- **Cloudinary** (for product images)
- **Tailwind CSS** (UI styling)
- **React Hot Toast** (notifications)

---

## 🛠️ Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/quickcart.git
cd quickcart



npm install
# or
yarn install



GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

MONGODB_URI=your_mongodb_connection_uri

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
⚠️ Don't expose this file publicly. Add .env.local to .gitignore.

npm run dev
# or
yarn dev



| Route                    | Description                                       | Auth Required   |
| ------------------------ | ------------------------------------------------- | --------------- |
| `/`                      | Home page with branding or landing content        | ❌ No            |
| `/login`                 | Login page with Google & credentials auth         | ❌ No            |
| `/products`              | Displays product catalog                          | ✅ Yes           |
| `/dashboard/add-product` | Add a new product (with image upload)             | ✅ Yes           |
| `/api/products`          | API route to fetch all products                   | ✅ Yes (session) |
| `/api/products/add`      | API route to add a new product with image support | ✅ Yes (session) |


📦 Features

🔐 Google  login via NextAuth

📦 Add & fetch products via MongoDB

☁️ Image upload via Cloudinary

⚡ Real-time feedback with react-hot-toast

📱 Mobile responsive with Tailwind CSS

📤 Deployable on Vercel


🧪 Future Improvements

User-specific product management (edit/delete)

Shopping cart functionality

Payment integration (Stripe or Razorpay)

Pagination / infinite scroll

Admin dashboard