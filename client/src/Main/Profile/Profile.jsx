import React from "react";
import s from './Priofile.module.css'
class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getProfile(this.props.userId)
    }

    verifyClick(){
        console.log('verify')
        let headers = {
            'Content-Type': 'application/json'
        }
         const ver = (body) => {
            body = JSON.stringify(body)
            return fetch('/api/auth/verify', {
                method: 'POST', body, headers
            }).then((res) => {
                console.log('verify ')
                console.log(res.json())
            })
        }
        let aasdasd = JSON.parse(localStorage.getItem('auth')).token
        debugger
        ver({token: aasdasd})
    }

    render() {
        console.log(this.props)
        return (
            <>
                <h2>Profile</h2>
                <div className={`d-flex`}>
                    <div>
                        <img className={s.img} src={this.props.profile.photo} alt={'profile'}/>
                    </div>
                    <div>
                        <p>{this.props.profile.name}</p>
                        <p>{this.props.profile.status}</p>
                        <button className='btn btn-dark' onClick={this.verifyClick}>token</button>
                    </div>
                    <div>
                        collections
                    </div>
                </div>
            </>
        )
    }
}

export default Profile