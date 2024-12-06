import './App.css'
import Footer from './components/Footer/Footer'
import Navigation from './components/Navigation/Navigation'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    <div className="main">
      <Navigation />
      <div className="App">

      </div>
      <AppRoutes />
      <Footer />
    </div>
  )
}

export default App