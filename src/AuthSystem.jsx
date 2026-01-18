import React, { useState } from 'react';
import { auth, db } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

const AuthSystem = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', phone: '' });

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      } else {
        const res = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        // Save extra details (Phone) to our database
        await setDoc(doc(db, "users", res.user.uid), {
          email: formData.email,
          phone: formData.phone,
          role: 'user',
          uid: res.user.uid
        });
      }
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-slate-900 p-6">
      <form onSubmit={handleAuth} className="bg-white p-10 rounded-[40px] shadow-2xl w-full max-w-md animate-slide-up">
        <h2 className="text-3xl font-black mb-6 uppercase italic">{isLogin ? 'Login' : 'Create Account'}</h2>
        <input type="email" placeholder="Email" className="w-full mb-4 p-4 bg-slate-100 rounded-2xl outline-none"
               onChange={(e) => setFormData({...formData, email: e.target.value})} />
        {!isLogin && (
          <input type="tel" placeholder="Phone Number" className="w-full mb-4 p-4 bg-slate-100 rounded-2xl outline-none"
                 onChange={(e) => setFormData({...formData, phone: e.target.value})} />
        )}
        <input type="password" placeholder="Password" className="w-full mb-6 p-4 bg-slate-100 rounded-2xl outline-none"
               onChange={(e) => setFormData({...formData, password: e.target.value})} />
        <button className="w-full bg-indigo-600 text-white p-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-indigo-700 transition-all">
          {isLogin ? 'Enter Platform' : 'Sign Up'}
        </button>
        <p className="mt-6 text-center text-slate-400 cursor-pointer text-sm" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default AuthSystem;