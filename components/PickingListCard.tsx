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
    pickingList: Record<string, { quantity: number, subProductId: string }> | {}
}

export default function PickingListCard({ pickingList }: Props) {

    const pickListArr = Object.entries(pickingList)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Picking List</CardTitle>
                <CardDescription>List of individual items and quantities for warehouse team</CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
                {pickListArr.length === 0 ? <p>No Items to pick</p> : pickListArr.map((item) => {
                    return (<div key={`${item[0]} - ${item[1]}`}>
                        <div>Item: {item[0]}</div>
                        <div>Sub Product ID: {item[1].subProductId}</div>
                        <div>Quantity: {item[1].quantity}</div>
                    </div>)
                })}
            </CardContent>
        </Card>

    )

}


