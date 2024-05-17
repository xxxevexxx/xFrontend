"use client"


import React from "react"
import { useParams, useRouter } from "next/navigation"
import { svgLoading } from "@/components/SvgCollections"
import { links } from "@/lib/LinksList"


const LinkPage = () => {
		const { url } = useParams()
		const router = useRouter()
		if (typeof url === "string" && url in links) {
			router.push(links[url])
			return (
				<section className="mx-auto flex max-w-[1240px] h-full flex-col items-center justify-center">
						<div className="w-[50%] h-[50%]">{svgLoading()}</div>
				</section>
			)
		} else {
			router.push("/links")
			return (
				<section className="mx-auto flex max-w-[1240px] h-full flex-col items-center justify-center">
						<div className="text-2xl font-bold">Unknown link</div>
				</section>
			)
		}
}

export default LinkPage;