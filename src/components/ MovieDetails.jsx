import { useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { useParams } from 'react-router-dom'

const OMDB_URL = 'http://www.omdbapi.com/?apikey=24ad60e9'
const STRIVE_URL = 'https://striveschool-api.herokuapp.com/api/comments/'

const MovieDetails = () => {
  const params = useParams()
  console.log(params.movieId)

  const [movieDetailObject, setMovieDetailsObject] = useState(null)
  const [movieComments, setMovieComments] = useState([])

  useEffect(() => {
    // dobbiamo fare la fetch per i dettagli
    getDetails()
    // dobbiamo fare la fetch per i commenti
    getComments()
  }, [])

  const getDetails = () => {
    fetch(OMDB_URL + '&i=' + params.movieId)
      .then((res) => {
        if (res.ok) {
          // abbiamo ottenuto luce verde dalla get su omdbapi
          return res.json()
        } else {
          throw new Error('errore nel recupero dettagli film')
        }
      })
      .then((movieDetail) => {
        console.log('MOVIEDETAIL', movieDetail)
        setMovieDetailsObject(movieDetail)
      })
      .catch((err) => console.log('ERRORE', err))
  }

  const getComments = () => {
    fetch(STRIVE_URL + params.movieId, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTQzZDQzNmI0MDZiZTAwMTRiN2I3NmMiLCJpYXQiOjE2OTg5NDQwNTQsImV4cCI6MTcwMDE1MzY1NH0.RB1lm3aqcFWXLnCsVMvTUr8JwRcNHPfxzoMrA2THkrA',
      },
    })
      .then((res) => {
        if (res.ok) {
          // abbiamo ottenuto luce verde dalla get su omdbapi
          return res.json()
        } else {
          throw new Error('errore nel recupero commenti film')
        }
      })
      .then((movieComments) => {
        console.log('COMMENTI', movieComments)
        setMovieComments(movieComments)
      })
      .catch((err) => console.log('ERRORE', err))
  }

  return (
    <div className="d-flex justify-content-center text-light">
      {movieDetailObject && (
        <>
          <img src={movieDetailObject.Poster} alt="movie" />
          <div>
            <h3>{movieDetailObject.Title}</h3>
            <p>{movieDetailObject.Plot}</p>
            {movieComments && (
              <ListGroup>
                {movieComments.map((comment) => (
                  <ListGroup.Item key={comment._id}>
                    {comment.rate} - {comment.comment}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default MovieDetails