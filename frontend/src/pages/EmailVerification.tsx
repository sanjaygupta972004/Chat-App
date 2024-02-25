
import {Link} from "react-router-dom"

const EmailVerification = () => {

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center">Email Verification</h1>
                <p className="text-center">A verification link has been sent to your email address. Please verify your email address to continue.</p>
                <p className="text-center">If you haven't received the email, click the button below to resend the verification link.</p>
                <div className="d-grid gap-2">
                  <button className="btn btn-primary" type="button">Resend Verification Link</button>
                </div>
                <p className="text-center mt-3">Already verified your email? <Link to="/login">Login</Link></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      

    </>
  )
}

export default EmailVerification