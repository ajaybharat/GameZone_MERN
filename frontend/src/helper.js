import { useEffect,useRef } from "react";

//tic - tac - toe
export function isgameover(squares)
{
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for(let i = 0; i < lines.length; i++)
    {
        const [a,b,c] = lines[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
        {
            return squares[a];
        }
    }
    return null;
}



export function randomIntForFood(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function useInterval(callback, delay) {
    const savedCallback = useRef();
  
    // Remember the latest callback.
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
  
    // Set up the interval.
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

export function ReverseLinkedList(head)
{
    let Pnode = null;
    let Cnode = head;
    //let Nnode = null;
    while(Cnode != null)
    {
        const Nnode = Cnode.next;
        Cnode.next = Pnode;
        Pnode = Cnode;
        Cnode = Nnode;
    }
    // return Pnode;
}

//2048 game utils

export const useEvent = (event, handler, passive=false) => {
    useEffect(() => {
      //initiate the event handler
      window.addEventListener(event, handler, passive);
      //this will clean up component everytime the component re-renders
      return function cleanUp() {
        window.removeEventListener(event, handler);
      };
    });
};

export const getColors = (num) => {
  switch (num) {
    case 2:
      return "#EBDCD0";
    case 4:
      return "#E9DBBA";
    case 8:
      return "#E9A067";
    case 16:
      return "#F08151";
    case 32:
      return "#F2654F";
    case 64:
      return "#F1462C";
    case 128:
      return "#E7C65E";
    case 256:
      return "#E8C350";
    case 512:
      return "#E8BE40";
    case 1024:
      return "#E8BB31";
    case 2048:
      return "#E7B723";
    default:
      return "#C2B3A3";
  }
};

export const style = {
  blockStyle: {
      height: 80,
      width: 80,
      background: "lightgray",
      margin: 3,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: 45,
      fontWeight: "800",
      color: "white",
    },
    newGameButton: {
      padding: 10,
      background: "#846F5B",
      color: "#F8F5F0",
      // width: 95,
      borderRadius: 7,
      fontWeight: "900",
      marginLeft: "auto",
      marginBottom: "auto",
      cursor: "pointer",
    },
    tryAgainButton: {
      padding: 10,
      background: "#846F5B",
      color: "#F8F5F0",
      width: 80,
      borderRadius: 7,
      fontWeight: "900",
      cursor: "pointer",
      margin: "auto",
      marginTop: 20,
    },
    gameOverOverlay: {
      position: "absolute",
      height: "100%",
      width: "100%",
      left: 0,
      top: 0,
      borderRadius: 5,
      background: "rgba(238,228,218,.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
}