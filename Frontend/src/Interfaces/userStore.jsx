import create from "zustand"

import { devtools, persist } from "zustand/middleware"

const userStore = (set) => ({
    userid: null,
    username: '',
    usertheme: 'dark',
    usertoken: null,
    setUserName: (userName) => {
        set((state) => ({
            username: userName,
        }))
    },
    setUserToken: (userToken) => {
        set((state) => ({
            usertoken: userToken,
        }))
    },
    toggleTheme: () => {
        set((state) => ({
            usertheme: !usertheme,
        }))
    }
})

const useUserStore = create(userStore);

export default useUserStore;