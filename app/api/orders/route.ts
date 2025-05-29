import ordersData from '../../../data/orders.json';
import productMappingData from '../../../data/product-mapping.json'
import { type Order, type Product } from '../../../types/data'
import { NextResponse, NextRequest } from 'next/server';

export const dynamic = 'force-static'

/*
  This route returns:
  1. Pick list for the warehouse team containing individual items
  2. Pack list of orders and their item contents with customer shipping details
*/

export async function GET(req: NextRequest) {

  //Retreive the order data from req
  let today = new Date()

  //Retrieve this days order data
  const orders = getOrdersByDate(today)

  //Retrieve Packing List
  const packingList = generatePackingList(orders)

  //Retrieve Picking List
  const pickingList = generatePickingList(packingList)

  return Response.json({ packingList: packingList, pickingList: pickingList })
}




//This function will return an array of orders that match the given date
const getOrdersByDate = (date: Date) => {

  //Parse the date into a date string
  //Ideally this is done on the front end but just incase we don't control the frontend
  const dateString = date.toISOString().split('T')[0]

  const orders: Order[] = ordersData.filter((order) => order.orderDate === dateString)

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