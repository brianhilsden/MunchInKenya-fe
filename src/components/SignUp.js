import { useEffect } from "react";
function SignUp() {
    useEffect(()=>{
        fetch('http://127.0.0.1:5555/restaurant')
        .then(res=>res.json())
        .then(data=>console.log(data))
    },[])
    return (
        <div>
            
        </div>
    );
}

export default SignUp;