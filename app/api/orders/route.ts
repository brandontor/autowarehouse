import ordersData from '../../../data/orders.json';
import productMappingData from '../../../data/product-mapping.json'
import { type Order, type Product } from '../../../types/data'
import { type NextRequest } from 'next/server';

export const dynamic = 'force-dynamic'

/*
  This route expects input: date 

  This route returns:
  1. Pick list for the warehouse team containing individual items
  2. Pack list of orders and their item contents with customer shipping details
*/

export async function GET(request: NextRequest) {

  //Retreive the order date
  const inputDate = request.nextUrl.searchParams.get('date')

  if (!inputDate) return new Response(`There was an error with the date. Date: ${inputDate}`, { status: 400 })

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


/*
  generatePackingList() - Generate a packing list by looping over the orders to retrieve each line item
  reference the line item productId in the product map to add the products contents to the line item details
*/

const generatePackingList = (orders: Order[]) => {

  const products: Product[] = productMappingData

  let packingList = orders.map((order) => {
    for (let lineItem of order.lineItems) {
      const matchingProduct = products.find((product) => product.productId === lineItem.productId)

      lineItem.contents = matchingProduct?.contents //Potential future problem - throw error if the contents are returned as undefined.
    }

    return order
  })

  return packingList
}


/*
  generatePickingList() - Generate a picking list by looping over the orders then loop over each
  line item for every line item we will check to see if it already exists in the record

  if yes - update the quantity 
  if no - add to the initial quantity and subproductid of the record
*/
const generatePickingList = (orders: Order[]) => {

  let pickingList: Record<string, { quantity: number, subProductId: string }> = {}

  for (let order of orders) { //loop over orders

    for (let lineItem of order.lineItems) {//loop over line items
      const { contents } = lineItem

      contents?.forEach((item) => {
        if (Object.keys(pickingList).includes(item.name)) {
          pickingList[item.name].quantity = pickingList[item.name].quantity + item.quantity
        } else {
          pickingList[item.name] = { quantity: item.quantity, subProductId: item.subProductId }
        }
      })

    }
  }

  return pickingList
}