"use client"

import { Button } from "@/components/ui/button"
import React from "react"
import TGAuthWindow from "@/src/app/components/TGSorry/ConnectButton"
import { CmpAccountProps } from "@/src/app/components/Account/DtoAccount"
import VKAuthWindow from "../VKSorry/ConnectButton"
import CmpSetting from '@/src/app/components/Account/CmpSetting'


const CmpAccount: React.FC<CmpAccountProps> = ({ account, type, token, handleContent, fetchDataAndUpdate }) => {
    return (<>
        {account.state ? (
            <div className="flex w-full">
                <Button variant="outline" onClick={() => handleContent(account.user_id, type)} className={`w-full h-8 rounded-none rounded-l-lg`}>
                    {account.username}
                </Button>
                <CmpSetting account={account} token={token} type={type} fetchDataAndUpdate={fetchDataAndUpdate}/>
            </div>
        ) : (<>
            {type === "vksorry" ? (<VKAuthWindow fetchDataAndUpdate={fetchDataAndUpdate} account={account}/>) : (<TGAuthWindow fetchDataAndUpdate={fetchDataAndUpdate} account={account}/>)}
        </>)}
    </>)
}

export default CmpAccount;