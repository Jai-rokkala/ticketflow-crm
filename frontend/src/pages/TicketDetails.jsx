import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

function TicketDetails() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);

  const [status, setStatus] = useState("");

  useEffect(() => {
    fetchTicket();
  }, []);

  const fetchTicket = async () => {
    try {
      const response = await API.get(`/tickets/${ticketId}`);

      setTicket(response.data);

      setStatus(response.data.status);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTicket = async () => {
    try {
      await API.put(`/tickets/${ticketId}`, {
        status: status,
      });

      alert("Ticket updated!");

      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Failed to update ticket");
    }
  };

  if (!ticket) {
    return (
      <div className="min-h-screen bg-slate-50 py-10">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-center text-slate-500">Loading ticket details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Ticket Details</h1>
            <p className="mt-2 text-sm text-slate-500">Review the request and update the status as needed.</p>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            Back
          </button>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-2xl font-semibold text-slate-900">{ticket.subject}</h2>

          <div className="mt-6 space-y-4 text-sm text-slate-600">
            <p>
              <span className="font-semibold text-slate-900">Customer:</span> {ticket.customer_name}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Email:</span> {ticket.customer_email}
            </p>
            <p>
              <span className="font-semibold text-slate-900">Description:</span>
            </p>
            <p className="rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-700">{ticket.description}</p>
            <p>
              <span className="font-semibold text-slate-900">Current Status:</span> {ticket.status}
            </p>
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Update Status</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </label>

            <button
              onClick={updateTicket}
              className="inline-flex w-full items-center justify-center rounded-full bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 sm:w-auto"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;