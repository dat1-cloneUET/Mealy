import React, { useState } from 'react'
import CusButton from '../../atom/CusButton/CusButton'
import styles from './LoginScreen.module.scss'

function LoginScreen() {
    const [signUp, setSignUp]= useState(false);
    const [username, setUsername]= useState("");
    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    const [spanUsername, setSpanUsername]= useState("");
    const [spanPassword, setSpanPassword]= useState("");
    const [spanConfirmPassword, setSpanConfirmPassword]= useState("");
    const handleSwitch = () =>{
        if(signUp)
            setSpanConfirmPassword("");
        setSignUp(!signUp);
        
    }
    const checkvalid = (type) => {
        switch (type){
            case "username":
                if(username.length < 6)
                    setSpanUsername("Must Contain at Least 6 characters");
                break;
            case "password":
                if(password.length < 6){
                    setSpanPassword("Must Contain at Least 6 characters and an Uppercase");
                    break;
                }
                let x= false;
                for(let i = 0; i < password.length; i++)
                    if(password[i]<="Z" && password[i] >="A"){
                        x= true;
                        break;
                    }
                if(!x)
                    setSpanPassword("Must Contain at Least 6 characters and an Uppercase");
                break;
            case "confirmpassword":
                if(password !== confirmPassword)
                    setSpanConfirmPassword("Confirm and password must be the same");
                break;
        }
    }
    return (
        <div className={styles.mainComponent}>
            <input  type="text" 
                    placeholder="username" 
                    onChange={e => setUsername(e.target.value)}
                    value={username}
                    className={spanUsername != "" ?styles.input_warn : styles.input} 
                    onBlur={() =>checkvalid("username")} 
                    onFocus={()=>setSpanUsername("")}/>
            <span className={styles.span}>{spanUsername}</span>
            <input  type="password" 
                    placeholder="password" 
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    className={spanPassword != "" ?styles.input_warn : styles.input} 
                    onBlur={() =>checkvalid("password")} 
                    onFocus={()=>setSpanPassword("")}/>
            <span className={styles.span}>{spanPassword}</span>
            <div className={signUp?styles.visible: styles.notvisible}>
                <input  type="password"
                        placeholder="confirm password" 
                        onChange={e => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        className={spanConfirmPassword !=""? styles.input_warn : styles.input} 
                        onBlur={() =>checkvalid("confirmpassword")} 
                        onFocus={()=>setSpanConfirmPassword("")}/>
                
            </div>
            <span className={styles.span} style={{marginTop: -20}}>{spanConfirmPassword}</span>
            
            <div className={styles.footer}>
                {signUp?<div></div>:<p className={styles.forgotpassword}>forgot password?</p>}
                
                <CusButton data={signUp?"Sign Up":"Log In"}/>
                <p className={styles.descript}>
                    <span>
                        {signUp?"Already have an account, ":"Don't have an account, "}
                    </span>
                    <span className={styles.signUp} onClick={()=>handleSwitch()}>
                        {signUp?"Sign Up":"Sign In"}
                    </span> now.
                </p>
            </div>
            
            

        </div>
    )
}

export default LoginScreen
