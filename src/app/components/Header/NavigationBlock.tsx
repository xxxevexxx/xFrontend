"use client"

import {useParams} from "next/navigation";
import {
    NavigationMenu, NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList, NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {svgTelegram, svgVkontakte} from "@/components/SvgCollections";
import React from "react";
import {cva} from "class-variance-authority";


const navigationMenuTriggerStyle = cva(
    "group inline-flex h-8 w-max items-center justify-center rounded-md bg-transparent px-2 py-1 text-[12px] font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
)


const navigationBlock = () => {
    const { locale } = useParams();
    return (
        <div className="hidden sm:flex">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem className="hidden lg:flex">
                        <Link className="text-sm h-8 px-2" href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Главная
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                            className="text-sm h-8 px-2 py-1 text-[12px] bg-transparent">VKSorry</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div
                                className="flex items-center justify-center gap-3 p-6 md:w-[400px] lg:w-[402px] lg:grid-cols-[.75fr_1fr]">
                                <div className="flex items-center justify-center">
                                    <div
                                        className="w-14 h-14 p-2 mr-2 rounded-lg border-[0.5px] border-border/40 bg-background/95">{svgVkontakte()}</div>
                                </div>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="text-sm h-8 px-2 py-1 text-[12px] bg-transparent">Сайт
                            Инфо</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div className="md:w-[400px] lg:w-[402px] lg:grid-cols-[.75fr_1fr]">
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger
                            className="text-sm h-8 px-2 py-1 text-[12px] bg-transparent">TGSorry</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <div
                                className="flex items-center justify-center gap-3 p-6 md:w-[400px] lg:w-[402px] lg:grid-cols-[.75fr_1fr]">
                                <div className="flex items-center justify-center">
                                    <div className="w-14 h-14 p-2 mr-2 rounded-lg border-[0.5px] border-border/40 bg-background/95">{svgTelegram()}</div>
                                </div>
                            </div>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem className="hidden lg:flex">
                        <Link href={`/${locale}/account`} legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Аккаунт
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default navigationBlock;