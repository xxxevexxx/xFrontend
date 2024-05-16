"use client"

import { toast } from "sonner"
import React, { useState } from 'react'
import { useSession } from "next-auth/react"
import { Input } from "@/components/ui/input"
import { Backend_URL } from "@/lib/Constants"
import { Button } from "@/components/ui/button"
import { svgTelegram, svgUnLock, svgLock, svgVkontakte } from "@/components/SvgCollections";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { CmpConnectProps } from "../Account/DtoAccount"


const handleServerRequest = async (user: number|undefined, token: string|undefined, action: string, data: string) => {
    try {
        const response = await fetch(`${Backend_URL}/vksorry/auth`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify({user, data, action})
        })
        const server_response = await response.json()
        if (server_response.status) {
            return {status: true, data: server_response}
        } else {
            return {status: false, data: server_response.description}
        }
    } catch (error) {
        return {status: false, data: undefined}
    }
}


const VKAuthWindow: React.FC<CmpConnectProps> = (
    { fetchDataAndUpdate, account }
) => {
    const [open, setOpen] = useState(false)
    const [state, setState] = useState({
        ID: "vk-number",
        TEXT: "",
        PLACE: "Введите номер"
    })
    const { data, status } = useSession()
    const handleContinue = async () => {
        let server_response
        switch (state.ID) {
            case "vk-number":
                server_response = await handleServerRequest(
                    data?.user.id, data?.backendTokens.accessToken, "vk_number", state.TEXT
                )
                if (server_response.status) {
                    setState({ID: "vk-password", TEXT: "", PLACE: "Введите пароль"})
                    toast.success(server_response.data.description)
                } else {
                    if (server_response.data) toast.warning(server_response.data)
                    setState({ID: "vk-number", TEXT: "", PLACE: "Введите номер"})
                }
                break
            case "vk-password":
                server_response = await handleServerRequest(
                    data?.user.id, data?.backendTokens.accessToken, "vk_password", state.TEXT
                )
                if (server_response.status) {
                    setState({ID: "vk-code", TEXT: "", PLACE: "Введите код"})
                    toast.success(server_response.data.description)
                } else {
                    if (server_response.data) toast.warning(server_response.data)
                    setState({ID: "vk-password", TEXT: "", PLACE: "Введите пароль"})
                }
                break    
            case "vk-code":
                server_response = await handleServerRequest(
                    data?.user.id, data?.backendTokens.accessToken, "vk_code", state.TEXT
                )
                if (server_response.status) {
                    setState({ID: "vk-numder", TEXT: "", PLACE: "Введите номер"})
                    toast.success(server_response.data.description)
                    setOpen(!open)
                    fetchDataAndUpdate()
                } else {
                    if (server_response.data) toast.warning(server_response.data)
                    setState({ID: "vk-code", TEXT: "", PLACE: "Введите код"})
                }
                break
        }
    }
    return (
        <Dialog open={open} onOpenChange={() => {setOpen(!open); setState({ID: "vk-number", TEXT: "", PLACE: "Введите номер"})}}>
            <DialogTrigger asChild>
                <div className="flex w-full">
                    <Button variant="outline" className="w-full h-8 rounded-none rounded-l-lg">
                        Добавить аккаунт
                    </Button>
                    {account.lock ? (
                        <Button variant="outline" className="h-8 rounded-none rounded-r-lg p-0">
                            <div className="w-7 h-7">{svgLock()}</div>
                        </Button>
                    ) : (
                        <Button variant="outline" className="h-8 rounded-none rounded-r-lg p-0">
                            <div className="w-7 h-7">{svgUnLock()}</div>
                        </Button>
                    )}
                </div>
            </DialogTrigger>
            <DialogContent className="flex flex-col items-center p-8 sm:max-w-[300px]">
                <div className="w-[60%] h-[60%]">{svgVkontakte()}</div>
                <DialogHeader className="mt-6">
                    <DialogTitle>Авторизация VKSorry</DialogTitle>
                </DialogHeader>
                <Input
                    id={state.ID}
                    className="text-center col-span-3 h-8"
                    value={state.TEXT}
                    onChange={(item) => setState({...state, TEXT: item.target.value})}
                    placeholder={state.PLACE}
                    type={state.ID === "vk-password" ? "password" : "text"}
                />
                <DialogFooter className="flex flex-col min-w-[100%]">
                    <Button className="min-w-[100%] h-8" onClick={handleContinue}>Продолжить</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default VKAuthWindow
