"use client"
import React from 'react'
import { LineItem, SubProduct, type Order } from '@/types/data'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type Props = {
    packingList: Order[] | []
}

export default function PackingListCard({ packingList }: Props) {

    return (
        <Card>
            <CardHeader>
                <CardTitle>Packing List</CardTitle>
                <CardDescription>List of orders containing packing details and shipping info for packing team</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                {packingList.length === 0 ? <p>No Items to pack</p> : packingList.map((order) => {
                    return (
                        <div key={order.orderId} className='border-4 rounded-sm p-4 w-full flex flex-col space-y-4'>
                            <OrderDetails order={order}></OrderDetails>
                            <LineItemsList lineItems={order.lineItems}></LineItemsList>
                        </div>
                    )
                })}
            </CardContent>
        </Card>

    )
}


const OrderDetails = ({ order }: { order: Order }) => {
    const { customerEmail, customerName, orderDate, orderId, orderTotal, shippingAddress } = order

    return (
        <div className='w-full'>
            <div className='flex justify-around'>
                <div>Order ID: {orderId}</div>
                <div>Order Date: {orderDate}</div>
                <div>Order Total: ${orderTotal}</div>
                <div>Customer Name: {customerName}</div>
                <div>Customer Email: {customerEmail}</div>
                <div>Shipping Address: {shippingAddress}</div>
            </div>
        </div>)
}



const LineItemsList = ({ lineItems }: { lineItems: LineItem[] }) => {

    return (
        <div>
            <p className='mb-4'>Line Items:</p>
            <div className='space-y-4'>
                {lineItems.map((lineItem) => {
                    const { lineItemId, price, productId, productName, contents } = lineItem
                    return (
                        <div key={`${lineItemId} - ${productId} - ${price}`} className='border-b-2 pb-4'>
                            <div>Line Item ID: {lineItemId}</div>
                            <div>Product ID: {productId}</div>
                            <div>Product Name: {productName}</div>
                            <div>Price: ${price}</div>
                            <div>
                                <ContentsDetails contents={contents}></ContentsDetails>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>


    )
}



const ContentsDetails = ({ contents }: { contents: SubProduct[] | undefined }) => {
    return <div className='flex space-x-4'>
        <p>Content: </p>
        {contents?.map((content) => {
            return <div key={`${content.subProductId} - ${content.quantity}`}>{content.quantity} x {content.name}</div>
        })}
    </div>
}