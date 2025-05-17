import { Footer } from "../page/Footer"
import { Header } from "../page/Header"

export const MainLayout=({children})=>{
    return(
        <div>
            <Header/>
            <div className="main h-195 p-5">{children}</div>
            <Footer/>
            
        </div>
    )
}