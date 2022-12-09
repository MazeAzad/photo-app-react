import './App.css';
import Loading from './components/loading';
import { uesGlobal } from "./context/context";
import { BiSearch } from "react-icons/bi";
import { useEffect } from 'react';

const App = () => {
  const { loading, data, page, setPage, search, setSearch, searchUrl, fetchImages, setData, imageUrl, setShowMoreImage } = uesGlobal();
  const photos = data;

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {

      if (loading && (window.scrollY + window.innerHeight >= document.body.scrollHeight)) {

        setShowMoreImage(true);

      }
    })
    return removeEventListener('scroll', event);
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search == '') {

      setData([]);
      setPage((old) => { return old = 1 });
      if (page === 1) {
        fetchImages(imageUrl);
      }

    }
    else {

      setData([]);
      setPage((old) => { return old = 1 })
      if (page === 1) {
        fetchImages(searchUrl);
      }

    }
  }



  return (
    <main className='app'>
      <div className="formContainer">
        <form className='form' onSubmit={handleSubmit}  >
          <label htmlFor="search">search</label>
          <input type="text" id="search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
          <button className='searchButton' type='submit'><BiSearch className='searchIcon' /></button>
        </form>
      </div>
      <div className="photosContainer">
        <div className="photos">
          {photos.map((photo) => {
            const { urls, id, likes, user, links } = photo;
            const photoObject = {
              image: urls.thumb,
              id: id,
              likes: likes,
              username: user.name,
              userLink: links.self,
              userImage: user.profile_image.small
            }

            return (<div className="photo" key={Math.random()}>
              <div className="thumbContainer">
                <img src={photoObject.image} alt="photo" />
              </div>
              <div className="info">
                <div className="userLikes">
                  <span>likes: {photoObject.likes}</span>
                </div>
                <div className="userImage">
                  <img src={photoObject.userImage} alt="user imaeg" />
                </div>
              </div>
            </div>
            )
          })}
          {loading && <Loading />}
        </div>
      </div>

    </main>
  )
}



export default App
