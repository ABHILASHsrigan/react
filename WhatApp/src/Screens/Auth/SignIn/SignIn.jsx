import { useState } from "react"
import {
    getAuth,
    signInWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    signOut,
} from "firebase/auth";
import { app } from "../../../Firebase/Firebase";

const auth = getAuth(app)

export default function SignIn() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSignIn = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((value) => alert("user login successful !!"))
            .catch((err) => alert("user login failed ! " + err));
    }

    return (
        <div>
            <form>
                <table>
                    <tbody>
                        <tr>
                            <td><label htmlFor="">E-mail</label></td>
                            <td>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="">Password</label></td>
                            <td>
                                <input
                                    // type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={() => handleSignIn()}>Sign-In</button>
            </form>
        </div>
    )
}
