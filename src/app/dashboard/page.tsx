import { MdDashboard } from "react-icons/md";
import DashboardCharts from "./_components/DashboardCharts";

export default function Dashboard() {
  return (
    <div className="flex-1 max-w-screen-lg px-4 mx-auto h-full text-green-800">
      <section
        id="producerHeader"
        className="flex border-b border-b-green-800 items-center py-2 justify-center gap-4"
      >
        <MdDashboard size={36} />
        <h1 className="text-2xl sm:text-3xl font-bold">Dashboard</h1>
      </section>

      <DashboardCharts />
    </div>
  );
}
