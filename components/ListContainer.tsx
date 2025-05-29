"use client"

import React, { useEffect, useState } from 'react'
import { type Order } from '@/types/data'
import PackingListCard from './PackingListCard'
import PickingListCard from './PickingListCard'
import { DatePicker } from './ui/datepicker'

function ListContainer() {
    const [packingList, setPackingList] = useState<Order[] | []>([])
    const [pickingList, setPickingList] = useState<Record<string, number> | {}>({})
    const [date, setDate] = React.useState<Date>()


    useEffect(() => {
        if (!date) return
        fetchWarehouseData(date)
    }, [date])



    const fetchWarehouseData = async (date: Date) => {
        const dateString = new Date(date).toISOString().split('T')[0]

        try {
            const res = await fetch(`/api/orders?date=${dateString}`)
            const data = await res.json()
            setPackingList(data.packingList)
            setPickingList(data.pickingList)
        } catch (err) {
            console.error(err)
        }
    }



    return (
        <div className='w-full flex flex-col items-center gap-4'>
            <h1>Search by Order Date - Select a Date</h1>
            <div>
                <DatePicker date={date} setDate={setDate}></DatePicker>
            </div>
            <div className='w-full flex flex-col space-y-4 '>
                <PickingListCard pickingList={pickingList}></PickingListCard>
                <PackingListCard packingList={packingList}></PackingListCard>
            </div>
        </div>
    )
}

export default ListContainer