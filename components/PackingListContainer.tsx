"use client"
import React from 'react'
import { type Order } from '@/types/data'

type Props = {
    packingList: Order[] | []
}

const PackingListContainer = ({ packingList }: Props) => {

    console.log("Here is Packing List", packingList)


    return (
        <div className='flex flex-col'>
            Packing List
        </div>
    )
}

export default PackingListContainer