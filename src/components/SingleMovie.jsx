import { Col } from 'react-bootstrap'

const SingleMovie = ({ data }) => {
  return (
    <Col className="mb-2" key={data.imdbID}>
      <img className="img-fluid" src={data.Poster} alt="movie" />
    </Col>
  )
}

export default SingleMovie
