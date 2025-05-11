import { useContext, useState } from 'react';
import './App.css'
import { Context } from './context';
import { useNavigate } from 'react-router';

function App() {
  const { setUser, user } = useContext(Context)
  const navigate = useNavigate()
  const modes: string[] = ["dev", "chill"]
  const [modeNum, setModeNum] = useState<number>(0)
  return (
    <div>
      <div
        className='CurrentMode'
      >
        {modes[modeNum]}
      </div>
      <button
        onClick={() => {
          setModeNum((modeNum - 1 + modes.length) % modes.length)
        }
        }
      >
        {"<"}
      </button>

      <button
        onClick={() => {
          setModeNum((modeNum + 1) % modes.length)
        }
        }
      >
        {">"}
      </button>
      <div
        className='Submit'
      >
        <button
          onClick={() => {
            setUser(modes[modeNum])
            if (modes[modeNum] === "dev") {
              navigate("/dev")
            }
            else if (modes[modeNum] === "chill") {
              navigate("/chill")
            }
          }
          }
        >
          LetsGoo
        </button>

      </div>
    </div>

  )

}

export default App
