import React from 'react'
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom"
import {useSelector , useDispatch} from "react-redux"
import Spinner from '../components/Spinner'
import GoalForm from '../components/GoalForm'
import { getGoals} from '../features/goals/goalSlice'
import GoalItem from '../components/GoalItem'


const Dashboard = () => {
const navigate = useNavigate()
const dispatch =  useDispatch()

// take the user 
const {user} = useSelector((state) => state.auth)

// get goals
const {goals, isLoading, isError, message} = useSelector((state) => state.goals)

useEffect (() => {

  // check for the user
  if(!user){
    navigate("/login")
  }

  dispatch(getGoals())

  // dispatch(reset())
  
  
}, [user, navigate , isError, message , dispatch])

if(isLoading) {
  return <Spinner />
}
  return (
    <>
      <section className='heading'>
        <h4>Welcome {user && user.name} </h4>
        <p>Goals Dashboard</p>
      </section>

      <GoalForm/>

      <section className="content">
          {goals.length > 0 ? (
          <div className="goals">
            {goals.map((goal) => (
              <GoalItem key={goal._id} goal = {goal} />
            ))}
          </div>) : (<h4>No Goals Added</h4>) }
      </section>
    </>
  )
}

export default Dashboard
