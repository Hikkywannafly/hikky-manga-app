const config = {
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "null",
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || "null",
    nodeServerUrl: process.env.NEXT_PUBLIC_NODE_SERVER_URL,
    proxyServerUrl: process.env.NEXT_PUBLIC_PROXY_SERVER_URL,
    socketServerUrl: process.env.NEXT_PUBLIC_SOCKET_SERVER_URL,
    webPushPublicKey: process.env.NEXT_PUBLIC_WEB_PUSH,
};

export default config;