"use client"

import React, { useEffect, useState } from 'react'
import { type Order } from '@/types/data'
import PackingListContainer from './PackingListContainer'
import PickingListContainer from './PickingListContainer'
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
        <div>
            <h1>Select a Date</h1>
            <div>
                <DatePicker date={date} setDate={setDate}></DatePicker>
            </div>
            <PackingListContainer packingList={packingList}></PackingListContainer>
            <PickingListContainer pickingList={pickingList}></PickingListContainer>
        </div>
    )
}

export default ListContainer