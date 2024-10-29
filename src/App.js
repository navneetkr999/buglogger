import { useReducer } from "react";
import "./App.css";
import TicketForm from "./components/TicketForm";
import "./styles.css";
import ticketReducer from "./reducers/ticketReducer";
import TicketList from "./components/TicketList";
import { sortTickets } from "./utilities/sortingUtilities";

function App() {
  const initialState = {
    tickets: [],
    editingTicket: null,
    sortPreference: "High to Low",
  };

  const [state, dispatch] = useReducer(ticketReducer, initialState);

  const sortedTicktes = sortTickets(state.tickets, state.sortPreference);

  return (
    <div className="App">
      <div className="container">
        <h1>Bug Logger</h1>
        <TicketForm dispatch={dispatch} editingTicket={state.editingTicket} />
        {state.tickets.length > 0 && (
          <div className="results">
            <h2>All Tickets</h2>
            <select
              value={state.sortPreference}
              onChange={(e) =>
                dispatch({ type: "SET_SORTING", payload: e.target.value })
              }
            >
              <option value="High to Low">High to Low</option>
              <option value="Low to High">Low to High</option>
            </select>
            <TicketList tickets={sortedTicktes} dispatch={dispatch} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;