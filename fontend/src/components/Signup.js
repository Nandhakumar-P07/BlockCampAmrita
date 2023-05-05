import React, { useState,useContext }  from 'react'
import { VotingContext } from '../utils/VotingContext';
import { shortenAddress } from '../utils/shortenAddress';
import axios from 'axios';
import "../styles/signupcss.css"
import validator from 'validator'
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [voterId, setVoterId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    // const [checkEmail, setCheckEmail] = useState('');
    // const [checkVoterId,setCheckVoterId] = useState('');
    // const [checkwalletaddress,setCheckwalletaddress] = useState('');

    const[error,setError] = useState('');
    // eslint-disable-next-line
    const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated")|| false));

    const navigate = useNavigate();

    // const [formError, setFormError] = useState({
    //   password: "",
    //   confirmPassword: "",
    //   isChecked:"",
    //   currentAccount:"",
    //   email:"",
    //   voterId:""
    // });
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // let inputError = {
      //   password: "",
      //   confirmPassword: "",
      //   isChecked:"",
      //   currentAccount:"",
      //   email:"",
      //   voterId:""
      // };

      if (validator.isStrongPassword(password, {
        minLength: 8, minLowercase: 1,
        minUppercase: 1, minNumbers: 1, minSymbols: 1
      }));
      else{
          setError("Password must contain atleast 8 charaters ,1 lowercase,1 uppercase,1 number , 1 symbol");
        return;
      }

      // axios
      // .get(
      //   `http://localhost:8080/blockchainvoting/signup/checkemail`, { params: { email:email} }
      // )
      // .then((response) => {
      //   console.log(response);
      //   setCheckEmail(response.data)
      // });

      // if (checkEmail === "exists") {
      //   setFormError({
      //     ...inputError,
      //     email: "email id have been already used",
      //   });
      //   return;
      // }

      // axios
      // .get(
      //   `http://localhost:8080/blockchainvoting/signup/checkvoterid`, { params: { voterid:voterId} }
      // )
      // .then((response) => {
      //   console.log(response);
      //   setCheckVoterId(response.data)
      // });

      // if (checkVoterId === "exists") {
      //   setFormError({
      //     ...inputError,
      //     voterId: "This Voter ID have been already registered",
      //   });
      //   return;
      // }

      if (confirmPassword !== password) {
          setError("Password and confirm password should be same");
        return;
      }

      // axios
      // .get(
      //   `http://localhost:8080/blockchainvoting/signup/checkwalletaddress`, { params: { walletaddress:currentAccount} }
      // )
      // .then((response) => {
      //   console.log(response);
      //   setCheckwalletaddress(response.data)
      // });

      // if (checkwalletaddress === "exists") {
      //   setFormError({
      //     ...inputError,
      //     currentAccount: "This Wallet address have been already registered",
      //   });
      //   return;
      // }

      // if (!currentAccount) {
      //   setFormError({
      //     ...inputError,
      //     currentAccount: "Connect Your Metamask wallet",
      //   });
      //   return;
      // }

      if (isChecked === false) {
          setError("please accept terms and conditions");
        return;
      }
  
      // setFormError(inputError);
      setError('');

      axios.post("http://localhost:8080/blockchainvoting/signup/savedata",{
        name:name,
        email:email,
        voterid:voterId,
        password:password,
        walletaddress:currentAccount,
        checkbox:isChecked,
      }).then((response)=> setError(response.data))

      
      if(error === "signup success") {
      setauthenticated(true);
      localStorage.setItem("authenticated", true);
      navigate("/");
      }
      else {
        setauthenticated(false);
      localStorage.setItem("authenticated", false);
      navigate("/signup");
      }
    };

    const{connectWallet,currentAccount} =useContext(VotingContext);

    return (
      <div id="signupmaindiv">
      <div id="signupdiv">
        <h1>Sign Up</h1>
        <p className='error-message'>{error}</p>
        <form onSubmit={handleSubmit} action="/Home.js" id="signupform">
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>

          {/* <p className="error-message">{formError.email}</p> */}
          <br/>

          <div>
            <label htmlFor="email">Email ID:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>

          {/* <p className="error-message">{formError.voterId}</p> */}
          <br/>
          <div>
            <label htmlFor="voterId">Voter ID:</label>
            <input
              type="text"
              id="voterId"
              value={voterId}
              onChange={(event) => setVoterId(event.target.value)}
              required
            />
          </div>
          
          {/* <p className="error-message">{formError.password}</p> */}
          <br/>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          
          {/* <p className="error-message">{formError.confirmPassword}</p> */}
          <br/>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
            {/* {formError.currentAccount && (
            <p className="error-message">{formError.currentAccount}</p>
            )} */}
            <br/>
          </div>
          {!currentAccount && (
    <button onClick={connectWallet}>Connect wallet</button>
      )}
      {currentAccount && (
        <p>Wallet connected  {shortenAddress(currentAccount)}</p>
      )
      }

      {/* <p className="error-message">{formError.isChecked}</p> */}
      <br/>
          <div>
          <input
            type="checkbox"
            id="checkbox"
            checked={isChecked}
            onChange={(event) => setIsChecked(event.target.checked)}
          />
          
          <label htmlFor="checkbox">I agree to the terms and conditions</label>
        </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
      </div>
    );
  }
  
  export default Signup;