"use client"
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

type Props = {
    pickingList: Record<string, number> | {}
}

const PickingListCard = ({ pickingList }: Props) => {


    return (
        <Card>
            <CardHeader>
                <CardTitle>Picking List</CardTitle>
                <CardDescription>Order List containing packing details and shipping info</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                {Object.entries(pickingList).map((item) => {
                    return (<div key={`${item[0]} - ${item[1]}`}>
                        <div>Item: {item[0]}</div>
                        <div>Quantity: {item[1]}</div>
                    </div>)
                })}
            </CardContent>
        </Card>

    )

}

export default PickingListCard

