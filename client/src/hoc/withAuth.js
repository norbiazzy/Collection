const auth = (props)=>{
    if (!props.auth.token) {
        let auth = JSON.parse(localStorage.getItem('auth'))
        if ( auth ) {
            setAuth(auth)
        }

    }

}