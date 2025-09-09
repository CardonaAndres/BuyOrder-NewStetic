export class AuthAPI {
    private static readonly baseUrl = String(import.meta.env.VITE_AUTH_SERVICE);
    private static readonly appName = String(import.meta.env.VITE_APP_NAME);

    static async login(userInfo: { username: string, password: string }) {
        try {
            const res = await fetch(`${this.baseUrl}/login-by-da`, {
                method : 'POST', headers : { 'Content-Type': 'application/json' },
                credentials: 'include', body: JSON.stringify({ 
                    username: userInfo.username, 
                    password: userInfo.password, 
                    appName: this.appName
                })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Login failed');

            return { success : true, data }

        } catch (err : any) {
            return { status: false, message : err.message }
        }
    }
}