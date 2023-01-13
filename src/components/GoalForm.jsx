import React from 'react'
import { useState } from 'react'
import { useDispatch} from 'react-redux'
import {createGoal} from "../features/goals/goalSlice"

const GoalForm = () => {

    // form state
    const [text, setText] = useState('')

    const dispatch = useDispatch()
    const onSubmit = (e)=>{
        e.preventDefault()
        dispatch(createGoal({text}))
        setText('')
    }
    return (
        <section className='form'>
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="text">Goal</label>
                <input type="text" name='text' value={text} id="text"  placeholder='Enter your Goal'
                onChange={(e)=> setText(e.target.value)}/>
            </div>
            <div className="form-group">
                <button className="btn btn-block" type='submit'>Set Goal</button>
            </div>
        </form>
    </section >
    
    )
}

export default GoalForm
