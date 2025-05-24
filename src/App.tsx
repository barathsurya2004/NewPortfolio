import { useContext, useEffect, useState } from 'react';
import './App.css'
import { Context } from './context';
import { useNavigate } from 'react-router';

function App() {
  const { setUser, user, setAuth } = useContext(Context)
  const navigate = useNavigate()
  const modes: string[] = ["dev", "chill"]
  const [modeNum, setModeNum] = useState<number>(0)
  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.error(`Error attempting to exit full-screen mode: ${err.message}`);
      });
    } else {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enter full-screen mode: ${err.message}`);
      });
    }
  }
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
            handleFullScreen();

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
