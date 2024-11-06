import { userLogin, userRegister } from "../redux/features/auth/authAction"
import store from "../redux/store"


export const handleLogin = (e, email, password, role)=>{
    e.preventDefault()
    if(!role || !email || !password){
        return alert(`please provide all fields`)
    }

    try{
        store.dispatch(userLogin({email,password,role}))
    }
    catch(error)
    {
        console.log(error)
    }

}
export const handleRegister = ( e,
    name,
    role,
    email,
    password,
    phone,
    organisationName,
    address,
    hospitalName,
    website)=>{

    e.preventDefault()
    try{
        store.dispatch(userRegister({
             
            name,
            role,
            email,
            password,
            phone,
            organisationName,
            address,
            hospitalName,
            website

        }))
    }
    catch(error)
    {
        console.log(error)
    }

}