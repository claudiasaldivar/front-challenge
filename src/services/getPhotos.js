const URL = 'https://jsonplaceholder.typicode.com/photos'

export const fetchPhotos = () => {
    return fetch(URL).then(res=>res.json()).then(data => {
        return data
    })
}