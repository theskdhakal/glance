import { Header } from "../page/Header"

export const MainLayout=({children})=>{
    return(
        <div>
            <Header/>
            <div className="main">{children}</div>
            
        </div>
    )
}