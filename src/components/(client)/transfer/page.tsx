import { useState, useEffect, SetStateAction, Dispatch } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, CheckCircle2, Loader2, Music2, XCircle } from "lucide-react";

// Mock function to simulate transfer progress
const simulateTransfer = (setProgress: Dispatch<SetStateAction<number>>, setStatus: Dispatch<SetStateAction<string>>) => {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setStatus("completed");
        }
        setProgress(Math.min(progress, 100));
    }, 500);
};

export default function TransferProgress() {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState("in-progress"); // 'in-progress', 'completed', 'failed'

    useEffect(() => {
        simulateTransfer(setProgress, setStatus);
    }, []);

    return (
        <main className="flex-1 p-8 text-gray-100">
            <div className="max-w-4xl mx-auto">
                <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-center text-gray-100">Transferring Playlist</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                                    <Music2 className="w-6 h-6 text-blue-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-100">My Awesome Playlist</p>
                                    <p className="text-sm text-gray-400">Spotify</p>
                                </div>
                            </div>
                            <ArrowRight className="w-6 h-6 text-gray-400" />
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
                                    <Music2 className="w-6 h-6 text-pink-400" />
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-100">My Awesome Playlist</p>
                                    <p className="text-sm text-gray-400">Apple Music</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium text-gray-300">
                                <span>Progress</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <Progress value={progress} className="w-full bg-gray-700" />
                        </div>

                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="font-semibold mb-2 text-gray-100">Transfer Details</h3>
                            <ul className="space-y-1 text-sm">
                                <li className="flex items-center">
                                    <CheckCircle2 className="w-4 h-4 text-green-400 mr-2" />
                                    <span className="text-gray-300">50 songs transferred</span>
                                </li>
                                <li className="flex items-center">
                                    <XCircle className="w-4 h-4 text-red-400 mr-2" />
                                    <span className="text-gray-300">2 songs failed to transfer</span>
                                </li>
                                <li className="flex items-center">
                                    <Loader2 className="w-4 h-4 text-gray-400 mr-2 animate-spin" />
                                    <span className="text-gray-300">10 songs remaining</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                        {status === "completed" ? (
                            <Button className="bg-pink-700 hover:bg-pink-900 text-white p-6 font-semibold">View Transferred Playlist</Button>
                        ) : status === "failed" ? (
                            <Button variant="destructive" className="bg-red-600 hover:bg-red-700 font-semibold">Retry Transfer</Button>
                        ) : (
                            <Button disabled className="bg-gray-700 text-gray-400 font-semibold">
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Transferring...
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </main>
    );
}