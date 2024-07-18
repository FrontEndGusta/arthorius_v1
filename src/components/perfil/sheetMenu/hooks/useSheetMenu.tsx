import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";

const useSheetMenu = () => {
    const { data: session } = useSession();
    const name: string | undefined = session?.user?.name || undefined;
    const email: string | undefined = session?.user?.email || undefined;

    return {
        name,
        email,
    };
};

export default useSheetMenu;
