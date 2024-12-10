import { ReactElement } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { LogIn, LogOut } from "@/client-functions/apple/apple-auth";
import { setToken } from "@/features/spotify/spotify-reducer";
import { useDispatch } from "react-redux";

type AccountCardProps = {
    title: string;
    icon: ReactElement;
    description: string;
    buttonText: string;
    linked: boolean;
};

export function AccountCard({ title, icon, description, buttonText, linked }: AccountCardProps) {
    const dispatch = useDispatch();

    const removeToken = () => {
        dispatch(setToken(""));
    };


    const buttonClasses = linked ?
        "w-full bg-pink-600 hover:bg-pink-700 text-white" : "w-full bg-red-600 hover:bg-red-700 text-white";

    const CardButton = () => {
        if (title === "Spotify") {
            if (linked) {
                return (
                    <a href="http://localhost:3000/spotify-login">
                        <Button className={buttonClasses}>
                            {buttonText}
                            <ArrowRight className="ml-2 h-4 w-4"/>
                        </Button>
                    </a>
                );
            }
            return (
                <Button className={buttonClasses} onClick={removeToken}>
                    {buttonText}
                    <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
            );
        } else if (title === "Apple Music") {
            if (linked) {
                return (
                    <Button className={buttonClasses} onClick={() => LogIn()}>
                        {buttonText}
                        <ArrowRight className="ml-2 h-4 w-4"/>
                    </Button>
                );
            }
            return (
                <Button className={buttonClasses} onClick={() => LogOut()}>
                    {buttonText}
                    <ArrowRight className="ml-2 h-4 w-4"/>
                </Button>
            );

        }
    };

    return (
        <Card className="flex flex-col h-full bg-gray-700 border-gray-600">
            <CardHeader>
                <div className="flex items-center space-x-2">
                    {icon}
                    <CardTitle className="text-gray-100">{title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription className="mb-4 text-gray-300">{description}</CardDescription>
                {CardButton()}
            </CardContent>
        </Card>
    );
}