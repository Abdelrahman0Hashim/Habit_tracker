import React, {useEffect,useState} from 'react'
import './Main.css'
import TaskList from '../components/TaskList';
import OldTasks from '../components/oldTasks';
import Add from '../components/add';
export default function Main(){
    const [date , setdate]=useState('');
   
    const [tasks,settasks]=useState([]);
    const [showAdd, setShowAdd] = useState(false)

    useEffect(()=>{
        const currentDate=new Date().toLocaleDateString("en-US");
        setdate(currentDate);
    },[]);

    

    useEffect(()=>{

                const task= [
                    { date:'9/3/2025' ,group:'workout', title:'10 Handstand Push ups', done:'true' },
                    { date:'9/3/2025' ,group:'workout', title:'5 Handstand explosive push ups', done:'true' },
                    { date:'9/3/2025' ,group:'workout', title:'15 Bike push up',  done:'true' },
                    { date:'9/3/2025' ,group:'work', title:'work on the project', done:'false'},
                    { date:'9/3/2025' ,group:'work', title:'Film content', done:'false'}, 
                    { date:'9/3/2025' ,group:null, title:'Meal prep', done:'false'  },   
                    { date:'9/3/2025' ,group:null, title:'Make my bed', done:'false'  },  
                    { date:'8/26/2025',group:'workout', title:'10 reps leg press', done:'false' }, 
                    { date:'8/26/2025',group: 'workout', title: '15 squats', done: 'true' }, 
                    { date:'8/27/2025',group: 'study', title: 'Read React Hooks article', done: 'false' }, 
                    { date:'8/27/2025',group: null, title: 'Plan weekend trip', done: 'false' }, 
                    { date:'8/27/2025',group: 'workout', title: '30 mins cycling', done: 'true' }, 
                    { date:'8/27/2025',group: 'meal', title: 'Prep healthy lunch', done: 'false' }, 
                    { date:'8/27/2025',group: 'meeting', title: 'Team standup call', done: 'true' }, 
                    { date:'8/27/2025',group: null, title: 'Write blog post', done: 'false' }, 
                    { date:'8/27/2025',group: 'self-care', title: 'Meditation session', done: 'true' }, 
                    { date:'8/27/2025',group: 'chores', title: 'Grocery shopping', done: 'false' }, 
                    { date:'8/27/2025',group: null, title: 'Call mom', done: 'true' }

                ]
                settasks(task)
    },[]);

    function handleAddTask(newTask) {
    settasks(prev => [...prev, newTask])
    setShowAdd(false)
  }

    return(
        <>
        <div className='entry'>
        <h1>Tasks For {date}</h1>
        <button
          type='button'
          className='btn btn-primary btn-lg rounded-circle shadow position-fixed bottom-0 end-0 m-3 The'
          onClick={() => setShowAdd(true)}
        >
          +
        </button>
        </div>

        {showAdd && (
        <Add 
          onAdd={handleAddTask} 
          onCancel={() => setShowAdd(false)} 
        />
      )}

        <div className='today-plan'>
            <TaskList tasks={tasks} matchDate={date}/>
        </div>
        
        <div className='oldTasks'>
            <h2>Old Tasks</h2>
            <OldTasks tasks={tasks} todaysDate={date}/>
        </div>
        </>
    );
}


