"use client"

import { toast } from "sonner"
import React, { useState } from 'react'
import { Backend_URL } from "@/lib/Constants"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { svgPause, svgRestart, svgSetting, svgStart } from "@/components/SvgCollections"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { CmpSettingProps } from '@/src/app/components/Account/DtoAccount'


const CmpSetting: React.FC<CmpSettingProps> = (
	{ account, token, type, fetchDataAndUpdate }
) => {
	const [username, setUserName] = useState(account.username)
	const [commands, setCommands] = useState(account.prefixes.commands)
	const [scripts, setScripts] = useState(account.prefixes.scripts)
	const [repeats, setRepeats] = useState(account.prefixes.repeats)
	const [open, setOpen] = useState(false)

	const handleState = async (action: string) => {
		try {
				const response = await fetch(`${Backend_URL}/${type}/action`, {
						method: 'POST',
						headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
						body: JSON.stringify({
							user_id: account.user_id, username, action
						})
				})
				const server_response = await response.json()
				if (server_response.status) {
						toast.success(`Success send command ${action}`)
				} else {
						toast.error(`Error send command ${action}`)
				}
		} catch (error) { 
				toast.error(`Error send command ${action}`)
		}
	}

	const handleUpdate = async () => {
			try {
					if (username.length <= 3 || username.length > 18) return toast.error("Invalid nickname size (3 < % < 19)")
					if (commands.length < 1 || commands.length > 4) return toast.error("Invalid commands prefix size (1 < % < 5)")
					if (scripts.length < 1 || scripts.length > 4) return toast.error("Invalid scripts prefix size (1 < % < 5)")
					if (repeats.length < 1 || repeats.length > 8) return toast.error("Invalid repeats prefix size (1 < % < 9)")		
					const response = await fetch(`${Backend_URL}/${type}/update`, {
							method: 'POST',
							headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
							body: JSON.stringify({
								user_id: account.user_id, username, prefixes: {commands, scripts, repeats}
							})
					})
					const server_response = await response.json()
					if (server_response.status) {
							toast.success("Success update data")
							fetchDataAndUpdate()
					} else {
							toast.error("Error update data")
					}
			} catch (error) { 
					toast.error("Error update data")
			}
	}

	return (
		<Dialog open={open} onOpenChange={() => {setOpen(!open)}}>
				<DialogTrigger asChild>
						<Button variant="outline" className="h-8 rounded-none rounded-r-lg p-0">
								<div className="w-7 h-7">{svgSetting()}</div>
						</Button>
				</DialogTrigger>
				<DialogContent className="flex flex-col items-center p-8 sm:max-w-[400px]">
						<div className="w-[60%] h-[60%]"></div>
						<DialogHeader className="items-center min-w-[100%]">
								<DialogTitle>Настройка аккаунта</DialogTitle>
						</DialogHeader>
						<div className='flex flex-col w-full items-center p-2 rounded-lg'>
								<span>Основные</span>
								<div className='w-full border-t m-2 '></div>
								<div className='flex w-full gap-2'>
										<div className='flex flex-col w-full items-center'>
												<span className='text-sm text-muted-foreground'>Никнейм</span>
												<Input className='text-center w-full h-8' placeholder='Никнейм' onChange={(e) => setUserName(e.target.value)} value={username}></Input>
										</div>
								</div>
						</div>
						<div className='flex flex-col w-full items-center p-2 rounded-lg'>
								<span>Состояние</span>
								<div className='w-full border-t m-2 '></div>
								<div className='flex w-full gap-2'>
										<div className='flex flex-col w-full items-center'>
												<span className='text-sm text-muted-foreground'>Стоп</span>
												<Button variant="outline" className='text-center w-full h-8' onClick={() => {handleState("stop")}}><div className='w-8 h-83'>{svgPause()}</div></Button>
										</div>
										<div className='flex flex-col w-full items-center'>
												<span className='text-sm text-muted-foreground'>Старт</span>
												<Button variant="outline" className='text-center w-full h-8' onClick={() => {handleState("start")}}><div className='w-8 h-83'>{svgStart()}</div></Button>
										</div>
										<div className='flex flex-col w-full items-center'>
												<span className='text-sm text-muted-foreground'>Рестарт</span>
												<Button variant="outline" className='text-center w-full h-8' onClick={() => {handleState("restart")}}><div className='w-8 h-83'>{svgRestart()}</div></Button>
										</div>
								</div>
						</div>
						<div className='flex flex-col w-full items-center p-2 rounded-lg'>
								<span>Префиксы</span>
								<div className='w-full border-t m-2 '></div>
								<div className='flex w-full gap-2'>
										<div className='flex flex-col w-full items-center'>
												<span className='text-sm text-muted-foreground'>Команды</span>
												<Input className='text-center w-full h-8' placeholder='Префикс' onChange={(e) => setCommands(e.target.value)} value={commands}></Input>
										</div>
										<div className='flex flex-col w-full items-center'>
												<span className='text-sm text-muted-foreground'>Довы</span>
												<Input className='text-center w-full h-8' placeholder='Префикс' onChange={(e) => setRepeats(e.target.value)} value={repeats}></Input>
										</div>
										<div className='flex flex-col w-full items-center'>
												<span className='text-sm text-muted-foreground'>Скрипты</span>
												<Input className='text-center w-full h-8' placeholder='Префикс' onChange={(e) => setScripts(e.target.value)} value={scripts}></Input>
										</div>
								</div>
						</div>
						<DialogFooter className="min-w-[100%]">
								<Button className="min-w-[100%] h-8" onClick={handleUpdate}>Сохранить</Button>
						</DialogFooter>
				</DialogContent>
		</Dialog>
	)
}

export default CmpSetting;