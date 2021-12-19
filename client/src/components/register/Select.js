import React, { useState } from 'react'
import Signup from './Signup'
import Login from './Login'
import img from "../../assets/svg/head.svg";
import "../../css/register.css"

const footText = [
    {
            head : "Sign-up",
            text : "Already Have account",
            value : "Login"
        },
{
        head : "Login",
        text : "Don't Have account",
        value : "Sign-up"
    }
]
const actualcode1 = Math.floor(100000 + Math.random() * 900000);
const actualcode2 = Math.floor(200000 + Math.random() * 900000);
function Select() {
    const [upORin,setchoose] = useState(1);
    const choose = ()=> {
        if(upORin){
            return <Login logincod={actualcode2}/>
        }
        else{
            return <Signup cod = {actualcode1}/>
        }
    }
    const chage = () =>{
        if(upORin){
            return 0
        }
        else{
            return 1
        }
    }
    return (
        <div className="login_signup_home">
            <div className="login_signup_box">
                <div className="login_signup_box_head">
                        <img src={img} className="login_signup_box_head_img"/>
                        <h2 className="login_signup_box_head_text">{footText[upORin].head}</h2>
                </div>


                {/* middle area of login of Signup component */}
                
                       {
                          choose()
                       } 


                <div className="login_signup_box_foot">
                    <h3 className="login_signup_box_foot_text">
                       {
                           footText[upORin].text
                       }
                       <h4 className="login_signup_box__foot_register" onClick={()=>setchoose(chage())}>
                           {
                               footText[upORin].value
                           }
                       </h4>
                    </h3>
                </div>
            </div>
        </div>
    )
}

export default Select;
