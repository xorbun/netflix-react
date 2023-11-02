import { Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const SingleMovie = ({ data }) => {
  return (
    <Col className="mb-2" key={data.imdbID}>
      <Link to={'/movie-details/' + data.imdbID}>
        <img className="img-fluid" src={data.Poster} alt="movie" />
      </Link>
    </Col>
  )
}

export default SingleMovie