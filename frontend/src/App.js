import { Container } from "react-bootstrap"
import Footer from "./components/Footer"
import Header from "./components/Header"
import { Outlet } from "react-router-dom"

const App = () => {
  return (
    <div>
        <Header/>
          <main className="py-3">
            <Container>
              <Outlet/>
            </Container>
          </main>
        <Footer/>
    </div>
  )
}

export default App