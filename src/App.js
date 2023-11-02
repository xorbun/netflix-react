import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './styles/styles.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import MyNavbar from './components/MyNavbar'
import MyFooter from './components/MyFooter'
import { Container } from 'react-bootstrap'
import TVShows from './components/TVShows'
import MovieDetails from './components/ MovieDetails'

const App = () => {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tv-shows" element={<TVShows />} />
          <Route path="/movie-details/:movieId" element={<MovieDetails />} />
        </Routes>
        <MyFooter />
      </Container>
    </BrowserRouter>
  )
}

export default App