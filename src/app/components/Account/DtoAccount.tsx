

export interface UserAccount {
    nick: string
    rank: number
    balance: number
    register: Date
    chats_list: Array<number>
    ignore_list: Array<number>
    trusted_list: Array<number>
    dialogue_list: Array<number>
    prefix_commands: string
    prefix_scripts: string
    prefix_repeats: string
    message_time: Date
    command_time: Date
}

export interface DataAliases {
    id: number
    name: string
    command: string
    user_id: number
}

export interface DataTriggers {
    id: number
    name: string
    trigger: Array<string>
    command: string
    user_id: number
}

export interface DataTemplates {
    id: number
    name: string
    media: boolean
    message_id: number
    user_id: number
}

export interface DataAccount {
    user: UserAccount
    user_id: number
    aliases: DataAliases[]
    triggers: DataTriggers[]
    templates: DataTemplates[]
}

export interface ResponseAccount {
    status: boolean
    data: DataAccount
    description: string
}

export interface DataAccounts {
    tg: {
        user_id: number
        username: string
        prefixes: {
            commands: string
            scripts: string
            repeats: string
        }
        state: boolean
        lock: boolean
    }[]
    vk: {
        user_id: number
        username: string
        prefixes: {
            commands: string
            scripts: string
            repeats: string
        }
        state: boolean
        lock: boolean
    }[]
}

export interface ResponseAccounts {
    status: boolean
    data: {
        user: DataAccounts[]
        user_id: number
        aliases: DataAliases[]
        triggers: DataTriggers[]
        templates: DataTemplates[]
    }
    description: string
}

export interface CmpModulesProps {
    name: string
    content: boolean
    account: DataAccount | undefined
    BlockLoading: boolean
}

export interface CmpAccountProps {
    account: {
        user_id: number
        username: string
        prefixes: {
            commands: string
            scripts: string
            repeats: string
        }
        state: boolean
        lock: boolean
    }
    type: string
    token: string | undefined
    handleContent: (id: number, type: string) => void
    fetchDataAndUpdate: () => void
}


export interface CmpSettingProps {
    account: {
        user_id: number
        username: string
        prefixes: {
            commands: string
            scripts: string
            repeats: string
        }
        state: boolean
        lock: boolean
    }
    token: string | undefined
    type: string
    fetchDataAndUpdate: () => void
}

export interface CmpConnectProps {
    fetchDataAndUpdate: () => void
    account: {
        user_id: number
        username: string
        prefixes: {
            commands: string
            scripts: string
            repeats: string
        }
        state: boolean
        lock: boolean
    }
}