"use client"

import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { Backend_URL } from "@/lib/Constants"
import { Button } from "@/components/ui/button"
import React, { useState, useEffect } from 'react'
import { svgLoading, svgLogo } from "@/components/SvgCollections"
import CmpAccount from "@/src/app/components/Account/CmpAccount"
import CmpModules from "@/src/app/components/Account/CmpModules"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DataAccount, DataAccounts } from "@/src/app/components/Account/DtoAccount"



const fetchData = async (type: string, user_id: number|undefined, token: string|undefined) => {
    try {
        const response = await fetch(`${Backend_URL}/${type}/accounts/${user_id}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
        })
        const result = await response.json()
        return result
    } catch (error) {
        return null
    }
}


const AccountPage = () => {
    const [accounts, setAccounts] = useState<DataAccounts>({
        tg: [{user_id: 0, username: "", prefixes: {
            commands: "",
            scripts: "",
            repeats: "",
        }, state: true, lock: true}], 
        vk: [{user_id: 0, username: "", prefixes: {
            commands: "",
            scripts: "",
            repeats: "",
        }, state: true, lock: true}],
    })
    const [account, setAccount] = useState<DataAccount>()
    const [BlockLoading, setBlockLoading] = useState(true)
    const [TgLoading, setTgLoading] = useState(true)
    const [VkLoading, setVkLoading] = useState(true)
    const [index, setIndex] = useState(0)
    const [content, setContent] = useState(false)
    const { data } = useSession()
    const handleContent = async (id: number, type: string) => {
        if (index === 0) {setContent(!content)}
        setIndex(id)
        setBlockLoading(false)
        await handleContinue(id, type)
    }
    const fetchDataAndUpdate = async () => {
        const resultVks = await fetchData("vksorry", data?.user.id, data?.backendTokens.accessToken)
        if (!resultVks?.statusCode) {
            setAccounts((prevAccounts) => ({...prevAccounts, vk: resultVks}))
            setVkLoading(false)
        } else {toast.error("Server VKSorry Error")}
        const resultTgs = await fetchData("tgsorry", data?.user.id, data?.backendTokens.accessToken)
        if (!resultTgs?.statusCode) {
            setAccounts((prevAccounts) => ({...prevAccounts, tg: resultTgs}))
            setTgLoading(false)
        } else {toast.error("Server TGSorry Error")}
    }
    useEffect(() => {
        if (data) {
            fetchDataAndUpdate()
        }    
    }, [data])

    const handleContinue = async (user_id: number, type: string) => {
        let server_response;
        try {
            const response = await fetch(`${Backend_URL}/${type}/account/${user_id}`, {
                method: 'GET',
                headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${data?.backendTokens.accessToken}`},
            })
            server_response = await response.json()
            setAccount(server_response.data)
            setBlockLoading(true)
        } catch (error) {
            toast.error("Server TGSorry Error")
        }
    }
    return (
        <div className="flex h-full items-center justify-center border-y border-border/40">
            <div className="flex flex-col sm:flex-row gap-3 p-4">
                <div className="flex flex-col gap-3 w-38">
                    <div className="flex flex-col items-center gap-2 border-[0.5px] border-border/40 p-4 rounded-lg">
                        <Avatar className="flex items-center justify-center rounded-lg w-52 h-52">
                            <AvatarImage className="rounded-lg" src={data?.user.avatar} alt="@shadcn"/>
                            <AvatarFallback className="rounded-lg bg-transparent"><div className="w-[80%]">{svgLogo()}</div></AvatarFallback>
                        </Avatar>
                        <Button variant="outline" className="w-full h-8 text-1xl font-bold">{data?.user.login}</Button>
                        <Button variant="outline" className="w-full h-8">Редактировать</Button>
                    </div>
                    {VkLoading ? (
                        <div className="flex flex-col items-center gap-2 border-[0.5px] border-border/40 p-4 rounded-lg">
                            <span className="font-bold">Аккаунты VK</span>
                            <div className="w-[112px] h-[112px]">{svgLoading()}</div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 border-[0.5px] border-border/40 p-4 rounded-lg">
                            <span className="font-bold">Аккаунты VK</span>
                            {accounts.vk.map((account, index) => (
                                <CmpAccount key={index} type="vksorry" token={data?.backendTokens.accessToken} account={account} handleContent={handleContent} fetchDataAndUpdate={fetchDataAndUpdate} />
                            ))}
                        </div>
                    )}
                    {TgLoading ? (
                        <div className="flex flex-col items-center gap-2 border-[0.5px] border-border/40 p-4 rounded-lg">
                            <span className="font-bold">Аккаунты TG</span>
                            <div className="w-[112px] h-[112px]">{svgLoading()}</div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-2 border-[0.5px] border-border/40 p-4 rounded-lg">
                            <span className="font-bold">Аккаунты TG</span>
                            {accounts.tg.map((account, index) => (
                                <CmpAccount key={index} type="tgsorry" token={data?.backendTokens.accessToken} account={account} handleContent={handleContent} fetchDataAndUpdate={fetchDataAndUpdate} />
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex flex-wrap content-start gap-3 w-full">
                    <div className="relative flex flex-col w-[100%] h-[45px] gap-2 border-[0.5px] border-border/40 p-4 rounded-lg">
                        <div className="flex flex-col w-full h-full items-center justify-center">
                            <span className="font-bold">Account Active | Uptime: 01:23:52</span>
                        </div>
                    </div>
                    <CmpModules name="Chats" content={content} account={account} BlockLoading={BlockLoading}/>
                    <CmpModules name="Triggers" content={content} account={account} BlockLoading={BlockLoading}/>
                    <CmpModules name="Ignores" content={content} account={account} BlockLoading={BlockLoading}/>
                    <CmpModules name="Trusteds" content={content} account={account} BlockLoading={BlockLoading}/>
                    <CmpModules name="Aliases" content={content} account={account} BlockLoading={BlockLoading}/>
                    <CmpModules name="Templates" content={content} account={account} BlockLoading={BlockLoading}/>
                </div>
            </div>
        </div>
    );
};

export default AccountPage;