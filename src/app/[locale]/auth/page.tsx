"use client"

import { toast } from 'sonner'
import Image from "next/image"
import test from "@/public/gif.gif"
import apple from "@/public/apple.png"
import React, { useState } from "react"
import { signIn } from "next-auth/react";
import { Backend_URL } from "@/lib/Constants"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useParams, useRouter, useSearchParams } from "next/navigation"
import { svgTelegram, svgVkontakte } from "@/components/SvgCollections"


const AuthPage = () => {
    const { locale } = useParams()
    const router = useRouter()
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/account";
    const [data, setData] = useState(
        { password: "", login: "" }
    )


    const requestRegistration = async () => {
        return await fetch(Backend_URL + "/account/registration", {
            method: "POST",
            body: JSON.stringify({...data}),
            headers: {"Content-Type": "application/json"},
        })
    }

    const requestAuthorization = async () => {
        return await signIn("credentials", {
            redirect: true,
            callbackUrl,
            ...data
        })
    }

    const registerUser = async () => {
        try {
            let response = await requestRegistration()
            if (response?.status === 409) {
                return toast.warning("The username is already taken")
            }
            if (response?.status === 400) {
                return toast.warning("Incorrect format login or password")
            }
            if (response?.status === 201) {
                return await loginUser()
            }
        } catch (error) {
            return toast.error("Internal server error")
        }
    }
    const loginUser = async () => {
        try {
            let response = await requestAuthorization()
            if (!response?.error) {
                router.push(callbackUrl)
            } else {
                return toast.warning("Incorrect login or password")
            }
        } catch (error) {
            return toast.error("Internal server error")
        }
    }
    const [state, setState] = useState(false)
    const handlerState = () => {
        setState(!state)
    }
    return (
        <div className="flex h-full items-center justify-around border-y border-border/40">
            <section
                className="hidden lg:flex lg:flex-col w-full h-full justify-around items-center bg-accent/10 border-r border-border/40">
                <div className="relative w-full h-full">
                    <Button variant="outline" className="absolute top-1 left-1 border-none font-bold text-primary bg-transparent hover:bg-transparent">
                        {/*<div className="w-6 h-6 mr-2">{ svgLogo() }</div>*/}
                        {/*<span className="font-bold"></span>*/}
                    </Button>
                </div>
                <div className="relative w-[550px] min-h-[400px]">
                    <div className="absolute w-[370px] h-[230px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden">
                        <Image className="w-full h-full object-cover" src={test} alt="Test"/>
                    </div>
                    <div className="absolute w-[110px] h-[232px] top-[6%] right-[9.1%] rounded-2xl overflow-hidden">
                        <Image className="w-full h-full object-cover" src={test} alt="Test1"/>
                    </div>
                    <Image className="absolute w-[90%] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                           src={apple} alt="Apple"/>
                </div>
                <div className="flex items-center justify-center w-full h-full">
                    <span className="text-center text-muted-foreground text-lg">Тут будет дохуя текста</span>
                </div>
            </section>

            <section className="relative flex flex-col w-full h-full justify-around items-center gap-2">
                <div className="absolute right-1 top-1">
                    {state ? (
                        <Button variant="outline" onClick={handlerState} className="absolute right-1 top-1 border-none font-bold text-primary hover:bg-transparent">Авторизация</Button>
                    ) : (
                        <Button variant="outline" onClick={handlerState} className="absolute right-1 top-1 border-none font-bold text-primary hover:bg-transparent">Регистрация</Button>
                    )}
                </div>
                <div className="flex flex-col gap-5 w-[400px]">
                    <div className="flex flex-col items-center">
                        {state ? (
                            <span className="font-bold text-2xl">Зарегистрировать аккаунт</span>
                        ) : (
                            <span className="font-bold text-2xl">Авторизоваться в аккаунт</span>
                        )}
                        {state ? (
                            <span
                                className="text-muted-foreground text-sm">Введите данные для регистрации аккаунта</span>
                        ) : (
                            <span
                                className="text-muted-foreground text-sm">Введите данные для авторизации в аккаунт</span>
                        )}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Input className="text-center font-bold" id="login" type="text" value={data.login}
                               onChange={(item) => setData({...data, login: item.target.value})}
                               placeholder="Логин"/>
                        <Input className="text-center font-bold" id="password" type="password"
                               value={data.password}
                               onChange={(item) => setData({...data, password: item.target.value})}
                               placeholder="Пароль"/>
                        {state ? (
                            <Button onClick={registerUser} className="min-w-[100%] font-bold">Зарегистрировать</Button>
                        ) : (
                            <Button onClick={loginUser} className="min-w-[100%] font-bold">Авторизоваться</Button>
                        )}
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><span
                            className="w-full border-t"></span></div>
                        <div className="relative flex justify-center text-xs uppercase"><span
                            className="bg-background px-2 text-muted-foreground">или авторизоваться через</span>
                        </div>
                    </div>
                    <div className="flex w-full gap-2">
                        <Button variant="outline" className="font-bold w-[100%]">
                            <div className="w-6 h-6">{svgTelegram()}</div>
                        </Button>
                        <Button variant="outline" className="font-bold w-[100%]">
                            <div className="w-7 h-7">{svgVkontakte()}</div>
                        </Button>
                    </div>
                    <span className="text-center text-muted-foreground text-sm">
                        Нажимая {state ? (<>«Зарегистрировать»</>) : (<>«Авторизоваться»</>)}, вы соглашаетесь с нашими <a className="underline hover:text-foreground" href="">Условиями обслуживания</a> и <a className="underline hover:text-foreground" href="">Политикой конфиденциальности</a>
                    </span>
                </div>
            </section>
        </div>
    )
}


export default AuthPage