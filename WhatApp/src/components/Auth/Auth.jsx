import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import './Auth.css';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  // Signup
  async function handleSignup(e) {
    e.preventDefault();
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(cred.user, { displayName });
    await setDoc(doc(db, 'users', cred.user.uid), {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName,
      lastSeen: serverTimestamp()
    });
    navigate('/');
  }

  // Login
  async function handleLogin(e) {
    e.preventDefault();
    const cred = await signInWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, 'users', cred.user.uid), {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: cred.user.displayName || '',
      lastSeen: serverTimestamp()
    }, { merge: true });
    navigate('/');
  }

  // Google login
  async function handleGoogleLogin() {
    const provider = new GoogleAuthProvider();
    const cred = await signInWithPopup(auth, provider);
    await setDoc(doc(db, 'users', cred.user.uid), {
      uid: cred.user.uid,
      email: cred.user.email,
      displayName: cred.user.displayName,
      photoURL: cred.user.photoURL || '',
      lastSeen: serverTimestamp()
    }, { merge: true });
    navigate('/');
  }

  return (
    <div className="auth-page" style={{ background: 'linear-gradient(180deg, #a4c5ebff, #031332ff)' }}>
      <div className="auth-box" style={{ background: '#dadf9dff', color: '#e6eef8' }}>
        <h2>{isLogin ? 'Sign In' : 'Sign Up'}</h2>

        <form onSubmit={isLogin ? handleLogin : handleSignup}>
          {!isLogin && (
            <input
              placeholder="Display Name"
              value={displayName}
              onChange={e => setDisplayName(e.target.value)}
            />
          )}
          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">{isLogin ? 'Sign In' : 'Sign Up'}</button>
        </form>

        <button className="google-btn" onClick={handleGoogleLogin} style={{ background: '#4bd1e9ff', color: 'white' }}>
          Continue with Google
        </button>

        <p className="link" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create an account' : 'Have an account? Sign In'}
        </p>
      </div>
    </div>
  );
}
