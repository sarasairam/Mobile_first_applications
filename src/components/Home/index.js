import  { useState,useEffect }  from "react"
import Cookies from 'js-cookie'
import './index.css'
import Joke from "../Joke"
import { Circles } from 'react-loader-spinner'
import { useHistory } from "react-router-dom"
import DataTable from "react-data-table-component"

const apiStatusConstants = {
    initial: "INITIAL",
    inProgress: "IN_PROGRESS",
    success: "SUCCESS",
    failure: "FAILURE"
  }

const columns = [
  {
    name:"Language",
    selector:row => row.Language
  },
  {
    name:"Category",
    selector:row => row.Category
  },
  {
    name:"Joke",
    selector:row => row.Joke
  }
]

const Home = ()=>{
    const [apiResponse, setApiResponse] = useState({
        status: apiStatusConstants.initial,
        data: null,
        errorMsg: null
      })
    const[table,setToggleTable] = useState(true) 

    useEffect(() => {
        const getLeaderboardData = async () => {
            setApiResponse((prevApiResponse) => ({
                ...prevApiResponse,
                status: apiStatusConstants.inProgress,
              }))
          const url = "https://v2.jokeapi.dev/joke/any?format=json&blacklistFlags=nsfw,sexist&type=single&lang=EN&amount=10"
          const response = await fetch(url)
          const responseData = await response.json()
          if (responseData.error===false) {
            setApiResponse((prevApiResponse) => ({
              ...prevApiResponse,
              status: apiStatusConstants.success,
              data: responseData.jokes
            }))
          }else{
            setApiResponse((prevApiResponse) => ({
                ...prevApiResponse,
                status: apiStatusConstants.failure,
              }))
          }
        }
        getLeaderboardData()
    }, [])

    const onToggle = ()=>{
      setToggleTable((Prev)=>!Prev)
    }

    const renderLoadingView =()=>{

        return(
        <div className="loading">
            <Circles
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="circles-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  />
        </div>
        )
    }

    const history = useHistory();
    const onClickLogout = () => {
      Cookies.remove('cookie')
      history.replace('/login')
    }


    const renderSuccessView =()=>{
        const {data} = apiResponse
        let data_1 = []
        for (let i of data){
          let a = {
            Language:i.lang,
            Category:i.category,
            Joke:i.joke,
            id:i.id
          }
          data_1.push(a)
        }
         
        return(
            <div className="Main-Container">
              {table ? <>
                <h1 className="heading">Here are the jokes everyone will Laugh at</h1>
              <DataTable columns={columns}
                data={data_1}>
              </DataTable>
              <div>
              <p className="p-3">Re-fresh the page for some more random jokes.</p>
            </div>
            <div className="d-flex flex-row justify-content-between container-buttons">
              <button type="button" className="btn-secondary btn" onClick={onToggle}>Grid View</button>              
              <button type="button" className="btn btn-primary" onClick={onClickLogout}>Logout</button>
            </div>
            </> :  <>
              <h1 className="heading">Here are the jokes everyone will Laugh at</h1>
            <div className="card p-3 m-3 shadow-lg">
                <ul className="list-box">
                {data.map(eachJoke => (
                    <Joke key={eachJoke.id} value={eachJoke}/>
                ))}
                </ul>
            </div>
            <div>
              <p>Re-fresh the page for some more random jokes.</p>
            </div>
            <div className="d-flex flex-row justify-content-between container-buttons">
              <button type="button" className="btn-secondary btn" onClick={onToggle}>Table View</button>
              <button type="button" className="btn btn-primary" onClick={onClickLogout}>Logout</button>
            </div>
              </>}
              </div>
        )
    }


    const renderFailureView =()=>{
        return(<div>
            <p>failure...</p>
        </div>
        )
    }


    const renderBoard = () => {
        const { status } = apiResponse
        switch (status) {
          case apiStatusConstants.inProgress:
            return renderLoadingView()
          case apiStatusConstants.success:
            return renderSuccessView()
          case apiStatusConstants.failure:
            return renderFailureView()
          default:
            return null;
        }
      }


    return(
    <>
        {renderBoard()}
    </>
    )
}
export default Home;