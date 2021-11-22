import React, { useContext } from 'react'
import Style from './Signup.module.css';
import AuthContext from '../../store/authContext';
import Modal from '../Modal/Modal';
import {Form, Button} from 'react-bootstrap';

const Signup = () => {
    const ctx = useContext(AuthContext);
    
    return (
        <div>
            <Modal
                show={ctx.show}
                toggle={ctx.toggleModal}
            >
                {ctx.isSignup ? (
                    <>          
            <Form>
                <div className={Style.Head}>Join S-Lodging</div>
                <div className={Style.FormCol}>
                    <div className={Style.Col}>
                        <label>First Name:</label>
                        <input type="text" placeholder="Enter first name" value={ctx.data.firstname} onChange={ctx.handleFirstNameInput}/>
                    </div>
                    <div className={Style.Col}>
                        <label>Last Name:</label>
                        <input type="text" placeholder="Enter last name" value={ctx.data.lastname} onChange={ctx.handleLastNameInput}/>
                    </div>  
                    <div className={Style.Col}>     
                       <label>Email:</label>
                       <input type="email" placeholder="Enter email" value={ctx.data.email} onChange={ctx.handleEmailInput}/>
                    </div>
                    <div className={Style.Col}>
                        <label>Password:</label>
                        <input type="password" placeholder="Enter password" value={ctx.data.password} onChange={ctx.handlePasswordInput}/>
                    </div>
                    <div className={Style.Col}>
                        <label>Confirm Password:</label>
                        <input type="password" placeholder="Conform password" value={ctx.passwordConfirmation} onChange={ctx.handleConfirmPasswordInput}/>
                    </div>
                    <Button className={Style.Button} value={ctx.userType} type="submit" onClick={ctx.handleSignupSubmit}>
                        {ctx.loading ? "Signing up..." : "Sign Up"}
                    </Button>
                    {ctx.formError !== "" && <div style={{ "color": "red", "textAlign": "center", "letterSpacing": "1px" }}>{ctx.formError}</div>}
                </div>                
            </Form>

            <div className={Style.User}>
                <p>
                    Existing user? <span onClick={ctx.signIn}>Sign in</span>
                </p>
            </div>
                    </>
                ): 
            <>
              <Form>
              <div className={Style.Head}>S-lodging</div>
                <div className={Style.FormCol}>
                    <div className={Style.Col}>
                        <label>Email:</label>
                        <input type="text" placeholder="Enter email" value={ctx.data.email} onChange={ctx.handleEmailInput}/>
                    </div>
                    <div className={Style.Col}>
                        <label>Password:</label>
                        <input type="password" placeholder="Enter password" value={ctx.data.password} onChange={ctx.handlePasswordInput}/>
                    </div>  
                    <div className={Style.Col}>
                        <label>Login as:</label>
                        <select value={ctx.loginType} onChange={ctx.handleOption}>
                            <option disabled selected>Choose any..</option>
                            <option value="host">Host</option>
                            <option value="guest">Guest</option>
                        </select>
                    </div>  
                </div> 
                <Button className={Style.Button} type="submit" onClick={ctx.handleLoginSubmit}>
                    {ctx.loading ? "Logging in..." : "Login"}
                </Button>
                {ctx.formError !== "" && <div style={{ "color": "red", "textAlign": "center", "letterSpacing": "1px" }}>{ctx.formError}</div>}
              </Form>
            </>}
            </Modal>
        </div>
    )
}

export default Signup
        