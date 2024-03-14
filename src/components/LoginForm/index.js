import  { useState }  from "react"
import Cookies from 'js-cookie'
import './index.css'
import  { useHistory }  from "react-router-dom";

const LoginForm =()=>{
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showSubmitError, setSubmitError] = useState(false);

    const onChangeUsername = (event) => setUsername(event.target.value);


    const onChangePassword = (event) => setPassword(event.target.value);

    const history = useHistory()
    
    const onSubmitSuccess = () => {
      const token = "habdbvjhbecbjbjcbb"
      Cookies.set("cookie", token, {
        expires: 30,
        path: "/",
      });
        history.push('/')
      };
    
      const onSubmitFailure = (errorMsg) => {
        setSubmitError(true)
        setErrorMsg(errorMsg)
      };

    const onSubmitForm = async (event) => {
            event.preventDefault();
            const value1 = username==="sara_ram"
            const value2 = password ==="1234"
            let value = (value1&&value2)
            if (value) {
              onSubmitSuccess();
            } else {
              onSubmitFailure("Invalid Credentials");
            }
          };
    

        return(
            <div className="Main-container">
              <div className="column justify-content-between">
                  <div className="card text-center mb-5 p-3 bg-danger border-0">
                     <h1 className="text-center text-light">User Credentials</h1>
                     <p>Username:   sara_ram</p>
                     <p>Password:   1234</p>
                  </div>
                  <form className="card shadow-lg p-5 d-flex flex-column form-style" onSubmit={onSubmitForm}>
                    <div className="pb-3">
                      <label htmlFor="username" className="text-sm label">Username</label>
                      <input id="username"type="text" className="form-control" value={username} onChange={onChangeUsername}/>
                    </div>
                      <div>
                      <label htmlFor="password" className="text-sm label">Password</label>
                    <input type="password" className="form-control" value={password} onChange={onChangePassword}/>
                    </div>
                    <button type="submit" className="m-3 btn btn-primary submit-button">Submit</button>
                    {showSubmitError && <p className="text-danger">*{errorMsg}</p>}
                </form>
              </div>
            </div>
        )
    }

export default LoginForm 