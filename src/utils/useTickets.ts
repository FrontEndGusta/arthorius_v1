import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTickets = async () => {
    try {
        const response = await axios.get("/api/auth/get-tickets");
        return response.data.data;
      } catch (error) {
        console.error("Erro ao obter usuários:", error);
        return null;
      }
    }

const useTickets = () => {
    const { data: tickets } = useQuery({
        queryKey: ['tickets'],
        queryFn: fetchTickets,
        initialData: null,
    });
    console.log(tickets)

    return { tickets };
};

export default useTickets;