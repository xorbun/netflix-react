import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import './styles/styles.css'
import { Container, Alert, Dropdown } from 'react-bootstrap'
import MyNavbar from './components/MyNavbar'
import MyFooter from './components/MyFooter'
import MovieList from './components/MovieList'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Test from './components/Tvshow'

const App = () => {
  const [gallery1, setGallery1] = useState([])
  const [gallery2, setGallery2] = useState([])
  const [gallery3, setGallery3] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  const OMDB_URL = 'http://www.omdbapi.com/?apikey=24ad60e9'

  useEffect(() => {
    fetchMovies()
  }, [])

  const fetchMovies = () => {
    Promise.all([
      fetch(OMDB_URL + '&s=harry%20potter')
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === 'True') {
            setGallery1(responseObject.Search)
          } else {
            setError(true)
          }
        }),
      fetch(OMDB_URL + '&s=avengers')
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === 'True') {
            setGallery2(responseObject.Search)
          } else {
            setError(true)
          }
        }),
      fetch(OMDB_URL + '&s=star%20wars')
        .then((response) => response.json())
        .then((responseObject) => {
          if (responseObject.Response === 'True') {
            setGallery3(responseObject.Search)
          } else {
            setError(true)
          }
        }),
    ])
      .then(() => setLoading(false))
      .catch((err) => {
        setError(true)
        console.log('An error has occurred:', err)
      })
  }

  return (
   
    <BrowserRouter>
    <div>
    <Routes>
            <Route element={<Test />} path='/tv'/>
          </Routes>
      <MyNavbar />
      <Container fluid className="px-4">
        <div className="d-flex justify-content-between">
          <div className="d-flex">
          <h2 className="mb-4">TV Shows</h2>
         
            <div className="ms-4 mt-1">
              <Dropdown>
                <Dropdown.Toggle
                  style={{ backgroundColor: '#221f1f' }}
                  id="dropdownMenuButton"
                  className="btn-secondary btn-sm dropdown-toggle rounded-0"
                >
                  Genres
                </Dropdown.Toggle>
                <Dropdown.Menu bg="dark">
                  <Dropdown.Item href="#/action-1">Comedy</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Drama</Dropdown.Item>
                  <Dropdown.Item href="#/action-3">Thriller</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div>
            <i className="fa fa-th-large icons"></i>
            <i className="fa fa-th icons"></i>
          </div>
        </div>
        {error && (
          <Alert variant="danger" className="text-center">
            An error has occurred, please try again!
          </Alert>
        )}
        {!error && (
          <>
          
            <MovieList
              title="Harry Potter"
              loading={loading}
              movies={gallery1.slice(0, 6)}
            />
            <MovieList
              title="Lord of the Rings"
              loading={loading}
              movies={gallery2.slice(0, 6)}
            />
            <MovieList
              title="Star Wars"
              loading={loading}
              movies={gallery3.slice(0, 6)}
            />
          </>
        )}
        <MyFooter />
      </Container>
      
    </div>
    </BrowserRouter>
    
  )
}

export default App
