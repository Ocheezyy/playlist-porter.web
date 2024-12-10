import { Outlet } from "react-router";
import Header from "@/components/(home)/header.tsx";
import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setClerkToken } from "@/features/auth/auth-reducer";

export default function HomeLayout() {
    const { getToken } = useAuth();
    const dispatch = useDispatch();

    async function setToken() {
        const token = await getToken();
        dispatch(setClerkToken(token));
    }

    useEffect(() => {
        setToken();
    }, []);

    return (
        <>
            <Header />
            <Outlet />
        </>
    );
}