import auth0 from 'auth0-js'
import history from './history'

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'jrd.us.auth0.com',
        clientID: 'mFkr1aLxwBgAMTQgFHDdO6mXwKLR15p0', /* no need to be private */
        redirectUri: 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid profile email'
    })

    userProfile = {}
    
    login = () => {   
        this.auth0.authorize()
    }

    handleAuth = () => {
        this.auth0.parseHash((err, authResult) => {
            console.log({authResult})
            if (authResult) {
                localStorage.setItem('access_token', authResult.accessToken)
                localStorage.setItem('id_token', authResult.idToken)

                let expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
                localStorage.setItem('expiresAt', expiresAt)
                
                this.getProfile()
                setTimeout(()=>{
                    history.replace('/authcheck')
                }, 200)
            } else {
                console.error(err)
            }
        })
    }

    getAccessToken = () => {
        return localStorage.getItem('access_token') || null
    }

    getProfile = () => {
        let accessToken = this.getAccessToken()
        if (accessToken) this.auth0.client.userInfo(accessToken, (err, profile)=>{
            if (profile) this.userProfile = console.log({profile}) || { profile }
        })
    }

    logout = () => {
        localStorage.removeItem('access_token')
        localStorage.removeItem('id_token')
        localStorage.removeItem('expiresAt')
        setTimeout(()=>{
            history.replace('/authcheck')
        }, 200)
    }

    isAuthenticated = () => {
        let expiresAt = JSON.parse(localStorage.getItem('expiresAt'))
        return new Date().getTime() < expiresAt
    }

    /*
    #access_token = 8hm1W-4jZmuBHNNqkLohGp8hlAPoVusS
    &scope = openid%20profile%20email
    &expires_in = 7200
    &token_type = Bearer
    &state = 7NagEczjlC8OMbbJdC.4Tso2_L7pMNI6
    &id_token = eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6InZZb0NiMkFVcnc3b3BRVzRDYWhsQSJ9.eyJnaXZlbl9uYW1lIjoiR3Vlc3QiLCJmYW1pbHlfbmFtZSI6IkxvZ2luIiwibmlja25hbWUiOiJqZGd1ZXN0bG9naW4iLCJuYW1lIjoiR3Vlc3QgTG9naW4iLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKemFoalNhMGtJZ3NKdXY1VDJtbXBlc2R1NjZkSVk5ZmdKVkJTTTQ9czk2LWMiLCJsb2NhbGUiOiJlbiIsInVwZGF0ZWRfYXQiOiIyMDIxLTA3LTA2VDE0OjQ3OjIxLjE0M1oiLCJlbWFpbCI6ImpkZ3Vlc3Rsb2dpbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6Ly9qcmQudXMuYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTA2OTg3MzI1NjAyOTI4OTgwOTIxIiwiYXVkIjoibUZrcjFhTHh3QmdBTVRRZ0ZIRGRPNm1Yd0tMUjE1cDAiLCJpYXQiOjE2MjU1ODI4NDksImV4cCI6MTYyNTYxODg0OSwiYXRfaGFzaCI6IjNMM2VaVGZQR19ySWR5Rnl0TzIxWkEiLCJub25jZSI6IkZnTE5EY0dPQ1ZGcmpVVHgwd1VwSW5mbGlnYlg5NzdVIn0.C8ADTN6_XqLNYtygx4lpmivCjxzvi6Oxhk8J2Kx2-wjtZBsdxMxhPBj_d46ip4Kck9cFyC9h-G4BnKaZ9E4KZOuJXPSSLN19qQp9tl40KwhbUI-exVCoKJAq5dHc3eNI1IAVkrg84MQ59YuEf52N049WHO17DBc0-MnbzrF0Ulsvy3ZyHY3qwg6xEKb4fO06MFbasvTsdjg-ZM0HiVNB5aKVnjvDAyZDGO8uAeiGSrD9xqbcoc2CMRIyW3tLws1Q2mDZ7HkUaWP7_espYDrfhoEvFzbic9Jvf9SoQfUGtzVD3inwuz-52ThS9Ur6p5sWydkfAjfKpVVHi85YUR2AWg
    */
}