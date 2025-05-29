import ordersData from '../../../data/orders.json';
import productMappingData from '../../../data/product-mapping.json'
import { type Order, type Product } from '../../../types/data'
import { type NextResponse, type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'

/*
  This route returns:
  1. Pick list for the warehouse team containing individual items
  2. Pack list of orders and their item contents with customer shipping details
*/

export async function GET(request: NextRequest) {

  //Retreive the order date
  const inputDate = request.nextUrl.searchParams.get('date')

  if (!inputDate) return new Response(`There was an error with the date. Date: ${inputDate}`, { status: 500 })

  //Retrieve order data based on input date
  const orders = getOrdersByDate(inputDate)

  //Retrieve Packing List
  const packingList = generatePackingList(orders)

  //Retrieve Picking List
  const pickingList = generatePickingList(packingList)

  return Response.json({ packingList: packingList, pickingList: pickingList })
}




//This function will return an array of orders that match the given date
const getOrdersByDate = (date: string) => {
  const orders: Order[] = ordersData.filter((order) => order.orderDate === date)

  return orders
}



const generatePackingList = (orders: Order[]) => {

  const products: Product[] = productMappingData

  /*
    Generate a packing list by looping over the orders
    and adding the individual contents to each line item
  */

  let packingList = orders.map((order) => {
    for (let lineItem of order.lineItems) {
      const matchingProduct = products.find((product) => product.productId === lineItem.productId)

      lineItem.contents = matchingProduct?.contents //Potential future problem - throw error if the contents are returned as undefined.
    }

    return order
  })

  return packingList
}




const generatePickingList = (orders: Order[]) => {

  let pickList: Record<string, number> = {}


  orders.forEach((order) => {
    order.lineItems.forEach((lineItem) => {

      lineItem.contents?.forEach((item) => {
        if (Object.keys(pickList).includes(item.name)) {
          pickList[item.name] = pickList[item.name] + item.quantity
        } else {
          pickList[item.name] = item.quantity
        }
      })

    })


  })


  return pickList
}