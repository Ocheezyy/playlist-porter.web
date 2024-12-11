import { Route, Routes } from "react-router";

import ClientLayout from "@/components/(client)/layout";
import ClientHome from "@/components/(client)/page";
import SupportedPlatforms from "@/components/(client)/supported-platforms/page";
import AccountsPage from "@/components/(client)/accounts/page";

import HomeLayout from "@/components/(home)/layout";
import Home from "@/components/(home)/page";
import HowItWorksPage from "@/components/(home)/how-it-works/page.tsx";


import SignIn from "@/components/(auth)/sign-in";
import SignUp from "@/components/(auth)/sign-up";
import TransferProgress from "@/components/(client)/transfer/page.tsx";


export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<HomeLayout />}>
                <Route index element={<Home />} />
                <Route path="how-it-works" element={<HowItWorksPage />} />
            </Route>
            <Route path="client" element={<ClientLayout />}>
                <Route index element={<ClientHome />} />
                <Route path="accounts" element={<AccountsPage />} />
                <Route path="supported-platforms" element={<SupportedPlatforms />} />
                <Route path="transfer" element={<TransferProgress />} />
            </Route>
            <Route path="auth/sign-in" element={<SignIn />} />
            <Route path="auth/sign-up" element={<SignUp />} />
        </Routes>
    );
}