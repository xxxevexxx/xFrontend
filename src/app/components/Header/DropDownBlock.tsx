"use client"

import React from "react";
import { useParams } from "next/navigation";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {signIn, signOut, useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import { svgLogo } from "@/components/SvgCollections";


const DropdownBlock = () => {
    const { locale } = useParams()
    const { status, data} = useSession()

    if (status !== "authenticated") {
        return (<>
            <Button variant="outline" onClick={async () => {
                await signIn()
            }} className="inline-flex items-center h-8 justify-center bg-transparent border-none rounded-md hover:bg-accent hover:text-accent-foreground px-1">
                <span className="mr-1 font-bold text-[15px]">Войти</span>
                <Avatar className="flex items-center justify-center w-7 h-7">
                    <AvatarImage className="w-7 h-7" src="https://i.imgur.com/RlbzGWj.png" alt="@shadcn"/>
                    <AvatarFallback className="bg-transparent"><div className="w-[60%]">{svgLogo()}</div></AvatarFallback>
                </Avatar>
            </Button>
        </>)
    } else {
        return (<>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <div className="inline-flex items-center h-8 justify-center rounded-md hover:bg-accent hover:text-accent-foreground px-1 filter grayscale hover:filter-none">
                        <span className="mr-1 font-bold text-[15px]">{data.user.login}</span>
                        <Avatar className="flex items-center justify-center w-7 h-7">
                            <AvatarImage className="w-7 h-7" src={data.user.avatar} alt="@shadcn"/>
                            <AvatarFallback className="bg-transparent"><div className="w-[60%]">{svgLogo()}</div></AvatarFallback>
                        </Avatar>
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[180px]">
                    <a href={`/${locale}/account`}>
                        <DropdownMenuItem className="flex justify-center"><span className="text-sm font-bold">Мой аккаунт</span></DropdownMenuItem>
                    </a>
                    <DropdownMenuSeparator/>
                    <Button variant="outline" className="w-full h-8 border-none">
                        <DropdownMenuItem>
                            <span className="flex gap-2 text-sm font-bold">
                                Баланс
                                <span>{data.user.balance} ✕</span>
                            </span>
                        </DropdownMenuItem>
                    </Button>
                    <DropdownMenuSeparator/>
                    <a href={`/${locale}/settings`}>
                        <DropdownMenuItem className="flex justify-center"><span className="text-sm">Настройки</span></DropdownMenuItem>
                    </a>
                    <a href={`/${locale}/rules`}>
                        <DropdownMenuItem className="flex justify-center"><span className="text-sm">Правила</span></DropdownMenuItem>
                    </a>
                    <a href={`/${locale}/rules`}>
                        <DropdownMenuItem className="flex justify-center"><span className="text-sm">Беседа</span></DropdownMenuItem>
                    </a>
                    <DropdownMenuSeparator/>
                    <DropdownMenuItem className="flex justify-center" onClick={async () => {
                        await signOut({callbackUrl: "/auth"})
                    }}>
                        <span className="text-sm font-bold">Выйти</span>
                    </DropdownMenuItem>


                </DropdownMenuContent>
            </DropdownMenu>
        </>)
    }

}

export default DropdownBlock;