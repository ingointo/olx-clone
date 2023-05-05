import React, { useState, useContext } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { collection, doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {firebase} = useContext(FirebaseContext)
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
   
    const auth = getAuth()
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(result.user, {displayName: username})
      console.log(result.user)
      await setDoc(doc(collection(firebase, "users"), result.user.uid), {id: result.user.uid, username: username, phone: phone})
      console.log("Document successfully written!");
      navigate('/login')
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      setIsLoading(false)
      setError(errorMessage)
      console.log("Error is..: ",errorMessage, errorCode)
    }
  }
   // check if all input fields have a value
   const allFieldsFilled = username && email && phone && password 
 
   

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt='olx-logo'></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button disabled={isLoading}>{isLoading ? 'Loading...' : 'Signup'}</button>
        </form>
        {!allFieldsFilled ? <p>Please enter all fields</p>: ''}
        {error && <p>{error}</p>}
        <Link to='/login'>Login</Link>
      </div>
    </div>
  );
}