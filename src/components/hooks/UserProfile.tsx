import { useState, useEffect } from "react";
import axios from "axios";

interface FavoritePlace {
    name: string;
    rating: number;
}

interface UserProfile {
    name: string;
    surname: string;
    username: string;
    favouritePlaces: FavoritePlace[];
}

const useUserProfile = (username: string) => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const apiUrl = import.meta.env.VITE_APP_BASE_URL + `/api/v1/user/username/${username}`;

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get<UserProfile>(apiUrl);
                setUserProfile(response.data);
            } catch (error) {
                console.error("Error fetching user profile: ", error);
            }
        };
        fetchUserProfile();
    }, [apiUrl, username]);

    return userProfile;
};

export default useUserProfile;
