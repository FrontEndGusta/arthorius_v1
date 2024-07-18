import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAvatar = async () => {
    try {
        const response = await axios.get('/api/auth/get-avatar');
        // Ensure we return a defined value
        return response.data.data.avatar || null;
    } catch (error) {
        console.error('Erro ao obter o avatar do usuário:', error);
        return null;
    }
};

const useAvatar = () => {
    const { data: avatar } = useQuery({
        queryKey: ['avatar'],
        queryFn: fetchAvatar,
        initialData: null,
    });

    return { avatar };
};

export default useAvatar;
