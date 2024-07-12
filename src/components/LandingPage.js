import { useEffect } from "react";

function LandingPage() {
    useEffect(()=>{
        fetch('http://127.0.0.1:5555/restaurant',{
            method:"GET"
        })
        .then(res=>res.json())
    },[])
    return (
        <div>
            
        </div>
    );
}

export default LandingPage;