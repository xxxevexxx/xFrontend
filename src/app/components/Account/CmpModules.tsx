import { svgLoading } from "@/components/SvgCollections"
import React from "react"
import { CmpModulesProps } from "@/src/app/components/Account/DtoAccount";



const CmpModules: React.FC<CmpModulesProps> = (
    { name, content, account, BlockLoading }
) => {
    return (<>
        <div className="relative flex flex-col w-[100%] lg:w-[49.2%] h-[207px] gap-2 border-[0.5px] border-border/40 p-4 rounded-lg">
            {content ? (
                <div className="flex flex-col w-full h-full items-center justify-center">
                    <span className="font-bold">{name} Settings</span>
                    {!BlockLoading ? (
                        <div className="w-[112px] h-full">{svgLoading()}</div>
                    ) : (
                        <div className="flex flex-col w-full h-full items-center justify-center">
                            В разработке...
                        </div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col w-full h-full items-center justify-center">
                    <span className="font-bold">{name} Settings</span>
                    <div className="flex w-full h-full items-center justify-center">
                        <span>Select Account</span>
                    </div>
                </div>
            )}
        </div>
    </>)
}

export default CmpModules;