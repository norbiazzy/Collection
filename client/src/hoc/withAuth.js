const auth = (props)=>{
    if (!props.auth.token) {
        let auth = localStorage.getItem('auth')
        if ( auth ) {
            JSON.parse(auth)
        }

    }

}