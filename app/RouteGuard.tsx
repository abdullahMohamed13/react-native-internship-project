import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function RouteGuard({children}: {children: React.ReactNode}) {
    const router = useRouter();
    const isAuth = false;

    // when the app loads, make sure that the first screen the user sees is the auth screen
    useEffect(() => {
        if(!isAuth) {
            setTimeout(() => {
                router.replace('/auth/auth')
            }, 0)
        }
    })
    
    return <>{children}</>
}