import styled from "styled-components";

const FilmItem = ({ title, release_date, filmImg }) => {
  return (
    <Wrapper>
      <img type="url" src={filmImg} alt={title} />
      <ul>
        <li>"{title.toUpperCase()}"</li>
        <li>{release_date}</li>
      </ul>
    </Wrapper>
  );
};

export default FilmItem;

const Wrapper = styled.div`
  border-radius: 2px;
  background-color: #282727;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.8);
  text-align: left;
  width: 20rem;
  height: auto;
  display: grid;
  grid-template-rows: 4fr 1fr;
  margin: 0rem 1.3rem 2rem 1.3rem;
  border-radius: 0.7rem;

  img {
    width: 20rem;
    height: auto;
    border-radius: 0.7rem 0.7rem 0rem 0rem;
    border-bottom: 0.3rem solid #3273c5;
    object-fit: cover;
    margin-bottom: 2rem;
  }

  ul {
    padding: 0rem 2rem 0rem 2rem;
    color: #dadada;
    line-height: 2rem;
  }
`;
//<li>{planet}</li>
/* planet is a URL
would have to do an other API call
*/
