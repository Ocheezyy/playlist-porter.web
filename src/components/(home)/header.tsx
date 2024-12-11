import { Music } from "lucide-react";
import { ReactElement } from "react";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Link } from "react-router";

export default function Header(): ReactElement {

    return (
        <header className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-sm fixed w-full z-10">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <Music className="h-6 w-6 text-pink-500"/>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">Playlist Porter</span>
                </div>
                <nav>
                    <ul className="flex space-x-6">
                        <li><Link to="/" className="text-gray-300 hover:text-pink-500 transition-colors">Home</Link></li>
                        <li><Link to="/how-it-works" className="text-gray-300 hover:text-pink-500 transition-colors">How it Works</Link></li>
                        <li><Link to="#" className="text-gray-300 hover:text-pink-500 transition-colors">Contact</Link></li>
                        <li className="pl-3">
                            <SignedOut>
                                <SignInButton />
                            </SignedOut>
                            <SignedIn>
                                <UserButton />
                            </SignedIn>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}