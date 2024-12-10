export default function getApiHeaders(clerkToken: string) {
    return {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clerkToken}`,
    };
}