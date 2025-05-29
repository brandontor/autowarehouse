"use client"
import React from 'react'

type Props = {
    pickingList: Record<string, number> | {}
}
const PickingListContainer = ({ pickingList }: Props) => {

    console.log("Here is Picking List", pickingList)

    return (
        <div>PickingListContainer</div>
    )
}

export default PickingListContainer