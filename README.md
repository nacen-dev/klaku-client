# Klaku Clothing

Frontend for Klaku Clothing an e-commerce app built with Next.js, React-Query, Stripe

## How to use


### Step 1. To launch the project create a .env.local file inside the root directory

### Step 2. Setup environment variables

- `Create a NEXT_PUBLIC_BASE_URL`: set this to the url of the [API](https://github.com/nacen-dev/klaku-backend) server
- `Create a NEXT_PUBLIC_HOST_URL`: set this to the url of this frontend application
- `NEXT_PUBLIC_STRIPE_KEY`: set this to your public stripe key

### Step 3. Install packages using npm or yarn

If using npm delete yarn.lock first

```
npm install 

#or

yarn install
```

## Features to implement and things to do
- [] Sending new password after user click on forget password
- [] Collect user and shipping information while checking out
- [] Create orders after successful checkout
- [] Send contact form data to API or to email directly 
- [] User dashboard
- [] Wishlist
- [] Discount
- [] Merge cart data in client and server
- [] Write more test for components
- [] Write E2E test