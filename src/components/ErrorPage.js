import { useRouteError } from "react-router-dom"

function ErrorPage(){
    const error = useRouteError()
    console.log(error);

    return(
        <div>
            <h1>Oops!Something went wrong</h1>C
        </div>
    )
}
export default ErrorPage