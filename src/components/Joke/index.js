import './index.css'

const Joke = (props) =>{
    const {value} = props
    const {joke} = value
 
    return(
        <li className='list-item shadow-lg'>{joke}</li>
    )
}
export default Joke