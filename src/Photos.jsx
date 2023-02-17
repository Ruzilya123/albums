import React, { useEffect, useState } from 'react'
import MyButton from './button/MyButton';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './style.css'

const gettingAPI = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

function Photos({ love, setLove, photos, setPhotos }) {

    const { id } = useParams();
    const [loading, setLoading] = useState([])
    const [classes, setClasses] = useState(false)

    useEffect(() => {
        setLoading(true);
        setTimeout(async () => {
            await gettingAPI(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`).then((data) => {
                setPhotos(data)
                setLoading(false)
            });
        }, 1000);
    }, []);

    function isPhotoInLove(photo) {
        return love.some((p) => p.id === photo.id)
    }

    const handleAddToLove = (photo, e) => {
        photo = {
            ...photo,
            quantity: 1,
        }
        setLove([...love, photo]);
        setClasses(true)
        setTimeout(() => {
            setClasses(false)
        }, 2000);
    }

    return (
        <div>
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/love">Likes</Link>
            </div>
            <h1>Photos</h1>
            <div>
                {loading ? (
                    <>
                        <h1>Loading...</h1>
                    </>
                ) : (
                    <>
                        {photos.map((photo) => (
                            <div key={photo.id}>
                                <img src={photo.thumbnailUrl} className={classes? 'spin' : 'img'}/>
                                <h3>{photo.title}</h3>
                                {isPhotoInLove(photo)
                                ? 
                                (
                                    <MyButton disabled>Added to love</MyButton>
                                )
                                : 
                                (
                                    <>
                                        <MyButton onClick={() => handleAddToLove(photo)}>Add to love</MyButton>
                                    </>
                                )
                                }
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    )
}



export default Photos;