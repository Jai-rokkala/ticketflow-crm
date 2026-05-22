import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";

function Home() {
    const [tickets, setTickets] = useState([]);
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        fetchTickets();
    }, [search, status]);

    const fetchTickets = async () => {
        try {
            const response = await API.get("/tickets/", {
                params: {
                    search: search,
                    status: status,
                },
            });

            console.log(response.data);

            setTickets(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-10">
            <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6 lg:px-8">
                <header className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-3xl font-semibold text-slate-900">All Tickets</h1>
                            <p className="mt-2 text-sm text-slate-500">Search, filter, and manage support tickets from one place.</p>
                        </div>

                        <Link to="/create" className="self-start md:self-auto">
                            <button className="inline-flex items-center justify-center rounded-full bg-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2">
                                Create Ticket
                            </button>
                        </Link>
                    </div>

                    <div className="mt-6 grid gap-3 sm:grid-cols-[1.75fr_1fr]">
                        <label className="block">
                            <span className="sr-only">Search tickets</span>
                            <input
                                type="text"
                                placeholder="Search tickets..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                            />
                        </label>

                        <label className="flex items-center gap-3 rounded-2xl border border-slate-300 bg-white px-4 py-3">
                            <span className="text-sm font-medium text-slate-700">Status</span>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="flex-1 bg-transparent text-sm text-slate-900 outline-none"
                            >
                                <option value="">All Status</option>
                                <option value="Open">Open</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </label>
                    </div>
                </header>

                <div className="grid gap-4">
                    {tickets.length === 0 ? (
                        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500 shadow-sm">
                            No tickets found
                        </div>
                    ) : (
                        tickets.map((ticket) => (
                            <Link
                                key={ticket.ticket_id}
                                to={`/ticket/${ticket.ticket_id}`}
                                className="group block rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                            >
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                    <div>
                                        <h3 className="text-xl font-semibold text-slate-900">{ticket.subject}</h3>
                                        <p className="mt-2 text-sm text-slate-500">Ticket ID: <span className="font-medium text-slate-900">{ticket.ticket_id}</span></p>
                                    </div>

                                    <span
                                        className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                                            ticket.status === "Closed"
                                                ? "bg-rose-100 text-rose-700"
                                                : ticket.status === "In Progress"
                                                ? "bg-amber-100 text-amber-700"
                                                : "bg-emerald-100 text-emerald-700"
                                        }`}
                                    >
                                        {ticket.status}
                                    </span>
                                </div>

                                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                    <p className="text-sm text-slate-600">
                                        <span className="font-medium text-slate-900">Customer:</span> {ticket.customer_name}
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        <span className="font-medium text-slate-900">Email:</span> {ticket.customer_email}
                                    </p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;