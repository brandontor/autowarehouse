# Auto Warehouse
---
This Application will automatically generate the following:
- Picking List
- Packing List

## Note* 
Our Databases only contain data for May 27th, 2025 and May 29th, 2025

## Considerations

#### 1. Scalability in mind

```
{
    "productName": "Valentines Box",
    "contents": ["Rose Bouquet", "Chocolates", etc..]
}

vs

{
    "productName": "Valentines Box",
    "contents": [{item: "Rose Bouquet", quantity: 1, price: 5}, {item: "Chocolates", quantity: 2, price: 5}]
}
```
- Opted to store contents as an array of objects so that they could be expanded in the future

#### 2. User QOL Features
1. Opted to extend the Packing list by tracking contents per line item to make filling boxes easier.

![Content](/images/Content.png)

2. Opted to extend the picking list by tracking the Sub Product I.D. The ware house team could have some internal tracking system for locating sub items in the warehouse based on I.D. 

![SubID](/images/SubProduct.png)

#### 

## Clone this Repo 

```bash
git clone https://github.com/brandontor/autowarehouse.git
```


## Install Dependencies

You will need NPM to install  dependencies

**Note** - This application utilizes [React Day Picker ver 8.10.1](https://www.npmjs.com/package/react-day-picker) and will throw a peer dependency error. 

You can resolve this by utilizing the **--force** flag when installing
```bash
cd autowarehouse
npm install --force
```

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technology Stack 
- React.js 
- Next.js
- Tailwind
- ShadCN

Refer to package.json for versions.

## Using the app

Utilize the Date Picker to lookup orders based on their Order date. The Picking & Packing list will generate based on the returned orders.

#### Note* 
Our Databases only contain data for May 27th, 2025 and May 29th, 2025

### Picking List
![PickingList](/images/PickingList.png)

### Packing List 
![PackingList](/images/PackingList.png)

### No Orders 
![No Orders](/images/NoOrders.png)


