import {svgDiscord, svgGitHub, svgTelegram, svgVkontakte} from "@/components/SvgCollections";
import React from "react";


const contactsBlock = () => {
    return (
        <>
            <a className="hidden sm:flex" href="https://discord.gg/XEYvaSRWjK">
                <div
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 w-8 py-2 px-0">
                    <div className="w-6 h-6">{svgDiscord()}</div>
                </div>
            </a>
            <a className="hidden sm:flex" href="https://t.me/xxxevexxx_channel">
                <div
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 py-2 w-8 px-0">
                    <div className="w-4 h-4">{svgTelegram()}</div>
                </div>
            </a>
            <a className="hidden sm:flex" href="https://vk.com/xxxevexxx_channel">
                <div
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 py-2 w-8 px-0">

                    <div className="w-5 h-5">{svgVkontakte()}</div>
                </div>
            </a>
            <a className="hidden sm:flex" href="https://github.com/xxxevexxx">
                <div
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 py-2 w-8 px-0">
                    <div className="w-4 h-4">{svgGitHub()}</div>
                </div>
            </a>
        </>
    )
}


export default contactsBlock;