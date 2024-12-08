export default function Main(props){
    const {data} = props
    return (
            <div className="imageContainer">
                <img src={data.hdurl} alt={data.title || 'bg_img'} className="bgImage"/>
            </div>
    )
}

//changed